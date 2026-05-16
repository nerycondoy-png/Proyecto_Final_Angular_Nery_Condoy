import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  findStudent,
  listStudents,
  storeStudent,
  updateStudent,
  deleteStudent
} from "./student.controller";

export const studentRouter = Router();

studentRouter.get("/", asyncHandler(listStudents));
studentRouter.get("/:id", asyncHandler(findStudent));
studentRouter.post("/", asyncHandler(storeStudent));

// Nueva ruta para actualizar estudiante
studentRouter.put("/:id", asyncHandler(updateStudent));

// Nueva ruta para eliminar estudiante
studentRouter.delete("/:id", asyncHandler(deleteStudent));