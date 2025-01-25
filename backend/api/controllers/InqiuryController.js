module.exports = {
  create: async function (req, res) {
    try {
      const { name, description, status, deviceType, modelNumber, user } = req.body;

      if (!name || !user) {
        return res.status(400).json({ message: 'Name und Benutzer sind erforderlich.' });
      }

      const inquiry = await Inquiry.create({
        name,
        description,
        status:  1,
        deviceType,
        modelNumber,
        user,
      }).fetch();

      return res.status(201).json({
        message: 'Anfrage erfolgreich erstellt.',
        inquiry,
      });
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        message: 'Es ist ein Fehler aufgetreten.',
        error: error.message,
      });
    }
  },
};


