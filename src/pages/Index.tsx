import SEO from "@/components/SEO";
import CountdownBanner from "@/components/sections/CountdownBanner";
import Navbar from "@/components/sections/Navbar";
import HeroVoiceWidget from "@/components/HeroVoiceWidget";
import FeaturedEvent from "@/components/sections/FeaturedEvent";
import AuthorityBio from "@/components/sections/AuthorityBio";
import ProcessSteps from "@/components/sections/ProcessSteps";
import KaldrShowcase from "@/components/sections/KaldrShowcase";
import PricingTiers from "@/components/sections/PricingTiers";
import PricingTable from "@/components/sections/PricingTable";
import SocialProof from "@/components/sections/SocialProof";
import FAQ from "@/components/sections/FAQ";
import Ecosystem from "@/components/sections/Ecosystem";
import Newsletter from "@/components/sections/Newsletter";
import Bundles from "@/components/sections/Bundles";
import LeadCapture from "@/components/sections/LeadCapture";
import Footer from "@/components/sections/Footer";
import ServiceQuiz from "@/components/sections/ServiceQuiz";
import BusinessAssessment from "@/components/sections/BusinessAssessment";
import AutomationChecklist from "@/components/sections/AutomationChecklist";
import RoiCalculator from "@/components/sections/RoiCalculator";
import BookingWidget from "@/components/sections/BookingWidget";
import { ClientLogos } from "@/components/SocialProofWidgets";
import { ArrowRight, ArrowDown, Eye } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO />
      <CountdownBanner />
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative pt-16">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/LaSean_at_Conference.mp4"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <HeroVoiceWidget />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <motion.a
              href="#quiz"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" /> Find My Service
            </motion.a>
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg border border-primary/30 text-primary font-medium text-sm inline-flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> Explore Services
            </motion.a>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-xs md:text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">500+ <span className="font-normal text-muted-foreground">Businesses Transformed</span></span>
            <span className="text-border">|</span>
            <span className="font-semibold text-foreground">$50M+ <span className="font-normal text-muted-foreground">Revenue Generated</span></span>
            <span className="text-border">|</span>
            <span className="font-semibold text-foreground">24/7 <span className="font-normal text-muted-foreground">Delivery Capability</span></span>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-muted-foreground"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </section>

      <ClientLogos />
      <FeaturedEvent />
      <AuthorityBio />
      <ProcessSteps />
      <ServiceQuiz />
      <KaldrShowcase />
      <PricingTiers />
      <PricingTable />
      <Bundles />
      <RoiCalculator />
      <SocialProof />
      <BusinessAssessment />
      <AutomationChecklist />
      <FAQ />
      <BookingWidget />
      <Ecosystem />
      <Newsletter />
      <LeadCapture />
      <Footer />
    </main>
  );
};

export default Index;
