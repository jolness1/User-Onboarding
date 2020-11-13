import * as yup from "yup";


export default yup.object().shape({
    name: yup
        .string()
        .required("name is required")
        .min(3, "Name must be 3 chars long"),
    username: yup
        .string()
        .required("username is required")
        .min(3, "username must be 3 chars long"),
    email: yup
        .string()
        .email("Must be valid email address")
        .required("Must include email address"),
    password: yup
        .string()
        .required("Password is required")
        .min(7, "Password must be 7 chars long"),
    terms: yup
        .boolean()
        .oneOf([true], "Accept the Damn Terms"),
});