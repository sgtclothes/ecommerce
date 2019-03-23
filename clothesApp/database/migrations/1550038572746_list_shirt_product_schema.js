'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListShirtProductSchema extends Schema {
  up () {
    this.table('list_shirt_products', (table) => {
      table.integer('rating')
    })
  }

  down () {
    this.table('list_shirt_products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ListShirtProductSchema
