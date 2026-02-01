/**
 * Email sending utility functions using Resend
 */

import { CONTACT_INFO, EMAIL_CONFIG, EMAIL_MESSAGES, EMAIL_TEMPLATE } from "@/config/constants";
import { ContactFormData } from "@/data/data_types";
import { CreateEmailResponseSuccess, Resend } from "resend";

/**
 * Initialize Resend client
 */
export const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(EMAIL_MESSAGES.RESEND_KEY_NOT_CONFIGURED);
  }

  return new Resend(apiKey);
};

/**
 * Generate email HTML content from form data
 */
export const generateEmailHTML = (formData: ContactFormData): string => {
  const timestamp = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            background: #f5f5f5;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 32px 28px;
            text-align: center;
          }
          .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 6px;
          }
          .header p {
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 32px 28px;
          }
          .field {
            margin-bottom: 24px;
          }
          .label {
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .value {
            font-size: 15px;
            color: #1f2937;
            line-height: 1.5;
          }
          .value strong {
            font-size: 17px;
            font-weight: 600;
            color: #111827;
          }
          .email-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
          }
          .email-link:hover {
            color: #764ba2;
          }
          .message-content {
            background: #f9fafb;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
            color: #374151;
            font-size: 15px;
            line-height: 1.7;
          }
          .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 24px 0;
          }
          .footer {
            padding: 20px 28px;
            background: #f9fafb;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          @media (max-width: 600px) {
            body { padding: 20px 10px; }
            .header { padding: 24px 20px; }
            .content { padding: 24px 20px; }
            .footer { padding: 16px 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${EMAIL_TEMPLATE.HEADER_TITLE}</h1>
            <p>${EMAIL_TEMPLATE.HEADER_SUBTITLE}</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">${EMAIL_TEMPLATE.LABEL_FROM}</span>
              <div class="value"><strong>${formData.name}</strong></div>
            </div>
            
            <div class="divider"></div>
            
            <div class="field">
              <span class="label">${EMAIL_TEMPLATE.LABEL_EMAIL}</span>
              <div class="value">
                <a href="mailto:${formData.email}" class="email-link">${formData.email}</a>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="field">
              <span class="label">${EMAIL_TEMPLATE.LABEL_MESSAGE}</span>
              <div class="message-content">
                ${formData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          
          <div class="footer">
            ${EMAIL_TEMPLATE.FOOTER_TEXT}<br>
            ${timestamp}
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Send email using Resend
 */
export const sendEmail = async (formData: ContactFormData): Promise<CreateEmailResponseSuccess> => {
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: `${EMAIL_CONFIG.FROM_NAME} <${EMAIL_CONFIG.FROM_EMAIL}>`,
    to: [CONTACT_INFO.EMAIL],
    replyTo: formData.email,
    subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} ${formData.name}`,
    html: generateEmailHTML(formData),
  });

  if (error) {
    throw error;
  }

  return data;
};
