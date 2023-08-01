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
    let { data: posts = [], totalPosts, isLoading, mutate: mutatePosts } = usePosts(currentPage, 10);
    const hasPosts = useMemo(() => {
        return totalPosts !== currentPage * 10 || totalPosts < currentPage * 10
    }, [totalPosts, currentPage])

    console.log(hasPosts)

    useEffect(() => {
        setCurrentPage(1)
        mutatePosts();
    }, [allPosts])

   

    const fetchNext = useCallback(() => {
        
        if(!hasPosts){
            return null
        }else{
            setCurrentPage(prev => prev + 1)
        }
    },[currentPage])

    const fetchBack = useCallback(() => {
        
        if(!hasPosts){
            return null
        }else{
            setCurrentPage(prev => prev - 1)
        }
    },[currentPage])

    

    return (


        <div>
            <div className="flex my-8 px-4 py-2 w-full flex-row justify-between items-center">
            <Button disabled={currentPage === 1} onClick={fetchBack} label={isLoading?'Loading': "Previous"} secondary/>
            {hasPosts && <Button disabled={isLoading} onClick={fetchNext} label={isLoading?'Loading': "Next"} secondary={isLoading}/> }



            </div>
            {posts.map((post: Record<string, any>) =>
                <PostItem userId={userId} key={post.id} post={post} />
            )}
        </div>
    )
}

export default PostFeed




