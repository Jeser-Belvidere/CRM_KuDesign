const db = require('../db/db')
const bcrypt = require('../middlewares/bcrypt')
//TODO: вывести в middleware обработку ошибок, проверки пользователя/проекта на существование
class UserController {
    async createUser(req, res) {
        if(req.body = {}) {return res.status(400).json({message: 'Empty body'})}
        const {email, password, mobile_phone} = req.body
        try {
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
        const {email} = req.body

        if(req.body = {}) {return res.status(400).json({message: 'Empty body'})}//Добавить в класс ошибок

        try {
            const isExist = await db('users').where('email', email).first()

            console.log(email)

            if(isExist) {
                const users = await db('users').select('*').where('email',email)
                return res.status(200).json({
                    users,
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
        if(req.body = {}) {return res.status(400).json({message: 'Empty body'})}
        const user = req.body;
        const {email} = user
        try{
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
        if(req.body = {}) {return res.status(400).json({message: 'Empty body'})}
        const {email} = req.body;
        try {
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
        if(req.body = {}) {return res.status(400).json({message: 'Empty body'})}
        const {email, password} = req.body;
        try{
            const isExist = await db('users').where('email', email).first()
            const {password: hashedPassword} = isExist

            if(!isExist) {{return res.status(400).json({message: 'Nothing to get'})}}

                const validation = await bcrypt.compareHash(password, hashedPassword)

                    if(validation) {
                        return res.status(200).json({
                            message:'bcrypt successed'
                            //Отдать токен
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
        if(req.body = {}) {return res.status(400).json({message: 'Empty body'})}
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