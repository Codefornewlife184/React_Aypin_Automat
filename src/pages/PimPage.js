import React from "react";
import Pim from "../Components/urunlerimiz/Pim";
import PageHeader from "../Components/common/PageHeader";
import Spacer4 from "../Components/common/Spacer4";
import { useTranslation } from "react-i18next";
import TopBar from "../Components/common/TopBar";
import useSEO from "../seo/useSEO";

function PimPage() {
  const { t } = useTranslation();
  useSEO({
    title: "Özel Üretim Pimler | Aypin Otomat",
    description:
      "Özel pim üretimi; hassas toleranslı CNC kayar otomat çözümleri.",
    path: "/Pim",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Ürünlerimiz", path: "/Portfolios" },
      { name: "Pim", path: "/Pim" }
    ],
    faq: [
      {
        question: "Pimlerde hangi toleransları sağlayabiliyorsunuz?",
        answer: "Proje gereksinimlerine göre hassas toleranslarda üretim yapıyoruz.",
      },
      {
        question: "Özel geometri ve ölçüler mümkün mü?",
        answer: "CNC kayar otomat ile özel geometri ve ölçülerde üretim yapıyoruz.",
      },
      {
        question: "Numune üretimi yapıyor musunuz?",
        answer: "Talep üzerine numune üretimi ve doğrulama desteği veriyoruz.",
      },
    ],
  });

  return (
    <>
      <TopBar />
      <Spacer4 />
      <PageHeader title={t("Özel Üretim Pimler")} />
      <Pim />
    </>
  );
}

export default PimPage;
