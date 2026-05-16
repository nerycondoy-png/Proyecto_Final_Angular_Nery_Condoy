Este proyecto combina un frontend Angular y un backend Express + PostgreSQL para gestionar estudiantes, incluyendo creación, edición, eliminación y listado.

El objetivo es aplicar conceptos de componentes standalone, ruteo, control flow con @if/@for, y comunicación padre-hijo.

| Área | Herramienta / Framework |
| --- | --- |
| **Frontend** | Angular 21 |
| **Backend** | Node.js + Express |
| **Base de datos** | PostgreSQL |
| **Entorno** | Docker + pgAdmin |
| **Control de versiones** | Git + GitHub |

Instalación y ejecución

1. Clonar el repositorio
git clone https://github.com/nerycondoy-png/Proyecto_Final_Angular_Nery_Condoy.git
cd Proyecto_Final_Angular_Nery_Condoy

2. Instalar dependencias
npm install

3. Ejecutar el frontend
ng serve
Luego abre http://localhost:4200 en tu navegador.

4. Ejecutar el backend
cd backend
npm start

Funcionalidades principales

- CRUD completo de estudiantes.
- Comunicación entre componentes padre e hijo.
- Validación de datos desde PostgreSQL.
- Integración con Docker para entorno de desarrollo.
- Diseño responsive y navegación optimizada.

Estructura del proyecto:

Proyecto_Final_Angular_Nery_Condoy/
│
├── proyecto_final/        # Código Angular
│   ├── src/
│   ├── app/
│   └── ...
│
├── backend/               # Servidor Express + PostgreSQL
│   ├── routes/
│   ├── controllers/
│   └── ...
│
├── .gitignore
├── package.json
└── README.md

Autor:
Nery Condoy  
Arquitecto de soluciones/Desarrollador – Curso Avanzado de Angular
Loja, Ecuador

