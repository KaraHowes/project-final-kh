import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import AddThek from "./pages/AddThek";
import AllBags from "./pages/AllBags";
import FindThek from "./pages/FindThek";
import BagAdded from "./pages/BagAdded";
import SelectedBag from "./pages/SelectedBag";
import Starter from "./pages/Starter";
import Intro from "./pages/Intro";
import BagsFound from "./pages/BagsFound";
import Inspirations from "./pages/Inspirations";
import About from "./pages/About"
import MemberBag from "./pages/MemberBag"

import member from "./reducers/member";
import theks from "./reducers/theks";
import oneThek from "./reducers/oneThek";
import searched from "./reducers/searched";
import quote from "./reducers/quote";

const reducer = combineReducers({
  member: member.reducer,
  theks: theks.reducer,
  oneThek: oneThek.reducer,
  searched: searched.reducer,
  quote: quote.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/starter" element={<Starter />} />
          <Route path="/member/:memberId" element={<Profile />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AddThek" element={<AddThek />} />
          <Route path="/FindThek" element={<FindThek />} />
          <Route path="/AllBags" element={<AllBags />} />
          <Route path="/BagAdded" element={<BagAdded />} />
          <Route path="/bag/:_id" element={<SelectedBag />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/inspiration" element={<Inspirations />} />
          <Route path="/about" element={<About />} />
          <Route path="/bags/:memberId" element={<MemberBag />} />

          <Route path="/bagsFound" element={<BagsFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
