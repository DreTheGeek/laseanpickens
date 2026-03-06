import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, BarChart3,
  Clock, Zap, Mail, Phone, FileText, Settings,
} from "lucide-react";

/* ---------- types ---------- */

interface OnboardingData {
  companyName: string;
  industry: string;
  businessSize: string;
  monthlyRevenue: string;
  yearsInBusiness: string;
  serviceArea: string;
  challenges: string[];
  biggestChallenge: string;
  primaryGoal: string;
  revenueGoal: string;
  timeSavings: string;
  timeline: string;
  crm: string[];
  otherSoftware: string;
  websitePlatform: string;
  phoneSystem: string;
  techComfort: string;
}

const defaultData: OnboardingData = {
  companyName: "",
  industry: "",
  businessSize: "",
  monthlyRevenue: "",
  yearsInBusiness: "",
  serviceArea: "",
  challenges: [],
  biggestChallenge: "",
  primaryGoal: "",
  revenueGoal: "",
  timeSavings: "",
  timeline: "",
  crm: [],
  otherSoftware: "",
  websitePlatform: "",
  phoneSystem: "",
  techComfort: "",
};

/* ---------- constants ---------- */

const challenges = [
  { id: "leads", label: "Missing Too Many Leads", desc: "Calls go unanswered, leads slip through cracks" },
  { id: "followup", label: "Poor Follow-up Process", desc: "Inconsistent or delayed follow-up" },
  { id: "scheduling", label: "Scheduling Chaos", desc: "Double bookings, missed appointments" },
  { id: "admin", label: "Too Much Admin Work", desc: "Drowning in paperwork and manual tasks" },
  { id: "customer-service", label: "Customer Service Issues", desc: "Long response times, inconsistent service" },
  { id: "data", label: "No Clear Business Data", desc: "Flying blind without actionable insights" },
];

const goals = [
  { value: "increase-revenue", label: "Increase revenue and grow the business" },
  { value: "save-time", label: "Save time and reduce manual work" },
  { value: "improve-service", label: "Improve customer service quality" },
  { value: "scale-business", label: "Scale the business without hiring more staff" },
  { value: "better-data", label: "Get better business insights and data" },
];

const crmOptions = ["ServiceTitan", "Jobber", "HubSpot", "Salesforce", "QuickBooks", "None/Excel"];

const industries = [
  "HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping",
  "Cleaning Services", "Construction", "Automotive", "Healthcare", "Real Estate", "Other",
];

/* ---------- select helper ---------- */

const SelectField = ({ label, value, onChange, options, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

/* ---------- step components ---------- */

const Step1 = ({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) => (
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Welcome! Let's Get Started
    </h2>
    <p className="text-center text-gray-300 mb-8">Tell us about your business so we can customize your AI automation experience</p>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Company Name *</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
            placeholder="Your Company LLC"
          />
        </div>
        <SelectField
          label="Industry *"
          value={data.industry}
          onChange={(v) => setData({ ...data, industry: v })}
          options={industries.map((i) => ({ value: i.toLowerCase().replace(/\s/g, "-"), label: i }))}
          placeholder="Select Industry"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Business Size *"
          value={data.businessSize}
          onChange={(v) => setData({ ...data, businessSize: v })}
          options={[
            { value: "solo", label: "Solo (Just me)" },
            { value: "small", label: "Small (2-10 employees)" },
            { value: "medium", label: "Medium (11-50 employees)" },
            { value: "large", label: "Large (51+ employees)" },
          ]}
          placeholder="Select Size"
        />
        <SelectField
          label="Monthly Revenue *"
          value={data.monthlyRevenue}
          onChange={(v) => setData({ ...data, monthlyRevenue: v })}
          options={[
            { value: "0-10k", label: "$0 - $10K" },
            { value: "10k-25k", label: "$10K - $25K" },
            { value: "25k-50k", label: "$25K - $50K" },
            { value: "50k-100k", label: "$50K - $100K" },
            { value: "100k-250k", label: "$100K - $250K" },
            { value: "250k+", label: "$250K+" },
          ]}
          placeholder="Select Range"
        />
        <div>
          <label className="block text-sm font-medium mb-2">Years in Business</label>
          <input
            type="number"
            value={data.yearsInBusiness}
            onChange={(e) => setData({ ...data, yearsInBusiness: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
            placeholder="5"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Primary Service Area</label>
        <input
          type="text"
          value={data.serviceArea}
          onChange={(e) => setData({ ...data, serviceArea: e.target.value })}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
          placeholder="Atlanta, GA or Nationwide"
        />
      </div>
    </div>
  </div>
);

const Step2 = ({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) => {
  const toggleChallenge = (id: string) => {
    const next = data.challenges.includes(id)
      ? data.challenges.filter((c) => c !== id)
      : [...data.challenges, id];
    setData({ ...data, challenges: next });
  };
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        What Are Your Biggest Challenges?
      </h2>
      <p className="text-center text-gray-300 mb-8">Help us understand your pain points so we can prioritize solutions</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {challenges.map((c) => (
          <label
            key={c.id}
            className={`flex items-center gap-3 p-4 glass rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
              data.challenges.includes(c.id) ? "border-purple-500/50 bg-purple-500/10" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={data.challenges.includes(c.id)}
              onChange={() => toggleChallenge(c.id)}
              className="w-5 h-5 rounded accent-purple-500"
            />
            <div>
              <div className="font-semibold text-sm">{c.label}</div>
              <div className="text-xs text-gray-400">{c.desc}</div>
            </div>
          </label>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Describe Your Biggest Challenge (Optional)</label>
        <textarea
          rows={4}
          value={data.biggestChallenge}
          onChange={(e) => setData({ ...data, biggestChallenge: e.target.value })}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
          placeholder="Tell us more about what's keeping you up at night..."
        />
      </div>
    </div>
  );
};

const Step3 = ({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) => (
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      What Are Your Goals?
    </h2>
    <p className="text-center text-gray-300 mb-8">Let's define success for your automation journey</p>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-4">What's your primary goal for automation? *</label>
        <div className="space-y-3">
          {goals.map((g) => (
            <label key={g.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="primaryGoal"
                value={g.value}
                checked={data.primaryGoal === g.value}
                onChange={() => setData({ ...data, primaryGoal: g.value })}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-sm">{g.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Revenue Goal (Monthly)"
          value={data.revenueGoal}
          onChange={(v) => setData({ ...data, revenueGoal: v })}
          options={[
            { value: "current", label: "Maintain current level" },
            { value: "25-percent", label: "Increase by 25%" },
            { value: "50-percent", label: "Increase by 50%" },
            { value: "100-percent", label: "Double revenue" },
            { value: "custom", label: "Custom goal" },
          ]}
          placeholder="Select Goal"
        />
        <SelectField
          label="Time Savings Goal (Weekly)"
          value={data.timeSavings}
          onChange={(v) => setData({ ...data, timeSavings: v })}
          options={[
            { value: "5-hours", label: "5-10 hours/week" },
            { value: "10-hours", label: "10-20 hours/week" },
            { value: "20-hours", label: "20-30 hours/week" },
            { value: "40-hours", label: "40+ hours/week" },
          ]}
          placeholder="Select Goal"
        />
      </div>
      <SelectField
        label="Implementation Timeline"
        value={data.timeline}
        onChange={(v) => setData({ ...data, timeline: v })}
        options={[
          { value: "asap", label: "ASAP - I need this yesterday" },
          { value: "1-month", label: "Within 1 month" },
          { value: "3-months", label: "Within 3 months" },
          { value: "6-months", label: "Within 6 months" },
          { value: "planning", label: "Just planning for now" },
        ]}
        placeholder="Select Timeline"
      />
    </div>
  </div>
);

const Step4 = ({ data, setData }: { data: OnboardingData; setData: (d: OnboardingData) => void }) => {
  const toggleCRM = (name: string) => {
    const next = data.crm.includes(name)
      ? data.crm.filter((c) => c !== name)
      : [...data.crm, name];
    setData({ ...data, crm: next });
  };
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Current Tech Stack
      </h2>
      <p className="text-center text-gray-300 mb-8">Help us understand your current systems for seamless integration</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">Current CRM/Software</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {crmOptions.map((name) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.crm.includes(name)}
                  onChange={() => toggleCRM(name)}
                  className="w-4 h-4 rounded accent-purple-500"
                />
                <span className="text-sm">{name}</span>
              </label>
            ))}
          </div>
          <input
            type="text"
            value={data.otherSoftware}
            onChange={(e) => setData({ ...data, otherSoftware: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 mt-3 focus:outline-none focus:border-purple-500"
            placeholder="Other software (please specify)"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Website Platform"
            value={data.websitePlatform}
            onChange={(v) => setData({ ...data, websitePlatform: v })}
            options={[
              { value: "wordpress", label: "WordPress" },
              { value: "squarespace", label: "Squarespace" },
              { value: "wix", label: "Wix" },
              { value: "custom", label: "Custom Built" },
              { value: "none", label: "No website" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select Platform"
          />
          <SelectField
            label="Current Phone System"
            value={data.phoneSystem}
            onChange={(v) => setData({ ...data, phoneSystem: v })}
            options={[
              { value: "traditional", label: "Traditional landline" },
              { value: "voip", label: "VoIP system" },
              { value: "cell", label: "Cell phone only" },
              { value: "google-voice", label: "Google Voice" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select System"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-3">Tech Comfort Level</label>
          <div className="flex items-center gap-6">
            {["beginner", "intermediate", "advanced"].map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="techComfort"
                  value={level}
                  checked={data.techComfort === level}
                  onChange={() => setData({ ...data, techComfort: level })}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-sm capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step5 = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">
      <CheckCircle2 className="w-16 h-16 mx-auto text-green-400" />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Setup Complete!
    </h2>
    <p className="text-lg text-gray-300 mb-8">Your AI automation journey begins now</p>
    <div className="glass rounded-xl p-6 text-left max-w-lg mx-auto">
      <h3 className="text-lg font-semibold mb-4">What Happens Next:</h3>
      <div className="space-y-3">
        {[
          "Your dedicated AI systems are being configured based on your responses",
          "You'll receive login credentials and training materials within 24 hours",
          "Your onboarding specialist will contact you to schedule implementation",
          "Full automation deployment will begin within 48 hours",
        ].map((text) => (
          <div key={text} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 shrink-0" />
            <span className="text-sm text-gray-300">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- portal dashboard ---------- */

const portalWidgets = [
  { icon: BarChart3, label: "Performance", value: "0 leads", color: "text-purple-400" },
  { icon: Clock, label: "Time Saved", value: "0 hours", color: "text-blue-400" },
  { icon: Zap, label: "Automations", value: "0 active", color: "text-green-400" },
  { icon: Mail, label: "Emails Sent", value: "0 this month", color: "text-yellow-400" },
  { icon: Phone, label: "AI Calls", value: "0 handled", color: "text-red-400" },
  { icon: FileText, label: "Reports", value: "0 generated", color: "text-pink-400" },
];

const PortalDashboard = ({ clientName }: { clientName: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 text-white">
    <header className="glass-dark p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-2xl font-bold">Your AI Automation Dashboard</h1>
        </div>
        <div className="text-sm text-gray-300">
          Welcome back, <span className="font-semibold text-white">{clientName || "Client"}</span>
        </div>
      </div>
    </header>
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {portalWidgets.map((w, i) => (
          <motion.div
            key={w.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 text-center"
          >
            <w.icon className={`w-6 h-6 mx-auto mb-2 ${w.color}`} />
            <div className="text-lg font-bold">{w.value}</div>
            <div className="text-xs text-gray-400">{w.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-dark rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Getting Started</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Settings, title: "System Configuration", desc: "Your AI systems are being set up based on your onboarding data." },
            { icon: Mail, title: "Email Automation", desc: "Automated sequences will begin once configuration is complete." },
            { icon: Phone, title: "AI Phone System", desc: "Your AI receptionist will be trained on your business details." },
            { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time performance data will populate as automations go live." },
          ].map((item) => (
            <div key={item.title} className="glass rounded-xl p-4 flex items-start gap-3">
              <item.icon className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---------- main component ---------- */

const ClientPortal = () => {
  const [step, setStep] = useState(1);
  const [onboarded, setOnboarded] = useState(false);
  const [data, setData] = useState<OnboardingData>(defaultData);

  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const complete = () => setOnboarded(true);

  if (onboarded) {
    return <PortalDashboard clientName={data.companyName} />;
  }

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = steps[step - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center p-4">
      <div className="glass-dark rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => {
              const num = i + 1;
              const isActive = num === step;
              const isComplete = num < step;
              return (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : isComplete
                        ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                        : "bg-gray-600"
                    }`}
                  >
                    {isComplete ? <CheckCircle2 className="w-4 h-4" /> : num}
                  </div>
                  {num < totalSteps && <div className={`w-8 md:w-14 h-1 rounded ${num < step ? "bg-blue-400" : "bg-gray-600"}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentStep data={data} setData={setData} />
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && step < totalSteps ? (
            <button
              onClick={prevStep}
              className="bg-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          ) : (
            <div />
          )}
          {step < totalSteps ? (
            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2"
            >
              {step === totalSteps - 1 ? "Complete Setup" : "Next Step"} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={complete}
              className="bg-gradient-to-r from-green-500 to-blue-500 px-8 py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all mx-auto"
            >
              Enter Your Portal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
