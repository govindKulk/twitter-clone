import Form from '@/components/Form';
import Header from '@/components/Header';
import CommentFeed from '@/components/posts/CommentFeed';
import PostItem from '@/components/posts/PostItem';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePost from '@/hooks/usePost';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const PostView = () => {


    const router = useRouter();

    const { postId } = router.query;
    const { data: fetchedPost, isLoading } = usePost(postId as string);
    

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-full'><ClipLoader color='lightblue' size={80} /></div>)
    }
    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem post={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
            <CommentFeed comments = {fetchedPost?.comments} />

        </>
    )
}

export default PostView
