import PostsGrid from "../posts/posts-grid";
import { PostsProps } from "../../types/types";
import classes from "./featured-posts.module.css";

export default function FeaturedPosts({ posts }: PostsProps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
