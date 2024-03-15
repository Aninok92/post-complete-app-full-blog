import ReactMarkdown from 'react-markdown'
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
  
  const customRenders ={
    // img(image) {
    //     return (
    //         <Image
    //             src={`/images/posts/${post.slug}/${image.src}`}
    //             alt={image.alt}
    //             width={600}
    //             height={300}
    //         />
    //     )
    // },
    p(paragraph) {
        const { node } = paragraph

        if(node.children[0].tagName === 'img') {
            const image = node.children[0]

            return <div className={classes.image}>
                  <Image
                src={`/images/posts/${post.slug}/${image.properties.src}`}
                alt={image.alt}
                width={600}
                height={300}
            />
            </div>
    }
    return <p>{paragraph.children}</p>
},

code(code) {
    const { className, children } = code;
    const language = className.split('-')[1];
    return (
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        children={children}
      />
    );
  },


  }

  const imagePath = `/images/posts/${slug}/${image}`
    return (
        <article className={classes.content}>
            <PostHeader title={title} image={imagePath} />
            <ReactMarkdown components={customRenders}>{content}</ReactMarkdown>
        </article>
    )
}