import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import usePost from '@/hooks/usePost';
import { toast } from 'react-hot-toast';
import useCurrentUser from '@/hooks/useCurrentUser';

interface CommentItemProps {
    comment: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment = {} }) => {
    const router = useRouter();
    const {data: currentUser} = useCurrentUser()
    const { mutate: mutatePost } = usePost(comment.postId);

    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/users/${comment.user.id}`)
    }, [router, comment.user.id]);

    const onDelete = async (ev: any) => {

        ev.stopPropagation();
        let url = `/api/comment?commentId=${comment.id}`;
        await axios.delete(url)
        mutatePost();
        toast.success("comment delted");
    }
       


  const createdAt = useMemo(() => {
        if (!comment?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(comment.createdAt));
    }, [comment.createdAt])

    const isOwner = 1 ? currentUser.id === comment.userId : 0;

    return (
        <div
            className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={comment.user.id} />
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
                            {comment.user.name}
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
                            @{comment.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                        {isOwner && <span className='justify-end items-center' onClick={onDelete}>
                            <AiOutlineDelete color='white' size={20} />
                        </span>}
                    </div>
                    <div className="text-white mt-1 ">
                        {comment.body}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;
