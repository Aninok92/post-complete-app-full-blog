import ReactMarkdown from 'react-markdown'

import PostHeader from "./post-header";
import classes from "./post-content.module.css"

// const DUMMY_POST =  { 
//         slug: "getting-started-with-nextjs",
//         title: "Getting started with Next.js",
//         image: "getting-started-with-nextjs.jpg",
//         content: '# This ia a first post',
//         date:"2024-03-15"
//     }


export default function PostContent({post}) {
  const {slug, image, title, content } = post  

  const imagePath = `/images/posts/${slug}/${image}`
    return (
        <article className={classes.content}>
            <PostHeader title={title} image={imagePath} />
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    )
}