import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config({});


  const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    requireTLS:true,
    auth: {
        user: process.env.EMAIL as string ||'stevehotcodes@gmail.com ',
        pass: process.env.EMAIL_PASSWORD as string ||'ixbglakqaaaeuwqz',
    }
  }

  export default config