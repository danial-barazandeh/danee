import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const sections = await prisma.section.findMany({
      include: {
        lectures: true,
        product: true,
      }
    })
    res.json(sections)
  }else if (req.method === "POST"){
    const section = await prisma.section.create({
      data: {
        productId: req.body.productId,
        title: req.body.title,
      },
    });
    res.json(section)
  }
}