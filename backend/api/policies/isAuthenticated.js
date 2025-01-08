// api/policies/isAuthenticated.js

module.exports = async function (req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({
      error: 'Not authenticated'
    });
  }
  next();
};

// api/policies/isAdmin.js

module.exports = async function (req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({
      error: 'Not authenticated'
    });
  }

  const user = await User.findOne({ id: req.session.userId });

  if (!user || user.role !== 1) { // Assuming ADMIN role is 1
    return res.status(403).json({
      error: 'Not authorized'
    });
  }

  next();
};
