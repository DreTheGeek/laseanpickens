import { Twitter, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const learnMore = [
  { label: "Kaldr Portfolio", href: "#kaldr" },
  { label: "Programs & Pricing", href: "#programs" },
  { label: "Book a Consultation", href: "#book" },
];

const resources = [
  { label: "About LaSean", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#book" },
];

const Footer = () => (
  <footer className="border-t border-border pt-16 pb-8 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-heading font-bold text-xl text-foreground mb-3">
            LASEAN <span className="text-primary">PICKENS</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Building AI-powered systems that create leverage, freedom, and compounding wealth.
          </p>
        </div>

        {/* Learn More */}
        <div>
          <p className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Learn More</p>
          <ul className="space-y-3">
            {learnMore.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <p className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Resources</p>
          <ul className="space-y-3">
            {resources.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Connect</p>
          <p className="text-sm text-muted-foreground mb-4">
            Follow along as I share strategies, systems, and education for building with AI.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} LaSean Pickens / Kaldr. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
