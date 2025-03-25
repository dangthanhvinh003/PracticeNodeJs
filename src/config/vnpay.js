const { VNPay, ignoreLogger } = require('vnpay');
const dotenv = require('dotenv');

dotenv.config();

const vnpay = new VNPay({
    // Thông tin cấu hình bắt buộc
    tmnCode: process.env.VNPAY_TMN_CODE,
    secureSecret: process.env.VNPAY_SECURE_SECRET,
    vnpayHost: process.env.VNPAY_HOST,
    
    // Cấu hình tùy chọn
    testMode: true,                // Chế độ test
    hashAlgorithm: 'SHA512',      // Thuật toán mã hóa
    enableLog: true,              // Bật/tắt ghi log
    loggerFn: ignoreLogger,       // Hàm xử lý log tùy chỉnh
});

const dateFormat = (date) => {
    const options = { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);

    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hours = parts.find(part => part.type === 'hour').value;
    const minutes = parts.find(part => part.type === 'minute').value;
    const seconds = parts.find(part => part.type === 'second').value;

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

module.exports = { vnpay, dateFormat };