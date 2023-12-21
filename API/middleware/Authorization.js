/**
 *@swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *         description: Access denied to all non-admin users
 * 
 */

module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session && req.session.authLevel === 'admin'){
        next();
    } else {
        res.sendStatus(403);
    }
}
