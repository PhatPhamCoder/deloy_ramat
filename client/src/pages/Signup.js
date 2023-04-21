import React from "react";
import { useDispatch } from "react-redux";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { object, string, number } from "yup";
import { useFormik } from "formik";
import { registerUser } from "../features/user/userSlice";
import logoHeader from "../images/logo-header.png";
import { Link } from "react-router-dom";
const signUpSchema = object({
  firstname: string().required("Họ và tên đệm không được để trống"),
  lastname: string().required("Tên không được để trống"),
  email: string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Email không được để trống"),
  mobile: number().required("Số điện thoại không được để trống"),
  password: string().required("Mật khẩu không được để trống"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <>
      <Meta title="Tạo tài khoản" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 login-container mt-3">
            <div className="auth-card login-body ">
              <img
                src={logoHeader}
                alt="logo-header"
                className="img-fluid py-1 w-25 d-flex align-items-center justify-content-center mx-auto mb-3 border-bottom"
              />
              <h2 className="text-center mb-3">Đăng ký tài khoản</h2>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="Họ và tên đệm"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Tên"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="number"
                  name="mobile"
                  placeholder="Số điện thoại"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div className="d-flex gap-2">
                  <input type="checkbox" /> Đồng ý với các điều khoản & điều
                  kiện sử dụng
                </div>
                <div>
                  <div className="d-flex justify-content-center gap-15 align-items-center mt-3">
                    <button className="button border-0 fw-bold fs-5">
                      Đăng ký
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  Bạn đã có tài khoản?
                  <Link to="/login">
                    <p className="fw-bold text-decoration-underline">
                      Đăng nhập
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
