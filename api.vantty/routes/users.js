const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', {
  session: false,
});
const {
  getById,
  update,
  deleteAccount,
  sendConfirmationEmail,
  resendConfirmationEmail,
  register,
  login,
  forgot,
  reset,
  google,
  facebook,
  getAll,
  help,
  adminEmail,
} = require('../controllers/users');
const { validator } = require('../helpers');

/**
 * @swagger
 * /users:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: return a user
 *        schema:
 *          $ref: '#/definitions/User'
 * /users/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: return a user
 *        schema:
 *          $ref: '#/definitions/User'
 */
router.get('/', passportJWT, getById);
router.get('/all', passportJWT, getAll);
router.post('/send', validator, sendConfirmationEmail);
router.post('/resend', resendConfirmationEmail);
router.get('/register/:token', register);
router.post('/login', passportLocal, login);
router.post('/forgot', forgot);
router.post('/reset', reset);
router.post('/google', passportGoogle, google);
router.post('/facebook', passportFacebook, facebook);
router.patch('/', passportJWT, update);
router.delete('/', passportJWT, deleteAccount);
router.post('/help', help);
router.post('/admin-email', adminEmail);

module.exports = router;
