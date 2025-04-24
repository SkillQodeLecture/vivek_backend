import asyncHandler from "../utils/asyncHandler.js";
import { APIError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js";

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

export default registerUser