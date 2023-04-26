import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBookmarkCheckFill, BsSearch } from "react-icons/bs";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import {
  AiFillGift,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaToolbox, FaUserCircle, FaBlogger } from "react-icons/fa";
import logoHeader from "../images/logo-header.png";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlice";
import { RxCrossCircled } from "react-icons/rx";
import { MdPermContactCalendar } from "react-icons/md";
import logoAvatar from "../images/avatar.png";
import { getUserCart } from "../features/user/userSlice";
const Header = () => {
  const getTokenfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const configCheckOut = {
    headers: {
      Authorization: `Bearer ${
        getTokenfromLocalStorage !== null ? getTokenfromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  const [total, setTotal] = useState(null);
  const cartState = useSelector((state) => state?.auth?.cartProduct);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState(true);
  const [paginate, setPaginate] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserCart(configCheckOut));
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity);
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-upper">
        <div className="container-xxl">
          <div className="row position-relative">
            <div className="col-2 my-auto">
              <Link to="/" className="logo-header">
                <img src={logoHeader} alt="logo-header" className="img-fluid" />
              </Link>
              <button className="btn button-menu outline-none">
                <AiOutlineMenu
                  className="icon-menu p-1"
                  size={40}
                  onClick={() => setOpen(true)}
                />
              </button>
            </div>
            {/* Search product */}
            <div className="col-7 py-2 my-auto">
              <div className="input-group">
                <Typeahead
                  id="search"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Tìm kiếm sản phẩm ....."
                  minLength={2}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary input-group-text"
                >
                  <BsSearch className="fs-6 fw-bold" />
                </button>
              </div>
            </div>
            <div className="col-3 row d-flex justify-content-end align-items-center">
              <div className="col-12 py-2">
                <div className="d-flex align-items-center gap-15">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 position-relative cart-mobile"
                  >
                    <AiOutlineShoppingCart
                      className="fs-4 color-dark text-decoration-none cart-icon-mobile"
                      style={{ color: "black" }}
                    />
                    <span
                      className="badge fw-bold position-absolute border-circle"
                      style={{
                        top: "-10px",
                        right: "-15px",
                        color: "white",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    >
                      {total ? total : 0}
                    </span>
                  </Link>
                  <a
                    href="https://www.instagram.com/ramat.notebook/"
                    className="text-dark social-icon"
                  >
                    <BsInstagram className="fs-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/ramat.notebook"
                    className="text-dark social-icon"
                  >
                    <BsFacebook className="fs-4" />
                  </a>
                  <Link to="/login">
                    {authState?.user === null ? (
                      <FaUserCircle className="fs-4 text-dark" />
                    ) : (
                      <div className="d-flex gap-3 align-items-center dropdown">
                        <div
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <h5 className="mb-0">
                            <img
                              src={logoAvatar}
                              className="user-mobile"
                              alt=""
                            />
                          </h5>
                        </div>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                          style={{ borderRadius: "10px" }}
                        >
                          <li
                            className="dropdown-item py-1 mb-1"
                            style={{ height: "auto", lineHeight: "20px" }}
                          >
                            <Link className="dropdown-item" to="/my-profile">
                              Thông tin tài khoản
                            </Link>
                          </li>
                          <li
                            className="dropdown-item py-1 mb-1"
                            style={{ height: "auto", lineHeight: "20px" }}
                          >
                            <Link className="dropdown-item" to="/my-orders">
                              Đơn hàng của tôi
                            </Link>
                          </li>
                          <li
                            className="dropdown-item py-1 mb-1"
                            style={{ height: "auto", lineHeight: "20px" }}
                          >
                            <div
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              Đăng xuất
                            </div>
                          </li>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {open === true && (
            <div className="header-menu-mobile top-0 left-0 position-absolute w-75 h-100 bg-white">
              <div className="d-flex justify-content-between align-items-center login-menu-mobile">
                <div className="profile d-flex mx-auto">
                  {authState?.user === null ? (
                    <div>
                      <FaUserCircle size={40} className="fs-4 text-dark" /> Đăng
                      nhập
                    </div>
                  ) : (
                    <div className="d-flex gap-3 align-items-center dropdown">
                      <div
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <h5 className="mb-0 fw-bold text-dark">
                          {authState?.user?.firstname +
                            authState?.user?.lastname}
                        </h5>
                      </div>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                        style={{ borderRadius: "10px" }}
                      >
                        <li
                          className="dropdown-item py-1 mb-1"
                          style={{ height: "auto", lineHeight: "20px" }}
                        >
                          <Link className="dropdown-item" to="/my-profile">
                            Thông tin tài khoản
                          </Link>
                        </li>
                        <li
                          className="dropdown-item py-1 mb-1"
                          style={{ height: "auto", lineHeight: "20px" }}
                        >
                          <Link className="dropdown-item" to="/my-orders">
                            Đơn hàng của tôi
                          </Link>
                        </li>
                        <li
                          className="dropdown-item py-1 mb-1"
                          style={{ height: "auto", lineHeight: "20px" }}
                        >
                          <div className="dropdown-item" onClick={handleLogout}>
                            Đăng xuất
                          </div>
                        </li>
                      </div>
                    </div>
                  )}
                </div>
                <RxCrossCircled
                  size={30}
                  className="mt-1 icon-cross"
                  onClick={() => setOpen(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <ul className="d-flex flex-column menu-header-mobile">
                <li>
                  <Link
                    to="/"
                    className="nav-link link-secondary text-dark fw-bold fs-5"
                  >
                    <AiFillHome size={20} /> Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/product"
                    className="nav-link link-dark text-dark fw-bold fs-5"
                  >
                    <BsBookmarkCheckFill size={20} /> NoteBook
                  </Link>
                </li>

                <li>
                  <Link
                    to="/handmade-gift"
                    className="nav-link link-dark text-dark fw-bold fs-5"
                  >
                    <AiFillGift size={20} /> Handmade Gift
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="nav-link link-dark text-dark fw-bold fs-5"
                  >
                    <FaToolbox size={20} /> Accessories
                  </Link>
                </li>

                <li>
                  <Link
                    to="/blog"
                    className="nav-link link-dark text-dark fw-bold fs-5"
                  >
                    <FaBlogger size={20} /> Our Stories
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="nav-link link-dark text-dark fw-bold fs-5"
                  >
                    <MdPermContactCalendar size={20} /> Contact Now
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <header className="header-bottom header-bottom-mobile">
        <div className="container">
          <div className="menu-links">
            <div className="collapse navbar-collapse col-12 d-flex align-items-center justify-content-center gap-15">
              <Link
                to="/"
                className="nav-link link-secondary text-dark fw-bold"
              >
                Home
              </Link>

              <Link
                to="/product"
                className="nav-link link-dark text-dark fw-bold"
              >
                NoteBook
              </Link>

              <Link
                to="/handmade-gift"
                className="nav-link link-dark text-dark fw-bold"
              >
                Handmade Gift
              </Link>

              <Link to="/" className="nav-link link-dark text-dark fw-bold">
                Accessories
              </Link>

              <Link to="/blog" className="nav-link link-dark text-dark fw-bold">
                Our Stories
              </Link>

              <Link
                to="/contact"
                className="nav-link link-dark text-dark fw-bold"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
