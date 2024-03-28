import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

// AUTH
export async function createUser(email, password) {
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
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.success("User created in successfully!");
    }
  
    return data;
  }
  
export async function signInUser(email, password, router) {
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (!response.ok) {
      const errorMessage = response.error || "Something went wrong during sign in.";
      toast.error(errorMessage);
      console.error(errorMessage);
    } else {
      toast.success("User signed in successfully!");
      router.replace("/profile");
    }
  }

  export async function changeProfilePassword(newPassword, oldPassword) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        newPassword,
        oldPassword
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
  
    if (response.ok) {
      toast.success("Password successfully changed!");
    } else {
      console.error(data.message || "Failed to change password:", data.error);
      toast.error(data.message || "Failed to change password. Please try again.");
    }

    return data
  }

// CONTACT
 export async function sendContactData(email, name, message) {
    const response = await fetch("api/contact", {
      method: "POST",
      body: JSON.stringify({ email, name, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    if (!response.ok) {
      console.error(data.message || "Something went wrong");
    }
  }