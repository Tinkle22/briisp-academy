import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db'; // Adjust the import based on your database connection setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const courses = await pool.query(`
      SELECT * FROM courses 
      WHERE department = 'Computer science' 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}