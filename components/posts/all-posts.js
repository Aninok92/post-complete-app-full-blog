import PostsGrid from './posts-grid'

import classes from './all-posts.module.css'

export default function AllPosts({posts}) {
    return <section className={classes.posts}>
        <h1>AllPosts</h1>
        <PostsGrid posts={posts}/>
    </section>
    
}