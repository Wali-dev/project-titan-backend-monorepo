const { SendVerificationEmail } = require("../services/verify.service")

const sendVerificationEmail = async (req, res) => {
    await SendVerificationEmail()
}
















module.exports = { sendVerificationEmail }