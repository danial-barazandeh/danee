import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import util from "../../../components/util"

export default NextAuth({
    session: {
        jwt: true
    },
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {

                const otp = Math.floor(Math.random() * 9999).toString();

                console.log("api is sent")

                var otpResponse = axios.post(util + "/api/otp", {
                    phone: credentials.phone,
                    otp: otp
                });

                console.log(otpResponse)

                if (otpResponse) {
                    return otpResponse
                } else {
                    return null
                }
            }
        })
    ],
})