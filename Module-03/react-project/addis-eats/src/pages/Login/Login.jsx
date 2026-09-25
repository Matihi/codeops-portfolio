import { useAuth } from "../../context/authentication/AuthProvider";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./Login.module.css";

const loginFormSchema = z.object({
  phone: z.string().trim().min(1, { message: "Phone is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const originalPath = location.state?.from?.pathname ?? "/";
  const originalLocation = location.state?.from;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogin = (data) => {
    const error = login(data);
    if (error !== "") {
      setErrorMessage(error);
      return;
    }
    console.log("Login successfull");
    reset();
    navigate(originalPath, { replace: true });
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginHeading}>Log in to Addis Eats</h1>
        <form
          method="post"
          className={styles.form}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <div className={styles.phoneWrapper}>
            <label htmlFor="phone">{`TeleBirr phone number(ስልክ ቁጥር)`}</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="Phone number"
              className={errors.phone && styles.invalid}
            />
            {errors.phone && (
              <p className={styles.errorMessage}>{errors.phone.message}</p>
            )}
          </div>

          <div className={styles.passwordWrapper}>
            <label htmlFor="password">{`Password(የይለፍ ቃል)`}</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
              className={errors.password && styles.invalid}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <button type="submit">Log in</button>
        </form>
        <div className={styles.ctawrapper}>
          <p>Don't have an account?</p>
          <p>
            <Link
              to="/register"
              state={{ from: originalLocation, source: "login" }}
              className={styles.ctaLink}
            >
              Click here
            </Link>
            &nbsp;to register.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
