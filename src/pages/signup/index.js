import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { user, register, logout } = useAuth();

  const onEmailChange = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event)) {
      errors.emailreg = "Please enter a valid email address";
    } else {
      setRegisterEmail(event);
      errors.emailreg = null;
    }

    setUserData({ ...userData, [name]: event });
    setErrors({ ...errors, [name]: "" });
  };

  const onPasswordChange = (value) => {
    const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordregex.test(value)) {
      setErrors({
        ...errors,
        passreg: "Minimum eight characters, at least one letter and one number",
      });
    } else {
      setRegisterPassword(value);
      errors.passreg = null;
    }
    return errors;
  };

  const handleRegister = async () => {
    event.preventDefault();

    try {
      await register(userData.email, userData.password);
    } catch (error) {
      setErrors({ ...errors, emailreg: "Email already in use" });
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
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
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
        onChange={(event) =>
          setUserData({ ...userData, password: event.target.value })
        }
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
      <h3>User logged in:</h3>
      {user?.email}
      <button className="mb-3" onClick={logout}>
        sign out
      </button>
    </div>
  );
}
