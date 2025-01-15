/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  const hashedPassword = await sails.helpers.passwords.hashPassword.with({
    password: "admin"
  });

  const adminUser = await User.findOne({email: "admin@admin.de"})

  if (!adminUser) {
    const user = await User.create({
      name: "admin",
      email: "admin@admin.de",
      password: hashedPassword,
      role: 1,
      status: 1,
    });
  }

  // Check if data already exists to avoid duplicates
  if (await User.count() > 0) {
    return;
  }

};
