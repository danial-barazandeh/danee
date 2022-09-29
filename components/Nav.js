import Link from "next/link";
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import { util } from "../components/util";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Lottie from "lottie-react";
import loading from "../public/lottie/loading.json";
import { signIn } from "next-auth/react";
import axios from 'axios';

const Nav = () => {
  const router = useRouter();


  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [phone, setPhone] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showOtpInput, setShowOtpInput] = React.useState(false);



  const password = Math.floor(Math.random() * 9999).toString();



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkError = (value) => {

    var temp = "";
    if (value.startsWith("+98"))
      temp = value.replace("+98", "0")
    else if (value.startsWith("98"))
      temp = value.replace("98", "0")
    else if (value.startsWith("9"))
      temp = value.replace("9", "09")
    else
      temp = value

    if (temp.length != 11 && temp.length > 8)
      setError(true)
    else {
      setError(false)
      console.log(temp)
    }

    setPhone(temp)

  }



  const checkOtpError = (value) => {

    var temp = "";
    if (value.startsWith("+98"))
      temp = value.replace("+98", "0")
    else if (value.startsWith("98"))
      temp = value.replace("98", "0")
    else if (value.startsWith("9"))
      temp = value.replace("9", "09")
    else
      temp = value

    if (temp.length != 4)
      setError(true)
    else {
      setError(false)
      console.log(temp)
    }

    // setPhone(temp)

  }



  const sendSms = async () => {
    setIsLoading(true);

    var payamakResponse = await axios.post("https://rest.payamak-panel.com/api/SendSMS/SendSMS", {
      username: "09373924891",
      password: "7!BF3",
      to: phone,
      from: "50004001987654",
      text: "کد فعال سازی دانه:  " + password,
    });

    if (payamakResponse.ok === true) {
      setShowOtpInput(true);
    } else {
      setShowOtpInput(false);
    }

    setIsLoading(false);
  }

  const sign = async () => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      phone: phone,
      otp: "0000"
    })

    console.log(result)
    setIsLoading(false);
  }




  const theme = createTheme({
    palette: {
      primary: {
        main: '#00D5FF',
      },
      secondary: {
        main: '#25EFD2',
      },
    },
  });


  return (
    <nav className="bg-slate-100">
      <ul className="flex items-center py-4">
        <li className={router.pathname == "/" ? "text-tcolor mx-8 font-bold" : "text-tcolor-200 mx-8"}>
          <Link href={util.baseUrl}>خانه</Link>
        </li>
        <li className={router.pathname == "/about" ? "text-tcolor ml-8 font-bold" : "text-tcolor-200 ml-8"}>
          <Link href={util.baseUrl + "about"}>درباره ما</Link>
        </li>
        <li className={router.pathname == "/dashboard" ? "praymary-button-active cursor-pointer" : "praymary-button cursor-pointer"} onClick={handleClickOpen}>
          پنل کاربری
        </li>
      </ul>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> <p className=" text-tcolor">حساب کاربری</p> </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DialogTitle>
              <p className=" text-tcolor text-sm text-justify">
                با تایید شماره همراه خود میتوانید وارد وب سایت شوید. در صورت نداشتن حساب کاربری، یک حساب کاربری برای شما ایجاد خواهد شد.
              </p>
            </DialogTitle>
          </DialogContentText>
          <div className=" flex flex-col justify-center items-center m-6">
            <div className="w-[60%]">
              <ThemeProvider theme={theme}>


                {showOtpInput ?
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phon"
                    label="شماره تماس"
                    type="tel"
                    variant="standard"
                    dir="rtl"
                    fullWidth
                    color="primary"
                    error={error}
                    onChange={input => checkError(input.target.value)}
                    helperText="0911XXXXXXX"
                    FormHelperTextProps={{ style: { fontFamily: "IRANSans" } }}
                    inputProps={{ style: { fontFamily: "IRANSans", direction: "ltr" } }}
                    InputLabelProps={{ style: { fontFamily: "IRANSans" } }}
                  /> : <TextField
                    autoFocus
                    margin="dense"
                    id="phon"
                    label="کد ورودی"
                    type="text"
                    variant="standard"
                    dir="rtl"
                    fullWidth
                    color="primary"
                    error={error}
                    onChange={input => checkOtpError(input.target.value)}
                    helperText="X-X-X-X"
                    FormHelperTextProps={{ style: { fontFamily: "IRANSans" } }}
                    inputProps={{ style: { fontFamily: "IRANSans", direction: "ltr" } }}
                    InputLabelProps={{ style: { fontFamily: "IRANSans" } }} />
                }


              </ThemeProvider>

            </div>




          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-[100%] h-[20vh] flex justify-center items-center mb-6 gap-8">
            {
              isLoading ?
                <div className=" w-24"> <Lottie animationData={loading} loop={true} /> </div> :
                <Button onClick={sendSms} variant="contained" className=" bg-primary hover:bg-secondary w-24 rounded-lg">
                  <p> ثبت </p>
                </Button>
            }

            <Button onClick={() => setIsLoading(false)} variant="contained" className=" bg-primary hover:bg-secondary w-24 rounded-lg">
              <p> بازگشت </p>
            </Button>
          </div>
        </DialogActions>
      </Dialog>

    </nav>
  )
}

export default Nav