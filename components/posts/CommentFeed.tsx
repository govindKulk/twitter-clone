// component to show all the posts be it at home page (posts of all the users) or at a specific profile page

import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import CommentItem from "./CommetItem";



interface CommentFeedProps {
    comments: Record<string, any>[]
}



const CommentFeed: React.FC<CommentFeedProps> = ({ comments = []}) => {

    return (


        <div>
            {comments.map((comment: Record<string, any>,) =>
                <CommentItem key={comment.id} comment={comment} />
            )}
        </div>
    )
}

export default CommentFeed




