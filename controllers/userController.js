import User from '../model/User.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js'
import { verifyToken } from '../utils/verifyToken.js'



//register user
export const registerUserController = expressAsyncHandler(
    async(req,res) => {
        const {fullname, email, password} = req.body
    
        const userExists = await User.findOne({ email })
        if(userExists) {
            throw new Error('User already exists')
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        //create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        })
        res.status(201).json({
            status: 'success',
            message: 'User Registered Successfully',
            data: user,
        })
    }
)

//login user
export const loginUserController = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body
        const userFound = await User.findOne({
            email,
        })
        if(userFound && await bcrypt.compare(password, userFound?.password)) {
            return res.json({
                status: 'Success',
                message: 'Login success',
                userFound,
                token: generateToken(userFound?._id)
            })
        } else {
            throw new Error('Invalid login credentials')
        }
        
    }
)

export const getUserProfileController = expressAsyncHandler(async(req,res)=> {
    const token = getTokenFromHeader(req)
    const verified = verifyToken(token)
    res.json({
        msg: 'Profile page'
    })
})