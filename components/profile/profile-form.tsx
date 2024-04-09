import { useRef } from "react";

import { changeProfilePassword } from "../../utils/apiUtils";
import classes from "./profile-form.module.css";

function ProfileForm(): JSX.Element {
  const newPassword = useRef(null);
  const oldPassword = useRef(null);

  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const enterdNewPassword: string = newPassword.current.value;
    const enteredOldPassword: string = oldPassword.current.value;

    changeProfilePassword(enterdNewPassword, enteredOldPassword);
  }

  return (
    <>
      <form className={classes.form} onSubmit={handlerSubmit}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPassword} />
        </div>
        <div className={classes.control}>
          <label htmlFor="old-password">Old Password</label>
          <input type="password" id="old-password" ref={oldPassword} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
