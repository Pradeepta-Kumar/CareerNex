import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sign_up_user } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  fullname: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
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
    dispatch(sign_up_user(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Sign-up successful!", {
          description: "Welcome to Commune-ai.",
        });
        navigate("/auth/sign-in");
      } else {
        toast.error("Sign-up failed!", {
          description: "Couldn't sign-in to Commune-ai.",
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black gap-20">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 max-w-md border rounded-lg w-1/3 my-auto h-[75%] gap-5 text-white "
      >
        <h1 className="text-center font-bold text-black text-3xl bg-white py-2 border border-black">
          CareerNex
          <div className="text-center text-sm text-black font-sm">
            <h2>Welcome! Sign-up to experience CareerNex </h2>
          </div>
        </h1>

        <div>
          <Button
            className={
              "bg-white text-black px-2 py-1 rounded-full flex w-full cursor-pointer gap-4"
            }
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

        <hr />

        <Label className="text-white px-2 py-1 flex w-1/5">
          Fullname
        </Label>
        <Input
          type="text"
          placeholder="Enter your fullname here"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <Label className="text-white px-2 py-1 flex w-1/5">
          Email I'd
        </Label>
        <Input
          type="email"
          placeholder="Enter your email here"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Label className="text-white px-2 py-1 flex w-1/5">
          Password
        </Label>
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
            Sign-up
          </Button>
          <p
            className="cursor-pointer text-gray-200 text-sm font-bold"
            onClick={() => navigate("/auth/sign-in")}
          >
            Already have an account ?? Sign-in
          </p>
        </div>
      </form>
      <div className="hidden lg:flex justify-center items-center bg-black w-1/3 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <img
            src="https://img.freepik.com/premium-vector/vision-scope-document-abstract-concept-vector-illustration_107173-25589.jpg"
            alt="Sign-in"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthRegister;
