# Aplicación de Gestión de Tareas

Una moderna aplicación web para gestión de tareas construida con React, con arquitectura limpia y separación de responsabilidades. Diseñada para escalabilidad y mantenibilidad.

## Características

- 📝 Operaciones CRUD para tareas
- ✅ Marcar tareas como completadas/pendientes
- 📅 Seguimiento automático de fecha de creación
- 🔄 Gestión de estado en tiempo real
- 📱 Interfaz responsive
- 🧩 Arquitectura basada en componentes
- 🔗 Enrutamiento del lado del cliente
- 🛠 Soporte para TypeScript

## Tecnologías

- **Núcleo**: 
  - React 19
  - TypeScript
  - Vite
- **Gestión de estado**: 
  - Zustand
- **Enrutamiento**: 
  - React Router Dom
- **UI**: 
  - Shadcn UI
  - Tailwind CSS
  - Iconos Lucide React
- **Utilidades**: 
  - Axios (Cliente HTTP)
  - date-fns (Formato de fechas)
  - Sonner (Notificaciones)

## Decisiones Arquitectónicas Clave

1. **Arquitectura Basada en Características**
   - Separación lógica por características/módulos
   - Módulos autocontenidos con:
     - Componentes
     - Gestión de estado
     - Servicios API
     - Definiciones de tipos

2. **Gestión de Estado**
   - Stores de Zustand para estado global
   - Stores ubicados junto a sus características
   - Acciones separadas de componentes UI

3. **Componentes UI**
   - Componentes Shadcn UI con estilos personalizados
   - Componentes Presentacionales vs Contenedores
   - Patrón de composición de componentes

4. **Capa de API**
   - Instancia de Axios con configuración base
   - Clases de servicio por característica
   - Seguridad de tipos en Request/Response

5. **Calidad de Código**
   - TypeScript en modo estricto
   - ESLint + Prettier
   - Nomenclatura semántica de componentes
   - Estructura de archivos/carpetas consistente

## Instalación

1. Clonar repositorio:
```bash
git clone https://github.com/tu-usuario/task-management-app.git
```
2. Instalar Dependencias:
```bash 
npm install
```
3. Iniciar servidor de desarrollo:
```bash
npm run dev
```
