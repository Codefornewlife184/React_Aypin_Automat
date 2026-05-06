import React from "react";
import Spacer from "../common/Spacer";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <section id="privacy" className="contact">
      <Spacer />
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{t("Gizlilik Politikası")}</h2>
          <p style={{ marginTop: "8px" }}>{t("Gizlilik.SonGuncelleme")}</p>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {t("Gizlilik.Para1")}
            </p>
          </div>

          <div className="col-lg-12">
            <h3 style={{ fontSize: "18px", marginTop: "16px" }}>{t("Gizlilik.ToplananVerilerBaslik")}</h3>
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {t("Gizlilik.ToplananVerilerMetin")}
            </p>
          </div>

          <div className="col-lg-12">
            <h3 style={{ fontSize: "18px", marginTop: "16px" }}>{t("Gizlilik.KullanimBaslik")}</h3>
            <ul style={{ fontSize: "16px" }}>
              <li>{t("Gizlilik.Kullanim.L1")}</li>
              <li>{t("Gizlilik.Kullanim.L2")}</li>
              <li>{t("Gizlilik.Kullanim.L3")}</li>
            </ul>
          </div>

          <div className="col-lg-12">
            <h3 style={{ fontSize: "18px", marginTop: "16px" }}>{t("Gizlilik.UcuncuSahisBaslik")}</h3>
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {t("Gizlilik.UcuncuSahisMetin")}
            </p>
          </div>

          <div className="col-lg-12">
            <h3 style={{ fontSize: "18px", marginTop: "16px" }}>{t("Gizlilik.GuvenlikBaslik")}</h3>
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {t("Gizlilik.GuvenlikMetin")}
            </p>
          </div>

          <div className="col-lg-12">
            <h3 style={{ fontSize: "18px", marginTop: "16px" }}>{t("Gizlilik.IletisimBaslik")}</h3>
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              {t("Gizlilik.IletisimMetin")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
