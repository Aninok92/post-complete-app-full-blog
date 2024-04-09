import Head from "next/head";
import { GetStaticProps } from "next";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";
import { PostsProps } from "../types/types";

function HomePage({ posts }: PostsProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Nina's blog</title>
        <meta
          name="description"
          content="I post about programing and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
