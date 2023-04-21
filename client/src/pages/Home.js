/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import Meta from "../components/Meta";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import Carousel from "react-bootstrap/Carousel";
import Banner from "../images/banner.png";
import Banner2 from "../images/banner-2.png";
import Banner3 from "../images/banner-3.png";
import { getAllBlog } from "../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllProduct } from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import book02 from "../images/book-02.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishList } from "../features/products/productSlice";
import Currency from "react-currency-formatter";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);
  const getProducts = () => {
    dispatch(getAllProduct());
  };
  const productState = useSelector((state) => state?.product?.product);
  const getBlogs = () => {
    dispatch(getAllBlog());
  };

  const blogState = useSelector((state) => state?.blog?.blog);

  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };

  return (
    <>
      <Meta title="Ramat Note Book" />
      <div className="home-wrapper-1">
        <div className="carousel-wrapper slide-header">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid rounded slide-header-image"
                src={Banner}
                alt="banner-1"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid rounded slide-header-image"
                src={Banner2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid rounded slide-header-image"
                src={Banner3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <Container class1="featured-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12 pb-4">
            <h3 className="section-heading text-center py-2 mb-0 title_lines">
              Sản phẩm Sale
            </h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "Home Page") {
                return (
                  <div className="col-12 col-md-6">
                    <SpecialProduct
                      key={index}
                      title={item?.title}
                      brand={item?.brand}
                      totalrating={item?.totalrating.toString()}
                      price={item?.price}
                      quantity={item?.quantity}
                      sold={item?.sold}
                      id={item?._id}
                      image={item?.images?.[0]?.url}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>

      <Container class1="collection-warpper py-4 home-wrapper-1">
        <div className="col-12 pb-4">
          <h3 className="section-heading text-center title_lines">
            Bộ sưu tập
          </h3>
        </div>
        <div className="row collection-mobile">
          <div className="col-12 col-md-3 col-lg-3 d-flex align-items-center justify-content-center">
            <div className="colection-card text-center">
              <h5 className="text-dark">Sổ tay quà tặng</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-3 d-flex align-items-center justify-content-center">
            <div className="colection-card text-center">
              <h5 className="text-dark">Sổ tay thiết kế</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-3 d-flex align-items-center justify-content-center">
            <div className="colection-card text-center">
              <h5 className="text-dark">Handmade</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-3 d-flex align-items-center justify-content-center">
            <div className="colection-card text-center">
              <h5 className="text-dark">
                Quà tặng <br />
                Doanh nghiệp
              </h5>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-1 pb-4">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between collection-mobile-down">
              {services?.map((item, index) => {
                return (
                  <div
                    className="d-flex align-items-center gap-15 collection-mobile-down"
                    key={index}
                  >
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h6 className="fw-bold">{item.title}</h6>
                      <p className="mb-0">{item.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12 pb-4">
            <h3 className="section-heading text-center py-2 mb-0 title_lines">
              Sản phẩm nổi bật
            </h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              return (
                <div key={index} className="col-6 col-md-3">
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
                      <img
                        src={book02}
                        className="img-fluid"
                        alt="Product Image"
                      />
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
        </div>
      </Container>

      <Container class1="blog-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12 pb-4">
            <h3 className="section-heading text-center py-2 mb-0 title_lines">
              Bài viết nổi bật
            </h3>
          </div>
          {blogState &&
            blogState?.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-6 col-mb-3 col-lg-3" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images?.[0]?.url}
                      date={moment(item?.createdAt).add(10, "days").calendar()}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>

      <Container class1="marque-wrapper py-4">
        <div className="row">
          <div className="col-12 pb-4">
            <h3 className="section-heading text-center title_lines">
              Khách hàng
            </h3>
          </div>
          <div className="col-12">
            <div className="marquee-inner-wrapper bg-white p-3 card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
