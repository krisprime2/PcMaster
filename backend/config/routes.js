/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'POST /product': { controller: 'ProductController', action:'create' },
  'GET /products': 'ProductController.find',
  'GET /product/:id': 'product.findOne',
  'DELETE /product/:id': 'product.destroy',

  'GET /user': 'UserController.find',
  'GET /user/:id': 'UserController.findOne',
  'PUT /user/:id': 'UserController.update',
  'DELETE /user/:id': 'UserController.destroy',
  'PATCH /user/:id/:status': 'UserController.updateStatus',
  'POST /user/create': 'UserController.createUser',
  'POST /admin/create': 'UserController.createAdmin',




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
