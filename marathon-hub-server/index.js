require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

const generativeText = require("./utils/gemini");

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://starlit-speculoos-f274d4.netlify.app",
      "https://marathon-hub-12397.web.app",
      "https://marathon-hub-12397.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvkkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoClient configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("marathonDB").collection("users");
    const marathonCollection = client.db("marathonDB").collection("marathons");
    const registrationsCollection = client
      .db("marathonDB")
      .collection("registrations");

    // Gemini API Endpoint
    app.post("/geminiBot", async (req, res) => {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      try {
        const response = await generativeText(prompt);
        res.json({ response });
      } catch (error) {
        res.status(500).json({ error: "Failed to generate content" });
      }
    });

    // **POST**: Add a new marathon
    app.post("/addNewmarathons", async (req, res) => {
      const addmarathonData = req.body;
      addmarathonData.createdAt = new Date();
      addmarathonData.totalRegistrations = 0;

      try {
        const result = await marathonCollection.insertOne(addmarathonData);
        res.send({ success: true, result });
      } catch (error) {
        console.error("Error adding marathon:", error);
        res.status(500).send({ error: "Error adding marathon event" });
      }
    });

    //**(6)limited homepage card */

    app.get("/runningMarathon", async (req, res) => {
      try {
        const cursor = marathonCollection.find().limit(6);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    //auth related api
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // **GET**: Fetch all marathons

    //with sort button
    // **GET**: Fetch all marathons with sorting
    app.get("/allMarathons", verifyToken, async (req, res) => {
      const { sortOrder } = req.query; // Accept sortOrder from the query string
      try {
        const sort = sortOrder === "asc" ? 1 : -1; // Sort ascending or descending
        const marathons = await marathonCollection
          .find({})
          .sort({ createdAt: sort })
          .toArray();
        res.send(marathons);
      } catch (error) {
        console.error("Error fetching marathons:", error);
        res.status(500).send({ error: "Error fetching marathons" });
      }
    });

    //

    // **GET**: Fetch marathons by organizer email
    app.get("/marathons/by-email", verifyToken, async (req, res) => {
      const { email } = req.query;
      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }
      //token email not equal query email
      if (req.user.email !== req.query.email) {
        res.status(403).send({ message: "forbidden" });
      }
      try {
        const result = await marathonCollection
          .find({ organizerEmail: email })
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching marathons by email:", error);
        res.status(500).send({ error: "Error fetching marathons by email" });
      }
    });

    // **POST**: Marathon registration
    app.post("/registrations", async (req, res) => {
      const registration = req.body;
      try {
        const result = await registrationsCollection.insertOne(registration);

        // Update registration count in marathons collection
        await marathonCollection.updateOne(
          { title: registration.marathonTitle },
          { $inc: { totalRegistrations: 1 } }
        );

        res.send(result);
      } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send({ error: "Failed to register for the marathon" });
      }
    });

    // **GET**: Fetch registrations for a specific user

    app.get("/registrations/by-email", verifyToken, async (req, res) => {
      const { email, search, location } = req.query;
      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }

      let query = { email: email };

      if (search) {
        query.marathonTitle = { $regex: search, $options: "i" }; // Case-insensitive search by marathon title
      }

      if (location) {
        query.additionalInfo = { $regex: location, $options: "i" }; // Case-insensitive search by location
      }

      try {
        const userRegistrations = await registrationsCollection
          .find(query)
          .toArray();
        res.send(userRegistrations);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).send({ error: "Error fetching registrations" });
      }
    });

    // **GET**: Fetch a single marathon by ID
    app.get("/marathons/:id", async (req, res) => {
      const { id } = req.params;
      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid marathon ID" });
        }

        const marathon = await marathonCollection.findOne({
          _id: new ObjectId(id),
        });
        if (marathon) {
          res.send(marathon);
        } else {
          res.status(404).send({ error: "Marathon not found" });
        }
      } catch (error) {
        console.error("Error fetching marathon by ID:", error);
        res.status(500).send({ error: "Error fetching marathon" });
      }
    });

    // **PUT**: Update a marathon by ID
    app.put("/marathons/:id", async (req, res) => {
      const { id } = req.params;
      const updateData = { ...req.body }; // Create a copy of the update data

      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid marathon ID" });
        }

        if (Object.keys(updateData).length === 0) {
          return res.status(400).send({ error: "Update data cannot be empty" });
        }

        delete updateData._id; // Exclude the _id field from the update data

        const result = await marathonCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount > 0) {
          res.send({ success: true, result });
        } else {
          res.status(404).send({ error: "Marathon not found" });
        }
      } catch (error) {
        console.error("Error updating marathon:", error);
        res.status(500).send({ error: "Error updating marathon" });
      }
    });

    // **PUT**: Update a registration by ID (new)
    app.put("/registrations/:id", async (req, res) => {
      const { id } = req.params;
      const updateData = { ...req.body }; // Create a copy of the update data

      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid registration ID" });
        }

        if (Object.keys(updateData).length === 0) {
          return res.status(400).send({ error: "Update data cannot be empty" });
        }

        delete updateData._id; // Exclude the _id field from the update data

        const result = await registrationsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount > 0) {
          res.send({ success: true, result });
        } else {
          res.status(404).send({ error: "Registration not found" });
        }
      } catch (error) {
        console.error("Error updating registration:", error);
        res.status(500).send({ error: "Error updating registration" });
      }
    });

    // **DELETE**: Delete a marathon by ID
    app.delete("/marathons/:id", async (req, res) => {
      const { id } = req.params;
      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid marathon ID" });
        }

        const result = await marathonCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount > 0) {
          res.send({ success: true, message: "Marathon deleted successfully" });
        } else {
          res.status(404).send({ error: "Marathon not found" });
        }
      } catch (error) {
        console.error("Error deleting marathon:", error);
        res.status(500).send({ error: "Error deleting marathon" });
      }
    });

    // **DELETE**: Delete a registration by ID (new)
    app.delete("/registrations/:id", async (req, res) => {
      const { id } = req.params;
      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid registration ID" });
        }

        const result = await registrationsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount > 0) {
          res.send({
            success: true,
            message: "Registration deleted successfully",
          });
        } else {
          res.status(404).send({ error: "Registration not found" });
        }
      } catch (error) {
        console.error("Error deleting registration:", error);
        res.status(500).send({ error: "Error deleting registration" });
      }
    });

    // Confirm MongoDB connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to the Marathon Management System!");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
