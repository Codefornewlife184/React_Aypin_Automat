/* eslint-disable no-unused-vars */
import React, { useState } from "react";import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isProductsActive = ["/urunlerimiz", "/civata", "/pim", "/pirinc", "/burc"].includes(
    (location.pathname || "").toLowerCase()
  );

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
  // 1. Sayfayı en üste taşı
  window.scrollTo(0, 0);
  
  // 2. Mobil menü açıksa kapat
  if (setExpanded) {
    setExpanded(false);
  }

  // 3. Google Ads Takibi (Mükemmel dönüşüm için)
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-11391105725/2wM5CLnr-9kbEL312bcq', // Senin telefon/sayfa etiket kodun
      'value': 1.0,
      'currency': 'TRY'
    });
  }
};

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Navbar
        id="header"
        className="fixed-top header-inner-pages"
        expand="lg"
        expanded={expanded}
      >
        <Container className="container d-flex align-items-center justify-content-center">
          <Link to="/" className="logo" onClick={handleClick}>
            <img
              src="/assets/img/Aypinautomat/aypin 1.webp"
              alt="Aypin Otomat Logo"
              className="img-fluid"
              maxWidth={"100%"}
              height={"100%"}
            />
          </Link>
          <Navbar.Toggle onClick={toggleNav} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            expanded={expanded}
            className="justify-content-center"
            id="basic-navbar-nav"
          >
            <Nav className="ms-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                onClick={handleClick}
                className={({ isActive }) => `nav-link scrollto${isActive ? " active" : ""}`}
              >
                {t("Ana Sayfa")}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/hakkimizda"
                className={({ isActive }) => `nav-link scrollto${isActive ? " active" : ""}`}
                onClick={handleClick}
              >
                {t("Hakkımızda")}
              </Nav.Link>

              <NavDropdown
                title={
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <span
                      className="nav-link scrollto"
                      style={{ color: "#fff" }}
                      onClickCapture={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate("/urunlerimiz");
                        handleClick();
                      }}
                    >
                      {t("Ürünlerimiz")}
                    </span>
                  </span>
                }
                id="collasible-nav-dropdown"
                className="nav-link scroolto"
              >
                <NavDropdown.Item as={NavLink} to="/civata" onClick={handleClick}>
                  {t("Özel Üretim Civatalar")}
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/pim" onClick={handleClick}>
                  {t("Özel Üretim Pimler")}
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/pirinc" onClick={handleClick}>
                  {t("Özel Üretim Pirinç Parçalar")}
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/burc" onClick={handleClick}>
                  {t("Özel Üretim Burçlar")}
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                as={NavLink}
                to="/uretim"
                className={({ isActive }) => `nav-link scrollto${isActive ? " active" : ""}`}
                onClick={handleClick}
              >
                {t("Üretim")}
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/iletisim"
                className={({ isActive }) => `nav-link scrollto${isActive ? " active" : ""}`}
                onClick={handleClick}
              >
                {t("İletişim")}
              </Nav.Link>
              <Nav.Link
                href="https://wa.me/905321621647"
                title={t("Bize Whatsapptan Ulaşın")}
                target={"_blank"}
                className="social-links"
                rel="noopener noreferrer"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'whatsapp_click', {
                      event_category: 'engagement',
                      event_label: 'header_whatsapp',
                    });
                  }
                }}
              >
                <i className="bx bxl-whatsapp" style={{ fontSize: "24px" }}></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
