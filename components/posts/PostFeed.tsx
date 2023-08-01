// component to show all the posts be it at home page (posts of all the users) or at a specific profile page

import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { useEffect, useState } from "react";


interface PostFeedProps {
    userId?: string
}



const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {

    const { data: posts = []} = usePosts();
   
    return (


        <div>
            {posts.map((post: Record<string, any>,) =>
                <PostItem userId={userId} key={post.id} post={post} />
            )}
        </div>
    )
}

export default PostFeed




