import Image from "next/image";

import classes from "./posts-header.module.css";
import { Post } from "../../../types/types";

export default function PostHeader({ title, image }: Post) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}
