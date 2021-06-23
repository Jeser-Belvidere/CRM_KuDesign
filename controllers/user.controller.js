const db = require('../db/db')

//TODO: вывести в middleware обработку ошибок, проверки пользователя/проекта на существование

class UserController {
    async createUser(req, res) {
        const {email, password, mobile_phone} = req.body;
        try {
            const isExist = await db('users').where('email', email).first()

            if(!isExist) {
                const newUser = await db('users').insert({
                    email: email,
                    password: password,
                    mobile_phone: mobile_phone
                })
                return res.status(201).json({message:'user created'})
            }
            return res.status(400).json({message: 'exist'})

        } catch (e) {
            throw new Error(e)
        }
    }
    async getUser(req, res) {
        const {email} = req.body
        try {
            const getUser = await db('users').select(email).from('email')
            console.log(getUser)
            res.status(200).json({message: 'getted'})
        } catch (e) {
            throw new Error(e)
        }
    }
    async updateUser(req, res) {
        const {email, password, mobile_phone, first_name, last_name, isadmin, activity} = req.body;
        try{
            console.log(email, password, mobile_phone, first_name, last_name, isadmin, activity)

            const changeUser = await db('users').where('email', email).update({
                email: email,
                password: password,
                mobile_phone: mobile_phone,
                first_name: first_name,
                last_name: last_name,
                activity: activity
            }) 

            res.json({message:'updated'})
        } catch (e) {
            throw new Error(e)
        }
    }
    async deleteUser(req, res) {
        const {email} = req.body;
        try {
            const deleteUser = await db('users').del().where('email',email)
            
            if(!deleteUser) {
                res.status(400).json({message:'email not found to delete'})
            }

            res.status(200).json({message:'email deleted'})
        } catch (e) {
            throw new Error(e)
        } 
    }  
    async loginUser(req, res) {
        
    }
}

module.exports = new UserController()