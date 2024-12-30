import { Link } from "react-router-dom";
import Error404 from "./Error404";
import { Helmet } from "react-helmet-async";

const Error = () => {
  return (
    <div className="flex flex-col gap-20 justify-center items-center">
      <Helmet>
        <title>Error</title>
      </Helmet>
      <Error404></Error404>
      <Link className="btn btn-accent" to={"/"}>
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
