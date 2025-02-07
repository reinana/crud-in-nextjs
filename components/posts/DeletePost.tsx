"use client"

import { deletePost } from "@/actions/postServerActions";
import { Post } from "@prisma/client";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { MdDelete } from "react-icons/md";

const DeletePost = ({ post }: { post: Post }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (post: Post) => {
        setLoading(true)
        await deletePost(post)
        setLoading(false)
    }
    return (
        <button onClick={() => { handleDelete(post) }} className="text-slate-500">
            {!loading && <MdDelete size={20} />}
            {loading && <ImSpinner className="animate-spin" size={20} />}
        </button>
    );
}

export default DeletePost