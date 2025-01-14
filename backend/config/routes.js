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


  // User Routes
  'GET /user': 'UserController.find',
  'GET /user/:id': 'UserController.findOne',
  'GET /user/email/:email': 'UserController.findOneByEmail',
  'PUT /user/:id': 'UserController.update',
  'DELETE /user/:id': 'UserController.destroy',
  'PATCH /user/status/:id/:status': 'UserController.updateStatus',
  'POST /user/create': 'UserController.createUser',
  'POST /admin/create': 'UserController.createAdmin',
  'POST /inquiry/create': 'InquiryController.create',

  // Order Routes
  'POST /api/order/create': 'OrderController.create',
  'GET /api/orders': 'OrderController.find',
  'GET /api/orders/:id': 'OrderController.findOne',
  'PATCH /api/orders/:id': 'OrderController.update',
  'DELETE /api/orders/:id': 'OrderController.delete',

  // Article Routes
  'POST /api/articles': 'ArticleController.create',
  'GET /api/articles': 'ArticleController.find',
  'GET /api/articles/:id': 'ArticleController.findOne',
  'PATCH /api/articles/:id': 'ArticleController.update',
  'DELETE /api/articles/:id': 'ArticleController.delete',
  'POST /api/articles/by-ids': 'ArticleController.getArticlesByIds',


  // Component Routes
  'POST /api/components': 'ComponentController.create',
  'GET /api/components': 'ComponentController.find',
  'GET /api/components/:id': 'ComponentController.findOne',
  'PATCH /api/components/:id': 'ComponentController.update',
  'DELETE /api/components/:id': 'ComponentController.delete',

  // Configuration Routes
  'POST /api/configurations': 'ConfigurationController.create',
  'GET /api/configurations': 'ConfigurationController.find',
  'GET /api/configurations/:id': 'ConfigurationController.findOne',
  'PATCH /api/configurations/:id': 'ConfigurationController.update',
  'DELETE /api/configurations/:id': 'ConfigurationController.delete',

  'POST /api/auth/login': 'AuthController.login',
  'POST /api/auth/register': 'AuthController.register',
  'POST /api/auth/logout': 'AuthController.logout',
  'GET /api/auth/check': 'AuthController.checkAuth',

  'POST /api/cart/add': 'CartController.addItem',
  'POST /api/cart/remove': 'CartController.removeItem',
  'GET /api/cart': 'CartController.getCart',
  'POST /api/cart/clear': 'CartController.clearCart',
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
