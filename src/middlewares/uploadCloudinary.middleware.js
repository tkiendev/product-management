const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary.js');

module.exports.upload = (req, res, next) => {
    if (req.file) {
        try {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            async function upload(req) {
                let result = await streamUpload(req);
                req.body.thumbnail = result.url;
                next();
            }

            upload(req);
        }
        catch (error) {
            req.flash('error', 'Cập nhật không thành công');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
        }
    } else {
        if (req.params != {}) {
            next();
        } else {
            req.flash('error', 'Cập nhật không thành công');
            const previousUrl = req.get('Referer') || '/';
            res.redirect(previousUrl);
            return;
        }
    }
}