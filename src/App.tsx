import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router";
import Error from "./pages/Error";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Main />} />
          <Route path="/stock/:stock" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
