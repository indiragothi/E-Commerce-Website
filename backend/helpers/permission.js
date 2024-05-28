const User = require("../modals/userModel")

const uploadProductPermission = async(userId) =>{
    const user = await User.findById(userId)

    if(user.role === 'ADMIN'){
        return true;
    }
    return false
}

module.exports = uploadProductPermission