import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router";
import Error from "./pages/Error";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/stock/:stock" element={<ProductDetail />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
