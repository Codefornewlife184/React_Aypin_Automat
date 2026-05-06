import React from "react";
import { useTranslation } from "react-i18next";
import Burc from "../Components/urunlerimiz/Burc";
import PageHeader from "../Components/common/PageHeader";

import TopBar from "../Components/common/TopBar";
import Spacer4 from "../Components/common/Spacer4";
import useSEO from "../seo/useSEO";

function BurcPage() {
  const { t } = useTranslation();
  useSEO({
    title: "Özel Üretim Burçlar | Aypin Otomat",
    description:
      "Özel burç üretimi; endüstriyel yataklama ve sürtünme azaltma çözümleri.",
    path: "/Burc",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Ürünlerimiz", path: "/Portfolios" },
      { name: "Burç", path: "/Burc" }
    ],
    faq: [
      {
        question: "Burçlarda hangi malzemeleri kullanıyorsunuz?",
        answer: "Uygulamaya göre çelik, pirinç ve özel alaşımlar kullanıyoruz.",
      },
      {
        question: "Burç tolerans ve yüzey pürüzlülüğü seviyeleri nedir?",
        answer: "Proje gereksinimlerine uygun tolerans ve pürüzlülük seviyelerinde üretim yapıyoruz.",
      },
      {
        question: "Özel yağlama kanalları veya tasarımlar mümkün mü?",
        answer: "İhtiyaç halinde özel yağlama kanalları ve tasarımları uyguluyoruz.",
      },
    ],
  });

  return (
    <>
      <TopBar />
      <Spacer4 />
      <PageHeader title={t("Özel Üretim Burçlar")} />
      <Burc />
    </>
  );
}

export default BurcPage;
