import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsYoutube, BsTelegram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
import { ImLocation2 } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import ScrollToTop from "react-scroll-to-top";
import logo from "../images/logo-header.png";
const Footer = () => {
  return (
    <>
      <ScrollToTop smooth />
      <footer className="py-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="pay-wrapper py-3">
                <a href="/" className="img-fluid d-flex gap-15">
                  <img
                    src="https://cdn.divineshop.vn/static/b77a2122717d76696bd2b87d7125fd47.svg"
                    className="img-fluid w-20"
                    alt="Ví MoMo"
                    title="Ví MoMo"
                  />
                  <img
                    src="https://cdn.divineshop.vn/static/72a3a36fc7c66085b3f442940ba45fde.svg"
                    className="img-fluid w-10"
                    alt="Mobile Banking với VnPay"
                    title="Mobile Banking với VnPay"
                  />
                  <img
                    src="https://cdn.divineshop.vn/static/464c7c79044dea88e86adf0e1b9c064c.svg"
                    className="img-fluid w-20"
                    alt="Thẻ VISA"
                    title="Thẻ VISA"
                  />
                  <img
                    src="https://cdn.divineshop.vn/static/ddb866eb1214c914ea62417879046b99.svg"
                    className="img-fluid w-20"
                    alt="Thẻ Mastercard"
                    title="Thẻ Mastercard"
                  />
                  <small className="text-dark mb-0">
                    và nhiều hình thức thanh toán khác
                  </small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-12 col-md-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Đăng kí nhận tin khuyến mãi</h2>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="input-group p-2">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Nhập Email ở đây nè !"
                  aria-label="Search Product Here"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Đăng kí
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-9 col-md-4 pb-2">
              <h4 className="text-white mb-4 d-flex flex-column">
                <Link to="/contact" className="text-white">
                  Liên hệ chúng tôi
                </Link>
                <img
                  src={logo}
                  className="w-50 h-50 mt-2"
                  alt="logo-footer"
                  style={{
                    backgroundColor: "white",
                  }}
                />
              </h4>
              <div>
                <address className="text-white fs-7">
                  <ImLocation2 /> HCMC: 79 Tô Hiến Thành, Quận 10
                </address>
                <a
                  href="tel:+84777077293"
                  className="mt-4 d-block mb-3 text-white"
                >
                  <BsTelephone /> (+84) 777 077 293
                </a>
                <a
                  href="mailto:cskh@ramatnotebook.com"
                  className="mt-4 d-block mb-3 text-white"
                >
                  <AiOutlineMail /> cskh@ramatnotebook.com
                </a>
                <div className="social-icon d-flex align-items-center gap-30 mt-4">
                  <a
                    href="https://www.facebook.com/ramat.notebook"
                    className="text-white"
                  >
                    <BsFacebook className="fs-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/ramat.notebook/"
                    className="text-white"
                  >
                    <BsInstagram className="fs-4" />
                  </a>
                  <a
                    href="https://ramatnotetbook-fe.vercel.app/"
                    className="text-white"
                  >
                    <BsTelegram className="fs-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/ramat.notebook"
                    className="text-white"
                  >
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Chính sách bảo mật
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Chính sách hoàn tiền
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Điều khoản và điều kiện
                </Link>
                <Link to="/blog" className="text-white py-2 mb-1">
                  Bài viết
                </Link>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <h4 className="text-white mb-4">Đang suy nghĩ ..</h4>
              <div className="footer-account d-flex flex-column">
                <Link to="/" end className="text-white py-2 mb-1">
                  Về Chúng Tôi
                </Link>
                <Link to="/" end className="text-white py-2 mb-1">
                  Hỏi đáp
                </Link>
                <Link to="/contact" end className="text-white py-2 mb-1">
                  Liên hệ
                </Link>
              </div>
            </div>
            <div className="col-7 col-md-2">
              <h4 className="text-white mb-4">Truy cập nhanh</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" end className="text-white py-2 mb-1">
                  NoteBook
                </Link>
                <Link to="/" end className="text-white py-2 mb-1">
                  Pen
                </Link>
                <Link to="/" end className="text-white py-2 mb-1">
                  Accessories
                </Link>
                <Link to="/" end className="text-white py-2 mb-1">
                  Order
                </Link>
              </div>
            </div>
            <div className="col-5 col-md-2 d-flex justify-content-end align-items-center">
              <Link to="/">
                <img
                  src="https://images.dmca.com/Badges/_dmca_premi_badge_2.png?ID=18522dc6-fdd6-4b49-ab40-395a79849050"
                  className="img-fluid"
                  alt="DMCA.com Protection Status"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} Powered By Ramat
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
