const bcrypt = require('bcryptjs')

const hashPassword = async (passwordd) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(passwordd, salt)
    return password
}

module.exports = {
    hashPassword
}

