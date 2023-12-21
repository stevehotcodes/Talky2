import { Request, RequestHandler, Response } from "express";
// import { registerUserSchema } from "../validators/validators";
// import Connection from "../dbhelpers/dbhelpers";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import mssql from "mssql";
import { dbConfig } from "../config/dbConfig";
import jwt from "jsonwebtoken";
import { registerUserSchema } from "../validators/registrationSchema";
import DatabaseHelper from "../helpers/dbConnection.helper";
// import { IUserDetails, User } from "../interfaces/userInterface";
import { ExtendedUser } from "../middlewares/verifyToken"
import { IUserDetails, IresetPasswordData, User } from "../interfaces/user.interfaces";
import securePassword from 'secure-random-password'
import ejs from 'ejs'
import NodeMail from "../helpers/nodeMailer.helper";
import path from "path";

// const dbInstance = DatabaseHelper.getInstance()


export const signUp = async (req: Request, res: Response) => {
  try {
    let { userName, fullName, email, password } = req.body;

    // let { error } = registerUserSchema.validate(req.body);

    // if (error) {
    //   return res.status(404).json({ error: error.details });
    // }
    // const emailTaken = (
    //   await DatabaseHelper.query(`SELECT * FROM users where email = '${email}'`)
    // ).recordset;

    // if (!isEmpty(emailTaken)) {
    //   return res.json({ error: "There is an existing account with that email kindly try to login" });
    // }

    let id = v4();
    const hashedPwd = await bcrypt.hash(password, 5);

    let result = await DatabaseHelper.exec("signUpuser", {
      id,
      fullName,
      userName,
      email,
      password: hashedPwd,
    });
    console.log(result);
    if ((await result).rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Something went wrong, user not registered"
      })
    } else {
      return res.status(201).json({
        message: "Acccount created  successfully"
      })
    }


  } catch (error:any) {
    return res.status(500).json({error:error})
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {

    let { email, password } = req.body;

    let user = (await DatabaseHelper.exec('getUserbyEmail', { email, password }))
    console.log(user)

    // if (!user.recordset.length) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }

    const { password: storedPassword, ...rest } = user.recordset[0];
    console.log(rest)

    const correctPwd = await bcrypt.compare(password, storedPassword);
    console.log("this the value of the compared password", correctPwd)
    if (!correctPwd) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(rest, process.env.SECRET_KEY as string, {
      expiresIn: "34000s",
    });
    console.log(token);

    return res.status(200).json({ message: "LogIn successful", token, email, role: rest.role,id:rest.id });

  } catch (error:any) {
    return res.status(500).json({error:error.message})
  }
}

export const getAUserById = async (req: ExtendedUser, res: Response) => {
  try {
    const { id } = req.params
    let user: IUserDetails= (await DatabaseHelper.exec('getAUserById', { id })).recordset[0]
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })

  }
}

export const getSignedInUser = async (req: ExtendedUser, res: Response) => {
  try {
    const id = req!.info?.id! as string
    console.log(req!.info?.id)
    let user: IUserDetails = (await DatabaseHelper.exec('getAUserById', { id })).recordset[0]
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    console.log(user)
    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })

  }
}

//gets all users but not the signed user
export const getAllUsers = async (req: ExtendedUser, res: Response) => {
  try {
    const userIdToDelete = req.info?.id;
    let users: IUserDetails[] = (await DatabaseHelper.exec('getAllUsers')).recordset
    console.log(users);
    if (!users.length) {
      return res.status(404).json({ message: "no users found" })
    }

    users = users.filter(user => user.id !== userIdToDelete);
    console.log("users without the log in user", users)


    return res.status(200).json(users)

  }
  catch (error: any) {
    return res.status(500).json({ error: error.message })

  }
}


export const updateUser = async (req: ExtendedUser, res: Response) => {
  try {
    let id = req.info?.id! as string
    let { userName, email, bio, profileImageUrl,password } = req.body
    // if (!userName ||!profileImageUrl || !bio) {
    //   return res.status(400).json({ message: 'required values are missing kindly check again' })
    // }
    let user: User = await (await DatabaseHelper.exec('getAUserById', { id })).recordset[0]
    if (!user) {
      return res.status(404).json({ message: 'The user does not exist' });

    }

    await DatabaseHelper.exec('updateUser', { id:id, userName:userName, email:email, bio:bio, profileImageUrl:profileImageUrl,password:password })
    return res.status(200).json({ message: "the user's details was updated successfully " })

  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {

    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'provide an email in the body' })
    }

    //get user by email

    const user: IUserDetails =  await (await DatabaseHelper.query(`SELECT * FROM users where email = '${email}'`)).recordset[0]
    console.log(user)

    if (user) {
      const newPassword = securePassword.randomPassword({
        length: 12,
        characters: [
          securePassword.upper,
          securePassword.lower,
          securePassword.symbols,
          securePassword.digits
        ]
      })
      const token = jwt.sign({ id: user.id, password: newPassword }, process.env.SECRET_KEY as string, { expiresIn: '70000s' })
      //save the token to the database

      await DatabaseHelper.query(`UPDATE users SET resetToken = '${newPassword}' WHERE email = '${email}'`);
      const user2: IUserDetails =  await (await DatabaseHelper.query(`SELECT * FROM users where email = '${email}'`)).recordset[0]
      console.log(user2)
      const resetLink = `http://localhost:4200/appreset/${token}`;

      await ejs.renderFile('templates/reset-password-template.ejs', { firstName: user.fullName, newPassword, resetLink }, async (err, emailHTML) => {
        if (err) {
          console.error(err)
          return false
        }

        const mailerInstance = NodeMail.getInstance()

        await mailerInstance.send(user.email, 'Password Reset Link', emailHTML)

        console.log('email request for password reset has been sen with ejs')
        return true


      })

      // const mailerInstance = NodeMail.getInstance()
      // await mailerInstance.send(user.email,"Password Reset",resetLink);
      // console.log('email request for password reset has been sent')
      // return true

    }
    return res.status(200).json({ message: `If a user exists with email: <${email}> a reset link will be sent to the email provided. Check spam folder in case you don't see any email.` })



  } catch (error: any) {

    return res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req: Request, res: Response) => {

  try {
       
    const { newPassword,resetToken } = req.body;
    console.log(resetToken)

 
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid token.' })
    }

 
    const hashedpassword = await bcrypt.hash(newPassword, 10)


    const result = await DatabaseHelper.query(`SELECT * FROM users WHERE resetToken = '${resetToken}'`)
   

   
    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    await DatabaseHelper.query(`UPDATE users SET password = '${hashedpassword}', resetToken = NULL, resetTokenExpiry = NULL WHERE resetToken = '${resetToken}'`);
   
 
    return res.status(201).json({ message: 'Password reset successful.' })

  } catch (error: any) {
    return res.status(500).json({ message: error })
  }

}
