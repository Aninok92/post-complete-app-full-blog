import Head from "next/head";
import { GetStaticProps } from "next";

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import { PostsProps } from "../../types/types";

export default function AllPostsPage({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta name="description" content="A list all programing posts" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};
