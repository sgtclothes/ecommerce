'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListShirtProductSchema extends Schema {
  up () {
    this.create('list_shirt_products', (table) => {
			table.increments()
			table.string('title')
			table.double('price')
			table.string('image')
			table.text('desc')
			table.string('M')
			table.string('L')
			table.string('XL')
      table.timestamps()
    })
  }

  down () {
    this.drop('list_shirt_products')
  }
}

module.exports = ListShirtProductSchema
