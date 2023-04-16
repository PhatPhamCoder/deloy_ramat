/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreakCrumb from "../components/BreakCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { getUserProductWishList } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const getWishListFromDB = () => {
    dispatch(getUserProductWishList());
  };
  useEffect(() => {
    getWishListFromDB();
  }, []);
  const wishListState = useSelector((state) => state.auth.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserProductWishList());
    }, 300);
  };
  return (
    <>
      <Meta title="Wishlist" />
      <BreakCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishListState && wishListState.length === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {wishListState &&
            wishListState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative bg-white">
                    <div className="wishlist-icon position-absolute">
                      <img
                        onClick={() => removeFromWishlist(item?._id)}
                        src="images/cross.svg"
                        className="position-absolute cross"
                        alt=""
                      />
                    </div>
                    <div className="wishlist-card-image">
                      <img
                        src={
                          item?.images[0].url
                            ? item?.images[0].url
                            : "images/book-01.png"
                        }
                        className="img-fluid w-100 d-block mx-auto"
                        alt="Wishlist Image"
                      />
                    </div>
                    <div className="wishlist-details py-2 px-2">
                      <h5 className="wishlist-title">{item?.title}</h5>
                      <p className="price">{item?.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
