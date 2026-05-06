import React from "react";
import Contact from "../Components/contact/Contact";
import Slider2 from "../Components/common/Slider2";
import Portfolios from "../Components/urunlerimiz/Urunlerimiz";
import Aboutus from "../Components/about/Aboutus";
import TopBar from "../Components/common/TopBar";
import useSEO from "../seo/useSEO";

function HomePage() {
  useSEO({
    title: "Aypin Otomat - CNC Kayar Otomat - Bursa",
    description:
      "Aypin Otomat, Bursa’da CNC kayar otomat ile özel pim, vida, somun ve burç üretimi yapar.",
    path: "/",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" }
    ],
  });
  return (
    <>
      <TopBar />
      <Slider2 />
      <Aboutus/>
      <Portfolios />
      <Contact />
    </>
  );
}

export default HomePage;
