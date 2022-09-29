import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import util from "../../../components/util"

export default async function handle(req, res) {
    if (req.method === 'GET') {
    } else if (req.method === "POST") {

        
        const password = req.password





        if (payamakResponse.ok === true) {
            const user = await prisma.user.findFirst(
                {
                    where: {
                        phone: req.phone
                    }
                }
            )
            if (user) {
                return user;
            } else {
                const response = {
                    ok: false,
                    detail : "user is not existing"
                }
                return response;
            }
        } else {
            const response = {
                ok: false,
                detail : payamakResponse.error
            }
            return response;
        }

    }
}