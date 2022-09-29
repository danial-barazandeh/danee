import { PrismaClient } from '@prisma/client'
import { Query } from 'pg'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.query
        const sections = await prisma.section.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: req.body.title,
                productId: req.body.productId
            },
        })
        res.json(sections)
    }

}