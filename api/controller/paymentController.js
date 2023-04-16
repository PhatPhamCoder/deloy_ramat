// // const Razorpay = require("razorpay");

// // var instance = new Razorpay({
// //   key_id:
// //     "AWUGu8UE9KRMwLy4aMpMtWcQ_dk2xgmb6F778gzDppfS2VyhluGZQgywA2n4oCHtMWCGSlB17ZjR0oTU",
// //   key_secret:
// //     "EGKwER3-XQy6729kMNgb4Qoah6EFf6D8wsmLyG4YINNswK8DbkDWNb7i4E9bItefz58nEdoZZFfNK3Cz",
// // });

// // const checkout = async (req, res) => {
// //   const option = {
// //     amount: 50000,
// //     curreny: "VND",
// //   };

// //   const order = await instance.orders.create(option);
// //   res.json({ success: true, order });
// // };

// // const paymentVerification = async (req, res) => {
// //   const { razorPayOrderId, razorPaymentInfo } = req.body;
// //   res.json({
// //     razorPayOrderId,
// //     razorPaymentInfo,
// //   });
// // };

// // module.exports = {
// //   checkout,
// //   paymentVerification,
// // };

// const paypal = require("paypal-rest-sdk");
// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AWUGu8UE9KRMwLy4aMpMtWcQ_dk2xgmb6F778gzDppfS2VyhluGZQgywA2n4oCHtMWCGSlB17ZjR0oTU",
//   client_secret:
//     "EGKwER3-XQy6729kMNgb4Qoah6EFf6D8wsmLyG4YINNswK8DbkDWNb7i4E9bItefz58nEdoZZFfNK3Cz",
// });
