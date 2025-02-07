"use client"

import { MdClose, MdEdit } from "react-icons/md";
import PostForm from "./PostForm";
import { useState } from "react";
import { Post } from "@prisma/client";

const EditPost = ({post}: {post: Post}) => {

    const [isEditing, setIsEditing] = useState(false)
    const handleOpenEditing = () => {
        setIsEditing(true)
    }
    const handleCloseEditing = () => {
        setIsEditing(false)
    }
    return (
        <div>
            {!isEditing &&
                <button className="cursor-pointer text-slate-500" onClick={handleOpenEditing}>
                    <MdEdit size={20} />
                </button>
            }
            {isEditing &&
                <div className="absolute top-0 left-0 w-screen h-screen z-2 bg-slate-500 bg-opacity-70 flex items-center justify-center">
                    <div className="relative bg-white p-8 rounded-md w-full max-w-[600px]">
                        <button className="absolute top-3 right-3 text-slate-500" >
                            <MdClose size={20} onClick={handleCloseEditing} />
                        </button>
                        <PostForm post={post} handleCloseEditing={handleCloseEditing}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditPost