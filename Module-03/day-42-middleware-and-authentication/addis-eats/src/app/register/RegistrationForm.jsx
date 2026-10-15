"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationFormSchema } from "@/lib/schema";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const handleRegistration = (data) => {
    console.log("Submit successfull");
    console.log(data);
    reset();
  };

  return (
    <section className={styles.registerContainer}>
      <div className={styles.formWrapper}>
        <h1>Create Your Addis Eats Account</h1>
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
              className={errors.name && styles.invalid}
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

          <button type="submit">Create Account</button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
