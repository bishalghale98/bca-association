import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { ChangePassword } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendMail } from "../../../../../../sendMail/sendMail";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await dbConnect();

    const reqUser = await User.findById(id);
    if (!reqUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validation = validateSchema(ChangePassword, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validation.data!;

    const isMatch = await bcrypt.compare(currentPassword, reqUser.password);
    if (!isMatch) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    reqUser.password = await bcrypt.hash(newPassword, 10);
    await reqUser.save();

    await sendMail({
      to: reqUser.email as string,
      subject: "Password Updated Successfully",
      html: `
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
          Hello <strong style="color: #1a1a1a;">${
            reqUser.name
          }</strong>, your account password has been updated successfully.
        </p>

        <!-- Security Confirmation -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 32px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 16px;">
            <div style="background: #10b981; border-radius: 50%; padding: 8px; margin-right: 12px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 style="color: #065f46; font-size: 18px; font-weight: 600; margin: 0;">Security Update Confirmed</h3>
          </div>
          <p style="color: #065f46; font-size: 14px; line-height: 1.5; margin: 0;">
            Your password was changed successfully. You can now use your new password to access your account.
          </p>
        </div>

        <!-- Change Details -->
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-align: center;">Change Details</h3>
          
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eaeaea;">
            <span style="color: #666; font-size: 14px;">Account:</span>
            <span style="color: #1a1a1a; font-size: 14px; font-weight: 500;">${
              reqUser.email
            }</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eaeaea;">
            <span style="color: #666; font-size: 14px;">Change Type:</span>
            <span style="color: #1a1a1a; font-size: 14px; font-weight: 500;">Manual Password Update</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; padding: 8px 0;">
            <span style="color: #666; font-size: 14px;">Time:</span>
            <span style="color: #1a1a1a; font-size: 14px; font-weight: 500;">
              ${new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <!-- Session Information -->
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <div style="display: flex; align-items: flex-start;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6" style="margin-right: 12px; flex-shrink: 0;">
              <path d="M13 2L3 14h6l-1 8 10-12h-6l1-8z"/>
            </svg>
            <div>
              <h3 style="color: #1e40af; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Active Sessions</h3>
              <p style="color: #1e40af; font-size: 14px; line-height: 1.5; margin: 0;">
                Your current login sessions remain active. For enhanced security, you may want to sign out of other devices.
              </p>
            </div>
          </div>
        </div>

        <!-- Security Reminder -->
        <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <div style="display: flex; align-items: flex-start;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ea580c" style="margin-right: 12px; flex-shrink: 0;">
              <path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6z"/>
              <path d="M12 11v4m0 4h.01"/>
            </svg>
            <div>
              <h3 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Security Best Practices</h3>
              <ul style="color: #ea580c; font-size: 14px; line-height: 1.5; margin: 0; padding-left: 16px;">
                <li>Use a strong, unique password</li>
                <li>Enable two-factor authentication</li>
                <li>Regularly update your password</li>
                <li>Never share your credentials</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin: 32px 0;">
          <a href="#" 
             style="display: inline-flex; align-items: center; justify-content: center; 
                    background: #000; color: white; text-decoration: none; 
                    padding: 14px 28px; border-radius: 8px; font-weight: 500; 
                    font-size: 15px; transition: all 0.2s ease; border: 1px solid #000;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Sign In with New Password
            <svg style="margin-left: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        
        <!-- Support Info -->
        <div style="border-top: 1px solid #eaeaea; padding-top: 24px; text-align: center;">
          <p style="color: #999; font-size: 14px; margin: 0 0 8px 0;">
            Didn't make this change?
          </p>
          <a href="mailto:support@yourapp.com" 
             style="color: #667eea; text-decoration: none; font-weight: 500; font-size: 14px;">
            Contact Support Immediately →
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #eaeaea;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          This is a security notification for account: ${reqUser.email}
        </p>
        <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">
          If you have any concerns about your account security, please contact us immediately.
        </p>
      </div>
    </div>
  `,
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err: any) {
    console.error("Error changing password:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
        errors: { server: [err.message] },
      },
      { status: 500 }
    );
  }
}
