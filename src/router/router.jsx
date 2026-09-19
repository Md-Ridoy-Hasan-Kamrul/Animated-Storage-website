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
const WarpFieldDefaultLive = lazy(
  () => import('../templates/sections/warp-field-default/LivePage'),
);
const WarpFieldLetterStormLive = lazy(
  () => import('../templates/sections/warp-field-letter-storm/LivePage'),
);
const WarpFieldKeycapDriftLive = lazy(
  () => import('../templates/sections/warp-field-keycap-drift/LivePage'),
);
const WarpFieldHyperspaceLive = lazy(
  () => import('../templates/sections/warp-field-hyperspace/LivePage'),
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
const WovenClothLive = lazy(
  () => import('../templates/3d-website/woven-cloth/LivePage'),
);
const WovenClothIridescentLive = lazy(
  () => import('../templates/3d-website/woven-cloth-iridescent/LivePage'),
);
const WovenClothAtelierLive = lazy(
  () => import('../templates/3d-website/woven-cloth-atelier/LivePage'),
);
const WovenClothWashiLive = lazy(
  () => import('../templates/3d-website/woven-cloth-washi/LivePage'),
);
const ScrollTiedVideoLive = lazy(
  () => import('../templates/creative/scroll-tied-video/LivePage'),
);
const MostarCityLive = lazy(
  () => import('../templates/travel/mostar-city/LivePage'),
);
const StillmindLive = lazy(
  () => import('../templates/hero/stillmind/LivePage'),
);
const IntelligentOperationsLive = lazy(
  () => import('../templates/agency/intelligent-operations/LivePage'),
);
const InteractiveDiscoveryLive = lazy(
  () => import('../templates/hero/interactive-discovery/LivePage'),
);
const NikeHoverLive = lazy(
  () => import('../templates/features/nike-hover/LivePage'),
);
const SynthModeLive = lazy(
  () => import('../templates/fashion/synth-mode/LivePage'),
);
const TechForwardLive = lazy(
  () => import('../templates/hero/tech-forward/LivePage'),
);
const ContactCyberneticLive = lazy(
  () => import('../templates/hero/contact-cybernetic/LivePage'),
);
const WellnessHeroLive = lazy(
  () => import('../templates/hero/wellness-hero/LivePage'),
);
const MindBodyHealingLive = lazy(
  () => import('../templates/medicine/mind-body-healing/LivePage'),
);
const VeyraElectricLive = lazy(
  () => import('../templates/automative/veyra-electric/LivePage'),
);
const RealTimeAlertsLive = lazy(
  () => import('../templates/sign-in/real-time-alerts/LivePage'),
);
const EquilibriumLive = lazy(
  () => import('../templates/hero/equilibrium/LivePage'),
);
const ScalingPlatformLive = lazy(
  () => import('../templates/saas/scaling-platform/LivePage'),
);
const KageLive = lazy(() => import('../templates/landing-page/kage/LivePage'));
const SketchbookLive = lazy(
  () => import('../templates/landing-page/sketchbook/LivePage'),
);
const SublevelStudioLive = lazy(
  () => import('../templates/landing-page/sublevel-studio/LivePage'),
);
const LivingGreenLive = lazy(
  () => import('../templates/hero/living-green/LivePage'),
);
const CompleteShelfLive = lazy(
  () => import('../templates/landing-page/complete-shelf/LivePage'),
);
const BestsellersBookShowcaseLive = lazy(
  () => import('../templates/landing-page/bestsellers-book-showcase/LivePage'),
);
const LivingGreenSylvaLivingWorldLive = lazy(
  () => import('../templates/background/living-green-sylva-living-world/LivePage'),
);
const LogicCoreStructureFlowLive = lazy(
  () => import('../templates/background/logic-core-structure-flow/LivePage'),
);
const TopologyFieldStructureFlowLive = lazy(
  () => import('../templates/background/topology-field-structure-flow/LivePage'),
);
const NebulaStructureFlowLive = lazy(
  () => import('../templates/background/nebula-structure-flow/LivePage'),
);
const FluxVortexStructureFlowLive = lazy(
  () => import('../templates/background/flux-vortex-structure-flow/LivePage'),
);
const OverrideGridPredictiveArcLive = lazy(
  () => import('../templates/background/override-grid-predictive-arc/LivePage'),
);
const LiquidFormLive = lazy(
  () => import('../templates/background/liquid-form/LivePage'),
);
const TerminalCrtLive = lazy(
  () => import('../templates/background/terminal-crt/LivePage'),
);
const CinematicCrtLive = lazy(
  () => import('../templates/background/cinematic-crt/LivePage'),
);
const BlueScreenCrtLive = lazy(
  () => import('../templates/background/blue-screen-crt/LivePage'),
);
const GlobeLive = lazy(
  () => import('../templates/background/globe/LivePage'),
);
const SparkBadgeLive = lazy(
  () => import('../templates/background/spark-badge/LivePage'),
);
const ElementsLive = lazy(
  () => import('../templates/background/elements/LivePage'),
);
const GenerativeTreeElementsLive = lazy(
  () => import('../templates/background/generative-tree-elements/LivePage'),
);
const ConstellationFieldLive = lazy(
  () => import('../templates/background/constellation-field/LivePage'),
);
const ParticleDriftConstellationFieldLive = lazy(
  () => import('../templates/background/particle-drift-constellation-field/LivePage'),
);
const GatewayFlowConstellationFieldLive = lazy(
  () => import('../templates/background/gateway-flow-constellation-field/LivePage'),
);
const InterfaceLinesConstellationFieldLive = lazy(
  () => import('../templates/background/interface-lines-constellation-field/LivePage'),
);
const CloudFieldPortalFieldLive = lazy(
  () => import('../templates/background/cloud-field-portal-field/LivePage'),
);
const FlowFieldPortalFieldLive = lazy(
  () => import('../templates/background/flow-field-portal-field/LivePage'),
);
const MatrixJunctionLaserLive = lazy(
  () => import('../templates/background/matrix-junction-laser/LivePage'),
);
const AtmosphericBladeLaserLive = lazy(
  () => import('../templates/background/atmospheric-blade-laser/LivePage'),
);
const VanishingArrayLaserLive = lazy(
  () => import('../templates/background/vanishing-array-laser/LivePage'),
);
const RectangleButtonsLive = lazy(
  () => import('../templates/button/rectangle-buttons/LivePage'),
);
const LaunchButtonRectangleButtonsLive = lazy(
  () => import('../templates/button/launch-button-rectangle-buttons/LivePage'),
);
const DotBorderButtonRectangleButtonsLive = lazy(
  () => import('../templates/button/dot-border-button-rectangle-buttons/LivePage'),
);
const FloatingDotsCtaRectangleButtonsLive = lazy(
  () => import('../templates/button/floating-dots-cta-rectangle-buttons/LivePage'),
);
const SlidingTextCtaRectangleButtonsLive = lazy(
  () => import('../templates/button/sliding-text-cta-rectangle-buttons/LivePage'),
);
const GradientBeamCtaRectangleButtonsLive = lazy(
  () => import('../templates/button/gradient-beam-cta-rectangle-buttons/LivePage'),
);
const GradientPillButtonRectangleButtonsLive = lazy(
  () => import('../templates/button/gradient-pill-button-rectangle-buttons/LivePage'),
);
const GenerateButtonRectangleButtonsLive = lazy(
  () => import('../templates/button/generate-button-rectangle-buttons/LivePage'),
);
const GlassmorphismCtaRectangleButtonsLive = lazy(
  () => import('../templates/button/glassmorphism-cta-rectangle-buttons/LivePage'),
);
const SpinningBorderButtonRectangleButtonsLive = lazy(
  () => import('../templates/button/spinning-border-button-rectangle-buttons/LivePage'),
);
const GradientCtaRectangleButtonsLive = lazy(
  () => import('../templates/button/gradient-cta-rectangle-buttons/LivePage'),
);
const LumenCtaRectangleButtonsLive = lazy(
  () => import('../templates/button/lumen-cta-rectangle-buttons/LivePage'),
);
const TrochilSignalRectangleButtonsLive = lazy(
  () => import('../templates/button/trochil-signal-rectangle-buttons/LivePage'),
);
const TideformOutlineRectangleButtonsLive = lazy(
  () => import('../templates/button/tideform-outline-rectangle-buttons/LivePage'),
);
const JapaneseTowerLandscapeLive = lazy(
  () => import('../templates/background/japanese-tower-landscape/LivePage'),
);
const ChinaJapaneseTowerLandscapeLive = lazy(
  () => import('../templates/background/china-japanese-tower-landscape/LivePage'),
);
const VietnamJapaneseTowerLandscapeLive = lazy(
  () => import('../templates/background/vietnam-japanese-tower-landscape/LivePage'),
);
const ThailandJapaneseTowerLandscapeLive = lazy(
  () => import('../templates/background/thailand-japanese-tower-landscape/LivePage'),
);
const TurkeyJapaneseTowerLandscapeLive = lazy(
  () => import('../templates/background/turkey-japanese-tower-landscape/LivePage'),
);
const Original3dPaperLive = lazy(
  () => import('../templates/3d-paper/original-3d-paper/LivePage'),
);
const SiteOfTheYear3dPaperLive = lazy(
  () => import('../templates/3d-paper/site-of-the-year-3d-paper/LivePage'),
);
const Japanese3dPaperLive = lazy(
  () => import('../templates/3d-paper/japanese-3d-paper/LivePage'),
);
const Certificate3dPaperLive = lazy(
  () => import('../templates/3d-paper/certificate-3d-paper/LivePage'),
);
const AshenPressLive = lazy(() => import('../templates/hero/ashen-press/LivePage'));

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
        path={ROUTES.WARP_FIELD_DEFAULT}
        element={
          <Suspense fallback={<PageLoader />}>
            <WarpFieldDefaultLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WARP_FIELD_LETTER_STORM}
        element={
          <Suspense fallback={<PageLoader />}>
            <WarpFieldLetterStormLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WARP_FIELD_KEYCAP_DRIFT}
        element={
          <Suspense fallback={<PageLoader />}>
            <WarpFieldKeycapDriftLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WARP_FIELD_HYPERSPACE}
        element={
          <Suspense fallback={<PageLoader />}>
            <WarpFieldHyperspaceLive />
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
        path={ROUTES.WOVEN_CLOTH}
        element={
          <Suspense fallback={<PageLoader />}>
            <WovenClothLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WOVEN_CLOTH_IRIDESCENT}
        element={
          <Suspense fallback={<PageLoader />}>
            <WovenClothIridescentLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WOVEN_CLOTH_ATELIER}
        element={
          <Suspense fallback={<PageLoader />}>
            <WovenClothAtelierLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WOVEN_CLOTH_WASHI}
        element={
          <Suspense fallback={<PageLoader />}>
            <WovenClothWashiLive />
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
        path={ROUTES.MOSTAR_CITY}
        element={
          <Suspense fallback={<PageLoader />}>
            <MostarCityLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.STILLMIND}
        element={
          <Suspense fallback={<PageLoader />}>
            <StillmindLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.INTELLIGENT_OPERATIONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <IntelligentOperationsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.INTERACTIVE_DISCOVERY}
        element={
          <Suspense fallback={<PageLoader />}>
            <InteractiveDiscoveryLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.NIKE_HOVER}
        element={
          <Suspense fallback={<PageLoader />}>
            <NikeHoverLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SYNTH_MODE}
        element={
          <Suspense fallback={<PageLoader />}>
            <SynthModeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.TECH_FORWARD}
        element={
          <Suspense fallback={<PageLoader />}>
            <TechForwardLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CONTACT_CYBERNETIC}
        element={
          <Suspense fallback={<PageLoader />}>
            <ContactCyberneticLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.WELLNESS_HERO}
        element={
          <Suspense fallback={<PageLoader />}>
            <WellnessHeroLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.MIND_BODY_HEALING}
        element={
          <Suspense fallback={<PageLoader />}>
            <MindBodyHealingLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VEYRA_ELECTRIC}
        element={
          <Suspense fallback={<PageLoader />}>
            <VeyraElectricLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.REAL_TIME_ALERTS}
        element={
          <Suspense fallback={<PageLoader />}>
            <RealTimeAlertsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.EQUILIBRIUM}
        element={
          <Suspense fallback={<PageLoader />}>
            <EquilibriumLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SCALING_PLATFORM}
        element={
          <Suspense fallback={<PageLoader />}>
            <ScalingPlatformLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.KAGE}
        element={
          <Suspense fallback={<PageLoader />}>
            <KageLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SKETCHBOOK}
        element={
          <Suspense fallback={<PageLoader />}>
            <SketchbookLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SUBLEVEL_STUDIO}
        element={
          <Suspense fallback={<PageLoader />}>
            <SublevelStudioLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LIVING_GREEN}
        element={
          <Suspense fallback={<PageLoader />}>
            <LivingGreenLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.COMPLETE_SHELF}
        element={
          <Suspense fallback={<PageLoader />}>
            <CompleteShelfLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.BESTSELLERS_BOOK_SHOWCASE}
        element={
          <Suspense fallback={<PageLoader />}>
            <BestsellersBookShowcaseLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LIVING_GREEN_SYLVA_LIVING_WORLD}
        element={
          <Suspense fallback={<PageLoader />}>
            <LivingGreenSylvaLivingWorldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LOGIC_CORE_STRUCTURE_FLOW}
        element={
          <Suspense fallback={<PageLoader />}>
            <LogicCoreStructureFlowLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.TOPOLOGY_FIELD_STRUCTURE_FLOW}
        element={
          <Suspense fallback={<PageLoader />}>
            <TopologyFieldStructureFlowLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.NEBULA_STRUCTURE_FLOW}
        element={
          <Suspense fallback={<PageLoader />}>
            <NebulaStructureFlowLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FLUX_VORTEX_STRUCTURE_FLOW}
        element={
          <Suspense fallback={<PageLoader />}>
            <FluxVortexStructureFlowLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.OVERRIDE_GRID_PREDICTIVE_ARC}
        element={
          <Suspense fallback={<PageLoader />}>
            <OverrideGridPredictiveArcLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LIQUID_FORM}
        element={
          <Suspense fallback={<PageLoader />}>
            <LiquidFormLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.TERMINAL_CRT}
        element={
          <Suspense fallback={<PageLoader />}>
            <TerminalCrtLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CINEMATIC_CRT}
        element={
          <Suspense fallback={<PageLoader />}>
            <CinematicCrtLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.BLUE_SCREEN_CRT}
        element={
          <Suspense fallback={<PageLoader />}>
            <BlueScreenCrtLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GLOBE}
        element={
          <Suspense fallback={<PageLoader />}>
            <GlobeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SPARK_BADGE}
        element={
          <Suspense fallback={<PageLoader />}>
            <SparkBadgeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ELEMENTS}
        element={
          <Suspense fallback={<PageLoader />}>
            <ElementsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GENERATIVE_TREE_ELEMENTS}
        element={
          <Suspense fallback={<PageLoader />}>
            <GenerativeTreeElementsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CONSTELLATION_FIELD}
        element={
          <Suspense fallback={<PageLoader />}>
            <ConstellationFieldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.PARTICLE_DRIFT_CONSTELLATION_FIELD}
        element={
          <Suspense fallback={<PageLoader />}>
            <ParticleDriftConstellationFieldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GATEWAY_FLOW_CONSTELLATION_FIELD}
        element={
          <Suspense fallback={<PageLoader />}>
            <GatewayFlowConstellationFieldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.INTERFACE_LINES_CONSTELLATION_FIELD}
        element={
          <Suspense fallback={<PageLoader />}>
            <InterfaceLinesConstellationFieldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CLOUD_FIELD_PORTAL_FIELD}
        element={
          <Suspense fallback={<PageLoader />}>
            <CloudFieldPortalFieldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FLOW_FIELD_PORTAL_FIELD}
        element={
          <Suspense fallback={<PageLoader />}>
            <FlowFieldPortalFieldLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.MATRIX_JUNCTION_LASER}
        element={
          <Suspense fallback={<PageLoader />}>
            <MatrixJunctionLaserLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ATMOSPHERIC_BLADE_LASER}
        element={
          <Suspense fallback={<PageLoader />}>
            <AtmosphericBladeLaserLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VANISHING_ARRAY_LASER}
        element={
          <Suspense fallback={<PageLoader />}>
            <VanishingArrayLaserLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <RectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LAUNCH_BUTTON_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <LaunchButtonRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.DOT_BORDER_BUTTON_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <DotBorderButtonRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FLOATING_DOTS_CTA_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <FloatingDotsCtaRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SLIDING_TEXT_CTA_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <SlidingTextCtaRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GRADIENT_BEAM_CTA_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <GradientBeamCtaRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GRADIENT_PILL_BUTTON_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <GradientPillButtonRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GENERATE_BUTTON_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <GenerateButtonRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GLASSMORPHISM_CTA_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <GlassmorphismCtaRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SPINNING_BORDER_BUTTON_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <SpinningBorderButtonRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.GRADIENT_CTA_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <GradientCtaRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.LUMEN_CTA_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <LumenCtaRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.TROCHIL_SIGNAL_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <TrochilSignalRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.TIDEFORM_OUTLINE_RECTANGLE_BUTTONS}
        element={
          <Suspense fallback={<PageLoader />}>
            <TideformOutlineRectangleButtonsLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.JAPANESE_TOWER_LANDSCAPE}
        element={
          <Suspense fallback={<PageLoader />}>
            <JapaneseTowerLandscapeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CHINA_JAPANESE_TOWER_LANDSCAPE}
        element={
          <Suspense fallback={<PageLoader />}>
            <ChinaJapaneseTowerLandscapeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VIETNAM_JAPANESE_TOWER_LANDSCAPE}
        element={
          <Suspense fallback={<PageLoader />}>
            <VietnamJapaneseTowerLandscapeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.THAILAND_JAPANESE_TOWER_LANDSCAPE}
        element={
          <Suspense fallback={<PageLoader />}>
            <ThailandJapaneseTowerLandscapeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.TURKEY_JAPANESE_TOWER_LANDSCAPE}
        element={
          <Suspense fallback={<PageLoader />}>
            <TurkeyJapaneseTowerLandscapeLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ORIGINAL_3D_PAPER}
        element={
          <Suspense fallback={<PageLoader />}>
            <Original3dPaperLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SITE_OF_THE_YEAR_3D_PAPER}
        element={
          <Suspense fallback={<PageLoader />}>
            <SiteOfTheYear3dPaperLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.JAPANESE_3D_PAPER}
        element={
          <Suspense fallback={<PageLoader />}>
            <Japanese3dPaperLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.CERTIFICATE_3D_PAPER}
        element={
          <Suspense fallback={<PageLoader />}>
            <Certificate3dPaperLive />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ASHEN_PRESS}
        element={
          <Suspense fallback={<PageLoader />}>
            <AshenPressLive />
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
