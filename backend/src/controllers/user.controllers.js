import asyncHandler from "../utils/asyncHandler.js";
import { APIError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js";
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found!");
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new APIError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message:"vivekbackend"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already exists
    // check for images, check for avatar
    // upload them to clodinary , avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { fullname, email, username, password } = req.body
    console.log("email: ", email);

    // if(fullname === ""){
    //     throw new APIError(400 , "fullname is required")
    // }

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new APIError(400, 'All field Are Required!!!')
    }

    if (!email || !username) {
        throw new APIError(400, "Username and Email are required for checking existing user");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new APIError(409, "User Already Exists!!!!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverimage[0]?.path;

    if (!avatarLocalPath) {
        throw new APIError(400, "Avtar File Is Required!!!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverimage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new APIError(400, "Avatar File Is Required!!!")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new APIError(500, 'Something Went Wrong While Registred User!!!')
    }

    return res.status(201).json(
        new APIResponse(200, createdUser, "User Registerd Successfully!!!")
    )
})

const loginUser = asyncHandler(async (req, res) => {

    // get user details from frontend
    // username and email
    // validation - not empty
    // check possword and username / email
    // access and refresh token 
    // send cookies
    // return response

    const { email, username, password } = req.body

    if (!username && !email) {
        throw new APIError(400, "username or email is required!!")
    }

    if (!password) {
        throw new APIError(400, "password is required!!")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new APIError(404, "User Does Not Exist!!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new APIError(400, "password is invalid!!")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new APIResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        }, "User logged in Successfully!"
        )
    )


})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        },
    },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new APIError(200, {}, "user logged out!"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if (!incomingRefreshToken) {
            throw new APIError(401, "unauthorized request!")
        }
    
        const decodedToken = jwt.verify(
            incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new APIError(401, "invalid refresh token!")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new APIError(401, "refresh token is expired!")
        }
    
        const options = {
            http: true,
            secure: true
        }
    
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new APIResponse(200,
                    { accessToken, refreshToken: newRefreshToken }, "Access token refreshed!"
                )
            )
    } catch (error) {
        throw new APIError(401 , error?.message || "Invalid refresh token!")
    }

})

export default registerUser
export { loginUser, logoutUser , refreshAccessToken }