const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../modals/userModel')

const authToken = asyncHandler(async (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const token = req.cookies?.token;

        console.log("Token :",token)

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
            console.log("Error authenticating token:", err);
                return res.status(401).json({
                    message: "Unauthorized",
                    error: true,
                    success: false
            });		
        }
            
        const user = await User.findById(decoded.userId).select("-password");
            
        if (!user){
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });		
        }
            
        req.user = user;
            
        next();

    } catch (err) {
        console.error("Error in authToken middleware:", err);
        res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
});

exports.authToken = authToken;


// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')

// const authToken = asyncHandler(async(req,res,next) => {
    
//     try{
//         const token = req.cookies.token ;

//         console.log("Token :",token)
//         if(!token){
//             return res.status(401).json({
//                 message : "Please Login...!",
//                 error : true,
//                 success : false
//             })
//         }

//         jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//             console.log(err)
//             console.log("decoded",decoded)
            
//             if(err){
//                 console.log("error auth", err)
//             }

//             req.userId = decoded._id

//             next()
//         });


//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             data : [],
//             error : true,
//             success : false
//         })
//     }
// })

// exports.authToken = authToken;