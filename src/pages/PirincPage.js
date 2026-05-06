import React from "react";
import Pirinc from "../Components/urunlerimiz/Pirinc";
import PageHeader from "../Components/common/PageHeader";
import { useTranslation } from "react-i18next";
import TopBar from "../Components/common/TopBar";
import Spacer4 from "../Components/common/Spacer4";
import useSEO from "../seo/useSEO";

function PirincPage() {
  const { t } = useTranslation();
  useSEO({
    title: "Özel Üretim Pirinç Parçalar | Aypin Otomat",
    description:
      "Özel pirinç parçalar; yüksek kalite, işlenebilirlik ve korozyon direnci.",
    path: "/Pirinc",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Ürünlerimiz", path: "/Portfolios" },
      { name: "Pirinç Parçalar", path: "/Pirinc" }
    ],
    faq: [
      {
        question: "Pirinç malzeme hangi uygulamalar için uygundur?",
        answer: "Korozyon direnci ve işlenebilirliği sayesinde elektrik, otomotiv ve dekoratif uygulamalar için uygundur.",
      },
      {
        question: "Malzeme sertifikası sağlayabiliyor musunuz?",
        answer: "İstenirse malzeme sertifikaları ve kalite dokümantasyonu sağlıyoruz.",
      },
      {
        question: "Teslim süreleri nasıl?",
        answer: "Adet ve operasyonlara bağlı olarak planlama sonrası net termin veriyoruz.",
      },
    ],
  });

  return (
    <>
      <TopBar />
      <Spacer4 />
      <PageHeader title={t("Özel Üretim Pirinç Parçalar")} />
      <Pirinc />
    </>
  );
}

export default PirincPage;
