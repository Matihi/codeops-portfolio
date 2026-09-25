import Layout from "./components/Layout/Layout";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./components/ErrorFallBack/ErrorFallBack";

const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const DishDetail = lazy(() => import("./pages/DishDetail/DishDetail"));
import Home from "./pages/Home/Home";
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./guards/authentication/RequireAuth";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              <Layout />
            </ErrorBoundary>
          }
        >
          <Route
            index
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="menu"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Menu Page...</div>}>
                  <Menu />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="menu/:slug"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Dish Page...</div>}>
                  <DishDetail />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="cart"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Cart Page...</div>}>
                  <Cart />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="checkout"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Checkout Page...</div>}>
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="register"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Registration Page...</div>}>
                  <Register />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Login Page...</div>}>
                  <Login />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="*"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallBack}>
                <Suspense fallback={<div>Loading Not Found Page...</div>}>
                  <NotFound />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
