import { getPosts } from "@/actions/postServerActions";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const ListPosts = async () => {
    const posts = await getPosts()

    if (posts.success) {
        return (<div>
            {
                posts.success.map(post => {
                    return <div key={post.id} className="my-2 flex justify-between items-center border-b p-2 w-full gap-3">
                        <span>{post.title}</span>
                        <div className="flex gap-2 item-center">
                            <EditPost post={post} />
                            <DeletePost post={post} />
                        </div>
                    </div>
                })
            }
        </div>)
    }

}

export default ListPosts;