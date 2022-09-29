import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const page = req.query.page ?? 0;
    const limit = req.query.limit ?? 20;
    const total = await prisma.post.count();
    const posts = await prisma.post.findMany({
      take: parseInt(limit ?? 20),
      skip: parseInt(page ?? 20) * parseInt(limit ?? 20),
      include: {
        author: {
          include: {
            image: true
          }
        },
        image: true
      },
      orderBy: {
        id: 'asc',
      },
    })
    const totalPage = (total / parseInt(limit)).toFixed();
    const result = {
      total: total,
      data: posts,
      page: page,
      total_page: (total / parseInt(limit)).toFixed(),
      per_page: parseInt(limit ?? 20),
      next_page: parseInt(totalPage) > (parseInt(page) + 1) ? '/api/posts?limit=' + limit + '&&page=' + (parseInt(page) + 1) : null
    }
    res.json(result)
  } else if (req.method === "POST") {

    const image = await prisma.image.findFirst({
      where: {
        url: req.body.image,
      },
    })

    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        imageId: image.id,
        content: req.body.content,
        seoTitle: req.body.seoTitle,
        seoDiscription: req.body.seoDiscription,
        seoKeys: req.body.seoKeys,
        published: true,
        authorId: 1
      },
    });

    res.json(post)

  }
}