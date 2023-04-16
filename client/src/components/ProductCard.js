/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import book02 from "../images/book-02.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishList } from "../features/products/productSlice";
import Currency from "react-currency-formatter";

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
            <div className="product-card position-relative my-2">
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent">
                  <img
                    onClick={() => addToWish(item?._id)}
                    src={wish}
                    alt="wish"
                  />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images?.[0]?.url}
                  className="img-fluid"
                  alt="Product Image"
                />
                <img src={book02} className="img-fluid" alt="Product Image" />
              </div>
              <div className="product-details">
                <h6 className="type">{item?.brand}</h6>
                <h5
                  className="product-title"
                  onClick={() => navigate(`/product/` + item?._id)}
                >
                  {item?.title}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={item?.totalrating.toString()}
                  edit={true}
                />
                <p
                  className={`desciption ${grid === 12 ? "d-block" : "d-none"}`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">
                  <Currency
                    quantity={item?.price}
                    currency="VND"
                    locale="vi_VN"
                    pattern="##,### !"
                    decimal=","
                    group="."
                  />
                </p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  {/* <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="addcart" />
                  </button> */}
                  <button className="border-0 bg-transparent">
                    <img
                      onClick={() => navigate(`/product/` + item?._id)}
                      src={view}
                      alt="view"
                    />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
