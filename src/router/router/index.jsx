import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function MyRoute() {
  const FirstPage = lazy(() => import("../../pages/Page1"));
  const SecondPage = lazy(() => import("../../pages/Page2"));
  return (
    <>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/2" element={<SecondPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default MyRoute;
