import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Container,
  Navbar,
  Sidebar,
  Footer,
  BetSlipSlider,
  GlobalLoader,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { ToastProvider, useInactivityLogout } from "hooks";
import { footer } from "assets/svg/footer";
import {
  setIsLiveIframeFull,
  setMbIframeFull,
} from "../redux/reducers/dashboard";
import { ThemeContext } from "context/ThemeProvider";

const Layout = () => {
  const mainContentRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );
  const [showNavbar, setShowNavbar] = useState(false);
  const { loading } = useSelector((state) => state?.auth);
  const { selectedCurrency, betSlipToggle, isMbIframeFull, isLiveIframeFull } =
    useSelector((state) => state?.dashboard);
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= 1200 && window.innerWidth >= 1024
  );
  useEffect(() => {
    if (!location?.pathname?.includes("sports-details")) {
      dispatch(setIsLiveIframeFull(false));
      dispatch(setMbIframeFull(false));
    }
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200 && window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location, dispatch]);

  useInactivityLogout();

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(mainContentRef.current.scrollTop > 0);
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    const handleOrientationChange = () => setIsLandscape(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleOrientationChange);
    return () =>
      mediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.scrollTo(0, 0); // Scroll to the top
    }
  }, [location.pathname]);

  const getWhatsappNumber = () => {
    switch (selectedCurrency?.label) {
      case "INR":
        return "+919368547870";
      case "PKR":
        return "+15487881051";
      default:
        return null;
    }
  };

  const sportsLanding = location.pathname.includes("sports-landing");
  const sportsDetails = location.pathname.includes("sports-details");
  const isCricket = sportsDetails || sportsLanding;

  return (
    <ToastProvider>
      <>
        {loading && <GlobalLoader />}
        <div
          className={`${
            theme === "light" && isCricket ? "bg-white" : "bg-themeBlack"
          } min-h-screen no-scrollbar`}
        >
          <Navbar
            showNavbar={showNavbar}
            setSidebarToggle={setSidebarToggle}
            sidebarToggle={sidebarToggle}
            betSlipToggle={betSlipToggle}
            isLandscape={isLandscape}
          />
          <section
            className={`${
              isLiveIframeFull ||
              isMbIframeFull ||
              (window.innerWidth < 1024 &&
                isLandscape &&
                location?.pathname.includes("game-entry"))
                ? "h-screen"
                : "pt-[4.5rem] max-h-screen"
            } flex no-scrollbar`}
          >
            <Sidebar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              isSmallScreen={isSmallScreen}
            />
            <div
              ref={mainContentRef}
              id="main-content"
              className={` p-0 ${
                isSmallScreen ? "pl-[72px]" : ""
              } w-full overflow-auto no-scrollbar`}
            >
              <Container>
                <Outlet />
                {isMbIframeFull || isLiveIframeFull ? null : <Footer />}
              </Container>
            </div>
            <BetSlipSlider betSlipToggle={betSlipToggle} />
            {isMbIframeFull || isLiveIframeFull ? null : (
              <a
                className={`fixed bottom-[100px] md:bottom-[100px] lg:bottom-[100px]  right-4 md:right-5 ${
                  betSlipToggle ? "z-10" : "z-50"
                }`}
                href={`https://wa.me/${getWhatsappNumber()}?text=Hello%20there!`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={footer?.whatsappBig}
                  loading="lazy"
                  alt="Social Icons"
                  className="w-12 l-12 lg:w-16 lg:h-16"
                />
              </a>
            )}
          </section>
        </div>
      </>
    </ToastProvider>
  );
};

export default Layout;
