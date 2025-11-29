import { transporter } from "@/lib/mail";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
  from,
}: SendMailOptions) => {
  try {
    await transporter.sendMail({
      from: from || `"Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
