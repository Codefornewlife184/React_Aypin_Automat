import React from 'react'
import TopBar from '../Components/common/TopBar'
import useSEO from "../seo/useSEO";

function TopBarPage() {
  useSEO({
    title: "Üst Bar | Aypin Otomat",
    description: "Navigasyon ve üst bilgi bileşeni.",
    path: "/TopBar",
    robots: "noindex, nofollow",
    breadcrumbs: [
      { name: "Ana Sayfa", path: "/" },
      { name: "Üst Bar", path: "/TopBar" }
    ],
  });
  return (
    <>
        <TopBar/>
    </>
  )
}

export default TopBarPage
