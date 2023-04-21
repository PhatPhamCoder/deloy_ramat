import React from "react";
import Meta from "../components/Meta";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { forgotPasswordToken } from "../features/user/userSlice";

const emailSchema = object({
  email: string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Email không được để trống"),
});

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });

  return (
    <>
      <Meta title="Lấy lại mật khẩu" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h2 className="text-center mb-3">Đặt lại mật khẩu</h2>
              <p className="mt-2 mb-3 text-center sub-title">
                Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu của bạn
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <div>
                  <div className="d-flex justify-content-center gap-15 align-items-center flex-column mt-2">
                    <button className="button border-0" type="submit">
                      Gửi email
                    </button>
                    <button className="btn">Hủy</button>
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

export default Forgotpassword;
