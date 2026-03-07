import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Shield, Lock, Clock, Check,
  CreditCard, Mail, User, Phone, Building2, FileText,
  AlertTriangle, Eye, ChevronRight,
} from "lucide-react";
import { getServiceBySlug, getBundleBySlug, getServicesForBundle, typeLabels } from "@/data/services";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/SEO";

/* ================================================================
   STEP 0: REGISTER / LOGIN
   ================================================================ */

const AuthStep = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const { register, login } = useAuth();
  const [tab, setTab] = useState<"register" | "login">("register");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", password: "", confirm: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    const err = await register({ name: form.name, email: form.email, phone: form.phone, company: form.company }, form.password);
    if (err) { setError(err); return; }
    onComplete();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const err = await login(loginForm.email, loginForm.password);
    if (err) { setError(err); return; }
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
      <div className="glass-dark rounded-2xl p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-heading font-bold">Create Your Account</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your account is where all documents, receipts, and deliverables will live.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {(["register", "login"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 pb-2.5 text-sm font-medium capitalize transition-colors ${
                tab === t ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "register" ? "Create Account" : "Sign In"}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 mb-4">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        {tab === "register" ? (
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Full Name *</label>
                <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text" required placeholder="John Doe" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Email *</label>
                <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="email" required placeholder="you@company.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Phone *</label>
                <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="tel" required placeholder="(555) 123-4567" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Company</label>
                <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                  <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="text" placeholder="Your Company" value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Password *</label>
              <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="password" required placeholder="Min. 8 characters" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Confirm Password *</label>
              <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="password" required placeholder="Confirm your password" value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-blue hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Email *</label>
              <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="email" required placeholder="you@company.com" value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Password *</label>
              <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-3 py-2.5">
                <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="password" required placeholder="Your password" value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-transparent text-sm text-foreground w-full outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-blue hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

/* ================================================================
   STEP 1: REVIEW PROFILE
   ================================================================ */

const ProfileStep = ({ onNext }: { onNext: () => void }) => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-dark rounded-xl p-6">
        <h2 className="text-base font-heading font-semibold mb-1">Confirm Your Information</h2>
        <p className="text-xs text-muted-foreground mb-4">Please verify your details are correct before proceeding.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name *</label>
              <input
                type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address *</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone Number *</label>
              <input
                type="tel" required value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Company Name</label>
              <input
                type="text" value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Continue to Review <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

/* ================================================================
   STEP 2: ORDER REVIEW + CHARGEBACK PROTECTIONS
   ================================================================ */

const ReviewStep = ({
  itemName,
  itemPrice,
  itemType,
  isBundle,
  bundleDetails,
  serviceDescription,
  serviceDelivery,
  onConfirm,
}: {
  itemName: string;
  itemPrice: string;
  itemType: string;
  isBundle: boolean;
  bundleDetails?: { services: { name: string; price: string }[]; originalPrice: string; savings: string; recurring?: string };
  serviceDescription: string;
  serviceDelivery: string;
  onConfirm: () => void;
}) => {
  const { user } = useAuth();
  const [agreements, setAgreements] = useState({
    terms: false,
    refund: false,
    digital: false,
    confirm: false,
  });
  const [showTerms, setShowTerms] = useState(false);
  const [showRefund, setShowRefund] = useState(false);

  const allChecked = agreements.terms && agreements.refund && agreements.digital && agreements.confirm;

  const toggle = (key: keyof typeof agreements) =>
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      {/* Order summary */}
      <div className="glass-dark rounded-xl p-6">
        <h2 className="text-base font-heading font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Service:</span>
            <span className="text-sm font-semibold text-foreground">{itemName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Type:</span>
            <span className="text-sm text-foreground">{itemType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delivery:</span>
            <span className="text-sm text-foreground">{serviceDelivery}</span>
          </div>
        </div>

        {isBundle && bundleDetails && (
          <div className="border-t border-border/50 pt-3 mb-3 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Includes:</p>
            {bundleDetails.services.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="text-foreground/80">{s.name}</span>
                <span className="text-muted-foreground">{s.price}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-muted-foreground">Original price:</span>
              <span className="text-muted-foreground line-through">{bundleDetails.originalPrice}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-400 font-semibold">You save:</span>
              <span className="text-green-400 font-semibold">{bundleDetails.savings}</span>
            </div>
            {bundleDetails.recurring && (
              <p className="text-[10px] text-muted-foreground">{bundleDetails.recurring}</p>
            )}
          </div>
        )}

        <div className="border-t border-border/50 pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold">Total Due:</span>
          <span className="text-xl font-heading font-bold text-primary">{itemPrice}</span>
        </div>
      </div>

      {/* Service description */}
      <div className="glass-dark rounded-xl p-6">
        <h2 className="text-base font-heading font-semibold mb-2">Service Description</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{serviceDescription}</p>
      </div>

      {/* Customer details */}
      <div className="glass-dark rounded-xl p-6">
        <h2 className="text-base font-heading font-semibold mb-3">Your Details</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-xs text-muted-foreground">Name</span>
            <p className="font-medium text-foreground">{user?.name}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Email</span>
            <p className="font-medium text-foreground">{user?.email}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Phone</span>
            <p className="font-medium text-foreground">{user?.phone}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Company</span>
            <p className="font-medium text-foreground">{user?.company || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Chargeback protections */}
      <div className="glass-dark rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-base font-heading font-semibold">Agreements & Acknowledgments</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Please review and accept all items below before proceeding. These protect both you and our team.
        </p>

        {/* Terms of Service */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox" checked={agreements.terms} onChange={() => toggle("terms")}
            className="mt-0.5 w-4 h-4 rounded border-border accent-primary shrink-0"
          />
          <div className="text-sm">
            <span className="text-foreground group-hover:text-primary transition-colors">
              I have read and agree to the{" "}
            </span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setShowTerms(!showTerms); }}
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Terms of Service <Eye className="w-3 h-3" />
            </button>
          </div>
        </label>
        {showTerms && (
          <div className="ml-7 bg-background/50 border border-border/50 rounded-lg p-4 text-xs text-muted-foreground space-y-2">
            <p><strong className="text-foreground">Scope of Services:</strong> LaSean Pickens Business Solutions LLC ("Provider") will deliver the digital services described in your order. Deliverables, timelines, and scope are defined by the service selected.</p>
            <p><strong className="text-foreground">Payment:</strong> Full payment is due at the time of purchase. By completing checkout, you authorize the charge for the amount shown. Recurring services will be billed on the same date each month.</p>
            <p><strong className="text-foreground">Intellectual Property:</strong> Upon full payment, you receive a non-exclusive license to use all deliverables for your business purposes. The Provider retains the right to use anonymized case studies.</p>
            <p><strong className="text-foreground">Client Responsibilities:</strong> You agree to provide timely access to accounts, content, and feedback necessary for service delivery. Delays caused by the client may affect delivery timelines.</p>
            <p><strong className="text-foreground">Limitation of Liability:</strong> The Provider's total liability is limited to the amount paid for the service. Results may vary based on individual business circumstances.</p>
            <p><strong className="text-foreground">Dispute Resolution:</strong> Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
          </div>
        )}

        {/* Refund Policy */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox" checked={agreements.refund} onChange={() => toggle("refund")}
            className="mt-0.5 w-4 h-4 rounded border-border accent-primary shrink-0"
          />
          <div className="text-sm">
            <span className="text-foreground group-hover:text-primary transition-colors">
              I acknowledge and agree to the{" "}
            </span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setShowRefund(!showRefund); }}
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Refund & Cancellation Policy <Eye className="w-3 h-3" />
            </button>
          </div>
        </label>
        {showRefund && (
          <div className="ml-7 bg-background/50 border border-border/50 rounded-lg p-4 text-xs text-muted-foreground space-y-2">
            <p><strong className="text-foreground">Digital Services - No Refund After Delivery Begins:</strong> Because our services are digital and delivery begins within 24-48 hours of purchase, refunds are not available once work has commenced.</p>
            <p><strong className="text-foreground">Cancellation Before Work Begins:</strong> If you request cancellation within 24 hours of purchase AND before any work has started, a full refund will be issued minus a 5% processing fee.</p>
            <p><strong className="text-foreground">Monthly/Recurring Services:</strong> You may cancel recurring services at any time. Cancellation takes effect at the end of the current billing period. No partial refunds for the current period.</p>
            <p><strong className="text-foreground">Satisfaction Resolution:</strong> If you are unsatisfied with deliverables, contact us within 7 days of delivery. We will work to resolve your concerns, which may include revisions or credit toward future services.</p>
            <p><strong className="text-foreground">Chargebacks:</strong> Filing a chargeback instead of contacting us directly may result in account suspension and collection action for the disputed amount plus fees. We encourage direct communication to resolve any issues.</p>
          </div>
        )}

        {/* Digital service acknowledgment */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox" checked={agreements.digital} onChange={() => toggle("digital")}
            className="mt-0.5 w-4 h-4 rounded border-border accent-primary shrink-0"
          />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            I understand this is a digital service and that work begins within 24-48 hours of purchase
          </span>
        </label>

        {/* Order confirmation */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox" checked={agreements.confirm} onChange={() => toggle("confirm")}
            className="mt-0.5 w-4 h-4 rounded border-border accent-primary shrink-0"
          />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            I confirm the order details above are correct and I authorize the charge of <strong className="text-primary">{itemPrice}</strong>
          </span>
        </label>
      </div>

      {/* Confirm button */}
      <div className="space-y-3">
        <button
          onClick={onConfirm}
          disabled={!allChecked}
          className={`w-full py-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            allChecked
              ? "bg-primary text-primary-foreground glow-blue hover:bg-primary/90 cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          {allChecked ? `Confirm Order - ${itemPrice}` : "Accept all agreements to continue"}
        </button>
        <p className="text-center text-[10px] text-muted-foreground">
          By clicking "Confirm Order", you agree to be charged <strong>{itemPrice}</strong> and acknowledge
          all terms and policies above. A confirmation receipt will be sent to <strong>{user?.email}</strong>.
        </p>
      </div>
    </motion.div>
  );
};

/* ================================================================
   STEP 3: CONFIRMATION
   ================================================================ */

const ConfirmationStep = ({
  orderId,
  itemName,
  itemPrice,
  itemType,
  email,
}: {
  orderId: string;
  itemName: string;
  itemPrice: string;
  itemType: string;
  email: string;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-dark rounded-2xl p-8 md:p-12 text-center max-w-lg mx-auto"
    >
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Order Confirmed</h2>
      <p className="text-muted-foreground mb-6">
        Thank you for your purchase! Our team will reach out within 24 hours to begin onboarding.
      </p>

      <div className="glass-dark rounded-lg p-4 mb-4 text-left space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Order ID:</span>
          <span className="text-xs font-mono font-bold text-primary">{orderId}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Service:</span>
          <span className="text-xs font-semibold text-foreground">{itemName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Type:</span>
          <span className="text-xs text-foreground">{itemType}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border/50 pt-2">
          <span className="text-sm font-semibold text-foreground">Amount Charged:</span>
          <span className="text-sm font-bold text-primary">{itemPrice}</span>
        </div>
      </div>

      <div className="glass-dark rounded-lg p-4 mb-6 text-left">
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground mb-1">What happens next:</p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Confirmation receipt sent to <strong className="text-foreground">{email}</strong></li>
              <li>Our team reviews your order and begins preparation</li>
              <li>You'll receive an onboarding email within 24 hours</li>
              <li>All deliverables will be uploaded to your Client Portal</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate("/portal")}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          Go to Client Portal <ArrowRight className="w-4 h-4" />
        </button>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-foreground transition-colors flex items-center justify-center"
        >
          Return to Homepage
        </Link>
      </div>

      <p className="text-[10px] text-muted-foreground mt-6">
        Questions about your order? Contact us at hello@laseanpickens.com
      </p>
    </motion.div>
  );
};

/* ================================================================
   MAIN CHECKOUT COMPONENT
   ================================================================ */

const Checkout = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, user, addOrder } = useAuth();
  const [step, setStep] = useState(isAuthenticated ? 1 : 0);
  const [orderId, setOrderId] = useState("");

  const service = getServiceBySlug(slug || "");
  const bundle = getBundleBySlug(slug || "");
  const isBundle = !!bundle;

  const itemName = isBundle ? bundle.name : service?.name || "";
  const itemPrice = isBundle ? bundle.bundlePrice : service?.price || "";
  const itemType = isBundle
    ? bundle.recurring ? "Bundle + recurring" : "Bundle"
    : service ? typeLabels[service.type] : "";
  const serviceDescription = isBundle
    ? bundle.tagline
    : service?.description || "";
  const serviceDelivery = isBundle
    ? "Varies by service"
    : service?.delivery || "";

  const bundleDetails = isBundle && bundle
    ? {
        services: getServicesForBundle(bundle).map((s) => ({ name: s.name, price: s.price })),
        originalPrice: bundle.originalPrice,
        savings: bundle.savings,
        recurring: bundle.recurring,
      }
    : undefined;

  if (!service && !bundle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Not Found</h1>
          <p className="text-muted-foreground mb-4">This service or bundle doesn't exist.</p>
          <Link to="/#programs" className="text-primary hover:underline">View all services</Link>
        </div>
      </div>
    );
  }

  const handleConfirmOrder = () => {
    const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    addOrder({
      itemName,
      itemSlug: slug || "",
      itemPrice,
      itemType,
      isBundle,
      termsAccepted: true,
      refundPolicyAccepted: true,
    });
    setStep(3);
  };

  const steps = ["Account", "Profile", "Review", "Confirmed"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Checkout" description="Complete your purchase securely." />
      {/* Nav */}
      <div className="border-b border-border bg-background/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-lg text-foreground">
            LASEAN <span className="text-primary">PICKENS</span>
          </Link>
          <Link
            to={isBundle ? `/bundle/${slug}` : `/service/${slug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/#programs" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Checkout</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress bar */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                          ? "bg-primary text-primary-foreground glow-blue"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-10 h-0.5 mb-4 ${i < step ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {step < 3 && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Left: Current step */}
            <div>
              {step === 0 && <AuthStep onComplete={() => setStep(1)} />}
              {step === 1 && <ProfileStep onNext={() => setStep(2)} />}
              {step === 2 && (
                <ReviewStep
                  itemName={itemName}
                  itemPrice={itemPrice}
                  itemType={itemType}
                  isBundle={isBundle}
                  bundleDetails={bundleDetails}
                  serviceDescription={serviceDescription}
                  serviceDelivery={serviceDelivery}
                  onConfirm={handleConfirmOrder}
                />
              )}
            </div>

            {/* Right: Mini order summary */}
            <div className="hidden lg:block">
              <div className="glass-dark rounded-2xl p-5 sticky top-20 space-y-4">
                <h3 className="text-sm font-heading font-semibold">Your Order</h3>
                <div className="border-b border-border/50 pb-3">
                  <p className="font-semibold text-sm text-foreground">{itemName}</p>
                  <p className="text-xs text-muted-foreground">{itemType}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="text-lg font-heading font-bold text-primary">{itemPrice}</span>
                </div>
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Shield className="w-3 h-3 text-primary" /> SSL Encrypted
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Lock className="w-3 h-3 text-primary" /> PCI Compliant
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3 text-primary" /> Delivery: {serviceDelivery}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Check className="w-3 h-3 text-primary" /> Satisfaction Resolution
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <ConfirmationStep
            orderId={orderId}
            itemName={itemName}
            itemPrice={itemPrice}
            itemType={itemType}
            email={user?.email || ""}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
