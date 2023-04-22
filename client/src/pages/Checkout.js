/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { createAnOrder } from "../features/user/userSlice";
import { FaShippingFast } from "react-icons/fa";
import logo from "../images/logo-header.png";
import momoWallet from "../images/MOMO.jpg";
import { apiGetPublicProvinces } from "../services/app";
import { toast } from "react-toastify";
import { getAllProduct } from "../features/products/productSlice";
const shippingSchema = object({
  firstName: string().required("Vui lòng điền họ và tên đệm!"),
  lastName: string().required("Vui lòng điền tên!"),
  address: string().required("Vui lòng nhập địa chỉ nhận hàng"),
  city: string().required("Vui lòng chọn thành phố"),
  mobile: string()
    .default("")
    .nullable()
    .required("Nhập số điện thoại liên hệ"),
  pincode: string().required("Vui lòng nhập mã bưu điện"),
  other: string(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProduct);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const authState = useSelector((state) => state?.auth?.user);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        color: cartState[index]?.productId?.color,
        price: cartState[index]?.price,
      });
    }
    setCartProductState(items);
  }, [cartState]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const resProvince = await apiGetPublicProvinces();
      if (resProvince.status === 200) {
        setProvinces(resProvince?.data?.results);
      } else {
        toast.error("Dữ liệu bị lỗi!");
      }
    };
    fetchPublicProvince();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      mobile: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 200);
    },
  });

  const checkOutHandler = async () => {
    dispatch(
      createAnOrder({
        shippingInfo,
        orderItems: cartProductState,
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount,
      }),
    );
  };

  return (
    <>
      <Meta title="Thanh toán" />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 col-md-7 col-lg-7 mb-3">
            <div className="checkout-left-data">
              <h3 className="website-name">Ramat Note Book</h3>
              <nav
                style={{ "--bs-bradcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link className="text-dark" to="/cart">
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp;
                  <li className="breadcrumb-item" aria-current="page">
                    Thông tin đặt hàng
                  </li>
                </ol>
              </nav>
              <h4 className="title">Thông tin đặt hàng</h4>

              <div className="tab-content" id="myTabContent">
                <div id="home" role="tabpanel" aria-labelledby="home-tab">
                  <p className="user-details">
                    {authState?.firstname + authState?.lastname} (
                    {authState?.email})
                  </p>
                  <h4 className="mb-3">Địa chỉ giao hàng</h4>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-15 flex-wrap justify-content-between"
                  >
                    <div className="w-100">
                      <select
                        name="city"
                        className="form-control form-select"
                        id=""
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur("city")}
                        value={formik.values.city}
                      >
                        <option value="" selected disabled>
                          ---Chọn tỉnh thành---
                        </option>
                        {provinces &&
                          provinces?.map((item) => {
                            return (
                              <option
                                value={item?.province_name}
                                key={item?.province_id}
                              >
                                {item?.province_name}
                              </option>
                            );
                          })}
                      </select>
                      <div className="errors">
                        {formik.touched.city && formik.errors.city}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        name="firstName"
                        type="text"
                        placeholder="Họ và tên đệm"
                        className="form-control"
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                        value={formik.values.firstName}
                      />
                      <div className="errors">
                        {formik.touched.firstName && formik.errors.firstName}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Tên"
                        className="form-control"
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                        value={formik.values.lastName}
                      />
                      <div className="errors">
                        {formik.touched.lastName && formik.errors.lastName}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        name="address"
                        type="text"
                        placeholder="Địa chỉ nhận hàng"
                        className="form-control"
                        onChange={formik.handleChange("address")}
                        onBlur={formik.handleBlur("address")}
                        value={formik.values.address}
                      />
                      <div className="errors">
                        {formik.touched.address && formik.errors.address}
                      </div>
                    </div>
                    <div className="w-100">
                      <input
                        name="mobile"
                        type="number"
                        placeholder="Số điện thoại người nhận hàng"
                        className="form-control"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                      <div className="errors">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    {/* <div className="flex-grow-1">
                      <select
                        name="district"
                        className="form-control form-select"
                        id=""
                        onChange={formik.handleChange("district")}
                        onBlur={formik.handleBlur("district")}
                        value={formik.values.district}
                      >
                        <option value="" selected disabled>
                          Quận/Huyện
                        </option>
                        <option value="Quan 12">Quận 12</option>
                        <option value="Bình Thạnh">Bình Thạnh</option>
                        <option value="Quận 3">Quận 3</option>
                        <option value="Quận 10">Quận 10</option>
                      </select>
                      <div className="errors">
                        {formik.touched.district && formik.errors.district}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <select
                        name="ward"
                        className="form-control form-select"
                        id=""
                        onChange={formik.handleChange("ward")}
                        onBlur={formik.handleBlur("ward")}
                        value={formik.values.ward}
                      >
                        <option value="" selected disabled>
                          Phường/Xã
                        </option>
                        <option value="Thạnh Xuân">Thạnh Xuân</option>
                        <option value="Phường 25">Phường 25</option>
                        <option value="Thạnh Xuân">Phường 25</option>
                      </select>
                      <div className="errors">
                        {formik.touched.ward && formik.errors.ward}
                      </div>
                    </div> */}
                    <div className="flex-grow-1">
                      <input
                        name="pincode"
                        type="number"
                        placeholder="Mã zip"
                        className="form-control"
                        onChange={formik.handleChange("pincode")}
                        onBlur={formik.handleBlur("pincode")}
                        value={formik.values.pincode}
                      />
                      <div className="errors">
                        {formik.touched.pincode && formik.errors.pincode}
                      </div>
                    </div>
                    <div className="w-100">
                      <textarea
                        name="other"
                        type="number"
                        placeholder="Ghi chú đơn hàng"
                        className="form-control"
                        onChange={formik.handleChange("other")}
                        onBlur={formik.handleBlur("other")}
                        value={formik.values.other}
                      />
                      <div className="errors">
                        {formik.touched.other && formik.errors.other}
                      </div>
                    </div>
                    <div className="w-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <Link
                          to="/cart"
                          className="text-dark d-flex align-items-center gap-10"
                        >
                          <BiArrowBack className="me-2" />
                          Quay lại giỏ hàng
                        </Link>
                        <Link to="/cart" className="button">
                          Tiếp tục mua hàng
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Thông tin đơn hàng */}
          <div
            className="col-12 col-md-5 col-lg-5 bg-white"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 5px",
            }}
          >
            <div className="border-2 py-4">
              <h3 className="text-center fw-bold text-red pb-2">
                Chi tiết đơn hàng
              </h3>
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="d-flex gap-2 justify-content-between">
                        <div className="w-75 d-flex gap-10">
                          <div className="d-flex gap-10 mt-3">
                            <div className="w-25 position-relative">
                              <span
                                style={{ top: "-10px", right: "2px" }}
                                className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              >
                                {item?.quantity}
                              </span>
                              <img
                                src={item?.productId?.images?.[0].url}
                                className="img-fluid rounded-3"
                                alt=""
                              />
                            </div>
                            <div>
                              <h5 className="total-price">
                                {item?.productId?.title}
                              </h5>
                              <p className="total-price">
                                A5 / SN
                                {item?.productId?._id?.substr(-6).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <h5 className="total">
                            <Currency
                              quantity={item?.productId?.price * item?.quantity}
                              currency="VND"
                              locale="vi_VN"
                              pattern="##,### !"
                              decimal=","
                              group="."
                            />
                          </h5>
                        </div>
                      </div>
                      <div className="border-bottom py-4 pb-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="total">Tạm tính</p>
                          <p className="total-price">
                            <Currency
                              quantity={item?.productId?.price * item?.quantity}
                              currency="VND"
                              locale="vi_VN"
                              pattern="##,### !"
                              decimal=","
                              group="."
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total flex">
                    <FaShippingFast size={20} className="mr-4" />
                    Phí Ship
                  </p>
                  {totalAmount < "500000" ? (
                    <p className="mb-0 total-price">
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
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                <h4 className="total fw-bold fs-5">Tổng cộng</h4>
                <h5 className="total-price fs-5 fw-bold">
                  <Currency
                    quantity={
                      totalAmount < "500000" ? totalAmount + 30000 : totalAmount
                    }
                    currency="VND"
                    locale="vi_VN"
                    pattern="##,### !"
                    decimal=","
                    group="."
                  />
                </h5>
              </div>
              <div className="d-flex flex-column mx-auto">
                <button
                  className="w-75 mb-2"
                  type="button"
                  style={{
                    outline: "none",
                    backgroundColor: "#ae2070",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    padding: "5px",
                    margin: "0 auto",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                    width="40px"
                    height="40px"
                  />
                  Thanh toán nhanh bằng MoMo
                </button>
                <button
                  className="w-75"
                  type="submit"
                  onClick={formik.handleSubmit}
                  style={{
                    outline: "none",
                    backgroundColor: "none",
                    border: "none",
                    margin: "0 auto",
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  <img src={logo} width="80px" height="30px" /> Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Thanh toán MoMo */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Vui lòng quét mã thanh toán
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="d-flex mx-auto align-items-center justify-content-center">
                  <img
                    src={momoWallet}
                    alt="payment"
                    width="60%"
                    height="100%"
                    style={{ borderRadius: "5px" }}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  class="btn btn-primary"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
