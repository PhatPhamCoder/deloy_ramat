import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCalendarCheckFill } from "react-icons/bs";
// Latest version - v3.0.0 with Tree Shaking to reduce bundle size

const BlogCard = (props) => {
  const navigate = useNavigate();
  const { id, title, description, date, image } = props;
  return (
    <div className="blog-card">
      <div className="col-12 card-image w-100">
        <img
          src={image ? image : "images/blog-1.jpg"}
          className="img-fluid w-100"
          alt="Blog"
        />
      </div>
      <div className="col-12 blog-content">
        <p className="date d-flex align-items-center gap-15 mb-2">
          <BsFillCalendarCheckFill size={20} color="black" /> Ngày đăng {date}
        </p>
        <h5 className="title" onClick={() => navigate(`/blog/` + id)}>
          {title.substr(0, 70) + "..."}
        </h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: description.substr(0, 70) + "...",
          }}
        ></p>
        <Link to={"/blog/" + id} className="button fw-bold fs-6">
          Đọc thêm
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
