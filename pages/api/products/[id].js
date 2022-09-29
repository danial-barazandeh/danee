import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
        image: true,
        sections: {
          include: {
            lectures: true,
          }
        },
      }
    })
    res.json(product)
  }if (req.method === 'POST') {

    res.json(req.body)
    const { id } = req.query
    const { title, content, seoKeys, seoDiscription, time ,introUrl, price, salePrice } = req.body

    const image = await prisma.image.findFirst({
      where: {
        url: req.body.image,
      },
    })

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        content: content,
        title: title,
        time: time,
        introUrl: introUrl,
        price:price,
        salePrice:salePrice,
        seoKeys: seoKeys,
        seoDiscription: seoDiscription,
        imageId: image.id,
      },
    })

    const response = {
      status: true,
      product: updatedProduct,
    }

    res.json(response)
  }
}