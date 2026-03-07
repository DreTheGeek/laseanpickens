// Email templates for n8n/Resend integration
// These are called from n8n workflows after webhook triggers
// The n8n workflow should POST to Resend API with these templates

export const emailTemplates = {
  welcome: {
    subject: "Welcome to Kaldr Tech - Let's Build Something Great",
    html: (name: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0b1121; color: #e5e7eb; padding: 40px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #06b6d4; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 20px;">K</div>
        </div>
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; color: white; margin-bottom: 16px;">Welcome, ${name}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #9ca3af; text-align: center;">Your account has been created. Here's what you can do:</p>
        <div style="background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <div style="margin-bottom: 16px;"><span style="color: #06b6d4; font-weight: bold;">1.</span> <span style="color: white;">Access your Client Portal</span><br/><span style="color: #6b7280; font-size: 14px;">View orders, courses, and resources</span></div>
          <div style="margin-bottom: 16px;"><span style="color: #06b6d4; font-weight: bold;">2.</span> <span style="color: white;">Join the Winner Circle Community</span><br/><span style="color: #6b7280; font-size: 14px;">Connect with other business owners</span></div>
          <div><span style="color: #06b6d4; font-weight: bold;">3.</span> <span style="color: white;">Book a Strategy Call</span><br/><span style="color: #6b7280; font-size: 14px;">Get personalized recommendations</span></div>
        </div>
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://laseanpickens.com/portal" style="background: #06b6d4; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Go to My Portal</a>
        </div>
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px;">Kaldr Tech<br/>support@laseanpickens.com</p>
      </div>
    `,
  },

  orderConfirmation: {
    subject: "Order Confirmed - {service}",
    html: (name: string, service: string, amount: string, orderId: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0b1121; color: #e5e7eb; padding: 40px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #10b981; display: inline-flex; align-items: center; justify-content: center;">
            <span style="font-size: 24px;">&#10003;</span>
          </div>
        </div>
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; color: white; margin-bottom: 8px;">Order Confirmed!</h1>
        <p style="font-size: 16px; text-align: center; color: #9ca3af; margin-bottom: 24px;">Thank you, ${name}. Your order is being processed.</p>
        <div style="background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;"><span style="color: #6b7280;">Service</span><span style="color: white; font-weight: 600;">${service}</span></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;"><span style="color: #6b7280;">Amount</span><span style="color: #10b981; font-weight: bold;">${amount}</span></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: #6b7280;">Order ID</span><span style="color: #06b6d4;">${orderId}</span></div>
        </div>
        <div style="background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <h3 style="color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">What Happens Next</h3>
          <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">Our team will begin working on your project within 24 hours. You will receive an onboarding email with next steps and access to your project workspace.</p>
        </div>
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://laseanpickens.com/portal" style="background: #06b6d4; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">View Order in Portal</a>
        </div>
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px;">Kaldr Tech<br/>support@laseanpickens.com</p>
      </div>
    `,
  },

  passwordReset: {
    subject: "Reset Your Password - Kaldr Tech",
    html: (resetLink: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0b1121; color: #e5e7eb; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; color: white; margin-bottom: 16px;">Reset Your Password</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #9ca3af; text-align: center;">Click the button below to create a new password. This link expires in 1 hour.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" style="background: #06b6d4; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 14px; color: #6b7280; text-align: center;">If you did not request this, you can safely ignore this email.</p>
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px;">Kaldr Tech</p>
      </div>
    `,
  },

  invoiceReceipt: {
    subject: "Invoice #{invoiceNumber} - Kaldr Tech",
    html: (name: string, invoiceNumber: string, service: string, amount: string, date: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0b1121; color: #e5e7eb; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; color: white; margin-bottom: 24px;">Invoice Receipt</h1>
        <div style="background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <div style="margin-bottom: 12px;"><span style="color: #6b7280;">Invoice #</span><span style="color: white; float: right;">${invoiceNumber}</span></div>
          <div style="margin-bottom: 12px;"><span style="color: #6b7280;">Client</span><span style="color: white; float: right;">${name}</span></div>
          <div style="margin-bottom: 12px;"><span style="color: #6b7280;">Service</span><span style="color: white; float: right;">${service}</span></div>
          <div style="margin-bottom: 12px;"><span style="color: #6b7280;">Date</span><span style="color: white; float: right;">${date}</span></div>
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; margin-top: 12px;"><span style="color: #6b7280; font-weight: bold;">Total</span><span style="color: #10b981; font-weight: bold; float: right; font-size: 18px;">${amount}</span></div>
        </div>
        <p style="font-size: 14px; color: #9ca3af; text-align: center;">Thank you for your business!</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://laseanpickens.com/portal" style="background: #06b6d4; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">View in Portal</a>
        </div>
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px;">Kaldr Tech<br/>support@laseanpickens.com</p>
      </div>
    `,
  },

  reviewRequest: {
    subject: "How was your experience? - Kaldr Tech",
    html: (name: string, service: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0b1121; color: #e5e7eb; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; color: white; margin-bottom: 16px;">How Did We Do?</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #9ca3af; text-align: center;">Hi ${name}, your <strong style="color: white;">${service}</strong> project is complete! We would love to hear how it went.</p>
        <div style="text-align: center; margin: 32px 0;">
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 16px;">Rate your experience:</p>
          <div style="font-size: 36px; letter-spacing: 8px;">
            <a href="https://laseanpickens.com/portal" style="text-decoration: none;">&#11088;&#11088;&#11088;&#11088;&#11088;</a>
          </div>
        </div>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://laseanpickens.com/portal" style="background: #06b6d4; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Leave a Review</a>
        </div>
        <p style="font-size: 14px; color: #6b7280; text-align: center;">Your feedback helps us improve and helps other businesses find the right solutions.</p>
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px;">Kaldr Tech<br/>support@laseanpickens.com</p>
      </div>
    `,
  },

  checklistDelivery: {
    subject: "Your AI Automation Checklist is Ready",
    html: (email: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0b1121; color: #e5e7eb; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: bold; text-align: center; color: white; margin-bottom: 16px;">Your Checklist is Ready!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #9ca3af; text-align: center;">Here is your 10-point AI Automation Checklist. Use it to identify your biggest automation opportunities.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://laseanpickens.com/resources/automation-checklist" style="background: #06b6d4; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">View Full Checklist</a>
        </div>
        <div style="background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <h3 style="color: white; font-size: 14px; font-weight: bold; margin-bottom: 12px;">Want Personalized Recommendations?</h3>
          <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">Take our free AI Readiness Assessment to get a custom score and tailored action plan for your business.</p>
          <div style="margin-top: 16px;"><a href="https://laseanpickens.com/#quiz" style="color: #06b6d4; font-size: 14px; text-decoration: underline;">Take the Assessment</a></div>
        </div>
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 32px;">Sent to ${email}<br/>Kaldr Tech</p>
      </div>
    `,
  },
};
