import { useState, useEffect } from "react";

import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
import { sendContactData } from "../../utils/apiUtils";
import { NotificationTypes, StatusTypes } from "../../types/types";
import { notificationMessage } from "../../lib/notification-message";

export default function ContactForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [requestStatus, setRequestStatus] = useState<StatusTypes | null>(null);
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function submitMessageHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData(email, name, message);
      setRequestStatus("success");
      setEmail("");
      setMessage("");
      setName("");
    } catch (error) {
      setRequestError(error);
      setRequestStatus("error");
    }
  }

  let notification: NotificationTypes = notificationMessage(requestStatus, requestError)

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
