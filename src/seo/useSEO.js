import { useEffect } from "react";

const BASE_URL = "https://aypinotomat.com";
const OG_IMAGE_URL_WEBP = `${BASE_URL}/assets/img/Aypinautomat/sliderorj1.webp`;
const OG_IMAGE_URL_JPG = `${BASE_URL}/assets/img/Aypinautomat/sliderorj.jpg`;

function upsertMetaByName(name, content) {
  if (!content) return;
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) {
    el.setAttribute("content", content);
  } else {
    const m = document.createElement("meta");
    m.setAttribute("name", name);
    m.setAttribute("content", content);
    document.head.appendChild(m);
  }
}

function upsertMetaByProperty(property, content) {
  if (!content) return;
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el) {
    el.setAttribute("content", content);
  } else {
    const m = document.createElement("meta");
    m.setAttribute("property", property);
    m.setAttribute("content", content);
    document.head.appendChild(m);
  }
}

function upsertLink(rel, href) {
  if (!href) return;
  const el = document.querySelector(`link[rel="${rel}"]`);
  if (el) {
    el.setAttribute("href", href);
  } else {
    const l = document.createElement("link");
    l.setAttribute("rel", rel);
    l.setAttribute("href", href);
    document.head.appendChild(l);
  }
}

function appendMetaByProperty(property, content) {
  if (!content) return;
  const m = document.createElement("meta");
  m.setAttribute("property", property);
  m.setAttribute("content", content);
  document.head.appendChild(m);
}

export default function useSEO({
  title,
  description,
  path = "/",
  image = OG_IMAGE_URL_WEBP,
  keywords,
  type = "website",
  breadcrumbs,
  faq,
  robots = "index, follow",
}) {
  useEffect(() => {
    if (title) document.title = title;

    const url = `${BASE_URL}${path}`;

    upsertMetaByName("description", description);
    upsertMetaByName("keywords", keywords);
    upsertMetaByName("robots", robots);

    upsertLink("canonical", url);
    upsertLink("alternate", url);

    upsertMetaByProperty("og:site_name", "Aypin Otomat");
    upsertMetaByProperty("og:type", type);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", url);
    upsertMetaByProperty("og:locale", "tr_TR");
    if (image) {
      upsertMetaByProperty("og:image", OG_IMAGE_URL_JPG);
      appendMetaByProperty("og:image", image);
      upsertMetaByProperty("og:image:secure_url", OG_IMAGE_URL_JPG);
      upsertMetaByProperty("og:image:alt", "Aypin Otomat");
      upsertMetaByProperty("og:image:width", "1200");
      upsertMetaByProperty("og:image:height", "630");
      upsertMetaByProperty("og:image:type", "image/jpeg");
      upsertMetaByName("twitter:image", OG_IMAGE_URL_JPG);
      upsertMetaByName("twitter:image:alt", "Aypin Otomat");
    }

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);

    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      const scriptId = "jsonld-breadcrumb";
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      const itemListElement = breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: b.name,
        item: `${BASE_URL}${b.path || "/"}`,
      }));
      const json = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
      };
      script.textContent = JSON.stringify(json);
      document.head.appendChild(script);
    }

    if (Array.isArray(faq) && faq.length > 0) {
      const scriptId = "jsonld-faq";
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      const mainEntity = faq.map((qa) => ({
        "@type": "Question",
        name: qa.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: qa.answer,
        },
      }));
      const json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity,
      };
      script.textContent = JSON.stringify(json);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, keywords, type]);
}

