## 🏗️ Arquitectura

### 🔙 Backend - Monolito Modular

El backend está construido como un **monolito modular**, lo que significa que es una única aplicación organizada internamente por módulos independientes.

#### 📦 Módulos principales

- 👤 Usuarios
- 📁 Proyectos
- ✅ Tareas

Cada módulo está estructurado en:

- Controladores
- Servicios
- Modelos
- Rutas

Esto permite:

- Separación clara de responsabilidades
- Escalabilidad futura hacia microservicios
- Código más mantenible

---

### 🎨 Frontend - Atomic Design

El frontend sigue el patrón **Atomic Design**, organizando la UI en componentes reutilizables:

- ⚛️ Átomos: botones, inputs
- 🧩 Moléculas: combinación de átomos
- 🧱 Organismos: componentes complejos
- 📄 Templates / Pages: estructura final

Esto mejora la consistencia visual y la reutilización de código.

---

## 🐳 Despliegue con Docker

### 📋 Requisitos

- Docker
- Docker Compose

---

### ▶️ Levantar el proyecto con Docker

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

🖥️ Ejecución manual

🔙 Backend
cd backend
npm install
npm run dev

🎨 Frontend
cd frontend
npm install
npm start

👨‍💻 Author
Gabriel Arguello
