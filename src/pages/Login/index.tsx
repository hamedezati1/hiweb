import LoginCard from "./components/loginCard";
import LoginImage from "./../../assets/loginImg.png";
import logo from "./../../assets/logo.png";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const rememberMe = localStorage.getItem("rememberMe");

    if (token && rememberMe == "true") {
      navigate("/ProductsList");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <main>
      <div className="h-screen flex flex-col items-center sm:flex-row  w-full ">
        <div className="flex justify-center items-center w-1/2">
          <picture className="flex justify-center items-center  ">
            {/* <source media="(min-width: 900px)" srcset={LoginImage} /> */}
            {/* <source media="(min-width: 600px)" srcset={LoginImage} /> */}
            <img src={LoginImage} className="  w-full sm:h-[700px] " />
          </picture>
        </div>
        <div className="flex flex-col justify-center w-full  sm:w-1/2  items-center">
          <h1 className="mb-5 sm:mb-[100px]">
            <img src={logo} alt="logo" />
          </h1>

          <LoginCard />
        </div>
      </div>
    </main>
  );
};

export default Login;
