import { useContext } from "react";
import AuthContext from "./AuthContext";

const UseAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
export default UseAuth;
