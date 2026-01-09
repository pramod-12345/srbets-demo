import * as Yup from "yup";

export const loginValidation = Yup.object({
    userName: Yup.string()
      .required("Username or Email is required")
      .min(3, "Must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })

  export const registerValidation = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Must be at least 6 characters"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .notRequired(),
  })