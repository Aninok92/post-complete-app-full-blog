import PostItem from "./post-item";
import { PostsProps } from "../../types/types";
import classes from "./posts-grid.module.css";

export default function PostsGrid({ posts }: PostsProps) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
