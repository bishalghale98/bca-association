// lib/emailTemplates/studentFormEmail.ts

import { IStudentForm } from "@/models/StudentForm";

export const studentFormEmailTemplate = (saved: IStudentForm) => {
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 32px; text-align: center;">
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 20px; display: inline-block;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M12 14l9-5-9-5-9 5 9 5z"/>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
        </svg>
      </div>
      <h1 style="color: white; font-size: 32px; font-weight: 700; margin: 20px 0 0 0;">Student Form Submitted!</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0 0;">Thank you for your submission</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        We've received your student information form. Here are the details you provided:
      </p>

      <!-- Personal Info Section -->
      <div style="background: #f8f9fa; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0;">
        <div style="background: #000; padding: 16px 24px;">
          <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">👤 Personal Information</h2>
        </div>
        <div style="padding: 24px;">
          ${["fullName", "rollNumber", "semester", "email", "phone"]
            .map(
              (field) => `
            <div style="display: flex; padding: 12px 0; border-bottom: 1px solid #eaeaea;">
              <div style="flex: 1; color: #666; font-weight: 500;">${field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}:</div>
              <div style="flex: 1; color: #1a1a1a; font-weight: 400;">${
                (saved as any)[field]
              }</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Career Goals -->
      <div style="background: #f0f7ff; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0;">
        <div style="background: #1976d2; padding: 16px 24px;">
          <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">🎯 Career Goals</h2>
        </div>
        <div style="padding: 24px; color: #1a1a1a; line-height: 1.6; font-size: 15px;">${
          saved.careerGoal
        }</div>
      </div>

<!-- Skills -->
<div style="background: #f8f9fa; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0;">
  <div style="background: #000; padding: 16px 24px;">
    <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">💼 Skills & Competencies</h2>
  </div>
  <div style="padding: 24px;">
    ${
      saved.skills && saved.skills.length > 0
        ? `
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            ${saved.skills
              .reduce((rows, skill, index) => {
                if (index % 3 === 0) rows.push([]);
                rows[rows.length - 1].push(skill);
                return rows;
              }, [])
              .map(
                (row) => `
                <tr>
                  ${row
                    .map(
                      (skill) => `
                    <td width="33%" align="center" style="padding: 4px;">
                      <div style="background: #667eea; color: white; padding: 8px 6px; border-radius: 20px; font-size: 13px; font-weight: 500; text-align: center; word-break: break-word;">
                        ${skill}
                      </div>
                    </td>
                  `
                    )
                    .join("")}
                  ${
                    row.length < 3
                      ? Array(3 - row.length)
                          .fill()
                          .map(
                            () => `
                        <td width="33%" style="padding: 4px;"></td>
                      `
                          )
                          .join("")
                      : ""
                  }
                </tr>
              `
              )
              .join("")}
          </table>
        `
        : '<div style="color: #666; text-align: center; padding: 20px;">No skills specified</div>'
    }
  </div>
</div>

<!-- Events -->
<div style="background: #f8f9fa; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0;">
  <div style="background: #000; padding: 16px 24px;">
    <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">📅 Events Interested In</h2>
  </div>
  <div style="padding: 24px;">
    ${
      saved.events && saved.events.length > 0
        ? `
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
            ${saved.events
              .reduce((rows, event, index) => {
                if (index % 3 === 0) rows.push([]);
                rows[rows.length - 1].push(event);
                return rows;
              }, [])
              .map(
                (row) => `
                <tr>
                  ${row
                    .map(
                      (event) => `
                    <td width="33%" align="center" style="padding: 4px;">
                      <div style="background: #764ba2; color: white; padding: 8px 6px; border-radius: 20px; font-size: 13px; font-weight: 500; text-align: center; word-break: break-word;">
                        ${event}
                      </div>
                    </td>
                  `
                    )
                    .join("")}
                  ${
                    row.length < 3
                      ? Array(3 - row.length)
                          .fill()
                          .map(
                            () => `
                        <td width="33%" style="padding: 4px;"></td>
                      `
                          )
                          .join("")
                      : ""
                  }
                </tr>
              `
              )
              .join("")}
          </table>
        `
        : '<div style="color: #666; text-align: center; padding: 20px;">No events selected</div>'
    }
  </div>
</div>

      <!-- Suggestions -->
      ${
        saved.suggestions
          ? `
        <div style="background: #fff3e0; border-radius: 12px; padding: 0; overflow: hidden; margin: 32px 0;">
          <div style="background: #f57c00; padding: 16px 24px;">
            <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">💡 Your Suggestions</h2>
          </div>
          <div style="padding: 24px; color: #1a1a1a; line-height: 1.6; font-size: 15px; font-style: italic;">
            "${saved.suggestions}"
          </div>
        </div>
      `
          : ""
      }

      <!-- Contact Preference -->
      <div style="background: #e8f5e8; border-radius: 8px; padding: 20px; margin: 32px 0; text-align: center;">
        <span style="color: #2e7d32; font-weight: 600; font-size: 16px;">
          ${
            saved.contacted
              ? "You agreed to be contacted for further opportunities"
              : "You opted not to be contacted"
          }
        </span>
      </div>

      <!-- Next Steps -->
      <div style="background: #e3f2fd; border: 1px solid #bbdefb; border-radius: 8px; padding: 20px; margin: 32px 0;">
        <h3 style="color: #1976d2; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">What happens next?</h3>
        <p style="color: #1976d2; font-size: 14px; line-height: 1.5; margin: 0;">
          Our academic team will review your information and may contact you for relevant opportunities, 
          events, or career guidance based on your preferences.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #eaeaea;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          Submission Date: ${new Date(saved.createdAt).toLocaleDateString()} • 
          Submission Time: ${new Date(saved.createdAt).toLocaleTimeString()}
        </p>
        <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;
};
