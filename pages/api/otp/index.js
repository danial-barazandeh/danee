import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    if (req.method === 'GET') {
        console.log("otp get api is called");

    } else {
        const password = Math.floor(Math.random() * 9999).toString();
        const otp = await prisma.otp.create({
            data: {
                password: password,
                phone: req.body.phone
            }
        })
        res.json(otp);
    }
}