import React from "react";
import TopBar from "../Components/common/TopBar";
import Spacer2 from "../Components/common/Spacer2";
import PrivacyPolicy from "../Components/legal/PrivacyPolicy";
import useSEO from "../seo/useSEO";

function GizlilikPolitikasiPage() {
  useSEO({
    title: "Gizlilik Politikası | Aypin Otomat",
    description: "Aypin Otomat gizlilik politikası: Toplanan veriler, kullanım amaçları, paylaşım ve güvenlik.",
    path: "/gizlilik-politikasi",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Gizlilik Politikası", path: "/gizlilik-politikasi" }
    ],
    robots: "index, follow",
  });

  return (
    <>
      <TopBar />
      <Spacer2 />
      <PrivacyPolicy />
    </>
  );
}

export default GizlilikPolitikasiPage;
