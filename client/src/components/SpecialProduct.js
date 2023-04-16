import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import Currency from "react-currency-formatter";

const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, quantity, sold, id } = props;
  const navigate = useNavigate();

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex">
          <div className="mx-2">
            <img src="images/book-02.png" className="img-fluid" alt="" />
          </div>
          <div className="special-product-content ml-2">
            <h4
              className="title fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/` + id)}
            >
              {title}
            </h4>
            <h6 className="brand">{brand}</h6>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={totalrating}
              edit={true}
            />
            <p className="price">
              <span className="red-p">
                <Currency
                  quantity={price}
                  currency="VND"
                  locale="vi_VN"
                  pattern="##,### !"
                  decimal=","
                  group="."
                />
              </span>
              &nbsp;{" "}
              <strike>
                <Currency
                  quantity={price}
                  currency="VND"
                  locale="vi_VN"
                  pattern="##,### !"
                  decimal=","
                  group="."
                />
              </strike>
            </p>
            <div className="discount-bill d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5</b> Ngày
              </p>
              <div className="d-flex gap-10 align-items-center box-time">
                <span className="circle_countdown bg-danger">11</span>:
                <span className="circle_countdown bg-danger">11</span>:
                <span className="circle_countdown bg-danger">11</span>:
                <span className="circle_countdown bg-danger">11</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Số lượng: {quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: 100 - (sold * 100) / quantity + "%" }}
                  aria-valuenow={100 - (sold * 100) / quantity}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>
            </div>
            <Link to={`/product/` + id} className="button">
              Thêm giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
