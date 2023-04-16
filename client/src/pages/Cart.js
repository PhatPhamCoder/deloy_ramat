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

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

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
            <div className="col-12">
              <div className="cart-header d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Tên sản phẩm</h4>
                <h4 className="cart-col-2">Giá tiền</h4>
                <h4 className="cart-col-3">Số lượng</h4>
                <h4 className="cart-col-4">Thành tiền</h4>
              </div>
              {userCartState &&
                userCartState?.map((item, index) => {
                  return (
                    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                      <div className="cart-col-1 gap-15 d-flex align-items-center">
                        <div className="w-25 p-2">
                          <img
                            src={item?.productId?.images?.[0]?.url}
                            alt="product-name"
                            className="img-fluid rounded-3"
                          />
                        </div>
                        <div className="w-75 mb-0">
                          <p>{item?.productId?.title}</p>
                          <p>Kích thước: A5</p>
                          <p className="d-flex gap-3">
                            Màu sắc:
                            <ul className="colors ps-0">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              />
                            </ul>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
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
                      </div>
                      <div className="cart-col-3 gap-15 d-flex align-items-center">
                        <div>
                          <input
                            className="form-control btn-outline-none"
                            type="number"
                            min={1}
                            max={100}
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
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            className="fs-4 text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteACartProduct(item?._id)}
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="total-price">
                          <Currency
                            quantity={item?.price * item?.quantity}
                            currency="VND"
                            locale="vi_VN"
                            pattern="##,### !"
                            decimal=","
                            group="."
                          />
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="col-12 py-2">
              <div className="d-flex justify-content-between">
                <Link to="/product" className="button">
                  Tiếp tục mua sắm
                </Link>
                Tải lại trang nếu không thấy đơn hàng
              </div>
              {(totalAmount !== 0 || totalAmount !== null) && (
                <div className="d-flex flex-column align-items-end">
                  <h4 className="fw-bold">
                    Tổng đơn hàng:
                    <Currency
                      quantity={totalAmount}
                      currency="VND"
                      locale="vi_VN"
                      pattern="##,### !"
                      decimal=","
                      group="."
                    />
                  </h4>
                  <p>Thuế và vận chuyển được tính khi thanh toán</p>
                  <Link to="/checkout" className="button">
                    Thanh toán
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
