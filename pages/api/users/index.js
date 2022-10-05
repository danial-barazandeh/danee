import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    console.log("WWWWWWWWW")
    const user = await prisma.user.findFirst(
        {
            where: {
                phone: req.body.phone
            }
        }
    )
    res.json(user);
}