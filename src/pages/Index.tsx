import CountdownBanner from "@/components/sections/CountdownBanner";
import Navbar from "@/components/sections/Navbar";
import HeroVoiceWidget from "@/components/HeroVoiceWidget";
import FeaturedEvent from "@/components/sections/FeaturedEvent";
import AuthorityBio from "@/components/sections/AuthorityBio";
import AuthorityBadges from "@/components/sections/AuthorityBadges";
import ExpertisePillars from "@/components/sections/ExpertisePillars";
import KaldrShowcase from "@/components/sections/KaldrShowcase";
import PricingTiers from "@/components/sections/PricingTiers";
import PricingTable from "@/components/sections/PricingTable";
import Manifesto from "@/components/sections/Manifesto";
import SocialProof from "@/components/sections/SocialProof";
import Ecosystem from "@/components/sections/Ecosystem";
import Newsletter from "@/components/sections/Newsletter";
import LeadCapture from "@/components/sections/LeadCapture";
import Footer from "@/components/sections/Footer";
import { Calendar, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
              href="#book"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Start Your AI Journey for $197/month
            </motion.a>
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg border border-primary/30 text-primary font-medium text-sm inline-flex items-center justify-center gap-2"
            >
              Scale to Enterprise-Level Automation
            </motion.a>
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

      <FeaturedEvent />
      <AuthorityBio />
      <AuthorityBadges />
      <ExpertisePillars />
      <KaldrShowcase />
      <PricingTiers />
      <PricingTable />
      <Manifesto />
      <SocialProof />
      <Ecosystem />
      <Newsletter />
      <LeadCapture />
      <Footer />
    </main>
  );
};

export default Index;
