import React from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPasswordToken } from "../features/user/userSlice";

const passwordSchema = object({
  password: string().required("Mật khẩu không được để trống"),
});

const Resetpassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(
        resetPasswordToken({
          token: getToken,
          password: values.password,
        }),
      );
      navigate("/login");
    },
  });
  return (
    <>
      <Meta title="Đặt lại mật khẩu" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h2 className="text-center">Đặt lại mật khẩu</h2>
              <form onSubmit={formik.handleSubmit}>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu mới"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="d-flex justify-content-center gap-15 align-items-center mt-3">
                    <button className="button border-0" type="submit">
                      Đặt lại mật khẩu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
