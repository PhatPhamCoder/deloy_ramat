import React, { useEffect, useState } from "react";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";
import Currency from "react-currency-formatter";
import { FaPercent } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [open, setOpen] = useState(false);
  const userCartState = useSelector((state) => state?.auth?.cartProduct);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        }),
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) *
          Number(userCartState[index].price);
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
      <Meta title="Giỏ hàng" />
      <BreakCrumb title="Giỏ hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col col-md-8 col-lg-8">
              {/* <div className="cart-header d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Tên sản phẩm</h4>
                <h4 className="cart-col-2">Giá tiền</h4>
                <h4 className="cart-col-3">Số lượng</h4>P
                <h4 className="cart-col-4">Thành tiền</h4>
              </div> */}
              {userCartState &&
                userCartState?.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "2px solid #0099ff",
                        borderRadius: "8px",
                        padding: "8px",
                        marginBottom: "10px",
                      }}
                    >
                      <div className="row mb-2">
                        <div className="col-4">
                          <img
                            src={item?.productId?.images?.[0]?.url}
                            alt="product-name"
                            className="img-fluid rounded-3 m-0 p-0"
                          />
                        </div>
                        <div className="col-8 mb-0">
                          <p className="d-flex justify-content-between">
                            {item?.productId?.title}
                            <h5 className="price">
                              <Currency
                                quantity={item?.price}
                                currency="VND"
                                locale="vi_VN"
                                pattern="##,### !"
                                decimal=","
                                group="."
                              />
                            </h5>
                          </p>
                          <p>Kích thước: A5</p>
                          <p className="d-flex gap-3">
                            Màu sắc:
                            <ul className="colors ps-0">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              />
                            </ul>
                          </p>
                          <input
                            className="form-control btn-outline-none"
                            type="number"
                            min={1}
                            max={50}
                            name=""
                            value={
                              setProductUpdateDetail?.quantity
                                ? setProductUpdateDetail?.quantity
                                : item?.quantity
                            }
                            onChange={(e) => {
                              setProductUpdateDetail({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              });
                            }}
                            style={{ width: "100px" }}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-2">
                        <div className="d-flex gap-2">
                          Tình trạng:
                          {item?.quantity > 5 ? (
                            <p className="mb-1" style={{ color: "#30b68a" }}>
                              Còn hàng
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>Hết hàng</p>
                          )}
                        </div>
                        <div>
                          <AiFillDelete
                            className="fs-4 text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteACartProduct(item?._id)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className="col-12 col-md-4 col-lg-4 py-2 bg-white"
              style={{ borderRadius: "10px" }}
            >
              {userCartState &&
                userCartState?.map((item, index) => {
                  return (
                    <>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h5>Bạn có mã ưu đãi?</h5>
                        <FaPercent onClick={() => setOpen(true)} />
                      </div>
                      {open === true && (
                        <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                          <input
                            className="input-group-cart"
                            type="text"
                            placeholder="Nhập mã ưu đãi tại đây"
                          />
                          <span className="button-submit">Áp dụng</span>
                        </div>
                      )}
                      <h4 className="fw-bold">Thanh Toán</h4>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5>Tổng giá trị sản phẩm</h5>
                        <p className="mb-0 fw-bold">
                          <Currency
                            quantity={item?.price * item?.quantity}
                            currency="VND"
                            locale="vi_VN"
                            pattern="##,### !"
                            decimal=","
                            group="."
                          />
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom mb-3">
                        <h5>Phí vận Chuyển</h5>
                        {totalAmount < "500000" ? (
                          <p className="mb-0 fw-bold">
                            <Currency
                              quantity={30000}
                              currency="VND"
                              locale="vi_VN"
                              pattern="##,### !"
                              decimal=","
                              group="."
                            />
                          </p>
                        ) : (
                          <p className="fs-5">Free Ship</p>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                        <h5>Tổng giá trị phải thanh toán</h5>
                        <p className="mb-0 fw-bold">
                          <Currency
                            quantity={
                              totalAmount < "500000"
                                ? totalAmount + 30000
                                : totalAmount
                            }
                            currency="VND"
                            locale="vi_VN"
                            pattern="##,### !"
                            decimal=","
                            group="."
                          />
                        </p>
                      </div>
                      <p className="d-flex justify-content-end">
                        Thuế và vận chuyển được tính khi thanh toán
                      </p>
                      <p className="d-flex justify-content-end">
                        Tải lại trang nếu không thấy đơn hàng
                      </p>
                      <div className="d-flex flex-column justify-content-between align-items-center gap-3">
                        <Link
                          to="/product"
                          className="button w-100 text-center"
                        >
                          Tiếp tục mua sắm
                        </Link>
                        <Link
                          to="/checkout"
                          className="button w-100 text-center fw-bold"
                        >
                          Thanh toán
                        </Link>
                        <br />
                      </div>
                    </>
                  );
                })}

              {/* {(totalAmount !== 0 || totalAmount !== null) && (
                <div className="d-flex flex-column align-items-end">
                  <h4 className="fw-bold">
                    Tổng đơn hàng:
                    <Currency
                      quantity={
                        totalAmount < "500000"
                          ? totalAmount + 30000
                          : totalAmount
                      }
                      currency="VND"
                      locale="vi_VN"
                      pattern="##,### !"
                      decimal=","
                      group="."
                    />
                  </h4>
                  <p>Thuế và vận chuyển được tính khi thanh toán</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
