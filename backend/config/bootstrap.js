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

const {USER} = require("../api/constants/Roles");
module.exports.bootstrap = async function() {
  const ACTIVE = 1;
  const USER = 2;

  const hashedPassword = await sails.helpers.passwords.hashPassword.with({
    password: "admin"
  });

  const user = await User.create({
    name: "admin",
    email: "admin@admin.de",
    password: hashedPassword,
    role: 1,
    status: 1,
  });

  // Check if data already exists to avoid duplicates
  if (await User.count() > 0) {
    return;
  }

  // Create default users
  await User.createEach([
    { name: 'jdoe', email: 'jdoe@example.com', password: 'password123', status: ACTIVE, role: 2, firstName: 'John', lastName: 'Doe', street: 'Main Street', streetNumber: 42, city: 'Springfield', postalNumber: 12345, country: 'USA' },
    { name: 'asmith', email: 'asmith@example.com', password: 'password456', status: ACTIVE, role: 2, firstName: 'Alice', lastName: 'Smith', street: 'Elm Street', streetNumber: 7, city: 'Metropolis', postalNumber: 67890, country: 'USA' },
    { name: 'bwilliams', email: 'bwilliams@example.com', password: 'password789', status: ACTIVE, role: 2, firstName: 'Bob', lastName: 'Williams', street: 'Pine Avenue', streetNumber: 10, city: 'Gotham', postalNumber: 54321, country: 'Canada' },
    { name: 'lmiller', email: 'lmiller@example.com', password: 'password321', status: ACTIVE, role: 2, firstName: 'Laura', lastName: 'Miller', street: 'Oak Road', streetNumber: 55, city: 'Star City', postalNumber: 11223, country: 'UK' },
    { name: 'tjohnson', email: 'tjohnson@example.com', password: 'password654', status: ACTIVE, role: 2, firstName: 'Tom', lastName: 'Johnson', street: 'Birch Lane', streetNumber: 88, city: 'Central City', postalNumber: 33445, country: 'Australia' },
    { name: 'kgreen', email: 'kgreen@example.com', password: 'password987', status: ACTIVE, role: 2, firstName: 'Karen', lastName: 'Green', street: 'Cedar Boulevard', streetNumber: 22, city: 'Emerald City', postalNumber: 45678, country: 'Germany' },
    { name: 'pmartin', email: 'pmartin@example.com', password: 'password654', status: ACTIVE, role: 2, firstName: 'Paul', lastName: 'Martin', street: 'Willow Drive', streetNumber: 18, city: 'Berlin', postalNumber: 10115, country: 'Germany' },
    { name: 'aharris', email: 'aharris@example.com', password: 'password852', status: ACTIVE, role: 2, firstName: 'Anna', lastName: 'Harris', street: 'Palm Lane', streetNumber: 30, city: 'Lisbon', postalNumber: 1200, country: 'Portugal' },
    { name: 'cwhite', email: 'cwhite@example.com', password: 'password741', status: ACTIVE, role: 2, firstName: 'Chris', lastName: 'White', street: 'Ash Street', streetNumber: 11, city: 'Paris', postalNumber: 75001, country: 'France' },
    { name: 'mjones', email: 'mjones@example.com', password: 'password963', status: ACTIVE, role: 2, firstName: 'Mary', lastName: 'Jones', street: 'Maple Avenue', streetNumber: 99, city: 'Madrid', postalNumber: 28001, country: 'Spain' },
    { name: 'admin', email: 'admin@admin.com', password: 'admin', status: ACTIVE, role: 1}
  ]);
};
