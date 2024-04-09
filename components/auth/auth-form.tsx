import { useState, useRef } from "react";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";
import { createUser, signInUser } from "../../utils/apiUtils";

function AuthForm(): JSX.Element {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const enteredEmail: string = emailInputRef.current.value;
    const enteredPassword: string = passwordInputRef.current.value;

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
