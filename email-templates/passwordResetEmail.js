// emailTemplate.js
function resetPasswordEmail(resetLink) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
            <p>Dear User,</p>
            <p>We received a request to reset your password. To reset your password, please click the link below:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">Reset Password</a>
            </div>
            <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
            <p>Best regards,<br/>The person behind the service</p>
        </div>
    `;
}

module.exports = resetPasswordEmail;
