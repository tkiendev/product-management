const nodemailer = require('nodemailer');
module.exports = (fromEmail, pass, toEmail, subject, text) => {
    // gửi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromEmail,       // Email của bạn
            pass: pass           // Mật khẩu ứng dụng (không phải mật khẩu Gmail)
        }
    });
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Lỗi khi gửi email:', error);
            return false;
        } else {
            console.log('Email đã được gửi:', info.response);
            return true;
        }
    });
    return true;

    // =========================================================
}