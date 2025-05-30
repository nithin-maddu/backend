const jwt = require("jsonwebtoken");
const JWT_SECRET = "mytokken"
function authMiddleware(req,res,next){
const authHeader = req.headers.authorization;
if(!authHeader) return res.send('missing token ')

    const token = authHeader.split(' ')[1];
try{

    const decode = jwt.verify(token,JWT_SECRET)
    req.userId = decode.id;
    next()
}catch(err){
res.send(err)
}

}

module.exports = authMiddleware