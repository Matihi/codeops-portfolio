import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Register.module.css";

const phonePattern = /^(?:\+251|0)9\d{8}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]+$/;

const registrationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name should contain more than two characters" }),

  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(phonePattern, {
      message: "Phone number should be a valid TeleBirr phone number",
    }),

  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should contain at least eight characters." })
    .regex(passwordPattern, {
      message:
        "Password should contain at least one lower case, one upper case, one digit and one special character",
    }),
});

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalPath = location.state?.from?.pathname ?? "/";
  const authSource = location.state?.source;
  const originalLocation = location.state?.from;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

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
      return "An account with this phone number already exists.";
    }
    usersObject.userData.push(data);

    const usersString = JSON.stringify(usersObject);
    localStorage.setItem(usersKey, usersString);
    return "";
  };

  const handleRegistration = (data) => {
    const error = storeData(data);
    if (error !== "") {
      setError("phone", {
        type: "duplicate",
        message: error,
      });
      return;
    }
    console.log("Submit successfull");
    console.log(data);
    reset();
    if (authSource === "login") {
      navigate("/login", {
        replace: true,
        state: { from: originalLocation },
      });
    } else {
      navigate(originalPath, { replace: true });
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
          onSubmit={handleSubmit(handleRegistration)}
        >
          <div className={styles.nameWrapper}>
            <label htmlFor="name">{`Name(ስም)`}</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.phoneWrapper}>
            <label htmlFor="phone">{`TeleBirr Phone Number(ስልክ ቁጥር)`}</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="0911223344"
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
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
