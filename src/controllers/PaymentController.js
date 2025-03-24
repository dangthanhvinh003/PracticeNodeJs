/*
import { vnpay } from "../config/vnpay";

export const vnpayReturn = (req, res) => {
    let verify;
    try {
        // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ hoặc thiếu dữ liệu
        verify = vnpay.verifyReturnUrl(req.query);
        if (!verify.isVerified) {
            return res.send('Xác thực tính toàn vẹn dữ liệu thất bại');
        }
        if (!verify.isSuccess) {
            return res.send('Đơn hàng thanh toán thất bại');
        }
    } catch (error) {
        return res.send('Dữ liệu không hợp lệ');
    }

    // Kiểm tra thông tin đơn hàng và xử lý tương ứng
    // Chỉ xử lý liên quan đến UI ở đây, không xử lý logic kinh doanh
    // Logic kinh doanh quan trọng phải được xử lý ở phía server bằng IPN
    // (vì test trên local nên xử lý ở đây)
    

    return res.send('Xác thực URL trả về thành công');
}
 */