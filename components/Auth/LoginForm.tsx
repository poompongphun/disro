"use client";
import { useState } from "react";
import TextInput from "./TextInput";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // const loginUser = await axios.post("/auth-service/login", {
    //   email,
    //   password,
    // });
    // console.log(loginUser);
    const login = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: `/`,
    });
    if (login?.ok) {
      router.push("/");
    } else {
      alert("Wrong email or password");
    }
  };
  return (
    <div className="w-full max-w-[400px] text-black flex flex-col gap-6 mx-5">
      <div>
        <h1 className="text-3xl font-bold">Hello Again!</h1>
        <span>Welcome Back</span>
      </div>
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <TextInput
          type="email"
          placeholder="Email Address"
          value={email}
          Icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          }
          onInput={(e) => setEmail(e.currentTarget.value)}
        ></TextInput>
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          Icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          }
          onInput={(e) => setPassword(e.currentTarget.value)}
        ></TextInput>
        <button
          type="submit"
          className=" bg-darkBlue hover:opacity-95 transition-opacity px-6 py-4 rounded-full text-white w-full"
        >
          Login
        </button>
      </form>
      <div>
        <span>
          Need an account? Shot it!!{" "}
          <Link href={"/register"} className=" text-blue hover:underline">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
