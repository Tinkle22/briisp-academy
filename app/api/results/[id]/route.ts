import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { ResultSetHeader } from 'mysql2'

export async function GET(
  request: NextRequest
) {
  try {
    const id = request.url.split('/').pop();
    const [results] = await pool.query(
      'SELECT * FROM results WHERE result_id = ?',
      [id]
    )
    
    if (!Array.isArray(results) || results.length === 0) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 })
    }

    return NextResponse.json(results[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest
) {
  try {
    const id = request.url.split('/').pop();
    const body = await request.json()
    
    const [updateResult] = await pool.query<ResultSetHeader>(
      `UPDATE results SET 
        user_id = ?, course_id = ?, enrollment_id = ?,
        assessment_type = ?, assessment_title = ?,
        score = ?, max_score = ?, result_date = ?,
        comments = ?, is_passed = ?
       WHERE result_id = ?`,
      [
        body.user_id, 
        body.course_id, 
        body.enrollment_id, 
        body.assessment_type, 
        body.assessment_title, 
        body.score, 
        body.max_score, 
        body.result_date, 
        body.comments, 
        body.is_passed, 
        id
      ]
    )

    // Check if any rows were actually updated
    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const id = request.url.split('/').pop();
    const [deleteResult] = await pool.query<ResultSetHeader>(
      'DELETE FROM results WHERE result_id = ?',
      [id]
    )

    // Check if any rows were actually deleted
    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}