# Pokédex Web App

Una aplicación web interactiva que simula una Pokédex clásica. Este proyecto está dividido en dos partes principales: un **Frontend** desarrollado en React y un **Backend** construido con Node.js y Express que se conecta a una base de datos MySQL.

## 🚀 Características

*   **Interfaz Retro:** Diseño inspirado en la clásica Pokédex con luces animadas, pantalla principal, cruceta (D-pad) y listado lateral.
*   **Buscador Integrado:** Permite buscar Pokémon por nombre utilizando el panel de la derecha.
*   **Base de Datos Local:** Consulta la información básica de los Pokémon (nombre, tipo, id) desde una base de datos MySQL propia.
*   **Integración con PokéAPI:** Obtiene automáticamente el "artwork" oficial y sprites de los Pokémon seleccionados utilizando la [PokéAPI](https://pokeapi.co/) pública.

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** React, Vanilla CSS, Axios
*   **Backend:** Node.js, Express, CORS
*   **Base de Datos:** MySQL (con `mysql2/promise`)

## 📂 Estructura del Proyecto

```text
A5_pokedex/
├── backend/          # Servidor Node.js y configuración de la API local
│   ├── server.js     # Lógica principal del servidor y endpoints
│   ├── .env          # Variables de entorno para la conexión a la base de datos (DB)
│   └── package.json  # Dependencias del backend
├── frontend/         # Aplicación React
│   ├── src/
│   │   ├── App.jsx   # Componente principal con la lógica de UI y fetch
│   │   ├── App.css   # Estilos específicos de la Pokédex
│   │   └── index.css # Estilos globales
│   └── package.json  # Dependencias del frontend
└── README.md
```

## ⚙️ Requisitos Previos

Asegúrate de tener instalado en tu sistema:
*   [Node.js](https://nodejs.org/) (v16 o superior recomendado)
*   Un servidor de base de datos **MySQL** ejecutándose.

## 💻 Instalación y Ejecución

### 1. Configurar la Base de Datos

Crea una base de datos en tu servidor MySQL (por defecto, la app busca una llamada `pokedex_2026`). Asegúrate de tener una tabla llamada `pokemon` con información relevante (por ejemplo, columnas `id`, `nombre` o `name`, `type`, etc.).

### 2. Configurar el Backend

1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd A5_pokedex/backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea o edita el archivo `.env` en la raíz de la carpeta `backend` con tus credenciales de MySQL. Ejemplo:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=pokedex_2026
   DB_PORT=3306
   ```
4. Inicia el servidor backend:
   ```bash
   node server.js
   # O si tienes un script en package.json: npm start / npm run dev
   ```
   El servidor debería estar corriendo en `http://localhost:3000`.

### 3. Configurar el Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```bash
   cd A5_pokedex/frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación de React:
   ```bash
   npm run dev
   # (o npm start dependiendo de si usas Vite o CRA)
   ```
4. Abre tu navegador en la URL que indique la consola (generalmente `http://localhost:5173` o `http://localhost:3000`).

## 📡 Endpoints de la API Local

*   `GET /api/test-db`: Verifica si la conexión con la base de datos es exitosa.
*   `GET /api/pokemons?search=término`: Retorna la lista de Pokémon desde la base de datos. Si se incluye el parámetro `search`, filtra los resultados por nombre usando una consulta `LIKE`.

---
*Desarrollado en 2026*
