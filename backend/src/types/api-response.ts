import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null; // ✅ ahora es opcional y puede ser null
}

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T | null // ✅ cuarto argumento opcional
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null, // ✅ si no se pasa, queda en null
  });
}
