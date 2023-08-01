// component to show all the posts be it at home page (posts of all the users) or at a specific profile page

import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Button from "../Button";
import {usePostsContext} from "@/libs/PostContext";


interface PostFeedProps {
    userId?: string
}



const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {


    const [currentPage, setCurrentPage] = useState(1)
    const {allPosts, setAllPosts}= usePostsContext()
    let { data: posts = [], totalPosts, isLoading } = usePosts(currentPage, 10);
    const hasPosts = useMemo(() => {
        return totalPosts !== currentPage * 10 || totalPosts < currentPage * 10
    }, [totalPosts, currentPage])

    console.log(hasPosts)

    useEffect(() => {
        setAllPosts( prev => [...posts, ...prev] );
        console.log(allPosts)
      }, [posts, setAllPosts]);

   

    const fetchNext = useCallback(() => {
        
        if(!hasPosts){
            return null
        }else{
            setCurrentPage(prev => prev + 1)
        }
    },[currentPage])

    

    return (


        <div>
            {allPosts.map((post: Record<string, any>,) =>
                <PostItem userId={userId} key={post.id} post={post} />
            )}
            {hasPosts && <Button disabled={isLoading} onClick={fetchNext} label={isLoading?'Loading': "Load More"} secondary={isLoading}/> }
        </div>
    )
}

export default PostFeed




