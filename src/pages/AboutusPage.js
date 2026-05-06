import React from "react";
import Aboutus from "../Components/about/Aboutus";
import TopBar from "../Components/common/TopBar";
import Spacer2 from "../Components/common/Spacer2";
// import Spacer2 from "../Components/common/Spacer2";
import useSEO from "../seo/useSEO";

function AboutPage() {
  useSEO({
    title: "Kurumsal | Aypin Otomat",
    description:
      "Kurumsal bilgilerimiz, vizyonumuz ve üretim anlayışımız; Bursa Nilüfer’de talaşlı imalat.",
    path: "/Aboutus",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Kurumsal", path: "/Aboutus" }
    ],
  });
  return (
    <>
      <TopBar />
      <Spacer2/>
      <Aboutus />
    </>
  );
}

export default AboutPage;
