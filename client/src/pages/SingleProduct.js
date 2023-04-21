import React, { useEffect, useState } from "react";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProduct,
} from "../features/products/productSlice";
import Currency from "react-currency-formatter";
import Color from "../components/Color";
import { toast } from "react-toastify";
import { AddToCart, getUserCart } from "../features/user/userSlice";
const SingleProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split("/")[2];
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProduct);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const uploadCart = () => {
    if (quantity === null) {
      toast.error("Chọn số lượng sản phẩm");
      return false;
    } else {
      dispatch(
        AddToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        }),
      );
    }
  };

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: productState?.images?.[0]?.url
      ? productState?.images?.[0]?.url
      : "https://cf.shopee.vn/file/451df1a07e9eb2dac74070acf95f8395",
  };

  const [orderedProduct] = useState(true);
  let copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productsState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Vui lòng đánh giá để nhận ưu đãi!");
      return false;
    } else if (comment === null) {
      toast.error("Viết đánh giá về sản phẩm!");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId }),
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 200);
    }
    return false;
  };

  return (
    <>
      <Meta
        title={productState?.title ? productState?.title : "Ramat NoteBook"}
      />
      <BreakCrumb
        title={productState?.title ? productState?.title : "Ramat NoteBook"}
      />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images?.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {productState?.title || "Tên sản phẩm đang được cập nhật...."}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  <Currency
                    quantity={
                      productState?.price || `Liên hệ Hotline: 0777 077 293`
                    }
                    currency="VND"
                    locale="vi_VN"
                    pattern="##,### !"
                    decimal=","
                    group="."
                  />
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={productState?.totalrating}
                    edit={false}
                  />
                  <p className="mb-0 t-review">(2 đánh giá)</p>
                </div>
                <a href="#review" className="review-btn">
                  Viết đánh giá
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Mã sản phẩm:</h3>
                  <p className="product-data">SN012023</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Loại Bìa:</h3>
                  <p className="product-data">Bìa cứng</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Màu sắc:</h3>
                  <p className="product-data">
                    <Color
                      setColor={setColor}
                      colorData={productState?.color}
                    />
                  </p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Khổ giấy:</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      A4
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      A5
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      A3
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Loại Giấy:</h3>
                  <p className="product-data">GFd</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Thẻ:</h3>
                  <p className="product-data">GFd</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Trạng thái:</h3>
                  <p className="product-data mb-0">
                    {productState?.quantity - productState?.sold > 0 ? (
                      <p className="mb-1" style={{ color: "#30b68a" }}>
                        Còn hàng
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Hết hàng</p>
                    )}
                  </p>
                </div>
                <div className="d-flex gap-15 flex-row align-items-center mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Số lượng:</h3>
                      <div>
                        <input
                          type="number"
                          name=""
                          style={{ width: "50px" }}
                          min={1}
                          max={10}
                          className="form-control"
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div className="d-flex align-items-center gap-15 ms-6">
                    <button
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                      className="button border-0"
                      type="button"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                    >
                      {alreadyAdded ? "Thanh toán" : "Thêm vào giỏ hàng"}
                    </button>
                    {/* <Link to="/signup" className="button">
                      Mua ngay
                    </Link> */}
                    <a
                      href="/wishlist"
                      className="wishlist d-flex align-items-center"
                    >
                      <AiOutlineHeart /> Danh sách ước
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Giao hàng và trả hàng</h3>
                  <p className="product-data">
                    Miễn phí ship và hoàn trả hàng với đơn hàng có giá trị trên
                    500.000 <br />
                    Chúng tôi sẽ giao đơn hàng của bạn <b>từ 5 - 7 ngày</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Chia sẻ sản phẩm</h3>
                  <button
                    className="outline-none border-0 px-2 py-1 rounded-3"
                    onClick={() => {
                      copyToClipboard(
                        "https://cf.shopee.vn/file/451df1a07e9eb2dac74070acf95f8395",
                      );
                    }}
                  >
                    <FaShareSquare />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>
              <b>Mô tả sản phẩm</b>
            </h4>
            <div className="description-inner-wrapper">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 id="review">
              <b>Đánh giá sản phẩm</b>
            </h4>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      edit={true}
                      onChange={(e) => {
                        setStar(e);
                      }}
                    />
                    <p className="mb-0">2 đánh giá</p>
                  </div>
                </div>
              </div>
              <div className="review-form py-4">
                <h4>Đánh giá của khách hàng</h4>
                <div className="mb-3">
                  <textarea
                    name=""
                    placeholder="Đánh giá"
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    row="4"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="button border-0"
                    onClick={addRatingToProduct}
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState?.ratings?.map((i, index) => {
                    return (
                      <div className="review" key={index}>
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">
                            <b>PhatPham</b>
                          </h6>
                          <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={i?.star}
                            edit={false}
                          />
                        </div>
                        <p className="mt-3">
                          {i?.comment || "Không có đánh giá"}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến</h3>
          </div>
          <div className="row">
            <ProductCard
              className="col-6 col-md-3 col-lg-3"
              data={popularProduct}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
