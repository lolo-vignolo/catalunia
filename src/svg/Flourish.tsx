export const Flourish = ({ color = "#2F4F75" }: { color?: string }) => {
  return (
    <svg
      width="320"
      height="70"
      viewBox="0 0 320 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Línea izquierda con curva más suave */}
      <path
        d="M10 45 C30 65, 90 5, 130 30"
        stroke={color}
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      {/* Detalle curvo izquierdo */}
      <path
        d="M130 30 Q135 12, 140 30"
        stroke={color}
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
      />

      {/* Adorno de puntos */}
      <circle cx="140" cy="30" r="4" fill={color} />
      <circle cx="180" cy="30" r="4" fill={color} />

      {/* Detalle curvo derecho */}
      <path
        d="M180 30 Q185 12, 190 30"
        stroke={color}
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
      />

      {/* Línea derecha con curva más estilizada */}
      <path
        d="M190 30 C230 5, 290 65, 310 45"
        stroke={color}
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const FlourishAlt = ({ color = "#2F4F75" }: { color?: string }) => {
  return (
    <svg
      width="320"
      height="70"
      viewBox="0 0 320 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Línea derecha con curva hacia abajo */}
      <path
        d="M310 50 C285 30, 235 70, 190 35"
        stroke={color}
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      {/* Pequeño adorno derecho con doble curva hacia abajo */}
      <path
        d="M190 35 Q182 65, 175 40 Q170 20, 160 35"
        stroke={color}
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
      />

      {/* Puntos decorativos en el centro */}
      <circle cx="160" cy="35" r="4" fill={color} />
      <circle cx="140" cy="35" r="4" fill={color} />

      {/* Pequeño adorno izquierdo con doble curva hacia abajo */}
      <path
        d="M140 35 Q130 20, 125 40 Q118 65, 110 35"
        stroke={color}
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
      />

      {/* Línea izquierda con una forma distinta y más curva hacia abajo */}
      <path
        d="M110 35 C65 70, 15 30, 0 50"
        stroke={color}
        stroke-width="4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
