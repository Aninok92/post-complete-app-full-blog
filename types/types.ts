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
    posts: Post[]
  }

  export type PostDetailProps = {
    post: Post
  }

  export type StatusTypes = "success" | "pending" | "error" 

  export type NotificationTypes = {
    status: StatusTypes
    title: string
    message: string
  }

  export type Message = {
    id?: number
    email: string
    name: string
    message: string
  }
  
  export type Data = {
    message: string
    data?: Message
  }

  export interface LayoutProps {
    children: React.ReactNode
  }

  export interface MongoUriComponents {
    username: string;
    password: string;
    clustername: string;
  }
  