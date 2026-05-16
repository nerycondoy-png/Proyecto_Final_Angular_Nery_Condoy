import { Request, Response } from "express";
import { sendSuccess } from "../../utils/apiResponse";
import {
  optionalBoolean,
  parseId,
  requireBodyObject,
  requireEmail,
  requireString
} from "../../utils/validators";
import {
  createNewStudent,
  getStudentById,
  getStudents,
  updateExistingStudent,
  deleteExistingStudent
} from "./student.service";
import { CreateStudentDto } from "./student.types";

export async function listStudents(_req: Request, res: Response): Promise<void> {
  const students = await getStudents();
  sendSuccess(res, 200, "Estudiantes obtenidos correctamente.", students);
}

export async function findStudent(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const student = await getStudentById(id);
  sendSuccess(res, 200, "Estudiante obtenido correctamente.", student);
}

export async function storeStudent(req: Request, res: Response): Promise<void> {
  const body = requireBodyObject(req.body);
  const dto: CreateStudentDto = {
    first_name: requireString(body.first_name, "first_name"),
    last_name: requireString(body.last_name, "last_name"),
    email: requireEmail(body.email, "email"),
    active: optionalBoolean(body.active, true)
  };

  const student = await createNewStudent(dto);
  sendSuccess(res, 201, "Estudiante creado correctamente.", student);
}

// ✅ Actualizar estudiante
export async function updateStudent(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const body = requireBodyObject(req.body);

  const dto: CreateStudentDto = {
    first_name: requireString(body.first_name, "first_name"),
    last_name: requireString(body.last_name, "last_name"),
    email: requireEmail(body.email, "email"),
    active: optionalBoolean(body.active, true)
  };

  const student = await updateExistingStudent(id, dto);
  sendSuccess(res, 200, "Estudiante actualizado correctamente.", student);
}

// ✅ Eliminar estudiante
export async function deleteStudent(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  await deleteExistingStudent(id);
  sendSuccess(res, 204, "Estudiante eliminado correctamente.", null);
}
