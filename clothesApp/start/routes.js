'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{


//Product Controller
Route.get('/products', 'ProductController.index')
Route.get('/product/:id', 'ProductController.show')

//Order Controller
Route.get('/orders', 'OrderController.index')
Route.post('/orders', 'OrderController.store')
Route.delete('/order/:id', 'OrderController.delete')
Route.patch('/order/:id', 'OrderController.update')

Route.get('/error', 'ProductController.error')

//Latihan Controller
Route.post('/register', 'AuthController.register').middleware(['guest'])
Route.post('/login', 'AuthController.login').middleware(['guest'])
Route.get('/user/:id', 'AuthController.show').middleware(['auth'])

}).prefix('api/v1')