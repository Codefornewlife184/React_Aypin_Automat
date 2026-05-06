/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import Spacer from "../common/Spacer";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const [sending, setSending] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const [noticeType, setNoticeType] = React.useState("info");

  function sendEmail(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }
    const formData = new FormData(e.target);
    const endpoint = process.env.REACT_APP_MAIL_ENDPOINT || "/mail/send.php";
    setSending(true);
    setNotice(t("Gönderiliyor..."));
    setNoticeType("info");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    fetch(endpoint, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    })
      .then(async (res) => {
        let data = {};
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          data = await res.json().catch(() => ({}));
        } else {
          const text = await res.text().catch(() => "");
          data = { ok: res.ok, message: text };
        }
        if (res.ok && data.ok) {
          setNotice(t("Email başarıyla gönderildi!"));
          setNoticeType("success");
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              send_to: 'AW-11391105725/fAggCOb_odsbEL312bcq'
            });
          }
          e.target.reset();
        } else {
          const msg = (data && (data.error || data.message)) ? `${data.message || ''} ${data.error || ''}`.trim() : null;
          setNotice(msg || t("Email gönderilirken bir hata oluştu!"));
          setNoticeType("error");
        }
      })
      .catch((err) => {
        if (err && err.name === "AbortError") {
          setNotice(t("Sunucu yanıt vermedi. Lütfen tekrar deneyin."));
        } else {
          setNotice(t("Email gönderilirken bir hata oluştu!"));
        }
        setNoticeType("error");
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setSending(false);
        setTimeout(() => setNotice(""), 6000);
      });
  }

  return (
    <>
      {notice && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: noticeType === "success" ? "#e6ffed" : "#ffe6e6",
            color: noticeType === "success" ? "#065f46" : "#7f1d1d",
            border: "1px solid",
            borderColor: noticeType === "success" ? "#34d399" : "#f87171",
            borderRadius: 12,
            padding: "12px 16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
          role="alert"
        >
          <span style={{ fontWeight: 600 }}>
            {notice}
          </span>
          <button
            onClick={() => setNotice("")}
            style={{
              border: "none",
              background: "transparent",
              color: noticeType === "success" ? "#065f46" : "#7f1d1d",
              cursor: "pointer",
              fontWeight: 700,
            }}
            aria-label="Kapat"
          >
            ×
          </button>
        </div>
      )}
      <section id="services" className="services section-bg">
        <Spacer />
        <div className="container" data-aos="fade-up">
          <div
            className="section-title"
            data-aos="fade-in"
            data-aos-delay="100"
          >
            <h2>{t("İLETİŞİM")}</h2>
            <p>
              {t(
                "Soru, görüş, öneri ve istekleriniz için aşağıdaki bilgiler aracılığıyla bize 7/24 ulaşabilirsiniz."
              )}
            </p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-10">
              <div className="icon-box" data-aos="fade-up">
                <div className="icon text-center">
                  <i className="bx bx-map"></i>
                </div>
                <h3 className="title text-center">{t("Adresimiz")}</h3>
                <p className="description text-center">
                  Çalı Mahallesi Ömer Biltekin Caddesi No : 4/A Nilüfer / Bursa
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                <div className="icon text-center">
                  <i className="bx bx-phone-call"></i>
                </div>
                <h3 className="title text-center">{t("Gsm")}</h3>
                <p className="description text-center">
                  <a
                    href="tel:+905321621647"
                    aria-label="Telefon araması başlat: +90 532 162 1647"
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('event', 'phone_click', {
                          event_category: 'engagement',
                          event_label: 'contact_phone',
                        });
                      }
                    }}
                  >
                    (+90) 532 162 1647
                  </a>
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                <div className="icon text-center">
                  <i className="bx bx-envelope"></i>
                </div>
                <h3 className="title text-center">{t("Email")}</h3>
                <p className="description text-center">
                  <a
                    href="mailto:info@aypinotomat.com"
                    aria-label="E-posta gönder: info@aypinotomat.com"
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('event', 'email_click', {
                          event_category: 'engagement',
                          event_label: 'contact_email',
                        });
                      }
                    }}
                  >
                    info@aypinotomat.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="row contact mb-5">
            <div className="col-lg-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2155.620981177162!2d28.922950726466162!3d40.17549727984258!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x61e0586e850849b9%3A0x44231d1c42788894!2sAypin%20Otomat%20%7C%20CNC%20Kayar%20Otomat%20%7C%20Bursa!5e0!3m2!1sen!2str!4v1766210939547!5m2!1sen!2str"
                style={{
                  border: "4px solid white",
                  width: "100%",
                  height: "385px",
                  boxShadow: "0 0 30px #44589072;",
                }}
                title="Google Map"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="col-lg-6">
              <form className="php-email-form" onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder={t("Adınız")}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      name="user_email"
                      className="form-control"
                      placeholder={t("Emailiniz")}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder={t("Konu")}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      name="message"
                      className="form-control"
                      placeholder={t("Mesajınız")}
                      cols="40"
                      rows="5"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="submit"
                      value={t("Gönder")}
                      className="form-control mt-3"
                      style={{
                        borderRadius: "50px",
                        background: "#0000ff",
                        color: "#fff",
                      }}
                      disabled={sending}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
