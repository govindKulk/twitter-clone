import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import { Post, User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET" && req.method !== "DELETE") {
        return res.status(405).end();
    }

    try {


        const { postId } = req.query;

        let post;

        if (!postId || typeof postId !== 'string') {
            throw new Error("Invalid post");
        }

        if(req.method === "GET"){
            post = await prisma.post.findUnique({
                where: {
                    id: postId
                },
                include: {
                    user: true,
                    comments: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
    
                }
            })
    
    
            

        }else if(req.method === "DELETE"){
            post = await prisma.post.delete({
                where: {
                    id: postId
                }
            })


        }




        return res.status(200).json(post);





    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}