import { AppError } from "../../utils/AppError";
import {
  createStudent,
  findAllStudents,
  findStudentById,
  updateStudentById,
  deleteStudentById
} from "./student.repository";
import { CreateStudentDto, Student } from "./student.types";

export async function getStudents(): Promise<Student[]> {
  return findAllStudents();
}

export async function getStudentById(id: number): Promise<Student> {
  const student = await findStudentById(id);

  if (!student) {
    throw new AppError("Estudiante no encontrado.", 404);
  }

  return student;
}

export async function createNewStudent(dto: CreateStudentDto): Promise<Student> {
  return createStudent(dto);
}

// ✅ Nuevo: actualizar estudiante
export async function updateExistingStudent(id: number, dto: CreateStudentDto): Promise<Student> {
  const student = await updateStudentById(id, dto);

  if (!student) {
    throw new AppError("Estudiante no encontrado.", 404);
  }

  return student;
}

// ✅ Nuevo: eliminar estudiante
export async function deleteExistingStudent(id: number): Promise<void> {
  const deleted = await deleteStudentById(id);

  if (!deleted) {
    throw new AppError("Estudiante no encontrado.", 404);
  }
}
