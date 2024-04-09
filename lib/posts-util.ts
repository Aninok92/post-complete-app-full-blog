import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Post } from "../types/types";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData: Post = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts(): Post[] {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFiles) => {
    return getPostData(postFiles);
  });

  const sortedPost = allPosts.sort((a, b) => (a > b ? -1 : 1));

  return sortedPost;
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
