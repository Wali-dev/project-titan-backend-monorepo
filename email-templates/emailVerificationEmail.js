// emailTemplate.js
function verificationEmail(verificationCode) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Account Verification</h2>
            <p>Dear User,</p>
            <p>Thank you for registering with our service. To complete your account setup, please use the verification code below:</p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #555;">${verificationCode}</span>
            </div>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br/>The person behind the service</p>
        </div>
    `;
}

module.exports = verificationEmail;
