import { PrismaClient } from '@prisma/client'
import axios from 'axios';

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'PUT') {

    const user = req.body.user;
    const data = req.body.data;

    const product = await prisma.product.findFirst({
      where: {
        id: data.id,
      },
    })

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        productId: data.id,
        priceAfterDiscount: data.salePrice ?? data.price,
        priceBeforeDiscount: data.price,
        status: "99",
      },
    });

    try {
      const result = await axios.post(`https://api.idpay.ir/v1.1/payment`, {
        amount: data.salePrice ? data.salePrice : data.price,
        name: user.firstName + " " + user.familyName,
        phone: user.phone,
        mail: user.email,
        desc: data.title,
        order_id: payment.id,
        callback: "http://localhost:3000/api/payment"
      }, { headers: { 'Content-Type': 'application/json', 'X-SANDBOX': 1, 'X-API-KEY': "6a7f99eb-7c20-4412-a972-6dfb7cd253a4" } }
      );
      res.json(result.data)
    } catch (error) {
      console.error(error);     // NOTE - use "error.response.data` (not "error")
    }

  }else if (req.method === "POST"){

    const payment = await prisma.payment.update({
      where:{
        id: parseInt(req.body.order_id)
      },
      data: {
        status: req.body.status,
        date: req.body.date,
        track_id: req.body.track_id,
        card_no: req.body.card_no,
        hashed_card_no: req.body.hashed_card_no,
        response_id: req.body.id+"",
      },
    });


    console.log(payment)
    res.json(payment)
  }
}