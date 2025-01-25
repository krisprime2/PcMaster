/**
 * UserController
 *
 * @description :: Server-side actions for handling user-related requests.
 */

const {ADMIN, USER} = require("../constants/Roles");

module.exports = {
  /**
   * Create a new user
   * POST /user/create
   */
  createUser: async function (req, res) {
    try {
      const params = req.allParams();

      if (
        !params.name ||
        !params.email ||
        !params.password
      ) {
        return res.badRequest({message: 'Alle Pflichtfelder müssen ausgefüllt werden.'});
      }

      const user = await User.create({
        name: params.name,
        email: params.email,
        password: params.password,
        role: USER,
        status: 1,
      }).fetch();

      return res.status(201).json({message: 'Benutzer erfolgreich erstellt.', user});
    } catch (error) {
      return res.serverError({message: 'Fehler beim Erstellen des Benutzers.', error});
    }
  },


  /**
   * Create a new admin
   * POST /admin/create
   */
  createAdmin: async function (req, res) {
    try {
      const params = req.allParams();

      if (
        !params.name ||
        !params.email ||
        !params.password ||
        !params.firstName ||
        !params.lastName ||
        !params.street ||
        !params.streetNumber ||
        !params.city ||
        !params.postalNumber ||
        !params.country
      ) {
        return res.badRequest({message: 'Alle Pflichtfelder müssen ausgefüllt werden.'});
      }

      const admin = await User.create({
        name: params.name,
        email: params.email,
        password: params.password,
        role: ADMIN,
        status: 1,
        firstName: params.firstName,
        lastName: params.lastName,
        street: params.street,
        streetNumber: params.streetNumber,
        city: params.city,
        postalNumber: params.postalNumber,
        country: params.country,
      }).fetch();

      return res.status(201).json({message: 'Admin erfolgreich erstellt.', admin});
    } catch (error) {
      return res.serverError({message: 'Fehler beim Erstellen des Admins.', error});
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
      return res.serverError({message: 'Fehler beim Abrufen der Benutzer.', error});
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
        return res.status(400).json({message: 'Benutzer-ID ist erforderlich.'});
      }

      const user = await User.findOne({id: userId});

      if (!user) {
        return res.status(404).json({message: 'Benutzer nicht gefunden.'});
      }

      return res.json(user);
    } catch (error) {
      console.error('Fehler beim Abrufen des Benutzers:', error);
      return res.status(500).json({message: 'Fehler beim Abrufen des Benutzers.', error});
    }
  },

  /**
   * Find a user by email
   * GET /user/email/:email
   */
  findOneByEmail: async function (req, res) {
    try {
      const email = req.params.email;
      console.log(req.params.email);
      if (!email) {
        return res.status(400).json({message: 'E-Mail-Adresse ist erforderlich.'});
      }

      const user = await User.findOne({email}); // Suche den Benutzer anhand der E-Mail

      if (!user) {
        return res.status(404).json({message: 'Benutzer mit dieser E-Mail nicht gefunden.'});
      }

      return res.json(user); // Gebe den gefundenen Benutzer zurück
    } catch (error) {
      console.error('Fehler beim Abrufen des Benutzers anhand der E-Mail:', error);
      return res.status(500).json({message: 'Fehler beim Abrufen des Benutzers.', error});
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
        password: params.password,
        firstName: params.firstName,
        lastName: params.lastName,
        street: params.street,
        streetNumber: params.streetNumber,
        city: params.city,
        postalNumber: params.postalNumber,
        country: params.country,
        status: params.status,
        role: params.role
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
        return res.badRequest({message: 'Benutzer-ID ist erforderlich.'});
      }

      if (![1, 2].includes(status)) {
        return res.badRequest({message: 'Ungültiger Status. Erlaubte Werte sind 1 (active) oder 2 (LOCKED).'});
      }

      const updatedUser = await User.updateOne({id: userId}).set({status});

      if (!updatedUser) {
        return res.notFound({message: 'Benutzer nicht gefunden.'});
      }

      const statusText = status === 1 ? 'active' : 'LOCKED';
      return res.json({message: `Status erfolgreich auf ${statusText} aktualisiert.`, updatedUser});
    } catch (error) {
      return res.serverError({message: 'Fehler beim Aktualisieren des Status.', error});
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
        return res.badRequest({message: 'Benutzer-ID ist erforderlich.'});
      }

      const deletedUser = await User.destroyOne({id: userId});

      if (!deletedUser) {
        return res.notFound({message: 'Benutzer nicht gefunden.'});
      }

      return res.json({message: 'Benutzer erfolgreich gelöscht.', deletedUser});
    } catch (error) {
      return res.serverError({message: 'Fehler beim Löschen des Benutzers.', error});
    }
  },
};
