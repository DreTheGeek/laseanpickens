import { motion } from "framer-motion";
import { Calendar, Bot, Phone, Clock, Shield } from "lucide-react";

const BookingWidget = () => (
  <section id="booking" className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Book a Free <span className="text-gradient-blue">Discovery Call</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our AI will handle your booking and prep. Pick a time that works and we will send you everything you need before the call.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Left - info */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-dark rounded-xl p-6">
            <h3 className="font-heading font-bold text-foreground mb-4">What to Expect</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">15 Minutes</p>
                  <p className="text-xs text-muted-foreground">Quick and focused on your specific needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">AI-Powered</p>
                  <p className="text-xs text-muted-foreground">Our AI handles scheduling, prep, and follow-up</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Voice or Video</p>
                  <p className="text-xs text-muted-foreground">Your choice - Google Meet link included</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">No Pressure</p>
                  <p className="text-xs text-muted-foreground">Get personalized recommendations, no sales pitch</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-xl p-6">
            <h4 className="font-heading font-bold text-foreground text-sm mb-2">Before Your Call</h4>
            <p className="text-xs text-muted-foreground">Our AI will send you a short pre-call questionnaire so we can make the most of your 15 minutes. You will also receive a calendar invite with the meeting link.</p>
          </div>
        </div>

        {/* Right - Calendar embed */}
        <div className="md:col-span-3">
          <div className="glass-dark rounded-xl overflow-hidden border border-border">
            {/* Google Calendar Appointment Scheduling embed */}
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0"
              style={{ border: 0, width: "100%", height: 600 }}
              frameBorder="0"
              title="Book a Discovery Call"
              className="bg-background"
            />
            {/* Fallback if embed does not load */}
            <noscript>
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-foreground mb-2">Schedule Your Call</h3>
                <p className="text-muted-foreground mb-4">JavaScript is required to load the booking calendar.</p>
                <a href="mailto:hello@laseanpickens.com" className="text-primary hover:underline">Email us instead</a>
              </div>
            </noscript>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            <Calendar className="w-3 h-3 inline mr-1" />
            Powered by Google Calendar - all times shown in your timezone
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BookingWidget;
