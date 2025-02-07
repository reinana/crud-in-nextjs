"use client"
import { PostSchema, PostSchemaType } from "@/schemas/PostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../form/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../form/Button";
import { BiArrowFromLeft } from "react-icons/bi";
import { cn } from "@/lib/util";
import Header from "../common/Header";
import { createPost, editPost } from "@/actions/postServerActions";
import { Post } from "@prisma/client";

const PostForm = ({ post, handleCloseEditing }: { post?: Post, handleCloseEditing?: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostSchemaType>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: post ? post.title : ""
        }
    })

    useEffect(() => {
        if (success) {
            reset()
            const timer = setTimeout(() => {
                setSuccess(undefined)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [success, reset])
    const onSubmit: SubmitHandler<PostSchemaType> = (data) => {
        setLoading(true)
        if (post) {
            editPost(post, data.title).then(data => {
                setError(data.error)
                setSuccess(data.success)
                if (data.success && handleCloseEditing) {
                    handleCloseEditing()
                }
            }).finally(() => setLoading(false))
        } else {
            createPost(data).then(data => {
                setError(data.error)
                setSuccess(data.success)

            }).finally(() => setLoading(false))
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col max-w-[500px] m-auto mt-8", post && "mt-0")}>
            <Header title={post ? "Edit Post" : "Create Post"} lg />
            <FormField id="title" placeholder="Title" register={register} errors={errors} disabled={loading} />
            {error && <span className="text-rose-400 text-sm">{error}</span>}
            {success && <span className="text-green-400 text-sm">{success}</span>}
            <Button
                label={loading ? "Submitting..." : "Submit"}
                disabled={loading}
                icon={loading ? undefined : BiArrowFromLeft} className="bg-slate-500" />
        </form>
    );
}

export default PostForm;