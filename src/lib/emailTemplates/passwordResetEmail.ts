type PasswordResetEmailProps = {
  userEmail: string;
  date?: Date;
};

export const PasswordResetEmail = ({
  userEmail,
  date = new Date(),
}: PasswordResetEmailProps) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const Header = () => `
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 32px; text-align: center;">
      <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; display: inline-block;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 20px 0 0 0;">Password Updated</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0 0;">Your password has been reset successfully</p>
    </div>
  `;

  const Content = () => `
    <div style="padding: 40px 32px;">
      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        Your account password has been updated successfully. You can now use your new password to sign in.
      </p>

      ${SecurityConfirmationCard()}
      ${ActionTimeline()}
      ${SecurityTips()}
      ${ActionButton()}
      ${SupportInfo()}
    </div>
  `;

  const SecurityConfirmationCard = () => `
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 32px 0;">
      <div style="display: flex; align-items: center; margin-bottom: 16px;">
        <div style="background: #10b981; border-radius: 50%; padding: 8px; margin-right: 12px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 style="color: #065f46; font-size: 18px; font-weight: 600; margin: 0;">Security Confirmed</h3>
      </div>
      <p style="color: #065f46; font-size: 14px; line-height: 1.5; margin: 0;">
        Your password has been securely updated and all previous sessions have been maintained. 
        The reset token has been invalidated for your security.
      </p>
    </div>
  `;

  const ActionTimeline = () => `
    <div style="background: #f8f9fa; border-radius: 8px; padding: 24px; margin: 32px 0;">
      <h3 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-align: center;">What happens next?</h3>
      ${[1, 2, 3]
        .map(
          (step) => `
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="background: #10b981; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; margin-right: 12px; flex-shrink: 0;">${step}</div>
          <span style="color: #666; font-size: 14px;">${
            step === 1
              ? "Use your new password to sign in"
              : step === 2
              ? "Access your account securely"
              : "Continue with your activities"
          }</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  const SecurityTips = () => `
    <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 32px 0;">
      <div style="display: flex; align-items: flex-start;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ea580c" style="margin-right: 12px; flex-shrink: 0;">
          <path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6z"/>
          <path d="M12 11v4m0 4h.01"/>
        </svg>
        <div>
          <h3 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Security Tips</h3>
          <ul style="color: #ea580c; font-size: 14px; line-height: 1.5; margin: 0; padding-left: 16px;">
            <li>Use a strong, unique password</li>
            <li>Avoid using the same password across multiple sites</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  const ActionButton = () => `
    <div style="text-align: center; margin: 32px 0;">
      <a href="#" style="display: inline-flex; align-items: center; justify-content: center; 
         background: #000; color: white; text-decoration: none; 
         padding: 14px 28px; border-radius: 8px; font-weight: 500; font-size: 15px; transition: all 0.2s ease; border: 1px solid #000;
         box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        Sign In to Your Account
        <svg style="margin-left: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  `;

  const SupportInfo = () => `
    <div style="border-top: 1px solid #eaeaea; padding-top: 24px; text-align: center;">
      <p style="color: #999; font-size: 14px; margin: 0 0 8px 0;">Didn't make this change?</p>
      <a href="mailto:support@yourapp.com" style="color: #667eea; text-decoration: none; font-weight: 500; font-size: 14px;">
        Contact Support Immediately →
      </a>
      <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">This security notification was sent to ${userEmail}</p>
      <p style="color: #999; font-size: 12px; margin: 0;">Password updated on ${formattedDate}</p>
    </div>
  `;

  const Footer = () => `
    <div style="background: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #eaeaea;">
      <p style="color: #999; font-size: 12px; margin: 0;">This is an automated message. Please do not reply.</p>
    </div>
  `;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea;">
      ${Header()}
      ${Content()}
      ${Footer()}
    </div>
  `;
};
