const knex = require('knex')({
    client: provess.env.DB_TYPE,
    connection: {
        filename: process.env.DB_FILE
    }
});

const createTables = async() => {
    !(await db.schema.hasTable('journal')) 
        ? await db.schema.createTable('journal', table => {
            table.increments().primary()
            table.string('date')
            table.string('symbol')
            table.string('buyPrice')
            table.string('sellPrice')
            table.string('profit/loss')
            table.string('closingDate')
        })
        : null
}