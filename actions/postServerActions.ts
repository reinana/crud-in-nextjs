'use server'

import prismadb from "@/lib/prismadb"
import { PostSchema, PostSchemaType } from "@/schemas/PostSchema"
import { Post } from "@prisma/client"
import { revalidatePath } from "next/cache"

// Create a post
export const createPost = async(values: PostSchemaType) =>{
    const validatedFields = PostSchema.safeParse(values)

    if(!validatedFields.success){
        console.error(validatedFields.error)
        return {error: "Invalid fields"}
    }
    const {title} = validatedFields.data

    try{
        await prismadb.post.create({
            data: {
                title
            }
        })
        revalidatePath("/")
        return {success: "Post created"}
    } catch(e){
        console.error(e)
        return {error: "Server error"}
    }
}

// Get all posts
export const getPosts = async() =>{
    try{
        const posts = await prismadb.post.findMany({
            orderBy: {
                postedAt: 'desc'
            }
        })
        return {success: posts}
    } catch(e){
        console.error(e)
        return {error: "Server error"}
    }
}

// Delete a post
export const deletePost = async(post: Post) =>{
    try {
        await prismadb.post.delete({
            where: {
                id: post.id
            }
        })
        revalidatePath("/")
        return {success: "Post deleted"}
    } catch (error) {
        return {error: "Server error"}
    }
}    

// Update a post
export const editPost = async(post: Post, title: string) =>{

    try {
        await prismadb.post.update({
            where: {
                id: post.id
            },
            data: {
                title
            }
        })
        revalidatePath("/")
        return {success: "Post updated"}
    } catch (error) {
        return {error: "Server error"}
    }
}