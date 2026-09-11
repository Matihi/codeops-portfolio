import { useAuth } from "../../context/authentication/AuthProvider";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

const initialFormData = { phone: "", password: "" };

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? "/menu";

  if (loading) {
    return <p>Loading...</p>;
  }

  const validateField = (name, value) => {
    switch (name) {
      case "phone": {
        if (value.length === 0) {
          return "Phone field must not be empty";
        }
        return "";
      }

      case "password": {
        if (value.length === 0) {
          return "Password field must not be empty";
        }
        return "";
      }
    }
  };

  const validateForm = (data) => {
    const dataEntries = Object.entries(data);
    const errors = dataEntries.map((entry) => {
      return validateField(entry[0], entry[1]);
    });

    const error = errors.find((error) => error !== "");
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value.trim());
    setErrorMessage(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = validateForm(formData);
    if (error !== undefined) {
      setErrorMessage(error);
    } else {
      error = login(formData);
      if (error !== "") {
        setErrorMessage(error);
        return;
      }
      console.log("Login successfull");
      setFormData(initialFormData);
      navigate(from, { replace: true });
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginHeading}>Log in to Addis Eats</h1>
        <form
          method="post"
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
        >
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <div className={styles.phoneWrapper}>
            <label htmlFor={styles.phone}>TeleBirr phone number:</label>
            <input
              type="tel"
              name="phone"
              id={styles.phone}
              value={formData.phone}
              placeholder="Phone number"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>

          <div className={styles.passwordWrapper}>
            <label htmlFor={styles.password}>Password:</label>
            <input
              type="password"
              name="password"
              id={styles.password}
              value={formData.password}
              placeholder="Password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Log in</button>
        </form>
        <div>
          <p>Don't have an account?</p>
          <p>
            <Link to="/register">Click here</Link>&nbsp;to register.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
