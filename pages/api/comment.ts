import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== "DELETE") {
        return res.status(405).end();
    }

    try {

        const { currentUser } = await serverAuth(req, res);

        if(req.method === "POST"){
           
            const { body } = req.body;
            const {postId} = req.query;

            if (!postId || typeof postId !== 'string') {
                throw new Error('Invalid ID');
            }

            const comment = await prisma.comment.create({
                data:{
                    body,
                    userId: currentUser.id,
                    postId: postId as string
                }
            })

            return res.status(200).json(comment);
      
        }else if(req.method === "DELETE"){
            const {commentId} = req.query;
            console.log(commentId)
            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId as string,
                }
            })
            if(!comment){
                throw new Error("comment not found")
            }
            
            if(comment.userId !== currentUser.id){
                return res.status(401).json({message: "you are not authorized to delete this comment"})
            }
           
            
            await prisma.comment.delete({
                                    where: {
                                        id: commentId as string,
                                    }
                                })
            
            return res.status(200).json({message: "comment deleted"})
           
           
        }
        

        



    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}