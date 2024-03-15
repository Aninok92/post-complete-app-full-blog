import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPostData(fileName) {
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const postSlug = fileName.replace(/\.md$/, '')

    const postData = {
        slug: postSlug,
        ...data,
        content
    }

    return postData
}

export function getAllPosts(params) {
    const postFiles = fs.readdirSync(postsDirectory);

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