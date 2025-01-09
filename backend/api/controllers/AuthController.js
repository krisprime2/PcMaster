const {ACTIVE} = require("../constants/Status");
const {USER} = require("../constants/Roles");

module.exports = {
  login: async function(req, res) {
    try {
      const {email, password} = req.allParams();

      sails.log(email,password)
      if (!email || !password) {
        return res.badRequest({message: 'Email und Passwort sind erforderlich.'});
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({message: 'Benutzer nicht gefunden.'});
      }

      try {

        await sails.helpers.passwords.checkPassword.with({
          password: password,
          hashedPassword: user.password
        });
      } catch (err) {
        return res.status(401).json({message: 'Falsches Passwort.'});
      }

      req.session.userId = user.id;
      req.session.user = user;

      const userResponse = {...user};

      return res.json({
        message: 'Login erfolgreich',
        user: userResponse
      });
    } catch (err) {
      return res.serverError({message: 'Login fehlgeschlagen', error: err});
    }
  },

  register: async function(req, res) {
    try {
      const params = req.allParams();

      if (!params.name || !params.email || !params.password) {
        return res.badRequest({message: 'Name, Email und Password sind erforderlich.'});
      }

      sails.log(params.name,params.email,params.password)
      const existingUser = await User.findOne({ email: params.email });
      if (existingUser) {
        return res.status(400).json({message: 'Diese Email wird bereits verwendet.'});
      }

      const hashedPassword = await sails.helpers.passwords.hashPassword.with({
        password: params.password
      });

      const user = await User.create({
        name: params.name,
        email: params.email,
        password: hashedPassword,
        status: ACTIVE,
        role: USER,
      }).fetch();

      req.session.userId = user.id;
      req.session.user = user;

      const userResponse = {...user};

      return res.status(201).json({
        message: 'Registrierung erfolgreich',
        user: userResponse
      });
    } catch (err) {
      return res.serverError({message: 'Registrierung fehlgeschlagen', error: err});
    }
  },

  logout: async function(req, res) {
    req.session.destroy();
    return res.json({message: 'Logout erfolgreich'});
  },

  checkAuth: async function(req, res) {
    if (req.session && req.session.userId) {
      const user = await User.findOne({ id: req.session.userId });
      if (user) {
        return res.json({
          isAuthenticated: true,
          user: user
        });
      }
    }
    return res.status(401).json({
      isAuthenticated: false,
      user: null
    });
  }
};
