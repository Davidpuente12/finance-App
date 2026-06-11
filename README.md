# Finance App

Aplicación web de finanzas personales construida con React y Vite.

## Descripción del proyecto

Esta aplicación permite registrar ingresos y gastos, visualizar el balance mensual seleccionado y revisar el historial de transacciones con filtros por tipo, categoría y fecha.

## Características principales

- Registro de transacciones de ingresos y gastos.
- Filtros de búsqueda por concepto, categoría y fecha.
- Balance total del mes seleccionado.
- Visualización de estadísticas mensuales y anuales.
- Almacenamiento local en el navegador usando Local Storage.
- Interfaz en español, orientada a usuarios hispanohablantes.

## Estructura del proyecto

- `src/App.jsx`: Componente principal que controla navegación, filtros y cálculo de totales.
- `src/targetas/Targetas.jsx`: Tarjetas de resumen de balance, ingresos y gastos.
- `src/Section_registro/section_registros.jsx`: Sección de historial y filtros de transacciones.
- `src/Section_estadisticas/`: Componentes de resumen mensual y anual.
- `src/Modal/`: Modal para crear y editar transacciones.
- `src/utils/`: Utilidades de formato y fechas.
- `src/hook/useLocalStorage.jsx`: Hook personalizado para persistir datos en Local Storage.

## Dependencias

- React 19
- Vite
- React Icons
- ESLint

## Scripts disponibles

- `npm install`: Instala dependencias.
- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera la versión de producción.
- `npm run preview`: Previsualiza el build de producción.
- `npm run lint`: Revisa el código con ESLint.

## Uso

1. Clona el repositorio.
2. Ejecuta `npm install`.
3. Corre `npm run dev`.
4. Abre el navegador en la dirección que muestra Vite.

## Mejoras posibles

- Agregar autenticación para cuentas de usuario.
- Implementar gráficos interactivos para análisis de gasto.
- Añadir exportación/importación de datos en CSV.
- Soporte para múltiples monedas.

## Licencia

Proyecto personal sin licencia específica. Puedes usarlo como base para tus propios desarrollos.
