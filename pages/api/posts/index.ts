import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body } = req.body;

            const post = await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                },
                include: {
                    user: true,
                    comments: true
                }
            });
            console.log("Govind ", post);
            return res.status(200).json({ post });
        }
        else if (req.method === "GET") {
            const { userId, page, perPage } = req.query;
            const currentPage = parseInt(page as string, 10) || 1
            const postsPerPage = parseInt(perPage as string, 10) || 10
            let totalPosts;
            let posts;
            if (userId && typeof userId === 'string') {

                if (!currentPage || !perPage) {
                    posts = await prisma.post.findMany({
                        where: {
                            userId: userId
                        },
                        include: {
                            user: true,
                            comments: true
                        },
                        take: 10
                    })
                }
                posts = await prisma.post.findMany({

                    where: {
                        userId
                    },
                    include: {
                        user: true,
                        comments: true,


                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    skip: (currentPage - 1) * postsPerPage,
                    take: postsPerPage

                })

                totalPosts = await prisma.post.count({
                    where: {
                        userId
                    }
                })
            } else {

                if (!currentPage || !perPage) {
                    posts = await prisma.post.findMany({
                        include: {
                            user: true,
                            comments: true
                        },
                        take: 10
                    })
                }

                posts = await prisma.post.findMany({
                    include: {
                        user: true,
                        comments: true,

                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    skip: (currentPage - 1) * postsPerPage,
                    take: postsPerPage
                })
                totalPosts = await prisma.post.count({})
            }
            
            return res.status(200).json({ posts, totalPosts });
        }
       




    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}