import jwt from 'jsonwebtoken';


export default function verifyToken(req,res,next){
const authHeader =req.headers.authorization;
const [scheme ,token]=authHeader?.split(" ")??[];
if(scheme!=="Bearer"||!token){
    return res.status(401).json({error:"No token provided"});
}
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
}catch(err){
    return res.status(401).json({error:"Invalid or expired token"});
}

}