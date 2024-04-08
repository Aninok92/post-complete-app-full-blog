export interface Post {
    title?: string
    image?: string
    date?: string
    excerpt?: string
    isFeatured?: boolean
    content?: string
    slug?: string
  }
  
  export interface PostsProps {
    posts: Post[];
  }

  export type PostDetailProps = {
    post: Post
  }