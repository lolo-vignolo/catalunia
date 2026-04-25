# Copilot Instructions — Juego Interactivo Infantil (Next.js)

## Stack tecnológico
- **Framework**: Next.js 15 con App Router
- **UI**: React 19 + TypeScript (modo strict)
- **Estilos**: Tailwind CSS con tokens de diseño custom (`game-*`)
- **Animaciones**: Framer Motion — SIEMPRE usar `motion.*`, nunca CSS transitions directas
- **Estado global**: Zustand (no React Context para estado del juego)
- **Sonidos**: Howler.js con wrapper propio en `src/lib/sounds/`
- **Validación**: zod para cualquier dato externo
- **Tests**: Vitest + Testing Library

## Público objetivo
Niños de 4 a 8 años. Cada decisión de UI debe respetar:
- Touch targets mínimo 48×48px en todos los elementos interactivos
- Contraste de color mínimo WCAG AA (ratio 4.5:1)
- Sin textos largos — iconos acompañados de palabras cortas
- Animaciones suaves, máximo 300ms, sin flashes rápidos (riesgo epilepsia)
- Feedback visual y sonoro en cada interacción exitosa
- Nunca mostrar mensajes de error intimidantes — siempre refuerzo positivo

## Estructura de carpetas (respetar siempre)
```
src/
  app/                   → rutas Next.js (App Router, layouts, páginas)
  components/
    game/                → componentes core del juego (Board, Card, Timer...)
    ui/                  → componentes reutilizables (Button, Modal, Layout)
  hooks/
    useGameState.ts      → estado de la partida actual
    useScore.ts          → lógica de puntuación
    useSounds.ts         → reproducción de sonidos
    useLevel.ts          → progresión de niveles
  lib/
    game-engine/         → lógica pura del juego SIN React (funciones puras)
    sounds/              → wrappers de Howler.js
    utils/               → helpers genéricos
  types/
    game.ts              → GameState, Player, Level, Score (interfaces globales)
    components.ts        → tipos compartidos de props
  constants/
    levels.ts            → configuración de todos los niveles
    colors.ts            → paleta del juego
    sounds.ts            → mapa de archivos de audio
```

## Convenciones de código obligatorias

### Componentes
- Siempre PascalCase con tipos explícitos en props (nunca `any`)
- Exportar interfaz de props junto al componente: `export interface ButtonProps { ... }`
- Server Components por defecto; agregar `'use client'` solo si hay interacción del usuario
- Props booleanas sin valor cuando son `true`: `<Button disabled />` no `<Button disabled={true} />`

### Hooks
- Prefijo `use`, retornan siempre un objeto con nombres (no array salvo casos tipo `useState`)
- Ejemplo correcto: `const { score, addPoints, resetScore } = useScore()`

### Lógica del juego
- Toda lógica que no necesite React va en `src/lib/game-engine/` como funciones puras
- Nunca poner `useState` o `useEffect` dentro de game-engine
- Los componentes llaman a game-engine, no al revés

### Animaciones
```tsx
// CORRECTO
<motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.2 }}>

// INCORRECTO
<div style={{ transition: 'transform 0.2s' }}>
```

### Accesibilidad
- Todo elemento interactivo necesita `aria-label` descriptivo en español
- Imágenes decorativas: `alt=""` | Imágenes de contenido: `alt` descriptivo
- Orden de focus lógico en todos los flujos del juego
- Componentes de juego deben funcionar con teclado (Space/Enter para activar)

## Patrones preferidos
```tsx
// Estado del juego → Zustand
const useGameStore = create<GameState>((set) => ({ ... }))

// Validación de datos externos → zod
const LevelSchema = z.object({ id: z.number(), difficulty: z.enum(['easy','medium','hard']) })

// Alias de imports (usar siempre, nunca rutas relativas con ../../../)
import { Button } from '@/components/ui/Button'
import { GameState } from '@/types/game'
import { calculateScore } from '@/lib/game-engine/scoring'
```

## Testing
- Cada componente de juego tiene su `ComponentName.test.tsx` en la misma carpeta
- Lógica de game-engine: tests en `src/lib/game-engine/*.test.ts` sin React
- No mockear módulos salvo sonidos (`vi.mock('@/lib/sounds/')`) y APIs externas
- Siempre testear: estado inicial, interacción principal, caso de error

## Lo que Copilot NO debe hacer
- No usar `useContext` para estado del juego (usar Zustand)
- No animar con CSS puro si Framer Motion está disponible
- No hardcodear colores en componentes (usar tokens de Tailwind: `text-game-primary`)
- No crear componentes que mezclen lógica de juego con presentación
- No generar texto de UI en inglés (todo en español para los niños)
