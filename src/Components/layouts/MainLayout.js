import { Outlet } from "react-router-dom";

// ✅ DOĞRU PATH (common klasöründen)
import Header from "../common/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
