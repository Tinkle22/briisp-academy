/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import pool from '@/lib/db';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const assessmentType = searchParams.get('assessmentType');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const isPassed = searchParams.get('isPassed');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build the query with conditions
    let query = `
      SELECT r.*, c.title as course_title, u.first_name, u.last_name
      FROM results r
      JOIN courses c ON r.course_id = c.course_id
      JOIN users u ON r.user_id = u.user_id
      WHERE 1=1
    `;
    
    const queryParams: any[] = [];
    
    if (userId) {
      query += ' AND r.user_id = ?';
      queryParams.push(userId);
    }
    
    if (courseId) {
      query += ' AND r.course_id = ?';
      queryParams.push(courseId);
    }
    
    if (assessmentType) {
      query += ' AND r.assessment_type = ?';
      queryParams.push(assessmentType);
    }
    
    if (startDate) {
      query += ' AND r.result_date >= ?';
      queryParams.push(startDate);
    }
    
    if (endDate) {
      query += ' AND r.result_date <= ?';
      queryParams.push(endDate);
    }
    
    if (isPassed !== null && isPassed !== undefined) {
      query += ' AND r.is_passed = ?';
      queryParams.push(isPassed === 'true' ? 1 : 0);
    }
    
    // Add ordering
    query += ' ORDER BY r.result_date DESC';
    
    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);
    
    const [results] = await pool.query(query, queryParams);
    
    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM results r
      WHERE 1=1
    `;
    
    const countParams = [...queryParams];
    countParams.pop(); // Remove limit
    countParams.pop(); // Remove offset
    
    const [countResult] = await pool.query(countQuery, countParams);
    const total = (countResult as any)[0].total;
    
    return NextResponse.json({
      results,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      course_id,
      enrollment_id,
      assessment_type,
      assessment_title,
      score,
      max_score,
      result_date,
      comments,
      is_passed
    } = body;
    
    // Validate required fields
    if (!user_id || !course_id || !enrollment_id || !assessment_type || !assessment_title || !score || !result_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const [result] = await pool.query(
      `INSERT INTO results (
        user_id, course_id, enrollment_id, assessment_type, assessment_title,
        score, max_score, result_date, comments, is_passed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, course_id, enrollment_id, assessment_type, assessment_title,
        score, max_score || 100, result_date, comments || null, is_passed || false
      ]
    );
    
    return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
