import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.query
        const user = await prisma.user.update(
            {
                where:{
                id: parseInt(id)
                },
                data: {
                    firstName: req.body.firstName,
                    familyName: req.body.familyName,
                    email: req.body.email,
                }
            }
        )
        const result = {
            user : user,
            status : true
        }
        
        res.json(result);

    } else {
        const { id } = req.query
        const user = await prisma.user.findFirst(
            {
                where: {
                    id: parseInt(id)
                }
            }
        )
        res.json(user);
    }

}