// api/controllers/AuthController.js
const { ADMIN, USER } = require('../constants/Roles');

module.exports = {
  login: async function(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.badRequest({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return res.notFound({ message: 'User not found' });
      }

      await sails.helpers.passwords.checkPassword(password, user.password)
        .intercept('incorrect', () => {
          return res.badRequest({ message: 'Invalid credentials' });
        });

      // Set session
      req.session.userId = user.id;
      req.session.user = user;

      return res.ok({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      return res.serverError(error);
    }
  },

  register: async function(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.badRequest({ message: 'All fields are required' });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const hashedPassword = await sails.helpers.hashPassword(password);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: USER,
        status: 1
      }).fetch();

      req.session.userId = user.id;
      req.session.user = user;

      return res.ok({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      return res.serverError(error);
    }
  },

  logout: async function(req, res) {
    req.session.destroy();
    return res.ok();
  },

  checkAuth: async function(req, res) {
    try {
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      return res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
