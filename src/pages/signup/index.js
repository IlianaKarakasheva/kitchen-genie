import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({ email: "", password: "" });

  const validateUserFormData = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (formData.email.trim() === "") {
      errors.emailreg = "Please enter email";
    } else if (!emailRegex.test(formData.email)) {
      errors.emailreg = "Please enter a valid email address";
    }

    if (formData.password.trim() === "") {
      errors.passreg = "Please enter password";
    } else if (!passwordregex.test(formData.password)) {
      errors.passreg =
        "Minimum eight characters, at least one letter and one number";
    }
    return errors;
  };

  const handleRegister = async () => {
    const errors = validateUserFormData(userData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await register(userData.email, userData.password);
      } catch (error) {
        setErrors({ ...errors, emailreg: "Email already in use" });
      }
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="signUpPage">
      <h1 class="h3 mb-3 font-weight-normal">Sign up page</h1>
      <input
        type={"email"}
        placeholder="E-mail address"
        name="emailreg"
        value={userData.email}
        onChange={(event) => {
          setUserData({ ...userData, email: event.target.value });
          setErrors({
            ...errors,
            emailreg: null,
          });
        }}
        class="form-control"
      />
      {errors.emailreg && (
        <span className="error text-danger"> {errors.emailreg}</span>
      )}
      <input
        type={"password"}
        placeholder="Password"
        name="passreg"
        value={userData.password}
        onChange={(event) => {
          setUserData({ ...userData, password: event.target.value });
          setErrors({
            ...errors,
            passreg: null,
          });
        }}
        class="form-control"
      />
      {errors.passreg && (
        <span className="error text-danger"> {errors.passreg}</span>
      )}
      <button
        className="signUpButton btn btn-lg btn-primary btn-block"
        onClick={handleRegister}
      >
        SIGN UP
      </button>
    </div>
  );
}
