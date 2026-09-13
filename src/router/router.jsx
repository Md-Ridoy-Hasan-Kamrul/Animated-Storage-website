import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import AdminLayout from '../components/layout/admin/Layout';
import { ROUTES } from '../config';
import { selectIsAuthenticated } from '../store/slices/authSlice';

// Derive a relative segment from an absolute admin route path
const seg = (route) => route.replace(`${ROUTES.ADMIN}/`, '');

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Services = lazy(() => import('../pages/Services'));
const Login = lazy(() => import('../pages/Login'));
const TemplateDetail = lazy(() => import('../pages/TemplateDetail'));
const ThreeDPortfolioLive = lazy(
  () => import('../templates/landing-page/3d-portfolio/LivePage'),
);
const PromptArchiveLive = lazy(
  () => import('../templates/landing-page/prompt/LivePage'),
);
const PortfolioCosmicLive = lazy(
  () => import('../templates/portfolio/portfolio-cosmic/LivePage'),
);
const NeoMuseumLive = lazy(
  () => import('../templates/landing-page/neo-museum/LivePage'),
);
const AdamRobertsLive = lazy(
  () => import('../templates/portfolio/adam-roberts/LivePage'),
);
const LuminaLive = lazy(
  () => import('../templates/sections/lumina/LivePage'),
);
const HeritageGroveLive = lazy(
  () => import('../templates/footer/heritage-grove/LivePage'),
);
const VelorahLive = lazy(
  () => import('../templates/agency/velorah/LivePage'),
);
const FoldcraftLive = lazy(
  () => import('../templates/hero/foldcraft/LivePage'),
);
const LtxWorldLive = lazy(
  () => import('../templates/ecommerce/ltx-world/LivePage'),
);
const CastRenderLive = lazy(
  () => import('../templates/3d-website/cast-render/LivePage'),
);
const CharacterStudioLive = lazy(
  () => import('../templates/3d-website/3d-character-studio/LivePage'),
);
const ScrollTiedVideoLive = lazy(
  () => import('../templates/creative/scroll-tied-video/LivePage'),
);

// Admin pages — each lazy-loaded so they only download when visited
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Emails = lazy(() => import('../pages/admin/Emails'));
const Leads = lazy(() => import('../pages/admin/Leads'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const MarketplaceOrders = lazy(() => import('../pages/admin/MarketplaceOrders'));
const CaseStudies = lazy(() => import('../pages/admin/CaseStudies'));
const Blog = lazy(() => import('../pages/admin/Blog'));
const Jobs = lazy(() => import('../pages/admin/Jobs'));
const Pricing = lazy(() => import('../pages/admin/Pricing'));
const AdminMessages = lazy(() => import('../pages/admin/Messages'));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-black">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
  </div>
);

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-4 text-center text-white">
    <h1 className="text-6xl font-bold">404</h1>
    <p className="text-xl text-zinc-500">Page not found</p>
    <Link to={ROUTES.HOME} className="mt-2 text-sm font-medium text-zinc-300 hover:text-white">
      Back to Home
    </Link>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path="/templates/:id" element={<TemplateDetail />} />
      </Route>

      <Route
        path={ROUTES.JACK_PORTFOLIO}
        element={
          <Suspense fallback={<PageLoader />}>
            <ThreeDPortfolioLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.PROMPT_ARCHIVE}
        element={
          <Suspense fallback={<PageLoader />}>
            <PromptArchiveLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.PORTFOLIO_COSMIC}
        element={
          <Suspense fallback={<PageLoader />}>
            <PortfolioCosmicLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.NEO_MUSEUM}
        element={
          <Suspense fallback={<PageLoader />}>
            <NeoMuseumLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ADAM_ROBERTS}
        element={
          <Suspense fallback={<PageLoader />}>
            <AdamRobertsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LUMINA}
        element={
          <Suspense fallback={<PageLoader />}>
            <LuminaLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.HERITAGE_GROVE}
        element={
          <Suspense fallback={<PageLoader />}>
            <HeritageGroveLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VELORAH}
        element={
          <Suspense fallback={<PageLoader />}>
            <VelorahLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FOLDCRAFT}
        element={
          <Suspense fallback={<PageLoader />}>
            <FoldcraftLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LTX_WORLD}
        element={
          <Suspense fallback={<PageLoader />}>
            <LtxWorldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CAST_RENDER}
        element={
          <Suspense fallback={<PageLoader />}>
            <CastRenderLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CHARACTER_STUDIO}
        element={
          <Suspense fallback={<PageLoader />}>
            <CharacterStudioLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SCROLL_TIED_VIDEO}
        element={
          <Suspense fallback={<PageLoader />}>
            <ScrollTiedVideoLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route path={seg(ROUTES.ADMIN_DASHBOARD)} element={<Dashboard />} />
        <Route path={seg(ROUTES.ADMIN_EMAILS)} element={<Emails />} />
        <Route path={seg(ROUTES.ADMIN_LEADS)} element={<Leads />} />
        <Route path={seg(ROUTES.ADMIN_ORDERS)} element={<Orders />} />
        <Route path={seg(ROUTES.ADMIN_MARKETPLACE_ORDERS)} element={<MarketplaceOrders />} />
        <Route path={seg(ROUTES.ADMIN_CASE_STUDIES)} element={<CaseStudies />} />
        <Route path={seg(ROUTES.ADMIN_BLOG)} element={<Blog />} />
        <Route path={seg(ROUTES.ADMIN_JOBS)} element={<Jobs />} />
        <Route path={seg(ROUTES.ADMIN_PRICING)} element={<Pricing />} />
        <Route path={seg(ROUTES.ADMIN_MESSAGES)} element={<AdminMessages />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

export default router;
