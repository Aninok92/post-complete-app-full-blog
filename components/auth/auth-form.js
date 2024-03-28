import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.message || "Something went wrong during creating new user.";
    toast.error(data.message || errorMessage);
    throw new Error(data.message || errorMessage);
  } else {
    toast.success("User created in successfully!");
  }

  return data;
}

async function signInUser(email, password, router) {
  const response = await signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
  });

  if (!response.ok) {
    const errorMessage = data.message || "Something went wrong during sign in.";
    toast.error(response.error || errorMessage);
    console.error(response.error || errorMessage);
  } else {
    toast.success("User signed in successfully!");
    router.replace("/profile");
  }
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      await signInUser(enteredEmail, enteredPassword, router);
    } else {
      try {
        await createUser(enteredEmail, enteredPassword);
        await signInUser(enteredEmail, enteredPassword, router);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
