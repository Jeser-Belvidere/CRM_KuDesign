require('dotenv').config()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWTSECRET
class JWT {
        generateAccessToken(user_id, isAdmin)  {
        const payload = {
            user_id,
            isAdmin
        }
        return jwt.sign(payload,secret,{expiresIn: '1h'})
    }
    verifyToken(token) {
        
    }
}
module.exports = new JWT;