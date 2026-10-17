import LoginForm from "./LoginForm";

const Login = async ({ searchParams }) => {
  const { next } = await searchParams;
  const redirectTo = next ? next : "/";
  return <LoginForm redirectTo={redirectTo} />;
};

export default Login;
