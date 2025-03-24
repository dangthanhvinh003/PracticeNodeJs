import { VNPay, ignoreLogger } from 'vnpay';
import dotenv from 'dotenv';

dotenv.config();

export default new VNPay({
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