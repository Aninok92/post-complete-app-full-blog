import PostsGrid from "./posts-grid";
import { PostsProps } from "../../types/types";
import classes from "./all-posts.module.css";

export default function AllPosts({ posts }: PostsProps) {
  return (
    <section className={classes.posts}>
      <h1>AllPosts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
