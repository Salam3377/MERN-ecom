import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req,res,next) => {
    //get token
    const token = getTokenFromHeader(req)
    //verify token
    const decodedUser = verifyToken(token)

    if(!decodedUser) {
        throw new Error('Invalid/Expired token, try login again')
    } else {
        //save user
        req.userAuthId = decodedUser?.id
        next()
    }

}