import React, { useEffect } from "react";
import Container from "../components/Container";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";
const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getOrderProduct?.orders,
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(getOrders());
    }, 200);
  }, []);

  return (
    <>
      <Meta title="Đơn hàng của tôi" />
      <BreakCrumb title="Đơn hàng của tôi" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row text-white" style={{ borderRadius: "10px" }}>
          <div
            className="col-12 bg-secondary border-bottom py-3"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <div className="row fw-bold fs-3">
              <div className="col-3">
                <h5>Mã đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền sau giảm giá</h5>
              </div>
              <div className="col-3">
                <h5>Trạng thái</h5>
              </div>
            </div>
          </div>
          <div className="col-12 text-dark">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div className="row py-2 mb-0 bg-warning" key={index}>
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.totalPriceAfterDiscount}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.orderStatus}</p>
                    </div>
                    <div className="col-12 text-dark mt-3">
                      <div className="row bg-white p-3">
                        <div className="col-3">
                          <p>Tên sản phẩm</p>
                        </div>
                        <div className="col-3">
                          <p>Số lượng</p>
                        </div>
                        <div className="col-3">
                          <p>Giá tiền</p>
                        </div>
                        <div className="col-3">
                          <p>Loại bìa</p>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className="col-12 text-dark">
                              <div className="row bg-white p-3">
                                <div className="col-3">
                                  <p>{i?.product?.title}</p>
                                </div>
                                <div className="col-3">
                                  <p>{i?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <p>{i?.price}</p>
                                </div>
                                <div className="col-3">
                                  <p>{i?.color?.title}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
