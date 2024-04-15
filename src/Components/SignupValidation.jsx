import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must be at most 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name cannot contain numbers")
    .required("Name is required"),
  Email: yup.string().email().required("Email is required"),
  createPassword: yup.string().min(4).max(8).required("password is required"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("createPassword"), null], "Passwords must match"),
});
