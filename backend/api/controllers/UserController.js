/**
 * UserController
 *
 * @description :: Server-side actions for handling user-related requests.
 */

const { ADMIN, USER } = require("../constants/Roles");

module.exports = {
  /**
   * Create a new user
   * POST /user/create
   */
  createUser: async function (req, res) {
    try {
      const params = req.allParams();

      if (!params.name || !params.email || !params.password) {
        return res.badRequest({ message: 'Name, E-Mail und Passwort sind erforderlich.' });
      }

      const user = await User.create({
        name: params.name,
        email: params.email,
        password: params.password, // Passwort-Hashing sollte hinzugefügt werden
        role: USER,
        status: 1,
      }).fetch();

      return res.status(201).json({ message: 'Benutzer erfolgreich erstellt.', user });
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Erstellen des Benutzers.', error });
    }
  },

  /**
   * Create a new admin
   * POST /admin/create
   */
  createAdmin: async function (req, res) {
    try {
      const params = req.allParams();

      if (!params.name || !params.email || !params.password) {
        return res.badRequest({ message: 'Name, E-Mail und Passwort sind erforderlich.' });
      }

      const admin = await User.create({
        name: params.name,
        email: params.email,
        password: params.password, // Passwort-Hashing sollte hinzugefügt werden
        role: ADMIN,
        status: 1,
      }).fetch();

      return res.status(201).json({ message: 'Admin erfolgreich erstellt.', admin });
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Erstellen des Admins.', error });
    }
  },

  /**
   * Find all users
   * GET /user
   */
  find: async function (req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Abrufen der Benutzer.', error });
    }
  },

  /**
   * Find a specific user
   * GET /user/:id
   */
  findOne: async function (req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.badRequest({ message: 'Benutzer-ID ist erforderlich.' });
      }

      const user = await User.findOne({ id: userId });

      if (!user) {
        return res.notFound({ message: 'Benutzer nicht gefunden.' });
      }

      return res.json(user);
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Abrufen des Benutzers.', error });
    }
  },

  /**
   * Update a user
   * PUT /user/:id
   */
  update: async function (req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.badRequest({ message: 'Benutzer-ID ist erforderlich.' });
      }

      const params = req.allParams();

      const updatedUser = await User.updateOne({ id: userId }).set({
        name: params.name,
        email: params.email,
        password: params.password, // Passwort-Hashing sollte hinzugefügt werden
      });

      if (!updatedUser) {
        return res.notFound({ message: 'Benutzer nicht gefunden.' });
      }

      return res.json({ message: 'Benutzer erfolgreich aktualisiert.', updatedUser });
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Aktualisieren des Benutzers.', error });
    }
  },

  /**
   * Update user status
   * PATCH /user/:id/status
   */
  updateStatus: async function (req, res) {
    try {
      const userId = req.params.id;
      const status = parseInt(req.params.status, 10);
      sails.log.info('Dies ist eine Info-Nachricht');

      if (!userId) {
        return res.badRequest({ message: 'Benutzer-ID ist erforderlich.' });
      }

      if (![1, 2].includes(status)) {
        return res.badRequest({ message: 'Ungültiger Status. Erlaubte Werte sind 1 (active) oder 2 (LOCKED).' });
      }

      const updatedUser = await User.updateOne({ id: userId }).set({ status });

      if (!updatedUser) {
        return res.notFound({ message: 'Benutzer nicht gefunden.' });
      }

      const statusText = status === 1 ? 'active' : 'LOCKED';
      return res.json({ message: `Status erfolgreich auf ${statusText} aktualisiert.`, updatedUser });
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Aktualisieren des Status.', error });
    }
  },

  /**
   * Delete a user
   * DELETE /user/:id
   */
  destroy: async function (req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.badRequest({ message: 'Benutzer-ID ist erforderlich.' });
      }

      const deletedUser = await User.destroyOne({ id: userId });

      if (!deletedUser) {
        return res.notFound({ message: 'Benutzer nicht gefunden.' });
      }

      return res.json({ message: 'Benutzer erfolgreich gelöscht.', deletedUser });
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Löschen des Benutzers.', error });
    }
  },
};
