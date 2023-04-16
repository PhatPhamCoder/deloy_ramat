import React from "react";
import BreakCrumb from "../components/BreakCrumb";
import Meta from "../components/Meta";
import {
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import Container from "../components/Container";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";
let enqSchema = object({
  name: string().required("Vui lòng điền tên!"),
  email: string()
    .nullable()
    .email("Định dạng email bị sai")
    .required("Vui lòng điện địa chỉ Email"),
  mobile: string()
    .default("")
    .nullable()
    .required("Nhập số điện thoại liên hệ"),
  comment: string().default("").nullable().required("Nhập nội dung lời nhắn"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: enqSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
    },
  });
  return (
    <>
      <Meta title="Contact" />
      <BreakCrumb title="Contact" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3854761646685!2d106.66636222782796!3d10.78175973748777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed731a21d3b%3A0x49f135b1f4e91518!2zNzkgVMO0IEhp4bq_biBUaMOgbmgsIFBoxrDhu51uZyAxMywgUXXhuq1uIDEwLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1675175821609!5m2!1sen!2s"
              width="600"
              height="450"
              className="border-0 w-100 rounded-3"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Liên hệ</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên"
                      name="name"
                      onChange={formik.handleChange("name")}
                      onBeforeInput={formik.handleBlur("name")}
                      value={formik.values.name}
                    />
                  </div>
                  <div className="errors">
                    {formik.touched.name && formik.errors.name}
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Địa chỉ Email"
                      name="email"
                      onChange={formik.handleChange("email")}
                      onBeforeInput={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="errors">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Số điện thoại"
                      name="mobile"
                      onChange={formik.handleChange("mobile")}
                      onBeforeInput={formik.handleBlur("mobile")}
                      value={formik.values.mobile}
                    />
                  </div>
                  <div className="errors">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                  <div>
                    <textarea
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      row="4"
                      placeholder="Lời nhắn"
                      name="comment"
                      onChange={formik.handleChange("comment")}
                      onBeforeInput={formik.handleBlur("comment")}
                      value={formik.values.comment}
                    />
                  </div>
                  <div className="errors">
                    {formik.touched.comment && formik.errors.comment}
                  </div>
                  <button type="submit" className="button border-0">
                    Gửi liên hệ
                  </button>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Thông tin chúng tôi</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <AiOutlineHome className="fs-4" />
                      <address className="mb-0">
                        79/10 Tô Hiến Thành, Phường 13, Quận 10, TP Hồ Chí Minh
                      </address>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <BiPhoneCall className="fs-4" />
                      <a href="tel:+840777077293">(+84) 777 077 293</a>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <AiOutlineMail className="fs-4" />
                      <a href="mailto:cskh@ramatnotebook.com">
                        cskh@ramatnotebook.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <AiOutlineInfoCircle className="fs-4" />
                      <p className="mb-0">Thứ 2 - Thứ 6 Từ 09:00 - 17:00</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
