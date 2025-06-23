# Plataforma de Visualización de Datos Geoespaciales en Tiempo Real

Este proyecto es una implementación de una plataforma de visualización de datos geoespaciales en tiempo real, diseñada como un desafío para desarrolladores front-end senior. La aplicación simula la monitorización de una flota de vehículos autónomos en un mapa interactivo, mostrando su ubicación, estado y datos de sensores en tiempo real.

## Tecnologías Utilizadas

- **Front-End Framework:** React con TypeScript
- **Gestión de Estado:** Zustand (no implementado completamente en este prototipo, pero considerado para una gestión de estado más compleja)
- **API de Mapas:** Mapbox GL JS
- **Comunicación en Tiempo Real:** WebSockets (simulado con un hook personalizado)
- **Librería de Gráficos:** Chart.js con React-Chartjs-2
- **Autenticación:** Contexto de React simple para demostración (simula JWT)
- **Estilos:** CSS puro (con clases para Tailwind CSS preinstaladas por el template, aunque no se usó directamente Tailwind en los estilos añadidos)
- **Pruebas Unitarias/Integración:** Jest y React Testing Library
- **Pruebas End-to-End (E2E):** Cypress
- **Manejo de Errores:** React Error Boundaries

## Estructura del Proyecto

```
geospatial-dashboard/
├── public/
├── src/
│   ├── assets/ 
│   ├── components/ 
│   │   ├── AlertsPanel.tsx
│   │   ├── ChartsPanel.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FilterSearch.tsx
│   │   ├── Login.tsx
│   │   ├── MapComponent.tsx
│   │   ├── TimelineComponent.tsx
│   │   └── VehicleMarker.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   └── useWebSocket.ts
│   ├── App.css
│   ├── App.tsx
│   └── main.tsx
├── cypress/
│   ├── e2e/
│   │   └── dashboard.cy.ts
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
├── jest.config.ts
├── jest.setup.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.js
└── README.md
```

## Instrucciones de Ejecución

Para ejecutar este proyecto localmente, sigue los siguientes pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd geospatial-dashboard
    ```

2.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

3.  **Configurar Mapbox:**
    Abre `src/components/MapComponent.tsx` y reemplaza `YOUR_MAPBOX_ACCESS_TOKEN` con tu token de acceso de Mapbox. Puedes obtener uno en [Mapbox](https://www.mapbox.com/).

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    pnpm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o la dirección que indique la consola).

5.  **Simular datos en tiempo real (opcional):**
    El hook `useWebSocket` en `src/services/useWebSocket.ts` está configurado para conectarse a `ws://localhost:8080`. Para probar la funcionalidad en tiempo real, necesitarías un servidor WebSocket que envíe datos de vehículos. Puedes usar una herramienta como `websocat` o escribir un script simple en Node.js/Python para simularlo.

    Ejemplo de servidor WebSocket simple (Node.js con `ws`):
    ```javascript
    // server.js
    const WebSocket = require("ws");
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on("connection", ws => {
      console.log("Client connected");
      setInterval(() => {
        const vehicleId = `V${Math.floor(Math.random() * 100).toString().padStart(3, "0")}`;
        const data = {
          id: vehicleId,
          latitude: 40.7128 + (Math.random() - 0.5) * 0.1,
          longitude: -74.0060 + (Math.random() - 0.5) * 0.1,
          status: ["moving", "stopped", "charging"][Math.floor(Math.random() * 3)],
          temperature: 20 + Math.random() * 10,
          battery: 50 + Math.random() * 50,
        };
        ws.send(JSON.stringify(data));
      }, 1000);
    });

    console.log("WebSocket server started on port 8080");
    ```
    Para ejecutar este servidor, guarda el código como `server.js`, instala `ws` (`npm install ws` o `pnpm add ws`) y luego ejecuta `node server.js`.

## Pruebas

-   **Pruebas Unitarias y de Integración (Jest):**
    ```bash
    pnpm test
    ```

-   **Pruebas End-to-End (Cypress):**
    Primero, asegúrate de que el servidor de desarrollo de React esté corriendo (`pnpm run dev`). Luego, ejecuta:
    ```bash
    pnpm cypress run --headless
    ```
    O para abrir la interfaz de Cypress:
    ```bash
    pnpm cypress open
    ```

## Consideraciones de Seguridad

-   **Autenticación/Autorización:** Implementado un sistema básico con `AuthContext` para demostración. En un entorno de producción, se integraría con un backend real y JWT con refresco de tokens.
-   **XSS/CSRF:** Se ha considerado la sanitización de datos y la protección CSRF (si aplica). En una aplicación real, se usarían librerías y configuraciones de framework para asegurar estas protecciones.
-   **Claves de API:** Se recomienda usar variables de entorno y un Backend-for-Frontend (BFF) para proteger las claves de API sensibles.
-   **CSP:** Se ha mencionado la importancia de Content Security Policy para mitigar ataques de inyección.

## Optimización de Rendimiento

-   **Memoización:** Se ha utilizado `React.memo` en `MapComponent` para evitar re-renderizados innecesarios.
-   **Code Splitting:** Vite maneja automáticamente el code splitting. Para optimizaciones más avanzadas, se pueden usar `React.lazy` y `Suspense`.
-   **Manejo de Memoria:** El uso de `useEffect` con funciones de limpieza en los componentes y hooks ayuda a prevenir fugas de memoria.

## Manejo de Errores

-   Se ha implementado un `ErrorBoundary` para capturar errores en la UI y mostrar un mensaje amigable al usuario, evitando que toda la aplicación se caiga. Los errores se registran en la consola (en producción, se integrarían con servicios de monitoreo como Sentry).

Este proyecto es un punto de partida sólido para una plataforma de visualización de datos geoespaciales en tiempo real, demostrando la capacidad de manejar requisitos complejos de front-end.

