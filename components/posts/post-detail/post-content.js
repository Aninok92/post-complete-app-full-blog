import ReactMarkdown from 'react-markdown'

import PostHeader from "./post-header";
import classes from "./post-content.module.css"

const DUMMY_POST =  { 
        slug: "getting-started-with-nextjs",
        title: "Getting started with Next.js",
        image: "getting-started-with-nextjs.jpg",
        content: '# This ia a first post',
        date:"2024-03-15"
    }


export default function PostContent(params) {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`
    return (
        <article className={classes.content}>
            <PostHeader title={DUMMY_POST.title} image={imagePath} />
            <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
        </article>
    )
}