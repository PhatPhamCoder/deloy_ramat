import React, { useState } from "react";
import Meta from "../components/Meta";
import BreakCrumb from "../components/BreakCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateAUser } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
const profileSchema = object({
  firstname: string().required("Họ và tên đệm không được để trống"),
  lastname: string().required("Tên không được để trống"),
  email: string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Email không được để trống"),
  mobile: number().required("Số điện thoại không được để trống"),
});

const Profile = () => {
  const getTokenfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const configUpdateUser = {
    headers: {
      Authorization: `Bearer ${
        getTokenfromLocalStorage !== null ? getTokenfromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(
        updateAUser({ data: values, configUpdateUser: configUpdateUser }),
      );
      setEdit(true);
    },
  });
  return (
    <>
      <Meta title="Thông tin của tôi" />
      <BreakCrumb title="Thông tin của tôi" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold">
                {edit === false
                  ? "Cập nhật thông tin người dùng"
                  : "Thông tin người dùng"}
              </h3>
              <div
                className="p-1"
                style={{
                  border: "1px solid",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: "#ffe97a",
                }}
              >
                <FiEdit
                  className="edit-profile"
                  onClick={() => setEdit(false)}
                  size={30}
                />
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="form-group mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Họ và tên đệm
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="example1"
                  name="firstname"
                  placeholder="Họ và tên đệm"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="form-group mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="example2"
                  placeholder="Tên"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Địa chỉ Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nhập địa chỉ Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                disabled={edit}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Số điện thoại</label>
              <input
                type="number"
                className="form-control"
                id="example3"
                placeholder="Số điện thoại"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
                disabled={edit}
              />
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile}
              </div>
            </div>
            {edit === false && (
              <button type="submit" className="btn btn-primary">
                Lưu thông tin
              </button>
            )}
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
