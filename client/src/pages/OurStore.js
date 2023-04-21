import React, { useEffect, useState } from "react";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import { BsFilterCircle } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/products/productSlice";

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.product);
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  // Filter States
  const [tag, setTag] = useState([]);
  const [brand, setBrand] = useState([]);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand);
      category.push(element?.category);
      newtags.push(element?.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newtags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, categorie, brand, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProduct({ sort, tag, categorie, brand, minPrice, maxPrice }),
    );
  };

  return (
    <>
      <Meta title="Danh Sách sản phẩm" />
      <BreakCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col col-md-3 col-lg-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Danh mục sản phẩm của shop</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)]?.map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategorie(item)}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Lọc <BsFilterCircle />
              </h3>
              <div>
                <h5 className="sub-title">Trạng thái</h5>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Còn hàng</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked
                    />
                    <label className="form-check-label">Hết hàng</label>
                  </div>
                </div>
                <h5 className="sub-title">Giá</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Form"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label for="floatingInput">Từ</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="to"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label for="floatingInput1">Đến</label>
                  </div>
                </div>
                <h5 className="sub-title">Kích thước</h5>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value=""
                    id="color-1"
                  />
                  <label className="form-check-label" htmlFor="color-1">
                    A4(2)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value=""
                    id="color-2"
                  />
                  <label className="form-check-label" htmlFor="color-2">
                    A5(2)
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Thẻ sản phẩm</h3>
              <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                {tags &&
                  [...new Set(tags)]?.map((item, index) => {
                    return (
                      <span
                        className="badge bg-light text-secondary rounded-3 py-2 px-3"
                        key={index}
                        onClick={() => setTag(item)}
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Chủ đề sản phẩm</h3>
              <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                {tags &&
                  [...new Set(brands)]?.map((item, index) => {
                    return (
                      <span
                        className="badge bg-light text-secondary rounded-3 py-2 px-3"
                        key={index}
                        onClick={() => setBrand(item)}
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 col-lg-9 row">
            <div className="col-12 filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center row">
                <div className="col-12 col-md-8 col-lg-8 d-flex align-items-center gap-10 my-3">
                  <p className="mb-0 d-block" style={{ width: "180px" }} s>
                    Sắp xếp theo:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="manual">Loại giấy</option>
                    <option value="price">Giá Thấp đến Cao </option>
                    <option value="-price">Giá Cao đến Thấp </option>
                    <option value="createdAt">Mới nhất</option>
                    <option value="hotdeal">Bán chạy</option>
                  </select>
                </div>
                <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center gap-10 mt-3">
                  <p className="totalproducts mb-0">21 Sản phẩm</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex flex-wrap gap-10">
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
