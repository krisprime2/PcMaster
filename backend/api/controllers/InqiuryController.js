module.exports = {
  create: async function (req, res) {
    try {
      const { name, description, deviceType, modelNumber, user } = req.body;

      if (!name || !user) {
        return res.status(400).json({ message: 'Name und Benutzer sind erforderlich.' });
      }

      const inquiry = await Inquiry.create({
        name,
        description,
        status: 1,
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

  find: async function (req, res) {
    try {
      const inquiries = await Inquiry.find()
        .sort('createdAt DESC');

      return res.json(inquiries);
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        message: 'Fehler beim Abrufen der Anfragen',
        error: error.message
      });
    }
  },

  findOne: async function (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: 'ID ist erforderlich' });
      }

      const inquiry = await Inquiry.findOne({ id: req.params.id });

      if (!inquiry) {
        return res.status(404).json({ message: 'Anfrage nicht gefunden' });
      }

      return res.json(inquiry);
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        message: 'Fehler beim Abrufen der Anfrage',
        error: error.message
      });
    }
  },

  update: async function (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: 'ID ist erforderlich' });
      }

      const { status, description } = req.body;
      if (status === undefined && description === undefined) {
        return res.status(400).json({ message: 'Keine Änderungen angegeben' });
      }

      const updatedInquiry = await Inquiry.updateOne({ id: req.params.id })
        .set({
          ...(status !== undefined && { status }),
          ...(description !== undefined && { description })
        });

      if (!updatedInquiry) {
        return res.status(404).json({ message: 'Anfrage nicht gefunden' });
      }

      return res.json({
        message: 'Anfrage erfolgreich aktualisiert',
        inquiry: updatedInquiry
      });
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        message: 'Fehler beim Aktualisieren der Anfrage',
        error: error.message
      });
    }
  },

  destroy: async function (req, res) {
    try {
      console.log('Delete request received for ID:', req.params.id);
      console.log('Delete request received for ID:');

      if (!req.params.id) {
        return res.status(400).json({ message: 'ID ist erforderlich' });
      }

      const deletedInquiry = await Inquiry.destroyOne({ id: req.params.id });

      if (!deletedInquiry) {
        return res.status(404).json({ message: 'Anfrage nicht gefunden' });
      }

      return res.json({
        message: 'Anfrage erfolgreich gelöscht',
        inquiry: deletedInquiry
      });
    } catch (error) {
      sails.log.error(error);
      return res.status(500).json({
        message: 'Fehler beim Löschen der Anfrage',
        error: error.message
      });
    }
  },

};
