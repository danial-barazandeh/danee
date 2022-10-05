import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import util from "../../../components/util"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default NextAuth({
    session: {
        jwt: true,
    },
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.idToken = token.idToken
            session.user.id = token.id;
            session.user.email = token.email
            session.user.phone = token.phone;
            session.user.familyName = token.familyName;
            session.user.firstName = token.firstName;
            return session 
        },
        async jwt({ token , user }) {
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
                token.firstName = user.firstName;
                token.familyName = user.familyName;
                token.email = user.email;
              }
            return token
        }
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({ 
            name: "Credentials",
            async authorize(credentials) {

                console.log("Akhe chera");
                console.log("Akhe chera: " + credentials.password);
                console.log("Akhe chera: " + credentials.phone);

                const user = await prisma.user.findFirst(
                    {
                        where: {
                            phone: credentials.phone
                        }
                    }
                )

                const fiveMinuteAgo = new Date(Date.now() - 5000 * 60);

                const otp = await prisma.otp.findFirst(
                    {
                        where: {
                            password: credentials.password,
                            updatedAt: {
                                gte: fiveMinuteAgo,
                            },
                        }
                    }
                )


                if (user && otp) {
                    return {phone: user.phone, id: user.id, firstName: user.firstName, familyName: user.familyName, email: user.email};
                } else if (otp) {
                    const newUser = await prisma.user.create(
                        {
                            data: {
                                phone: credentials.phone
                            }
                        }
                    )
                    return { phone: newUser.phone }
                } else {
                    return null
                }
            }
        })
    ],
})