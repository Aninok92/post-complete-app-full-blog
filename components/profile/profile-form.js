import { useRef } from "react";

import { changeProfilePassword } from "../../utils/apiUtils";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const newPassword = useRef();
  const oldPassword = useRef();

  async function handlerSubmit(e) {
    e.preventDefault();

    const enterdNewPassword = newPassword.current.value;
    const enteredOldPassword = oldPassword.current.value;

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
