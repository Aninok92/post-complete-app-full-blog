import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import classes from "./main-navigation.module.css";
import Logo from "./logo";

export default function MainNavigation() {
  const router = useRouter();
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }

  function isActive(route: string) {
    return router.route === route ? classes.active : undefined;
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link className={isActive("/posts")} href="/posts">
              Posts
            </Link>
          </li>
          <li>
            <Link className={isActive("/contact")} href="/contact">
              Contact
            </Link>
          </li>
          {!session && status !== "loading" && (
            <li>
              <Link className={isActive("/auth")} href="/auth">
                Login
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link className={isActive("/profile")} href="/profile">
                Profile
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
