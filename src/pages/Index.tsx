import HeroVoiceWidget from "@/components/HeroVoiceWidget";
import AuthorityBio from "@/components/sections/AuthorityBio";
import ExpertisePillars from "@/components/sections/ExpertisePillars";
import KaldrShowcase from "@/components/sections/KaldrShowcase";
import PricingTiers from "@/components/sections/PricingTiers";
import Manifesto from "@/components/sections/Manifesto";
import SocialProof from "@/components/sections/SocialProof";
import LeadCapture from "@/components/sections/LeadCapture";
import Footer from "@/components/sections/Footer";
import { Calendar, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
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
              <Calendar className="w-4 h-4" /> Book a Consultation
            </motion.a>
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-lg border border-primary/30 text-primary font-medium text-sm inline-flex items-center justify-center gap-2"
            >
              View Programs
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

      <AuthorityBio />
      <ExpertisePillars />
      <KaldrShowcase />
      <PricingTiers />
      <Manifesto />
      <SocialProof />
      <LeadCapture />
      <Footer />
    </main>
  );
};

export default Index;
