// lib/emailTemplates/resetPasswordEmail.ts
export const resetPasswordEmailTemplate = (resetLink: string) => {
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px 24px; text-align: center;">
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 8px; padding: 16px; display: inline-block;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 2l-1 1M3 2l1 1m17 13l-1-1M3 16l1-1m5 5l-1 1m8 0l-1-1"/>
          <rect x="3" y="6" width="18" height="12" rx="2"/>
        </svg>
      </div>
    </div>
    
    <div style="padding: 40px 32px;">
      <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 600; margin: 0 0 16px 0; text-align: center;">
        Reset your password
      </h1>
      
      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        You requested to reset your password. Click the button below to create a new one.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetLink}" 
           style="display: inline-flex; align-items: center; justify-content: center; 
                  background: #000; color: white; text-decoration: none; 
                  padding: 16px 32px; border-radius: 8px; font-weight: 500; 
                  font-size: 16px; transition: all 0.2s ease; border: 1px solid #000;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          Reset Password
          <svg style="margin-left: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      
      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 32px 0;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style="color: #666; font-size: 14px; margin-left: 8px; font-weight: 500;">Important</span>
        </div>
        <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 0;">
          This link will expire in <strong>10 minutes</strong> for security reasons. If you didn't request this reset, please ignore this email.
        </p>
      </div>
      
      <div style="border-top: 1px solid #eaeaea; padding-top: 24px; text-align: center;">
        <p style="color: #999; font-size: 14px; margin: 0;">
          Having trouble? <a href="mailto:support@yourapp.com" style="color: #666; text-decoration: underline;">Contact support</a>
        </p>
      </div>
    </div>
  </div>
  `;
};
