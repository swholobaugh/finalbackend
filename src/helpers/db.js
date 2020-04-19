import knex from 'knex';

const db = knex({
    client: process.env.DB_TYPE,
    connection: {
        filename: process.env.DB_FILE
    },
    useNullAsDefault: true
});
    
const createTable = async () => {
    !(await db.schema.hasTable('journal'))
      ? await db.schema.createTable('journal', table => {
          table.increments().primary()
          table.string('date')
          table.string('instruments')
        })
      : null
    }

createTable();

export default db;