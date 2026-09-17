import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const initialFormData = { name: "", phone: "", password: "" };

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const originalPath = location.state?.from?.pathname ?? "/";
  const authSource = location.state?.source;
  const originalLocation = location.state?.from;

  const validateField = (name, value) => {
    const phonePattern = /^(?:\+251|0)9\d{8}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]+$/;
    switch (name) {
      case "name": {
        if (value.length === 0) {
          return "Name field is required";
        } else if (value.length < 2) {
          return "Name should contain more than two characters";
        }
        return "";
      }

      case "phone": {
        if (value.length === 0) {
          return "Phone field is required";
        } else if (!phonePattern.test(value)) {
          return "Phone number should be a valid TeleBirr phone number";
        }
        return "";
      }

      case "password": {
        if (value.length === 0) {
          return "Password field is required";
        } else if (value.length < 8) {
          return "Password should contain at least eight characters.";
        } else if (!passwordPattern.test(value)) {
          return "Password should contain at least one lower case, one upper case, one digit and one special character";
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

  const checkDuplicate = (user, storage) => {
    const duplicateUser = storage.userData.find(
      (someUser) => someUser.phone.slice(-9) === user.phone.slice(-9),
    );
    console.log("duplicateUser");
    console.log(duplicateUser);

    if (duplicateUser !== undefined) {
      return true;
    }
    return false;
  };

  const storeData = (data) => {
    const usersKey = "addisEatsCustomers";
    let users = localStorage.getItem(usersKey);
    if (!users) {
      users = `{"userData":[]}`;
    }

    const usersObject = JSON.parse(users);
    const userExists = checkDuplicate(data, usersObject);
    if (userExists) {
      return "Invalid phone number or password.";
    }
    usersObject.userData.push(data);

    const usersString = JSON.stringify(usersObject);
    localStorage.setItem(usersKey, usersString);
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      error = storeData(formData);
      if (error !== "") {
        setErrorMessage(error);
        return;
      }
      console.log("Submit successfull");
      console.log(formData);
      setFormData(initialFormData);
      if (authSource === "login") {
        navigate("/login", {
          replace: true,
          state: { from: originalLocation },
        });
      } else {
        navigate(originalPath, { replace: true });
      }
    }
  };

  return (
    <section className={styles.registerContainer}>
      <div className={styles.formWrapper}>
        <h1>Create Your Mesob House Account</h1>
        <form
          className={styles.form}
          method="post"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={styles.nameWrapper}>
            <label htmlFor={styles.name}>{`Name(ስም)`}</label>
            <input
              type="text"
              name="name"
              id={styles.name}
              value={formData.name}
              placeholder="Your Name"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>

          <div className={styles.phoneWrapper}>
            <label
              htmlFor={styles.phone}
            >{`TeleBirr Phone Number(ስልክ ቁጥር)`}</label>
            <input
              type="tel"
              name="phone"
              id={styles.phone}
              value={formData.phone}
              placeholder="0911223344"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>

          <div className={styles.passwordWrapper}>
            <label htmlFor={styles.password}>{`Password(የይለፍ ቃል)`}</label>
            <input
              type="password"
              name="password"
              id={styles.password}
              value={formData.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <button type="submit">Create Account</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
