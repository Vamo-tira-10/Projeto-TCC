const redirecionaHttps = (req, res, next) => {
    if (req.secure) {
        next()
    } else {
        res.redirect('https://' + req.headers.host + req.originalUrl);
    }
}

module.exports = redirecionaHttps