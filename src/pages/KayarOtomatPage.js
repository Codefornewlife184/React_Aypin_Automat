import React, { useEffect } from "react";
import TopBar from "../Components/common/TopBar";
import Spacer2 from "../Components/common/Spacer2";
import useSEO from "../seo/useSEO";
import KayarOtomat from "../Components/urunlerimiz/KayarOtomat";

function KayarOtomatPage() {
  // Sayfa yüklendiğinde en üste çıkmasını garanti et
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "CNC Kayar Otomat Hizmetleri | Aypin Otomat",
    description: "Bursa Nilüfer'de hassas CNC kayar otomat ve talaşlı imalat hizmetleri.",
    path: "/cnc/kayar-otomat",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Ürünlerimiz", path: "/urunlerimiz" },
      { name: "Kayar Otomat", path: "/cnc/kayar-otomat" }
    ],
  });

 return (
    <>
      <KayarOtomat />
    </>
);
}

export default KayarOtomatPage;