import { lazy, Suspense, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout";
import { GlobalLoader } from "components";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "pages/ErrorBoundry";
import ResetPassword from "pages/ResetPassword";
import PageNotFound from "pages/PageNotFound";
import ServerError from "pages/ServerError";
import { ThemeContext } from "context/ThemeProvider";

// Lazy-loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const SportsLandingPage = lazy(() => import("./pages/SportsLandingPage"));
const MyBets = lazy(() => import("./pages/MyBets"));
const LuckyDraw = lazy(() => import("./pages/LuckyDraw"));
const TransactionHistory = lazy(() => import("./pages/TransactionsHistory"));
const SportsHome = lazy(() => import("./pages/SportsHome"));
const CasinoHome = lazy(() => import("./pages/CasinoHome"));
const CasinoIframe = lazy(() => import("./pages/CasinoIframe"));
const SportsDetails = lazy(() => import("./pages/SportsDetails"));
const ResponsibleGaming = lazy(() =>
  import("./pages/StaticPages/ResponsibleGaming")
);
const PrivacyPolicy = lazy(() => import("./pages/StaticPages/PrivacyPolicy"));
const AffiliateProgram = lazy(() =>
  import("./pages/StaticPages/AffiliateProgram")
);
const Sportsbook = lazy(() => import("./pages/StaticPages/Sportsbook"));
const AntiMoneyLaundring = lazy(() =>
  import("./pages/StaticPages/AntiMoneyLaundring")
);
const WithdrawlPolicy = lazy(() =>
  import("./pages/StaticPages/WithdrawlPolicy")
);
const Provider = lazy(() => import("./pages/StaticPages/Provider"));
const FAQDW = lazy(() => import("./pages/StaticPages/FAQDW"));
const FairAuthenticate = lazy(() => import("./pages/StaticPages/FairAuthentic"));
const WithdrawCharges = lazy(() => import("./pages/StaticPages/WithdrawalCharges"));
const TermsService = lazy(() => import("./pages/StaticPages/TermsService"));

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={ <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}><Layout /> </ThemeContext.Provider>}>
              <Route index element={<HomePage />} />
              <Route path="/sports-landing/:id" element={<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}><SportsLandingPage /></ThemeContext.Provider>} />
              <Route path="/sports-home" element={<SportsHome />} />
              <Route path="/casino-home" element={<CasinoHome />} />
              <Route path="/my-bets" element={<MyBets />} />
              <Route path="/lucky-draw" element={<LuckyDraw />} />
              <Route path="/transaction-history" element={<TransactionHistory />} />
              <Route path="/game-entry/:id" element={<CasinoIframe />} />
              <Route path="/sports-details/:id" element={<SportsDetails />} />
              <Route
                path="/responsible-gaming"
                element={<ResponsibleGaming />}
              />
              <Route path="/fair-authentic" element={<FairAuthenticate />} />
              <Route path="/faq-deposits-withdrawls" element={<FAQDW />} />
              <Route path="/provider" element={<Provider />} />
              <Route path="/withdrawl-policy" element={<WithdrawlPolicy />} />
              <Route path="/withdrawl-charges" element={<WithdrawCharges />} />
              <Route
                path="/anti-money-laundring"
                element={<AntiMoneyLaundring />}
              />
              <Route path="/sportsbook" element={<Sportsbook />} />
              <Route path="/affiliate-program" element={<AffiliateProgram />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-service" element={<TermsService />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/server-error" element={<ServerError />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
