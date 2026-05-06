import React from "react";
import { useTranslation } from "react-i18next";
import Spacer from "../common/Spacer";

function Aboutus() {
  const { t } = useTranslation();
  const highlightBrand = (text) => {
    const parts = text.split(/(Aypin Otomat)/g);
    return parts.map((part, i) =>
      part === "Aypin Otomat" ? (
        <span key={i} className="brand-name">Aypin Otomat</span>
      ) : (
        part
      )
    );
  };

  return (
    <section id="contact" className="contact">
      <Spacer />
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{t("HAKKIMIZDA")}</h2>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <table className="">
              <tbody>
                <tr>
                  <td>
                    <img
                      src="assets/img/Aypinautomat/10.webp"
                      className="img-fluid"
                      alt="Hakkımızda"
                      title="Hakkımızda"
                      style={{borderRadius: "5px" }}
                      width={"100%"}
                      height={"100%"}
                      loading="lazy"
                      decoding="async"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <div className="col-lg-7">
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {highlightBrand(
                t(
                  "Aypin Otomat, 2022 yılında kurulan yeni nesil CNC kayar otomat torna tezgahlarıyla özel pim, vida, somun gibi bağlantı elemanları üretim firmasıdır. Müşterilerimize yüksek kaliteli ürünler sunmak ve onların ihtiyaçlarını karşılamak için tutkuyla çalışıyoruz."
                )
              )}
              <br />
              <br />
              {highlightBrand(
                t(
                  "Modern teknolojiye yatırım yaparak üretim süreçlerimizi sürekli iyileştirmekteyiz. CNC torna tezgahlarımız, hassas ve kaliteli parçaların üretiminde bize büyük avantaj sağlamaktadır. Ürün yelpazemiz, çeşitli endüstriyel sektörlerde kullanılan çeşitli pimler ve bağlantı elemanlarını içermektedir."
                )
              )}
              <br />
              <br />
              {highlightBrand(
                t(
                  "Müşterilerimizin spesifik taleplerini karşılamak için özelleştirilmiş üretim çözümleri sunuyoruz. Kalite, hassasiyet ve dayanıklılık, üretim süreçlerimizin temel odak noktalarıdır."
                )
              )}
              <br />
              <br />
              {highlightBrand(
                t(
                  "Müşteri memnuniyetine büyük önem veriyoruz ve her bir müşteriye özel hassasiyet gösteriyoruz. İşbirliği ve uzun süreli ilişkiler kurarak müşterilerimizin gereksinimlerini anlamak ve onlara uygun çözümler sunmak için çalışıyoruz."
                )
              )}
            </p>
          </div>
          <br />
          <div className="col-lg-12">
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {highlightBrand(
                t(
                  "Aypin Otomat olarak, kalite standartlarına bağlılıkla sektörde öncü bir firma olmayı hedefliyoruz. Müşterilerimize değer katmayı, sürekli gelişimi teşvik etmeyi ve yenilikçi çözümler sunmayı amaçlıyoruz."
                )
              )}
              <br />
              <br />
              {highlightBrand(t("Bize güvenen müşterilerimize şimdiden teşekkür ederiz."))}
              <br />
              {highlightBrand(
                t(
                  "Sizlerle uzun vadeli ve başarılı iş ilişkileri kurmayı heyecanla bekliyoruz."
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
