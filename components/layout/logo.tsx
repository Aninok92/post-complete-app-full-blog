import classes from "./logo.module.css";

interface LogoProps {}

export default function Logo(props: LogoProps): JSX.Element {
  return <div className={classes.logo}>Next blog</div>;
}
