const db = require('../db/db')
const bcrypt = require('../middlewares/bcrypt')
const {validationResult} = require('express-validator')
const JWT = require('../middlewares/jwt')
//TODO: вывести в middleware обработку ошибок, проверки пользователя/проекта на существование
class UserController {
    async createUser(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message:'Auth error', errors})
            }
            const {email, password, mobile_phone} = req.body

            const isExist = await db('users').where('email', email).first()//добавить в класс аутентификации

            if(!isExist) {
                const hashedPassword = bcrypt.hashingPassword(password)
                const newUser = await db('users').insert({
                    email: email,
                    password: hashedPassword,
                    mobile_phone: mobile_phone
                })
                return res.status(201).json({message:'user created'})
            }
            return res.status(400).json({message: 'User exist'})

        } catch (e) {
            throw new Error(e)
        }
    }
    async getUser(req, res) {
        try {
            const {email} = req.body
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message:'Get user error', errors})
            }

            const isExist = await db('users').where('email', email).first()
            if(isExist) {
                const user = await db('users').select('*').where('email',email)
                return res.status(200).json({
                    user,
                    message: 'getted'
                })
            } else {
                return res.status(200).json({message: 'Nothing to get'})
            }

        } catch (e) {
            throw new Error(e)
        }
    }
    async updateUser(req, res) {
        try{
            const user = req.body;
            const {email} = user
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message:'Update user error', errors})
            }
            const isExist = await db('users').where('email', email).first()

            if(user.password) {user.password = bcrypt.hashingPassword(user.password)}

            if(isExist) {
                const changeUser = await db('users').where('email', email).update(user)
                return res.json({message:'updated'})
            } else {
                return res.json({message:'Email not existing to update'})
            }            
        } catch (e) {
            throw new Error(e)
        }
    }
    async deleteUser(req, res) {        
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message:'Auth error', errors})
            }
            const {email} = req.body;
            const deleteUser = await db('users').del().where('email',email)
            
            if(!deleteUser) {
                return res.status(400).json({message:'email not found to delete'})
            }

            return res.status(200).json({message:'email deleted'})
        } catch (e) {
            throw new Error(e)
        } 
    }  
    async loginUser(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message:'Auth error', errors})
            }
            const {email, password} = req.body
            const isExist = await db('users').where('email', email).first()
            const {password: hashedPassword, isadmin,user_id} = isExist

            if(!isExist) {{return res.status(400).json({message: 'Nothing to get'})}}

                const validation = await bcrypt.compareHash(password, hashedPassword)

                    if(validation) {
                        const token = JWT.generateAccessToken(user_id, isadmin)
                        return res.status(200).json({
                            message:'bcrypt successed',
                            token
                        })
                    } else {
                        res.status(400).json({message:'password incorrect'})
                    }

        } catch (e) {
            throw new Error(e)
        }
    }
    //TODO:Дописать токен в req
    async listOfUsers(req, res) {
        try{
            const list = await db('users').select('*')
            return res.status(200).json({
                list
            })
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = new UserController()