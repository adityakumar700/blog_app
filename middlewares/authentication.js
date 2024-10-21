const { validToken } = require("../services/authentication")

function checkauthcookie(cookieName){
    return (req,res,next)=>{
        const tokencookievalue=req.cookies[cookieName]
        if(!tokencookievalue){
          return  next()
        }
        try{
        const userPayload=validToken(tokencookievalue)
        req.user=userPayload
        
        }
        catch(error)
        {
           
        }
      return  next()

    }

}
module.exports={
    checkauthcookie,
}