import FeaturedPosts from "../components/home-page/featured-posts"
import Hero from "../components/home-page/hero"

import { getFeaturedPosts } from '../lib/posts-util'

// const DUMMY_DATA = [
//     { 
//         slug: "getting-started-with-nextjs",
//         title: "Getting started with Next.js",
//         image: "getting-started-with-nextjs.jpg",
//         excerpt: "Next.js is a popular open-source React framework that is used for building server-side rendered (SSR) and statically generated web applications. It's maintained by Vercel, formerly known as Zeit, and provides many features out of the box to simplify the development of React applications.",
//         date:"2024-03-15"
//     },
//     { 
//         slug: "getting-started-with-nextjs01",
//         title: "Getting started with Next.js",
//         image: "getting-started-with-nextjs.jpg",
//         excerpt: "Next.js is a popular open-source React framework that is used for building server-side rendered (SSR) and statically generated web applications. It's maintained by Vercel, formerly known as Zeit, and provides many features out of the box to simplify the development of React applications.",
//         date:"2024-03-15"
//     },
//     { 
//         slug: "getting-started-with-nextjs02",
//         title: "Getting started with Next.js",
//         image: "getting-started-with-nextjs.jpg",
//         excerpt: "Next.js is a popular open-source React framework that is used for building server-side rendered (SSR) and statically generated web applications. It's maintained by Vercel, formerly known as Zeit, and provides many features out of the box to simplify the development of React applications.",
//         date:"2024-03-15"
//     },
//     { 
//         slug: "getting-started-with-nextjs03",
//         title: "Getting started with Next.js",
//         image: "getting-started-with-nextjs.jpg",
//         excerpt: "Next.js is a popular open-source React framework that is used for building server-side rendered (SSR) and statically generated web applications. It's maintained by Vercel, formerly known as Zeit, and provides many features out of the box to simplify the development of React applications.",
//         date:"2024-03-15"
//     },

// ]

function HomePage({ posts }) {
    return <>
        <Hero />
        <FeaturedPosts posts={posts}/>
    </>
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts()

    return {
        props: {
          posts: featuredPosts
        },
      }
}

export default HomePage