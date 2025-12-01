interface PasswordUpdatedEmailProps {
  name: string;
  email: string;
  date?: Date;
}

/**
 * Returns the HTML string for password updated email
 */
export const passwordUpdatedEmail = ({
  name,
  email,
  date = new Date(),
}: PasswordUpdatedEmailProps) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 32px; text-align: center;">
      <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; display: inline-block;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
      <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 20px 0 0 0;">Password Updated</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0 0;">Your password has been changed successfully</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        Hello <strong style="color: #1a1a1a;">${name}</strong>, your account password has been updated successfully.
      </p>

      <!-- Change Details -->
      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-align: center;">Change Details</h3>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eaeaea;">
          <span style="color: #666; font-size: 14px;">Account:</span>
          <span style="color: #1a1a1a; font-size: 14px; font-weight: 500;">${email}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eaeaea;">
          <span style="color: #666; font-size: 14px;">Change Type:</span>
          <span style="color: #1a1a1a; font-size: 14px; font-weight: 500;">Manual Password Update</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
          <span style="color: #666; font-size: 14px;">Time:</span>
          <span style="color: #1a1a1a; font-size: 14px; font-weight: 500;">${formattedDate}</span>
        </div>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="#" 
           style="display: inline-flex; align-items: center; justify-content: center; 
                  background: #000; color: white; text-decoration: none; 
                  padding: 14px 28px; border-radius: 8px; font-weight: 500; 
                  font-size: 15px; transition: all 0.2s ease; border: 1px solid #000;">
          Sign In with New Password
        </a>
      </div>
    </div>
  </div>
  `;
};
