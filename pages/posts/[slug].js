import PostContent from "../../components/posts/post-detail/post-content"
import { getPostData, getPostsFiles } from "../../lib/posts-util"

function PostDetailPage({post}) {
    return <PostContent post={post}/>
}

export function getStaticProps(context) {
    const { params } = context
    const { slug } = params

    const postData = getPostData(slug)

    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
    
}

export function getStaticPaths(params) {
    const postFileNames = getPostsFiles()
    const slugs = postFileNames.map(fileName => fileName.replace(/\.md$/, ''))

    return {
        paths: slugs.map(slug => ({params: {slug}})),
        fallback: false 
    }
    
}

export default PostDetailPage