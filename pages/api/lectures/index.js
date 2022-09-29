import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const lectures = await prisma.lecture.findMany({
      include: {
        section: {
          include: {
            product: true
          }
        }
      }
    })
    res.json(lectures)
  } else if (req.method === 'POST') {
    const section = await prisma.section.findFirst({
      where: {
        id: req.body.sectionId,
      },
    })

    const lecture = await prisma.lecture.create({
      data: {
        title: req.body.title,
        url: req.body.video,
        content: req.body.content,
        sectionId: section.id,
      },
    });

    res.json(lecture)
  }
}