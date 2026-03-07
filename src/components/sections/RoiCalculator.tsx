import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Clock, TrendingUp, ArrowRight } from "lucide-react";

const RoiCalculator = () => {
  const [revenue, setRevenue] = useState(25000);
  const [adminHours, setAdminHours] = useState(20);
  const [missedLeads, setMissedLeads] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);

  // Calculations
  const adminCostPerMonth = adminHours * 4 * hourlyRate;
  const timeSavedHours = Math.round(adminHours * 0.7); // 70% reduction
  const timeSavedDollars = timeSavedHours * 4 * hourlyRate;
  const recoveredLeadRevenue = Math.round(missedLeads * 0.4 * (revenue / 20)); // 40% recovery, avg deal = rev/20
  const revenueGrowth = Math.round(revenue * 0.15); // 15% growth from optimization
  const totalAnnualImpact = (timeSavedDollars + recoveredLeadRevenue + revenueGrowth) * 12;

  const formatNum = (n: number) => n.toLocaleString("en-US");

  return (
    <section id="roi" className="py-20 md:py-32 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Calculator className="w-3 h-3" /> Free Tool
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            AI ROI <span className="text-gradient-blue">Calculator</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4">See exactly how much time and money AI automation could save your business.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input sliders */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-dark rounded-xl p-8 space-y-8">
            <h3 className="font-heading font-bold text-foreground text-lg">Your Business Numbers</h3>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">Monthly Revenue</label>
                <span className="text-sm font-bold text-primary">${formatNum(revenue)}</span>
              </div>
              <input type="range" min={5000} max={500000} step={5000} value={revenue} onChange={(e) => setRevenue(+e.target.value)}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>$5K</span><span>$500K</span></div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">Admin Hours Per Week</label>
                <span className="text-sm font-bold text-primary">{adminHours} hrs</span>
              </div>
              <input type="range" min={5} max={60} step={1} value={adminHours} onChange={(e) => setAdminHours(+e.target.value)}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>5 hrs</span><span>60 hrs</span></div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">Missed Leads Per Week</label>
                <span className="text-sm font-bold text-primary">{missedLeads} leads</span>
              </div>
              <input type="range" min={0} max={50} step={1} value={missedLeads} onChange={(e) => setMissedLeads(+e.target.value)}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>0</span><span>50</span></div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">Your Hourly Value</label>
                <span className="text-sm font-bold text-primary">${hourlyRate}/hr</span>
              </div>
              <input type="range" min={25} max={500} step={25} value={hourlyRate} onChange={(e) => setHourlyRate(+e.target.value)}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>$25</span><span>$500</span></div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="glass-dark rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h4 className="font-heading font-bold text-foreground">Time Savings</h4>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-heading font-black text-foreground">{timeSavedHours} hrs/week</p>
                  <p className="text-sm text-muted-foreground">freed up from automation</p>
                </div>
                <p className="text-lg font-bold text-emerald-400">${formatNum(timeSavedDollars)}/mo</p>
              </div>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h4 className="font-heading font-bold text-foreground">Recovered Revenue</h4>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-heading font-black text-foreground">${formatNum(recoveredLeadRevenue)}/mo</p>
                  <p className="text-sm text-muted-foreground">from lead recovery automation</p>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h4 className="font-heading font-bold text-foreground">Growth Impact</h4>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-heading font-black text-foreground">${formatNum(revenueGrowth)}/mo</p>
                  <p className="text-sm text-muted-foreground">projected revenue growth</p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="glass-dark rounded-xl p-6 border-2 border-primary/40 glow-blue">
              <p className="text-sm text-muted-foreground mb-1">Estimated Annual Impact</p>
              <p className="text-4xl font-heading font-black text-primary">${formatNum(totalAnnualImpact)}</p>
              <p className="text-sm text-muted-foreground mt-1">potential value per year with AI automation</p>
            </div>

            <a href="#quiz" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4" /> Find Your Starting Point
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
