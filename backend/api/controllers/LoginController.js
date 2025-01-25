const {USER} = require("../constants/Roles");


module.exports = {
  login: async function (req, res) {
    try {
      const {email, password} = req.body;

      if (!email || !password) {
        return res.badRequest({message: 'E-Mail und Passwort sind erforderlich.'});
      }
      const user = await sails.helpers.findOneByEmail(email);

      if (!user) {
        return res.status(404).json({message: 'Benutzer nicht gefunden.'});
      }

      await sails.helpers
        .checkPassword(password, user.password)
        .intercept('incorrect', () => {
          throw new Error('Ungültige Anmeldedaten.');
        });

      req.session.userId = user.id;
      req.session.user = user;

      return res.json({message: 'Login erfolgreich.', user});
    } catch (error) {
      sails.log.error('Fehler beim Login:', error);
      return res.serverError({message: 'Fehler beim Login.', error});
    }
  },


  register: async function (req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.badRequest({ message: 'Name, E-Mail und Passwort sind erforderlich.' });
      }

      sails.log(name,email,password)

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Ein Konto mit dieser E-Mail-Adresse existiert bereits.' }).message;
      }

      sails.log(existingUser.userId)

      const hashedPassword = await sails.helpers.passwords.hashPassword(password);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: USER,
        status: 1,
      })
        .intercept('E_UNIQUE', 'emailAlreadyInUse')
        .fetch();

      req.session.userId = user.id;
      req.session.user = user;

      return res.json(user);
    } catch (error) {
      sails.log.error('Fehler bei der Registrierung:', error);
      return res.serverError({ message: 'Fehler bei der Registrierung.', error });
    }
  },

};
