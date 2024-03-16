import React, { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { createContext } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Cart from "./pages/Cart";

import "./scss/app.scss";

export const SortContext = createContext();
export const iSortContext = createContext();

export const FilterContext = createContext();
export const OffsetContext = createContext();

export const CartContext = createContext();
function App() {
  const [Sort, setSort] = useState(0);
  const [iSort, setiSort] = useState(false);
  const [Filter, setFilter] = useState(0);
  const [cart, setCart] = useState([]);
  const [Offset, setOffset] = useState(0);

  //добавить изменение стрелочки

  return (
    <>
      <iSortContext.Provider value={[iSort, setiSort]}>
        <SortContext.Provider value={[Sort, setSort]}>
          <FilterContext.Provider value={[Filter, setFilter]}>
            <CartContext.Provider value={[cart, setCart]}>
            <OffsetContext.Provider value={[Offset, setOffset]}>
              <div className="wrapper">
                <Header />
                <div className="content">
                  <div className="container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="*" element={<Error />} />
                    </Routes>
                  </div>
                </div>
              </div>
              </OffsetContext.Provider>
            </CartContext.Provider>
          </FilterContext.Provider>
        </SortContext.Provider>
      </iSortContext.Provider>
    </>
  );
}

export default App;
