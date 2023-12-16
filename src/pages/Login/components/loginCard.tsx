import { useState } from "react";
import { loginUser } from "./service";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Payload = {
  userName: string | null;
  pass: any | null;
  remember: boolean | null;
};

const loginCard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [pass, setPass] = useState<number | null>(null);
  const [remember, setRemember] = useState<boolean | null>(false);
  const [logedin, setLogedin] = useState<boolean | null>(false);

  const navigate = useNavigate();

  const loginMutationOptions: UseMutationOptions<
    string,
    Error,
    Payload,
    unknown
  > = {
    mutationFn: async (variables: Payload) => {
      const { userName, pass } = variables;

      if (!userName || !pass) {
        throw new Error("Invalid credentials");
      }

      return await loginUser(userName, pass);
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast.error("درخواست با خطا مواجه شد");
    },
    onSuccess: (data: any) => {
      console.log("Login success: ", data);
      localStorage.setItem("username", data.userName);
      setLogedin(true);

      setTimeout(() => {
        Cookies.set("token", data.accessToken.access_token, {
          expires: 30,
        });
        navigate("/ProductsList");
      }, 1000);
    },
  };

  const loginMutation = useMutation(loginMutationOptions);

  const loginClick = () => {
    if (userName && pass) {
      const payload: Payload = {
        userName,
        pass,
        remember,
      };
      loginMutation.mutate(payload);
      localStorage.setItem("rememberMe", remember ? "true" : "false");
    } else {
      toast.error("فیلد های لازم را پر کنید");
    }
  };

  return (
    <div className="border border-gray-500 p-5 rounded-lg w-1/2">
      {logedin ? (
        <div className="flex justify-center items-center flex-col">
          <p className="text-customGreen">ورود شما با موفقیت انجام شد.</p>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col mb-3">
            <label className="mb-2 text-sm" htmlFor="userName">
              نام کاربری
            </label>
            <input
              type="text"
              name="userName"
              placeholder="نام کاربری...."
              id="userName"
              onChange={(e) => setUserName(e.target.value)}
              className="text-sm p-2 outline-none rounded border border-gray-500"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-2 text-sm" htmlFor="pass">
              کلمه عبور{" "}
            </label>
            <input
              type="number"
              name="pass"
              id="pass"
              placeholder="کلمه عبور ..."
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue =
                  !isNaN(parseFloat(inputValue)) && isFinite(+inputValue)
                    ? +inputValue
                    : null;
                setPass(numericValue);
              }}
              className="text-sm p-2 outline-none rounded border border-gray-500 "
            />
          </div>
          <div className="flex flex-row-reverse items-center justify-end ">
            <label className="mb-2 text-sm" htmlFor="check">
              مرا به خاطر بسپار
            </label>
            <input
              className="ml-2"
              type="checkbox"
              name="check"
              id="check"
              onChange={(e) => {
                const isChecked = e.target.checked;
                const rememberValue = isChecked ? true : false;
                setRemember(rememberValue);
              }}
            />
          </div>
          <button
            className={`${
              loginMutation.status === "pending"
                ? "bg-gray-700"
                : "bg-customGreen"
            } text-white text-center p-3 w-full rounded mt-3`}
            onClick={() => loginClick()}
            disabled={loginMutation.status === "pending" ? true : false}
          >
            ورود
          </button>
        </>
      )}

      {loginMutation.status === "pending" && (
        <p className="text-center mt-2"> Loading...</p>
      )}
    </div>
  );
};

export default loginCard;
