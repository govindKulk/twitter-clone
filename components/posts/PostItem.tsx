import useCurrentUser from '@/hooks/useCurrentUser';
import React, {useCallback, useMemo} from 'react'
import Avatar from '../Avatar';
import { AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useLoginModal from '@/hooks/useLoginModal';
import {formatDistanceToNowStrict} from 'date-fns'


interface PostItemProps {
    post: Record<string, any>;
    userId?: string;
}
const PostItem: React.FC<PostItemProps> = ({
    post,
    userId
}) => {

    const {data: currentUser} = useCurrentUser()
    const router = useRouter();
    const loginModal = useLoginModal();

    const goToPost = useCallback(()=>{
        router.push(`/posts/${post.id}`);
    }, [router, post.id])

    const goToUser = useCallback((event: any)=>{
        event.stopPropagation();
        router.push(`/users/${post.user.id}`);
    }, [router, post.user.id])

    const onLike = useCallback((event: any) => {
        event?.stopPropagation();
        return loginModal.onOpen();

    }, [loginModal])

    const createdAt = useMemo(() => {
        if (!post?.createdAt) {
          return null;
        }
    
        return formatDistanceToNowStrict(new Date(post.createdAt));
      }, [post.createdAt])
    
    return (
        <div 
        onClick={goToPost}
        className="
          border-b-[1px] 
          border-neutral-800 
          p-5 
          cursor-pointer 
          hover:bg-neutral-900 
          transition
        ">
        <div className="flex flex-row items-start gap-3">
          <Avatar userId={post.user.id} />
          <div>
            <div className="flex flex-row items-center gap-2">
              <p 
                onClick={goToUser} 
                className="
                  text-white 
                  font-semibold 
                  cursor-pointer 
                  hover:underline
              ">
                {post.user.name}
              </p>
              <span 
                onClick={goToUser} 
                className="
                  text-neutral-500
                  cursor-pointer
                  hover:underline
                  hidden
                  md:block
              ">
                @{post.user.username}
              </span>
              <span className="text-neutral-500 text-sm">
                {createdAt}
              </span>
            </div>
            <div className="text-white mt-1">
              {post.body}
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div 
                className="
                  flex 
                  flex-row 
                  items-center 
                  text-neutral-500 
                  gap-2 
                  cursor-pointer 
                  transition 
                  hover:text-sky-500
              ">
                <AiOutlineMessage size={20} />
                <p>
                  {post.comments?.length || 0}
                </p>
              </div>
              <div
                onClick={onLike}
                className="
                  flex 
                  flex-row 
                  items-center 
                  text-neutral-500 
                  gap-2 
                  cursor-pointer 
                  transition 
                  hover:text-red-500
              ">
               <AiFillHeart size={20} />
                <p>
                  {post.likedIds.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PostItem
