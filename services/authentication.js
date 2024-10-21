const JWT=require("jsonwebtoken")
const secret="$uperMan@12"
function createToken(user){
    const payload={
        _id:user.id,
        email:user.email,
        profileImageURL:user.profileImageUrl,
        role:user.role,
    }
    const token=JWT.sign(payload,secret)
    return token

}
function validToken(token){
    const payload=JWT.verify(token,secret)
    return payload
}
module.exports={
    createToken,validToken,
}