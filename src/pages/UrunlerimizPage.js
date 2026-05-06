import React from "react";
import Portfolios from "../Components/urunlerimiz/Urunlerimiz";
import TopBar from "../Components/common/TopBar";
import Spacer2 from "../Components/common/Spacer2";
import useSEO from "../seo/useSEO";
import Urunlerimiz from "../Components/urunlerimiz/Urunlerimiz";

function UrunlerimizPage() {
  useSEO({
    title: "Ürünlerimiz | Aypin Otomat",
    description: "Ürün portföyümüz ve kategorilere göre üretimler.",
    path: "/Portfolios",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Ürünlerimiz", path: "/Urunlerimiz" }
    ],
  });
  return (
    <>
      <TopBar />
      <Spacer2/>
      <Urunlerimiz />
    </>
  );
}

export default UrunlerimizPage;
