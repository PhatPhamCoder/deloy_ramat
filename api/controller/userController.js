const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");

// Create A User
const createUser = asyncHandler(async (req, res) => {
  // TO DO: Get email from req.body
  const email = req.body.email;
  // TO DO: with help of email find the user exists or not
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // if user not found user create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // if user found then throw an error; User already exists
    throw new Error("User Aready exist");
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._sid,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?.id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._sid,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  console.log("check refreshToken", refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// Logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
});

// Update A User
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      },
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      },
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All User
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get A Single User
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete A User
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Block User
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      },
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unlock user
const unLockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unlock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      },
    );
    res.json({
      message: "User Unlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update user
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const activationUrl = `${process.env.APP_URL}/reset-password/${token}`;

    const resetURL = `
    <div style="width:100%;background:#0d253f;text-align:left; border-radius:10px">
      <div style="padding:10px">
        <h2 style="font-size:20px;font-weight:700;letter-spacing:0.08em;margin:0 0 8px 0;color:#fff">
          Hi!
        </h2>
        <div>
        <hr style="text-align:left;margin:0px;width:40px;height:3px;color:#01b4e4;background-color:#01b4e4;border-radius:4px;border:none">
        <p style="font-size:15px;font-weight:300;color:#fff">
          Đây là Email khôi phục mật khẩu của bạn. Vui lòng nhấn vào nút bên dưới để thay đổi mật khẩu. Đường dẫn có hiệu lực trong vòng 10 phút
        </p>
        <a style="color:#fff;border-radius:20px;border:10px solid #01b4e4;background-color:#01b4e4;padding:0 10px;text-transform:uppercase;text-decoration:none;font-weight:700" 
          href=${activationUrl} target="_blank">Nhấn vào đây!</a>
        </div>
        <hr style="margin:20px 0;color:#fff;height:1px;border:0;background-color:#fff;">
        <p style="margin:0;padding:0;font-size:13px;color:#fff">
          You are receiving this email because you are a registered user on 
          <a style="font-size:13px;color:#fff" href="https://www.phatpham.tech" target="_blank">www.phatpham.tech</a>.
        </p>
      </div>
    </div>`;

    const data = {
      to: email,
      text: "Hey user",
      subject: "[Ramat NoteBook] Email khôi phục mật khẩu",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetpassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  try {
    const hasedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hasedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);
  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const deleteCart = await Cart.deleteMany({
      userId: _id,
    });
    res.status(200).json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({
      userId: _id,
      _id: cartItemId,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount } =
    req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      user: _id,
    });

    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const orders = await Order.find({ user: _id });
    // .populate("user")
    // .populate("orderItems.product")
    // .populate("orderItems.color");
    res.status(200).json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.status(200).json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findOne({ _id: id })
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.status(200).json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findById(id);
    orders.orderStatus = req.body.status;
    await orders.save();
    res.status(200).json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        amount: {
          $sum: "$totalPriceAfterDiscount",
        },
      },
    },
  ]);
  res.status(200).json(data);
});

const getMonthWiseOrderCount = asyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json(data);
});

const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
        amount: { $sum: "$totalPriceAfterDiscount" },
      },
    },
  ]);
  res.status(200).json(data);
});

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unLockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetpassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getMonthWiseOrderCount,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrders,
  updateOrders,
  emptyCart,
};
