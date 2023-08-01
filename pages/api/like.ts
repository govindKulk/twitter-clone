import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST" && req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {

        const { currentUser } = await serverAuth(req, res);
        const { postId } = req.body;

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid Post Id");
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        })

        if(!post){
            throw new Error("Invalid Post Id");
        }

        let updatedLikedIds = [...(post.likedIds || [])]
        

        if (req.method === "POST") {
                updatedLikedIds.push(currentUser.id);
        }
        if(req.method === "DELETE"){
                updatedLikedIds = updatedLikedIds.filter((likedId) => {
                return likedId != currentUser.id;
            })
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        return res.status(200).json(updatedPost)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }


}