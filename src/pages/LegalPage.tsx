import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import SEO from "@/components/SEO";

const legalContent: Record<string, { title: string; content: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    content: [
      "Last updated: March 1, 2026",
      "Kaldr Tech LLC ('we', 'us', 'our') respects your privacy and is committed to protecting your personal data.",
      "INFORMATION WE COLLECT: We collect personal information you provide when creating an account, placing an order, or contacting us. This includes your name, email address, phone number, company name, and payment information.",
      "HOW WE USE YOUR INFORMATION: We use your information to provide and improve our services, process transactions, send communications about your account and orders, and deliver the digital services you have purchased.",
      "DATA STORAGE: Your data is stored securely using industry-standard encryption. We use Supabase for data management and Stripe for payment processing. Both services maintain SOC 2 compliance.",
      "THIRD-PARTY SERVICES: We use the following services that may process your data: Stripe (payments), Resend (email communications), Vapi (voice AI), Cloudflare (streaming and CDN), and Supabase (database).",
      "YOUR RIGHTS: You have the right to access, correct, or delete your personal data. Contact us at support@laseanpickens.com to exercise these rights.",
      "COOKIES: We use essential cookies to maintain your session and preferences. We do not use third-party tracking cookies for advertising.",
      "CHANGES: We may update this policy from time to time. We will notify you of material changes via email.",
      "CONTACT: For privacy inquiries, contact support@laseanpickens.com or write to Kaldr Tech LLC.",
    ],
  },
  terms: {
    title: "Terms of Service",
    content: [
      "Last updated: March 1, 2026",
      "These Terms of Service govern your use of Kaldr Tech LLC services and website.",
      "SERVICES: We provide AI automation, business transformation, done-for-you services, and strategic consulting. Service descriptions and deliverables are detailed on each service page.",
      "ACCOUNT: You must create an account to purchase services. You are responsible for maintaining the security of your account credentials.",
      "PAYMENT: All payments are processed through Stripe. Prices are listed in USD. Payment is due at the time of purchase for one-time services, and on a recurring basis for subscription services.",
      "INTELLECTUAL PROPERTY: Deliverables created for you become your property upon full payment. Our proprietary methodologies, frameworks, and systems remain our intellectual property.",
      "DELIVERY: Digital services begin within 24-48 hours of purchase confirmation. Delivery timelines vary by service and are specified on the service detail page.",
      "CLIENT RESPONSIBILITIES: You agree to provide timely feedback, access to necessary systems, and accurate information to enable service delivery.",
      "LIMITATION OF LIABILITY: Our total liability is limited to the amount you paid for the specific service. We are not liable for indirect, consequential, or lost profit damages.",
      "DISPUTE RESOLUTION: Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will take place in the state where our company is registered.",
      "TERMINATION: Either party may terminate ongoing services with 30 days written notice. Already-delivered services are non-reversible.",
      "GOVERNING LAW: These terms are governed by the laws of the state in which Kaldr Tech LLC is registered.",
      "CONTACT: For questions about these terms, contact support@laseanpickens.com.",
    ],
  },
  refund: {
    title: "Refund Policy",
    content: [
      "Last updated: March 1, 2026",
      "Kaldr Tech LLC stands behind the quality of our services. This policy outlines our refund and cancellation procedures.",
      "CANCELLATION WINDOW: You may cancel your order within 24 hours of purchase for a full refund, provided that work has not yet begun on your project.",
      "DIGITAL SERVICES: Because our services are digital in nature and work begins within 24-48 hours of confirmation, refunds are not available once work has commenced.",
      "SUBSCRIPTION SERVICES: Monthly subscription services (Social Media Management, Email Marketing, etc.) can be cancelled at any time with 30 days notice. No refunds are issued for the current billing period.",
      "PARTIAL COMPLETION: If a project is partially completed and you wish to discontinue, you will be charged for the work completed to date based on a pro-rata calculation.",
      "QUALITY GUARANTEE: If you are unsatisfied with a delivered service, contact us within 7 days of delivery. We will work with you to revise the deliverables at no additional cost.",
      "CHARGEBACKS: Filing a chargeback with your bank without first contacting us constitutes a breach of our Terms of Service. We document all service agreements, delivery confirmations, and client communications. Disputed charges will be contested with full documentation.",
      "HOW TO REQUEST A REFUND: Email support@laseanpickens.com with your order number and reason for the refund request. We will respond within 2 business days.",
      "REFUND PROCESSING: Approved refunds are processed within 5-10 business days and returned to the original payment method.",
    ],
  },
  cookies: {
    title: "Cookie Policy",
    content: [
      "Last updated: March 1, 2026",
      "This Cookie Policy explains how Kaldr Tech LLC uses cookies and similar technologies.",
      "WHAT ARE COOKIES: Cookies are small text files placed on your device when you visit our website. They help us provide you with a better experience.",
      "ESSENTIAL COOKIES: We use essential cookies to keep you logged into your account, remember your preferences (like dark/light mode), and maintain your shopping cart during checkout.",
      "ANALYTICS: We may use privacy-respecting analytics to understand how visitors use our website. This helps us improve our services and user experience.",
      "THIRD-PARTY COOKIES: We do not use third-party advertising cookies. Our payment processor (Stripe) may set cookies necessary for secure payment processing.",
      "MANAGING COOKIES: You can control cookies through your browser settings. Note that disabling essential cookies may affect website functionality.",
      "CONTACT: For questions about our cookie practices, contact support@laseanpickens.com.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    content: [
      "Last updated: March 1, 2026",
      "GENERAL: The information provided on this website and through our services is for general business guidance purposes. Results vary based on individual circumstances, effort, and market conditions.",
      "NO GUARANTEES: While we have helped many businesses achieve significant results, we do not guarantee specific outcomes, revenue figures, or business results. Past performance of our clients does not guarantee future results.",
      "EARNINGS DISCLAIMER: Any earnings or revenue figures referenced on this website are examples and are not to be interpreted as typical or guaranteed results. Your results will vary based on many factors including but not limited to your background, experience, and work ethic.",
      "PROFESSIONAL ADVICE: Our services provide business consulting and technology implementation. They do not constitute legal, financial, tax, or accounting advice. Consult appropriate professionals for specific legal or financial matters.",
      "THIRD-PARTY TOOLS: We recommend and integrate various third-party tools and platforms. We are not responsible for the performance, availability, or policies of third-party services.",
      "AI TECHNOLOGY: Our AI-powered services use advanced technology that continuously improves. While we strive for accuracy and quality, AI-generated content and recommendations should be reviewed before implementation.",
      "TESTIMONIALS: Client testimonials and case studies represent individual experiences. They are not intended to represent or guarantee that any client will achieve the same or similar results.",
      "CONTACT: For questions or concerns, contact support@laseanpickens.com.",
    ],
  },
};

const LegalPage = () => {
  const { slug } = useParams();
  const page = legalContent[slug || ""];

  if (!page) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title={page.title} description="Legal information for Kaldr Tech services." />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">{page.title}</h1>
        </div>
        <div className="space-y-4">
          {page.content.map((paragraph, i) => {
            const isHeader = paragraph === paragraph.toUpperCase() || paragraph.includes(":");
            const parts = paragraph.split(":");
            if (parts.length > 1 && parts[0] === parts[0].toUpperCase() && parts[0].length < 30) {
              return (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">{parts[0]}:</span>
                  {parts.slice(1).join(":")}
                </p>
              );
            }
            return (
              <p key={i} className={`text-sm leading-relaxed ${i === 0 ? "text-muted-foreground italic" : "text-muted-foreground"}`}>
                {paragraph}
              </p>
            );
          })}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">Kaldr Tech LLC - support@laseanpickens.com</p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
