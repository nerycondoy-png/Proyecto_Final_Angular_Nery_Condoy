import { Response } from "express";
import { ApiResponse } from "../types/api-response";

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T | null // ✅ ahora opcional y puede ser null
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null // ✅ si no se pasa, queda en null
  });
}
