import React from "react";
import { SRLWrapper } from "simple-react-lightbox";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Burc() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <SRLWrapper>
      <section id="portfolio-details" className="portfolio-details">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-12">
              <ul className="nav nav-tabs flex-direction justify-content-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/civata" onClick={scrollToTop}>
                    {t("Özel Üretim Civatalar")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pim" onClick={scrollToTop}>
                    {t("Özel Üretim Pimler")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pirinc" onClick={scrollToTop}>
                    {t("Özel Üretim Pirinç Parçalar")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active show"
                    to="/burc"
                    onClick={scrollToTop}
                  >
                    {t("Özel Üretim Burçlar")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="portfolio-details-slider swiper">
                <div className="swiper-wrapper align-items-center">
                  <div className="swiper-slide">
                    <picture>
                      <source srcSet="assets/img/Aypinautomat/burc1.webp" type="image/webp" />
                      <img
                        src="assets/img/Aypinautomat/burc1.webp"
                        alt={t("Özel Üretim Burçlar")}
                        title={t("Özel Üretim Burçlar")}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 992px) 50vw, 100vw"
                      />
                    </picture>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="portfolio-description p-0">
                <h2 style={{ color: "#0000FF", textAlign: "center" }}>{t("Özel Üretim Burçlar")}</h2>
                <p style={{ textAlign: "justify" }}>
                  {t("Burc.Para1")}
                  <br /><br />
                  {t("Burc.Para2")}
                  <br /><br />
                  {t("Burc.Para3")}
                  <br /><br />
                  <a href="https://aypinotomat.com" style={{ color: "#fff" }} rel="noopener noreferrer">
                    {t("Burc.MoreInfo")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SRLWrapper>
  );
}

export default Burc;
