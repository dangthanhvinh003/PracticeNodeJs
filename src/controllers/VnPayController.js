const { vnpay } = require('../config/vnpay');
const Order = require('../models/Order');

const vnpayReturn = async (req, res) => {
    let verify;
    try {
        // Sử dụng try-catch để bắt lỗi nếu query không hợp lệ hoặc thiếu dữ liệu
        verify = vnpay.verifyReturnUrl(req.query);
        if (!verify.isVerified) {
            return res.send('Xác thực tính toàn vẹn dữ liệu thất bại');
        }
    } catch (error) {
        return res.send('Dữ liệu không hợp lệ');
    }

    // Kiểm tra thông tin đơn hàng và xử lý tương ứng
    try {
        const orderId = req.query.vnp_TxnRef;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.send('Không tìm thấy đơn hàng');
        }

        // Cập nhật trạng thái đơn hàng
        order.status = verify.isSuccess ? 'Success' : 'Failed';
        await order.save();

        // Redirect to Order Detail page
        return res.redirect(`/Order/${orderId}`);
    } catch (error) {
        return res.send('Lỗi xử lý đơn hàng: ' + error.message);
    }
};

module.exports = { vnpayReturn };