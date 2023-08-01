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
    let { data: posts = [], totalPosts, isLoading, mutate: mutatePosts } = usePosts(currentPage, 10, userId);
    const hasPosts = useMemo(() => {
        return totalPosts >= currentPage * 10
    }, [totalPosts, currentPage])

    console.log("toalpost: " + totalPosts);
    console.log("hasPost" + hasPosts)

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
    },[currentPage, hasPosts])

    const totalPages = Math.ceil(totalPosts/10);
   const fetchBack = useCallback(() => {
        
        if(!hasPosts){
            return null
        }else{
            setCurrentPage(prev => prev - 1)
        }
    },[currentPage, hasPosts])

    const triggerDelete = () => {
        mutatePosts();
    }    

    return (


        <div>
            <div className="flex my-8 px-4 py-2 w-full flex-row justify-between items-center">
                <div className="flex justify-between items-center w-full">

            <Button disabled={currentPage === 1} onClick={fetchBack} label={isLoading?'Loading': "Previous"} secondary/>
            <span className="text-slate-700 text-sm">Page {currentPage} of {totalPages}</span>
            {<Button disabled={!hasPosts} onClick={fetchNext} label={isLoading?'Loading': "Next"} secondary={isLoading}/> }
                </div>



            </div>
            {posts.map((post: Record<string, any>) =>
                <PostItem userId={userId} key={post.id} post={post} triggerDelete={triggerDelete} />
            )}
        </div>
    )
}

export default PostFeed




