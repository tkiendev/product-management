const mongoose = require('mongoose');

const otpchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 120 // thời gian tính bằng giây 
    }
});

const otpModel = mongoose.model('otps', otpchema);
module.exports = otpModel;