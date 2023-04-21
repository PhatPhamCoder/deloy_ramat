import React, { useEffect } from "react";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../features/blog/blogSlice";
import moment from "moment";
const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();
  const getAllBlogs = () => {
    dispatch(getAllBlog());
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <Meta title="Our Story" />
      <BreakCrumb title="Our Story" />
      <Container class1="blog-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3">
              <div className="filter-card my-3">
                <h3 className="filter-title">Danh mục bài viết</h3>
                <div>
                  <ul className="ps-0">
                    <li>Bài viết nổi bật</li>
                    <li>Album Dán Ảnh</li>
                    <li>Sticker Dán</li>
                    <li>Quà tặng Handmade</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-9 col-lg-9">
              <div className="row">
                {blogState &&
                  blogState?.map((item, index) => {
                    return (
                      <div
                        className="col-12 col-md-3 col-lg-3 my-3"
                        key={index}
                      >
                        <BlogCard
                          id={item?._id}
                          title={item?.title}
                          description={item?.description}
                          image={item?.images?.[0]?.url}
                          date={moment(item?.createdAt)
                            .add(10, "days")
                            .calendar()}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
