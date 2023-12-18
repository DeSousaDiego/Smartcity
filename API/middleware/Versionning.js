
module.exports.getVersion  = (req, res, next) => {
    req.version = req.headers['accept-version'];
    if (!req.version) {
       res.status(400);
    } else {
       next();
    }
 };
 