/**
 * InqiuryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      // Eingabedaten aus der Anfrage extrahieren
      const { name, description, status, deviceType, modelNumber, user } = req.body;

      // Validierung: Prüfen, ob erforderliche Felder vorhanden sind
      if (!name || !user) {
        return res.status(400).json({ message: 'Name und Benutzer sind erforderlich.' });
      }

      // Eintrag in der Datenbank erstellen
      const inquiry = await Inquiry.create({
        name,
        description,
        status:  'pending', // Standardstatus
        deviceType,
        modelNumber,
        user, // Fremdschlüssel zum User
      }).fetch(); // fetch() gibt das erstellte Objekt zurück

      // Erfolgsantwort senden
      return res.status(201).json({
        message: 'Anfrage erfolgreich erstellt.',
        inquiry,
      });
    } catch (error) {
      // Fehlerbehandlung
      sails.log.error(error);
      return res.status(500).json({
        message: 'Es ist ein Fehler aufgetreten.',
        error: error.message,
      });
    }
  },
};


