import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { ProductList } from "./ProductList";
import CartPage from "./components/cartPage";

function App() {
  return (
    <ProductList>
      {" "}
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cartPage" element={<CartPage/>} />
        </Route>
      </Routes>
    </ProductList>
  );
}

export default App;
