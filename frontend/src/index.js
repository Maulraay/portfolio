import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import './theme/global.css';
import App from "./views/App";
import Loading from "./views/loading/Loading";

const root = createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
