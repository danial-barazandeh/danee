import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.query

        const lecture = await prisma.lecture.update({
            where: {
                id: parseInt(id),
            },
            data: {
                url: req.body.video,
                title: req.body.title,
                content: req.body.content,
                sectionId: req.body.sectionId,
            }
        })
        res.json(lecture)
    } else if (req.method === "DELETE") {
        const { id } = req.query
        const deleteUser = await prisma.lecture.delete({
            where: {
                id: parseInt(id),
            },
        })
        res.json(deleteUser)
    }
}