import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutusPage from "../pages/AboutusPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import CivataPage from "../pages/CivataPage";
import PimPage from "../pages/PimPage";
import BurcPage from "../pages/BurcPage";
import PirincPage from "../pages/PirincPage";
import UretimPage from "../pages/UretimPage";
import UrunlerimizPage from "../pages/UrunlerimizPage";
import GizlilikPolitikasiPage from "../pages/GizlilikPolitikasiPage";

import KayarOtomat from "../Components/urunlerimiz/KayarOtomat";
import MainLayout from "../Components/layouts/MainLayout";

const CustomRoutes = () => {
  return (
    <Routes>
      {/* LAYOUT */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hakkimizda" element={<AboutusPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/urunlerimiz" element={<UrunlerimizPage />} />
        <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasiPage />} />
        <Route path="/uretim" element={<UretimPage />} />
        <Route path="/pirinc" element={<PirincPage />} />
        <Route path="/burc" element={<BurcPage />} />
        <Route path="/pim" element={<PimPage />} />
        <Route path="/civata" element={<CivataPage />} />
        <Route path="/cnc/kayar-otomat" element={<KayarOtomat />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
