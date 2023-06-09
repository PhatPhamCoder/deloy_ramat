const express = require("express");
const {
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
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
// const {
//   checkout,
//   paymentVerification,
// } = require("../controller/paymentController");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetpassword);
// router.put("/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getAllUser);
router.get("/get-my-order", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaorder/:id", authMiddleware, isAdmin, getSingleOrders);
router.put("/updateorder/:id", authMiddleware, isAdmin, updateOrders);
// router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get(
  "/getMonthWiseOrderIncome",
  authMiddleware,
  isAdmin,
  getMonthWiseOrderIncome,
);
router.get(
  "/getMonthWiseOrderCount",
  authMiddleware,
  isAdmin,
  getMonthWiseOrderCount,
);
router.get(
  "/getYearlyTotalOrders",
  authMiddleware,
  isAdmin,
  getYearlyTotalOrders,
);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart,
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart,
);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);

router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unlock-user/:id", authMiddleware, isAdmin, unLockUser);

module.exports = router;
