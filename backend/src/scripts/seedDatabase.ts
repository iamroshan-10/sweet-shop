import '../database/database';
import { dbRun, dbGet } from '../database/database';

const initialSweets = [
  {
    name: 'Gulab Jamun',
    category: 'Dessert',
    price: 50.0,
    quantity: 100,
    description: 'Traditional Indian sweet made from milk solids',
    image_url: '/images/gulabjmum.jfif',
  },
  {
    name: 'Jalebi',
    category: 'Dessert',
    price: 40.0,
    quantity: 80,
    description: 'Crispy, syrupy sweet spiral',
    image_url: '/images/jalebi.jfif',
  },
  {
    name: 'Kaju Barfi',
    category: 'Barfi',
    price: 60.0,
    quantity: 50,
    description: 'Rich cashew-based sweet',
    image_url: '/images/kaju barfi.jfif',
  },
  {
    name: 'Rasgulla',
    category: 'Dessert',
    price: 45.0,
    quantity: 90,
    description: 'Soft, spongy sweet in sugar syrup',
    image_url: '/images/rasgulla.jfif',
  },
  {
    name: 'Ladoo',
    category: 'Ladoo',
    price: 35.0,
    quantity: 120,
    description: 'Round sweet made from flour and sugar',
    image_url: '/images/ladoo.jfif',
  },
  {
    name: 'Rasmalai',
    category: 'Dessert',
    price: 55.0,
    quantity: 70,
    description: 'Creamy sweet in milk',
    image_url: '/images/rasmalai.jfif',
  },
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Wait a bit for database to initialize
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if sweets already exist
    const existingSweets = await dbGet('SELECT COUNT(*) as count FROM sweets');
    if (existingSweets && (existingSweets as any).count > 0) {
      console.log('Database already seeded. Skipping...');
      return;
    }

    // Insert initial sweets
    for (const sweet of initialSweets) {
      await dbRun(
        'INSERT INTO sweets (name, category, price, quantity, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [sweet.name, sweet.category, sweet.price, sweet.quantity, sweet.description, sweet.image_url]
      );
      console.log(`Inserted: ${sweet.name}`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;

