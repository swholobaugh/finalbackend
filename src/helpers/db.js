import knex from 'knex';

const db = knex({
    client: process.env.DB_TYPE,
    connection: {
        filename: process.env.DB_FILE
    },
    useNullAsDefault: true
});
    
const createTables = async () => {
    !(await db.schema.hasTable('journal'))
    ? await db.schema.createTable('journal', table => {
      table.increments('id').primary()
      table.string('date')
      table.string('type')
      table.string('instrument')
      table.string('units')
      table.string('price')
      table.string('batchid')
      table.string('orderid')
      table.string('userid')
      table.string('strength')
      table.timestamp('created').defaultTo(new Date().toLocaleString())
      table.timestamp('udpated').defaultTo(new Date().toLocaleString())
    })
    : null
    !(await db.schema.hasTable('users'))
    ? await db.schema.createTable('users', table => {
      table.increments().primary()
      table.string('uuid')
      table.string('name')
      table.string('email')
      table.timestamp('created').defaultTo(new Date().toLocaleString())
      table.timestamp('lastAccess').defaultTo(new Date().toLocaleString())
    })
    : null
    !(await db.schema.hasTable('strength'))
    ? await db.schema.createTable('strength', table => {
      table.increments().primary()
      table.string('symbol')
      table.string('change')
      table.string('timeframe')
      table.timestamp('created').defaultTo(new Date().toLocaleString())
    })
    : null
  }

createTables();

export default db;