import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'POST') {

    const product = await prisma.product.findFirst({
      where: {
        id: req.body.productId,
      },
    })

    const payment = await prisma.payment.create({
      data: {
        userId: req.body.userId,
        productId: req.body.productId,
        priceAfterDiscount: product.salePrice ?? product.price,
        priceBeforeDiscount: product.price,
        status:"99",
      },
    });

    res.json(payment)
  }
}