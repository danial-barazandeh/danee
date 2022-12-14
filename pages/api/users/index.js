import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {

    if (req.method === 'GET') {
        const { id } = req.query
        const user = await prisma.user.findFirst(
            {
                where: {
                    id: id
                }
            }
        )
        res.json(user);
    }
    const user = await prisma.user.findFirst(
        {
            where: {
                phone: req.body.phone
            }
        }
    )
    res.json(user);
}