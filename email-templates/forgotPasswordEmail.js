// emailTemplate.js
function forgotPasswordEmail(resetLink) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
            <p>Dear User,</p>
            <p>We received a request to reset the password for your account. To proceed, please click the link below:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </div>
            <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
            <p>Best regards,<br/>The person behind the service</p>
        </div>
    `;
}

module.exports = forgotPasswordEmail;
