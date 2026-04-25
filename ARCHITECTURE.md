# Arquitectura del Juego

## Decisiones técnicas clave

### Por qué App Router (no Pages Router)
Layouts anidados permiten que la UI del juego (música, HUD de puntuación) persista
entre rutas sin re-renderizar. Server Components reducen el JS enviado al cliente.

### Por qué Zustand (no Context)
El estado del juego cambia frecuentemente durante el juego. Context re-renderiza
todo el árbol; Zustand re-renderiza solo los componentes suscritos al slice afectado.

### Por qué separar game-engine de React
La lógica de juego (calcular puntos, validar movimientos, generar niveles) es testeable
de forma aislada y potencialmente reutilizable en un futuro backend o modo offline.

## Flujo de estado principal

```
Usuario interactúa
      ↓
Componente React (src/components/game/)
      ↓
Llama a función pura de game-engine (src/lib/game-engine/)
      ↓
Resultado se guarda en Zustand store (src/hooks/useGameState.ts)
      ↓
Componentes suscritos re-renderizan
      ↓
Framer Motion anima el cambio visual
      ↓
Howler.js reproduce el sonido de feedback
```

## Rutas del juego

```
/                  → pantalla de inicio (Server Component)
/game              → layout del juego (Client, monta Zustand + Howler)
/game/[levelId]    → nivel específico
/game/results      → pantalla de resultados
/settings          → ajustes (volumen, idioma, dificultad)
```

## Persistencia
- Puntuaciones: `localStorage` via Zustand persist middleware
- Progreso de niveles: `localStorage`
- Configuración: `localStorage`
- Sin backend en v1 — todo local

## Gestión de assets
- Imágenes del juego: `public/game/images/` — formato WebP, máx 200kb
- Sonidos: `public/game/sounds/` — formato WebM + MP3 (fallback)
- Fuentes: Google Fonts via `next/font` (Nunito para niños, legible)
