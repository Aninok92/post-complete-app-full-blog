import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '')
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const postData = {
        slug: postSlug,
        ...data,
        content
    }

    return postData
}

export function getAllPosts(params) {
    const postFiles = getPostsFiles()

    const allPosts = postFiles.map(postFiles => {
        return getPostData(postFiles)
    })

    const sortedPost = allPosts.sort((a, b) => a > b ? -1 : 1)

    return sortedPost
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();

    const featuredPosts = allPosts.filter(post => post.isFeatured)

    return featuredPosts
}