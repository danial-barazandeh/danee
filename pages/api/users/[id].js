import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {

        const { id } = req.query
        const user = await prisma.user.findFirst(
            {
                where: {
                    id: parseInt(id)
                }
            }
        )
        res.json(user);
  
}