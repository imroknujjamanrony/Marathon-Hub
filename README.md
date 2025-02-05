# Marathon Hub

Welcome to **Marathon Hub**, your one-stop platform for exploring and registering for upcoming marathons. Whether you're a seasoned runner or just starting your journey, Marathon Hub helps you discover marathons tailored to your interests and capabilities.

## Live Site URL

https://marathon-hub-12397.web.app/

[Visit Marathon Hub](#)

## Features

- **Comprehensive Marathon Listings**: View a curated list of upcoming marathons with essential details like location, date, and distance.
- **Responsive Design**: Optimized for all devices, ensuring a seamless experience on desktops, tablets, and mobile phones.
- **Dynamic Data Integration**: Fetches and displays real-time marathon information from a JSON file.
- **Backend Query Support**: Integrated backend to fetch data dynamically for marathon listings.
- **Search Functionality**: Quickly find marathons based on keywords, locations, or dates.
- **Attractive and User-Friendly Interface**: Styled with Tailwind CSS, featuring modern card layouts and hover effects.
- **Event Details at a Glance**: Includes organizer information, registration dates, and a short description for every marathon.

## Technologies Used

- **React.js**: For building a dynamic and responsive user interface.
- **Node.js & Express.js**: For backend API support and queries.
- **MongoDB**: To store and retrieve marathon data efficiently.
- **Tailwind CSS**: For elegant and responsive styling.
- **JSON**: As the data source for marathon details.
- **Git**: For version control and project tracking.

### Updates Made:

1. Added **Backend Query Support** and **Search Functionality** as features.
2. Mentioned backend technologies like **Node.js**, **Express.js**, and **MongoDB** under the **Technologies Used** section.
3. Included instructions for starting the backend server in the **Installation and Usage** section.

## Running the Project Locally

Follow these steps to run the project on your local machine:

1. Clone the repository:
   bash
   git clone https://github.com/yourusername/educonnect.git
   cd educonnect
2. Install the dependencies:
   bash

# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install 3. Set up environment variables:
Create a .env file in the backend directory and add the following variables:

plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret 4. Run the backend server:
bash
cd backend
npm start 5. Run the frontend server:
bash
cd ../frontend
npm start 6. Access the project:
Open your browser and navigate to http://localhost:5000

Live Project Links & Resources
Live Project: [Live-Link](https://marathon-hub-12397.web.app/)

Frontend Repository: GitHub - [Marathon-Hub Frontend](https://github.com/imroknujjamanrony/Marathon-Hub/tree/main/marathon-hub-client)

Backend Repository: GitHub - [Marathon-Hub Backend](https://github.com/imroknujjamanrony/Marathon-Hub/tree/main/marathon-hub-server)

Let me know if you'd like to include more details or features!
