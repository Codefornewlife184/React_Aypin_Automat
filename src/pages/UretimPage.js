import React from "react";
import TopBar from "../Components/common/TopBar";
import Spacer2 from "../Components/common/Spacer2";
import useSEO from "../seo/useSEO";
import Uretim from "../Components/uretim/Uretim";

function UretimPage() {
  useSEO({
    title: "Üretim | Aypin Otomat",
    description:
      "Özel civatalar, pimler, pirinç parçalar ve burçlar üretimi; yüksek hassasiyet ve kalite.",
    path: "/uretim",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Üretim", path: "/uretim" }
    ],
    faq: [
      {
        question: "Teklif için hangi bilgiler gerekli?",
        answer: "Adet, malzeme, tolerans, yüzey işlemleri ve teknik çizim paylaşılması yeterlidir.",
      },
      {
        question: "Kalite kontrol süreçleriniz nelerdir?",
        answer: "Ölçüm ve görünüm kontrolleri, gerekirse sertifika ve raporlama sağlanır.",
      },
      {
        question: "Kargolama ve paketleme nasıl yapılır?",
        answer: "Ürüne uygun koruyucu paketleme ve güvenli kargo ile sevk edilir.",
      },
    ],
  });
  return (
    <>
      <TopBar />
      <Spacer2 />
      <Uretim />
    </>
  );
}

export default UretimPage;
