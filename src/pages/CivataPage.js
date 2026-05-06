import React from "react";
import Civata from "../Components/urunlerimiz/Civata";
import PageHeader from "../Components/common/PageHeader";
import { useTranslation } from "react-i18next";
import TopBar from "../Components/common/TopBar";
import Spacer4 from "../Components/common/Spacer4";
import useSEO from "../seo/useSEO";

function CivataPage() {
  const { t } = useTranslation();
  useSEO({
    title: "Özel Üretim Civatalar | Aypin Otomat",
    description:
      "Özel üretim civata imalatı; alaşımlı çelik, paslanmaz ve pirinç seçenekleri.",
    path: "/Civata",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Ürünlerimiz", path: "/Portfolios" },
      { name: "Civata", path: "/Civata" }
    ],
    faq: [
      {
        question: "Hangi malzemelerle civata üretiyorsunuz?",
        answer: "Alaşımlı çelik, paslanmaz çelik ve pirinç ile özel üretim yapıyoruz.",
      },
      {
        question: "Minimum sipariş miktarı nedir?",
        answer: "Proje bazlı çalışıyoruz; adet ve toleranslara göre teklif veriyoruz.",
      },
      {
        question: "Yüzey kaplama seçenekleri mevcut mu?",
        answer: "İsteğe bağlı olarak kaplama ve ısıl işlem seçenekleri sunuyoruz.",
      },
    ],
  });

  return (
    <>
      <TopBar/>
      <Spacer4/>
      <PageHeader title={t("Özel Üretim Civatalar")} />
      <Civata />
    </>
  );
}

export default CivataPage;
