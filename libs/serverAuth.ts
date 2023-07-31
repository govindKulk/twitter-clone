import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from '@/libs/prismadb';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req,res,authOptions)

    if(!session?.user?.email){
        throw new Error("Not Signed in")
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!currentUser){
        throw new Error("user doesn't exist")
    }

    return {currentUser}
}

export default serverAuth