import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handle(req, res) {

  if (req.method === 'GET') {
    const { id } = req.query
    const posts = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: {
          include: {
            image: true
          }
        },
        image: true
      }
    })
    res.json(posts)
  } else if (req.method === 'PUT') {
    const { id } = req.query
    const { title, content, seoKeys, seoDiscription } = req.body

    const image = await prisma.image.findFirst({
      where: {
        url: req.body.image,
      },
    })

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        content: content,
        title: title,
        seoKeys: seoKeys,
        seoDiscription: seoDiscription,
        imageId: image.id,
      },
    })

    const response = {
      status: true,
      post: updatedPost,
    }

    res.json(response)
  } else if (req.method === 'PATCH') {

    const { id } = req.query
    const { published } = req.body

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: published,
      },
    })

    const response = {
      status: true,
      post: updatedPost,
    }

    res.json(response)
  }




}