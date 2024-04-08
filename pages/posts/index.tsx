import Head from "next/head";
import { GetStaticProps } from 'next'

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

interface Post {
  title: string
  image: string
  date: string
  excerpt: string
  isFeatured: boolean
  content: string
  slug: string
}

interface AllPostsPageProps {
  posts: Post[];
}

export default function AllPostsPage({posts}: AllPostsPageProps): any {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta name="description" content="A list all programing posts" />
      </Head>
      <AllPosts posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}