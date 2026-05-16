import { query } from "../../db/pool";
import { CreateStudentDto, Student } from "./student.types";

export async function findAllStudents(): Promise<Student[]> {
  const result = await query<Student>(
    `
      SELECT id, first_name, last_name, email, active, created_at
      FROM students
      ORDER BY id ASC
    `
  );

  return result.rows;
}

export async function findStudentById(id: number): Promise<Student | null> {
  const result = await query<Student>(
    `
      SELECT id, first_name, last_name, email, active, created_at
      FROM students
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function createStudent(dto: CreateStudentDto): Promise<Student> {
  const result = await query<Student>(
    `
      INSERT INTO students (first_name, last_name, email, active)
      VALUES ($1, $2, $3, $4)
      RETURNING id, first_name, last_name, email, active, created_at
    `,
    [dto.first_name, dto.last_name, dto.email, dto.active]
  );

  return result.rows[0];
}

// Nuevo: actualizar estudiante
export async function updateStudentById(id: number, dto: CreateStudentDto): Promise<Student | null> {
  const result = await query<Student>(
    `
      UPDATE students
      SET first_name = $1,
          last_name = $2,
          email = $3,
          active = $4
      WHERE id = $5
      RETURNING id, first_name, last_name, email, active, created_at
    `,
    [dto.first_name, dto.last_name, dto.email, dto.active, id]
  );
  return result.rows[0] ?? null;
}

// Nuevo: eliminar estudiante
export async function deleteStudentById(id: number): Promise<Student | null> {
  const result = await query<Student>(
    `
      DELETE FROM students
      WHERE id = $1
      RETURNING id, first_name, last_name, email, active, created_at
    `,
    [id]
  );
  return result.rows[0] ?? null;
}
