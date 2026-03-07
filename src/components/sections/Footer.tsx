import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Youtube, Facebook, Music2, Shield, Lock, Clock, Heart } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/in/laseanpickens", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/laseanpickens", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@laseanpickens", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/laseanpickens", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/laseanpickens", label: "Facebook" },
  { icon: Music2, href: "https://tiktok.com/@laseanpickens", label: "TikTok" },
];

const services = [
  { label: "AI & Automation", to: "/#programs" },
  { label: "Business Transformation", to: "/#programs" },
  { label: "Done-For-You Services", to: "/#programs" },
  { label: "Strategic Consulting", to: "/#programs" },
];

const company = [
  { label: "About LaSean", to: "/#about" },
  { label: "Our Process", to: "/#process" },
  { label: "Testimonials", to: "/#testimonials" },
  { label: "Contact Us", to: "/#book" },
];

const legal = [
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Terms of Service", to: "/legal/terms" },
  { label: "Refund Policy", to: "/legal/refund" },
  { label: "Cookie Policy", to: "/legal/cookies" },
  { label: "Disclaimer", to: "/legal/disclaimer" },
];

const trustBadges = [
  { icon: Shield, label: "SSL Secured" },
  { icon: Lock, label: "PCI Compliant" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Heart, label: "Satisfaction Guarantee" },
];

const Footer = () => (
  <footer className="border-t border-border pt-16 pb-8 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-12 pb-12 border-b border-border/50">
        {trustBadges.map((b) => (
          <div key={b.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <b.icon className="w-4 h-4 text-primary" />
            <span>{b.label}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="font-heading font-bold text-xl text-foreground mb-3">
            LASEAN <span className="text-primary">PICKENS</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Proprietary systems that transform any business into a profit machine.
            Advanced technology, specialist teams, and proven frameworks.
          </p>
          <p className="text-xs text-muted-foreground mb-1">LaSean Pickens Business Solutions LLC</p>
          <p className="text-xs text-muted-foreground mb-4">hello@laseanpickens.com</p>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Services</p>
          <ul className="space-y-3">
            {services.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Company</p>
          <ul className="space-y-3">
            {company.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Legal</p>
          <ul className="space-y-3">
            {legal.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter teaser */}
      <div className="border-t border-border/50 pt-8 mb-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Get exclusive business growth insights delivered weekly
        </p>
        <Link to="/#newsletter" className="text-sm text-primary font-medium hover:underline">
          Subscribe to The Business Growth Code
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LaSean Pickens Business Solutions LLC. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Results may vary. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
