const bcrypt = require('bcrypt')

class Bcrypt {
    hashingPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        return hash;
    }
    async compareHash(password, hashedPassword) {
        try {
            return await bcrypt.compareSync(password, hashedPassword)
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = new Bcrypt;