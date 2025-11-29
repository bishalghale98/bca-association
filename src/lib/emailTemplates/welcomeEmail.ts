// lib/emailTemplates/welcomeEmail.ts

import { IUser } from "@/types/User";

export const welcomeEmailTemplate = (user: IUser, password: string) => {
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 32px; text-align: center;">
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; display: inline-block;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <h1 style="color: white; font-size: 32px; font-weight: 700; margin: 20px 0 0 0;">Welcome Aboard!</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0 0;">Your account has been created successfully</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Hello <strong style="color: #1a1a1a;">${user.name}</strong>,
      </p>

      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
        Welcome to our platform! Your account has been successfully created. Here are your login details:
      </p>

      <!-- Account Details Card -->
      <div style="background: #f8f9fa; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0;">
        <div style="background: #000; padding: 16px 24px;">
          <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">🔐 Account Credentials</h2>
        </div>
        <div style="padding: 24px;">
          ${["name", "email"]
            .map(
              (field) => `
            <div style="display: flex; padding: 12px 0; border-bottom: 1px solid #eaeaea;">
              <div style="flex: 1; color: #666; font-weight: 500;">${
                field === "name" ? "Full Name" : "Email Address"
              }:</div>
              <div style="flex: 1; color: #1a1a1a; font-weight: 400;">${
                (user as any)[field]
              }</div>
            </div>
          `
            )
            .join("")}

          <div style="display: flex; padding: 12px 0;">
            <div style="flex: 1; color: #666; font-weight: 500;">Password:</div>
            <div style="flex: 1; color: #1a1a1a; font-weight: 400; font-family: monospace; letter-spacing: 1px;">
              ${password}
            </div>
          </div>
        </div>
      </div>

      <!-- Security Notice -->
      <div style="background: #fff3e0; border: 1px solid #ffb74d; border-radius: 8px; padding: 20px; margin: 32px 0;">
        <h3 style="color: #f57c00; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Important Security Notice</h3>
        <p style="color: #f57c00; font-size: 14px; line-height: 1.5; margin: 0;">
          Keep your password confidential and do not share it with anyone. 
          We recommend changing your password after your first login.
        </p>
      </div>

      <!-- Next Steps -->
      <div style="background: #e8f5e8; border: 1px solid #c8e6c9; border-radius: 8px; padding: 20px; margin: 32px 0;">
        <h3 style="color: #2e7d32; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">🚀 Getting Started</h3>
        <p style="color: #2e7d32; font-size: 14px; line-height: 1.5; margin: 0;">
          Log in to your account to explore all features. Our support team is here if you need assistance.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #eaeaea;">
      <p style="color: #999; font-size: 12px; margin: 0;">
        This is an automated message. Please do not reply to this email.
      </p>
      <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">
        Account created on ${new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  </div>
  `;
};
