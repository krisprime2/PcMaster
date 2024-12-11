const jwt = require('jsonwebtoken');
const {findOneByEmail, findOne} = require("./UserController");

module.exports = {
  /**
   * Login a user
   * POST /auth/login
   */
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Überprüfen, ob E-Mail und Passwort angegeben wurden
      if (!email || !password) {
        return res.badRequest({ message: 'E-Mail und Passwort sind erforderlich.' });
      }

      // Benutzer anhand der E-Mail finden
      const user = await User.findOne({ email });
      if (!user) {
        return res.notFound({ message: 'Benutzer mit dieser E-Mail nicht gefunden.' });
      }

      // Passwort vergleichen
      if (password !== user.password) {
        return res.badRequest({ message: 'Falsches Passwort.' });
      }
      // JWT-Token generieren
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        sails.config.jwtSecret,
        { expiresIn: '1d' }
      );

      return res.json({ message: 'Login erfolgreich.', token, userId: user.id });
    } catch (error) {
      console.error('Fehler beim Login:', error);
      return res.serverError({ message: 'Fehler beim Login.', error });
    }
  },
};
