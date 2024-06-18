const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const User = require("../modals/userModel");
const { generateTokenAndSetCookie } = require('../utils/generateToken')

// For Register user
const handleSignUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword, profilePic } = req.body;

    if (!name || !email || !password || !confirmPassword || !profilePic) {
      throw new Error("Please add all fields");
    }

    if( password !== confirmPassword ){
      throw new Error("Password don't match");
    }
   
    //   Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if(!hashedPassword){
      throw new Error("Something is wrong");
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password : hashedPassword,
      role : "USER",
      profilePic,
    });

    if(newUser){
      // Token generate and set cookie
      generateTokenAndSetCookie(newUser._id, res)
      const saveUser = await newUser.save();

      res.json({
        data : saveUser,
        success : true,
        error : false,
        message : "User created Successfully!"
      });
    }else {
      throw new Error("User don't create");
    } 
  } catch (err) { 
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
  })
  }   
});

// For Login user  
const handleSignIn = asyncHandler(async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    const isPasswordCorrect = await bcrypt.compare(password, user.password || "")

    if(!user || !isPasswordCorrect){
      throw new Error("Invalid email or password");
    }

    if(user && isPasswordCorrect){
      generateTokenAndSetCookie(user._id, res)

      res.json({
        message : "Login successfully",
        data : user,
        success : true,
        error : false
      });
   } else {
      throw new Error("Invalid user data");
    } 
  } catch (err) {
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
  })
  } 
});

// For Logout
const handleLogout = asyncHandler(async(req, res) =>{
  try {
    res.clearCookie("token")

    res.json({
      message : "Logged out successfully",
      error : false,
      success : true,
      data : [],
    })
    
  } catch (error) {
    res.json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
})

// For user details
const handleUserDetails = asyncHandler(async(req, res) =>{
  try {
     console.log("userId", req.user);  
     const user = await User.findById(req.user)

     res.status(200).json({
      data : user,
      error : false,
      success : true,
      message : "User details"
    })

  console.log("user",user)
    
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
})

const handleAllUser =asyncHandler(async(req, res) => {
  try {
    console.log("userId all user", req.user)

    const allUsers = await User.find()

    res.json({
      message : "All User",
      data : allUsers,
      success : true,
      error : false
    })
    
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }

})

// Inside the handleUpdateUser function
// const handleUpdateUser = asyncHandler(async (req, res) => {
//   try {
//     const { userId, name, email, role } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//         error: true
//       });
//     }

//     // Update all provided fields
//     user.name = name;
//     user.email = email;
//     user.role = role;

//     const updatedUser = await user.save();

//     console.log("updated user", updatedUser);

//     res.json({
//       data: updatedUser,
//       message: "User Updated",
//       success: true,
//       error: false
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// });


// const handleUpdateUser = asyncHandler(async(req, res) =>{
//   try {
//     const { userId, name, email, role } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//         error: true
//       });
//     }

//     // Update only if fields are provided
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (role) user.role = role;

//     const updatedUser = await user.save();

//     console.log("updated user", updatedUser)

//     res.json({
//       data: updatedUser,
//       message: "User Updated",
//       success: true,
//       error: false
//     });
    
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// });


const handleUpdateUser = asyncHandler(async(req, res) =>{
  try {
    const sessionUser = req.user;

    const { userId, name, email, role } = req.body;

    const payload = {
      ...( name && { name : name }),
      ...( email && { email : email }),
      ...( role && { role : role }),
    }

    const user = await User.findById(sessionUser)

    console.log("user role", user.role)

    const updateUser = await User.findByIdAndUpdate(userId, payload)

    res.json({
      data : updateUser,
      message : "User Updated",
      success : true,
      error : false
  })
    
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }

})


module.exports = {
  handleSignUp,
  handleSignIn,
  handleLogout,
  handleUserDetails,
  handleAllUser,
  handleUpdateUser,
};
