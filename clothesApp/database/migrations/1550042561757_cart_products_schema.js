'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartProductsSchema extends Schema {
  up () {
    this.create('cart_products', (table) => {
			table.increments()
			table.string('title')
			table.string('name')
			table.double('price')
			table.double('rating')
			table.string('size_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('cart_products')
  }
}

module.exports = CartProductsSchema
