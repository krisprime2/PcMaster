/**
 * UserController
 *
 * @description :: Server-side actions for handling User-related requests.
 */

module.exports = {
  /**
   * Create a new user
   * POST /user/create
   */
  create: async function (req, res) {
    try {
      let params = req.allParams();

      if (!params.name || !params.email || !params.password) {
        return res.badRequest({ message: 'Name, E-Mail und Passwort sind erforderlich.' });
      }

      const user = await User.create({
        name: params.name,
        email: params.email,
        password: params.password, // Kein Hashing
      }).fetch();

      return res.status(201).json({ message: 'Benutzer erfolgreich erstellt.', user });
    } catch (error) {
      return res.serverError({ message: 'Fehler beim Erstellen des Benutzers.', error });
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

      let params = req.allParams();

      const updatedUser = await User.updateOne({ id: userId }).set({
        name: params.name,
        email: params.email,
        password: params.password, // Kein Hashing
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
