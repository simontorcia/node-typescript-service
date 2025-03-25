import pool from './db';

export async function seedDatabase() {
  try {
    await pool.query(`
      INSERT IGNORE INTO users (id, name, surname, birth_date, sex)
      VALUES
        (1, 'Alice', 'Verdi', '1990-05-12', 'F'),
        (2, 'Bob', 'Rossi', '1985-08-30', 'M'),
        (3, 'Charlie', 'Bianchi', '1992-11-25', 'O');
    `);

    await pool.query(`
      INSERT IGNORE INTO \`groups\` (id, name)
      VALUES
        (1, 'Admin'),
        (2, 'Editor'),
        (3, 'Viewer');
    `);

    await pool.query(`
      INSERT IGNORE INTO user_groups (user_id, group_id)
      VALUES
        (1, 1),
        (1, 2),
        (2, 3),
        (3, 2);
    `);

    console.log('✅ Sample data inserted successfully.');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
    throw error;
  }
}
