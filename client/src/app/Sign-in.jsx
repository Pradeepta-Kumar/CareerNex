import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sign_in_user, sign_in_user_via_google } from "@/store/auth-slice";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sign_in_user(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Sign-in successful!", {
          description: "Welcome back to Commune-ai.",
        });
        navigate("/dashboard");
      } else {
        toast.error("Sign-in failed!", {
          description: "Couldn't sign-in to Commune-ai.",
        });
      }
    });
  };

  const handleGoogleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const { email, displayName } = res.user;

    const password = "google-auth";
    dispatch(sign_in_user_via_google({ fullname: displayName, email, password }))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success("Sign-in successful!", {
            description: "Welcome back to Commune-ai.",
          });
          navigate("/dashboard");
        } else {
          toast.error("Sign-in failed!", {
            description: "Couldn't sign-in to Commune-ai.",
          });
        }
      });
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    toast.error("Google sign-in failed!", {
      description: error?.message || "Unexpected error occurred.",
    });
  }
};


  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black gap-20 py-">
      <div className="hidden lg:flex justify-center items-center bg-black w-1/3 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <img
            src="https://img.freepik.com/premium-vector/vision-scope-document-abstract-concept-vector-illustration_107173-25589.jpg"
            alt="Sign-in"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border border-white p-6 rounded-3xl">
        <h1 className="text-center font-bold text-black text-3xl bg-white py-2 border border-black">
        CareerNex
        <div className="text-center text-sm text-black font-sm">
          <h2>Welcome back! Sign-in to experience CareerNex </h2>
        </div>
      </h1>

      <div>
        <Button
          className={
            "bg-white text-black px-2 py-1 rounded-full flex w-full cursor-pointer gap-4"
          }
          onClick={handleGoogleLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt="google-logo"
            width={20}
            height={20}
          />
          <span>Continue with google</span>
        </Button>
      </div>

      <hr className="border-gray-300 mt-4" />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 py-6 px-8 w-full rounded-lg my-auto h-[75%] gap-5 text-white "
      >
        <Label className="text-white px-2 py-1 flex w-2/5">Email I'd</Label>
        <Input
          type="email"
          placeholder="Enter your email here"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Label className=" text-white px-2 py-1 flex w-1/5">Password</Label>
        <Input
          type="password"
          placeholder="Enter your password here"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-between gap-4">
          <Button
            type="submit"
            className="bg-white text-black px-2 py-1 rounded-full flex w-2/5 cursor-pointer"
          >
            Login
          </Button>
          <p
            className="cursor-pointer text-gray-200 text-sm font-bold"
            onClick={() => navigate("/auth/sign-up")}
          >
            New to CareerNex ?? Sign-up
          </p>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AuthLogin;
