const multer = require('multer');
module.exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // thư mục lưu file
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '.' + 'png';
        cb(null, file.fieldname + '-' + uniqueSuffix); // tên file sau khi lưu
    }
});
