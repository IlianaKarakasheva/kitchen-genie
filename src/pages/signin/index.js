import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const { login, user } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });

  const validateUserFormData = (formData) => {
    const errors = {};
    if (formData.email.trim() === "") {
      errors.emaillog = "Please enter email";
    }
    if (formData.password.trim() === "") {
      errors.passlog = "Please enter password";
    }
    return errors;
  };

  const handleLogin = async () => {
    const errors = validateUserFormData(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await login(data.email, data.password);
        router.push("/");
      } catch (error) {
        setErrors({ ...errors, invalidData: "Wrong email or password" });
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
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="emaillog"
        id="inputEmail"
        className="form-control"
        placeholder="Enter email"
        value={data.email}
        onChange={(event) => {
          setData({ ...data, email: event.target.value });
          setErrors({
            ...errors,
            emaillog: null,
          });
        }}
        required=""
        autofocus=""
      />
      {errors.emaillog && (
        <span className="error text-danger"> {errors.emaillog}</span>
      )}

      <label for="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        name="passlog"
        id="inputPassword"
        className="form-control"
        placeholder="Enter password"
        value={data.password}
        onChange={(event) => {
          setData({ ...data, password: event.target.value });
          setErrors({
            ...errors,
            passlog: null,
          });
        }}
        required=""
      />
      {errors.invalidData && (
        <span className="error text-danger"> {errors.invalidData}</span>
      )}
      {errors.passlog && (
        <span className="error text-danger"> {errors.passlog}</span>
      )}

      <div className="checkbox mb-3">
        <label></label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" onClick={handleLogin}>
        SIGN IN
      </button>
    </div>
  );
}
