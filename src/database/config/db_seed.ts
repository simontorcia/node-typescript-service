import pool from './db';

async function seedDatabase() {
  try {
    await pool.query(`
      INSERT INTO users (name, surname, birth_date, sex)
      VALUES
        ('Alice', 'Verdi', '1990-05-12', 'F'),
        ('Bob', 'Rossi', '1985-08-30', 'M'),
        ('Charlie', 'Bianchi', '1992-11-25', 'O');
    `);

    await pool.query(`
      INSERT INTO groups (name)
      VALUES
        ('Admin'),
        ('Editor'),
        ('Viewer');
    `);

    await pool.query(`
      INSERT INTO user_groups (user_id, group_id)
      VALUES
        (1, 1),
        (1, 2),
        (2, 3),
        (3, 2);
    `);

    console.log('✅ Sample data inserted successfully.');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
}

seedDatabase().finally(() => pool.end());
