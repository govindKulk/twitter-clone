import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useCallback, useMemo } from 'react'
import Avatar from '../Avatar';
import { AiFillDelete, AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns'
import useLike from '@/hooks/useLike';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import usePost from '@/hooks/usePost';
import usePosts from '@/hooks/usePosts';
import { usePostsContext } from '@/libs/PostContext';


interface PostItemProps {
  post: Record<string, any>;
  userId?: string;
  triggerDelete?: () => void
}
const PostItem: React.FC<PostItemProps> = ({
  post,
  userId,
  triggerDelete
}) => {

  const { data: currentUser } = useCurrentUser()
  const router = useRouter();
  const loginModal = useLoginModal();
  const { toggleLike, hasLiked } = useLike({ postId: post?.id, userId })
  const {mutate: mutatePosts } = usePosts(undefined, undefined, undefined);

  const goToPost = useCallback(() => {
    router.push(`/posts/${post?.id}`);
  }, [router, post?.id])

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();
    router.push(`/users/${post?.user.id}`);
  }, [router, post?.user.id])

  const onLike = useCallback((event: any) => {
    event?.stopPropagation();
    if (!currentUser) {
      loginModal.onOpen();
    }
    toggleLike();


  }, [loginModal, currentUser, toggleLike])

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post?.createdAt));
  }, [post?.createdAt])

  const onDelete = async (ev: any) => {

    if(!currentUser) {
      return
    }
    ev.stopPropagation();
    let url = `/api/posts/${post.id}`;
    await axios.delete(url)

    if(triggerDelete){
      triggerDelete();
    }
    toast.success("comment delted");
  }

  const isOwner = currentUser?.id === post?.userId ? 1 : 0;

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
        <Avatar userId={post?.user.id} />
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
              {post?.user.name}
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
              @{post?.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
           { isOwner && <span className='self-end' onClick={onDelete}>
                <AiFillDelete size={20} color='white' />
            </span> }
          </div>
          <div className="text-white mt-1">
            {post?.body}
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
                {post?.comments?.length || 0}
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
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>
                {post?.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
