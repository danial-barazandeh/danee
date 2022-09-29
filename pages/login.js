import React from 'react'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import { signIn } from "next-auth/react"
import { Button, TextField } from '@mui/material'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3e2723',
    },
  },
});

// const result = await signIn('credential',
//   {
//     redirect: false,
//     phone: "09373924891",
//     otp: "1234"
//   })

export default function Login() {

  return (
    <div className='flex justify-center items-center h-[90vh] w-full'>
      <div className='flex justify-center items-center bg-white rounded-lg shadow-lg overflow-hidden  px-20 py-10'>

        <TextField label="شماره همراه" variant="standard"
          inputProps={{ style: { fontFamily: "IRANSans" } }}
          InputLabelProps={{ style: { fontFamily: "IRANSans" } }} 
          dir='ltr'
          color='primary'
          theme={theme}
          />


      </div>
    </div>
  )
}

{/* <Button variant="text" color="primary" onClick={() => {
  const result = signIn('credentials', {
    redirect: false,
    phone: "09373924891",
    otp: "0000"
  })
  console.log(result)
}}>
</Button> */}


Login.getLayout = function getLayout(page) {
  return (
    <>
      <Layout>
        <Nav></Nav>
        {page}
      </Layout>
      <Footer></Footer>
    </>
  )
}