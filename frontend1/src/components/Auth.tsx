import { SignupInput } from "@hk1508/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../pages/config";

export const Auth = () => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "", 
  });

  async function sendRequest(){
    try{
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
    const jwt = response.data;
    localStorage.setItem("token",jwt.jwt);
    navigate("/blogs");

    }catch(e){
      console.error("Error during sign-up:", e);
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="text-2xl font-bold">Create an account</div>
          <div className="text-slate-600 text-sm mt-1">
            Already have an account?
            <Link className="ml-1 underline" to="/signin">
               Sign in
            </Link>
          </div>
        </div>

        <div className="grid gap-y-4">
          <LabelledInput
            label="Name"
            placeholder="Harshita Katariya.."
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, name: e.target.value }))
            }
          />
          <LabelledInput
            label="Username/Email"
            placeholder="Username / Email"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, username: e.target.value }))
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, password: e.target.value }))
            }
          />
        </div>

        <button onClick={sendRequest} className="mt-6 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-950 transition duration-200">
          Sign Up
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  const inputId = label.toLowerCase().replace(/\s+/g, "_");

  return (
    <div>
      <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id={inputId}
        placeholder={placeholder}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5"
      />
    </div>
  );
}
