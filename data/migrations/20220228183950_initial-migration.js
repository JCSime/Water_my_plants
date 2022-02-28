
exports.up = async function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('user_id')
            tbl.string('username', 128).notNullable().unique()
            tbl.string('password', 128).notNullable()
            tbl.integer('phoneNumber').notNullable()
        })
        .createTable('plants', tbl => {
            tbl.increments('plant_id')
            tbl.string('nickname', 128).notNullable().unique()
            tbl.string('species ').notNullable()
            tbl.integer('h2oFrequency').notNullable()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onUpdate('RESTRICT')
                .onDelete('RESTRICT')
            
        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('plants')
        .dropTableIfExists('users')
};
