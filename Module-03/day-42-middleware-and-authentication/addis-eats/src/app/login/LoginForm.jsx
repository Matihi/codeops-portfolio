"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/lib/schema";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleLogin = (data) => {
    console.log("Login successfull");
    console.log("data: ", data);
    resetField("phone");
    resetField("password");
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
          aria-describedby={
            errors.root?.serverError?.type === 500 ? "form-error" : undefined
          }
        >
          {errors.root?.serverError?.type === 500 && (
            <p id="form-error" role="alert" className={styles.errorMessage}>
              {errors.root?.serverError?.message}
            </p>
          )}

          <div className={styles.phoneWrapper}>
            <label htmlFor="phone">{`TeleBirr phone number(ስልክ ቁጥር)`}</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="0911223344"
              className={!!errors.phone ? styles.invalid : undefined}
              aria-invalid={!!errors.phone}
              aria-describedby={!!errors.phone ? "phone-error" : undefined}
            />
            {!!errors.phone && (
              <p id="phone-error" className={styles.errorMessage}>
                {errors.phone?.message}
              </p>
            )}
          </div>

          <div className={styles.passwordWrapper}>
            <label htmlFor="password">{`Password(የይለፍ ቃል)`}</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
              className={!!errors.password ? styles.invalid : undefined}
              aria-invalid={!!errors.password}
              aria-describedby={
                !!errors.password ? "password-error" : undefined
              }
            />
            {!!errors.password && (
              <p id="password-error" className={styles.errorMessage}>
                {errors.password?.message}
              </p>
            )}
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
