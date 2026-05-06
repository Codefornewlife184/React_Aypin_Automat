import React from "react";
import Contact from "../Components/contact/Contact";
import TopBar from "../Components/common/TopBar";
import Spacer2 from "../Components/common/Spacer2";
import useSEO from "../seo/useSEO";

function ContactPage() {
  useSEO({
    title: "İletişim | Aypin Otomat",
    description:
      "Aypin Otomat iletişim: Çalı Mahallesi Ömer Biltekin Caddesi No:4/A Nilüfer/Bursa, +90 532 162 1647.",
    path: "/Contact",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "İletişim", path: "/Contact" }
    ],
  });
  return (
    <>
      <TopBar />
      <Spacer2/>
      <Contact />
    </>
  );
}

export default ContactPage;
