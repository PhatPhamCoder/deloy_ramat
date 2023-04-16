import * as React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsFacebook, BsInstagram, BsFillMicFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import logoHeader from "../images/logo-header.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
const Header = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(null);
  const cartState = useSelector((state) => state?.auth?.cartProduct);
  const authState = useSelector((state) => state?.auth);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity);
      setTotal(sum);
    }
  }, [cartState]);
  return (
    <>
      <header className="header-upper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <Link to="/" className="logo-header">
                <img
                  src={logoHeader}
                  alt="logo-header"
                  className="img-fluid py-1"
                />
              </Link>
            </div>
            <div className="col-7 py-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1 border-0 search_input"
                  placeholder="Tìm kiếm sản phẩm"
                  aria-label="Search Product Here"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary input-group-text"
                >
                  <BsSearch className="fs-6 fw-bold" />
                </button>
                {/* <span className="input-group-text p-2 border-0 text-dark bg-white">
                    <BsSearch className="fs-6 fw-bold" />
                  </span> */}
              </div>
            </div>
            <div className="col-3 row d-flex justify-content-end align-items-center">
              <div className="col-12 py-2">
                <div className="d-flex align-items-center gap-15">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 position-relative"
                  >
                    <div>
                      <AiOutlineShoppingCart
                        className="fs-4 color-dark text-decoration-none"
                        style={{ color: "black" }}
                      />
                    </div>
                    <span
                      className="badge fw-bold position-absolute border-circle bg-black bỏdre"
                      style={{
                        top: "-10px",
                        right: "-15px",
                        color: "white",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        background: "red",
                      }}
                    >
                      {total ? total : 0}
                    </span>
                  </Link>
                  <a
                    href="https://www.instagram.com/ramat.notebook/"
                    className="text-dark"
                  >
                    <BsInstagram className="fs-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/ramat.notebook"
                    className="text-dark"
                  >
                    <BsFacebook className="fs-4" />
                  </a>
                  <Link to="/login">
                    {authState?.user === null ? (
                      <FaUserCircle className="fs-4 text-dark" />
                    ) : (
                      <p className="mb-0 d-flex flex-wrap pr-2 text-decoration-none">
                        {authState?.user?.firstname + authState?.user?.lastname}
                      </p>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu-links">
                <ul className="nav col-12 d-flex align-items-center justify-content-center">
                  <li>
                    <Link
                      to="/"
                      className="nav-link link-secondary text-dark fw-bold"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/product"
                      className="nav-link link-dark text-dark fw-bold"
                    >
                      NoteBook
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/handmade-gift"
                      className="nav-link link-dark text-dark fw-bold"
                    >
                      Handmade Gift
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="nav-link link-dark text-dark fw-bold"
                    >
                      Accessories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="nav-link link-dark text-dark fw-bold"
                    >
                      Our Stories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="nav-link link-dark text-dark fw-bold"
                    >
                      Contact Now
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
