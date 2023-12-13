import LoginCard from "./components/loginCard";
const Login = () => {
  return (
    <main>
      <div className="  h-screen bg-fuchsia-200 flex  w-full ">
        <div className="bg-green-300 flex justify-center items-center w-1/2">
          <picture>
            {/* <source media="(min-width: 900px)" srcset="img-large.jpg" /> */}
            {/* <source media="(min-width: 600px)" srcset="img-medium.jpg" /> */}
            <img src="img-small.jpg" />
          </picture>
        </div>
        <div className="flex flex-col justify-between bg-red-300 w-1/2">
          <h1>HIWEB</h1>
          <LoginCard />
        </div>
      </div>
    </main>
  );
};

export default Login;
