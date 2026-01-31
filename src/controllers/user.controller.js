import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; // if direct export we need to import in this way
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "") // we have used this code to check each field is available. we can also use map but it req to check on each field
  ) {
    throw new ApiError(400, "All fields are required ");
  }
  // check for existing user
  const existedUser = User.findOne({
    $or: [{ username }, { email }], // or operator and this syntex to find multiple items
  });

  if (existedUser) {
    // here this Api error help us to redue multiple code loop
    throw new ApiError(409, "User with email or username is already exists");
  }

  // ususally we have all data from req.body but we added multer so it add some more fields and we have access of files form here
  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(409, "Avatar is required");
  }

  // now we have image , and all fields then we need to upload them to cloudinary

  // we already decleare a method to upload on cloudinary simply call it

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is not uploaded");
  }

  // Once every thing is fine
  // create user and push to db Usually we have User who talk with db so we just call method through user

  const user = await User.create({
    fullName,
    avatar: avatar.url, // we need to just pass image url only
    email,
    password,
    coverImage: coverImage?.url || "", // if not then empty
    username: username.toLowerCase(),
  });

  // If user is created check and we remove passowrd and refreshToken
  const createdUser = await User.finById(user._id).select(
    "-password -refreshToken", // it's syntex of select and it select all by defult
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went worng while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
