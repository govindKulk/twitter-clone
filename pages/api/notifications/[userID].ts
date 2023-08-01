import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {


        const { userId } = req.query;

        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid post");
        }

        const notificaitons = await prisma.notification.findMany({
            where: {
                id: userId
            },
            orderBy:{
                createdAt: "desc"
            }
        })


        //update when the user opens notifications section.
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false,
            }
        })


        return res.status(200).json(notificaitons);




    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}