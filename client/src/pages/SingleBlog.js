import React, { useEffect } from "react";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/blogSlice";
const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleblog);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];

  const dispatch = useDispatch();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    dispatch(getABlog(getBlogId));
  };

  return (
    <>
      <Meta title={blogState?.title} />
      <BreakCrumb title="Our Stories" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div
              className="single-blog-card bg-white p-3"
              style={{ borderRadius: "10px" }}
            >
              <Link to="/blog" className="d-flex align-items-center">
                <BsArrowLeft /> Quay về trang trước
              </Link>

              <h3 className="title">{blogState?.title}</h3>
              <p
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: blogState?.description,
                }}
              ></p>
              <img
                src={
                  blogState?.images?.[0]?.url
                    ? blogState?.images?.[0]?.url
                    : blog
                }
                className="img-fluid my-4 rounded-3 w-25 mx-auto d-flex"
                alt="Blog"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
