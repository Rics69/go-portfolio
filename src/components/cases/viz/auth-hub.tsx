"use client";

import { useSvgPlayback } from "@/components/cases/viz/use-svg-playback";

const hub = { x: 200, y: 112 };
const projects = [
  { x: 66, y: 40 },
  { x: 334, y: 40 },
  { x: 66, y: 184 },
  { x: 334, y: 184 },
];

// Packets travel between the node's edge and the hub's rim, so no label gets covered.
function rim(p: { x: number; y: number }, radius = 40) {
  const dx = p.x - hub.x;
  const dy = p.y - hub.y;
  const k = radius / Math.hypot(dx, dy);
  return `${hub.x + dx * k} ${hub.y + dy * k}`;
}

function edge(p: { x: number; y: number }) {
  const dx = hub.x - p.x;
  const dy = hub.y - p.y;
  const t = Math.min(54 / Math.abs(dx), 24 / Math.abs(dy));
  return `${p.x + dx * t} ${p.y + dy * t}`;
}

// One gRPC auth module shared by four projects: requests go in, tokens come back.
export function AuthHub() {
  const ref = useSvgPlayback();

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 224"
      className="w-full font-mono"
      role="img"
      aria-label="Схема: четыре проекта обращаются к одному gRPC-модулю авторизации"
    >
      {projects.map((p, i) => (
        <line
          key={`line-${i}`}
          x1={p.x}
          y1={p.y}
          x2={hub.x}
          y2={hub.y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1s" repeatCount="indefinite" />
        </line>
      ))}

      <circle cx={hub.x} cy={hub.y} r="36" fill="none" stroke="var(--color-gopher)" strokeWidth="2">
        <animate attributeName="r" values="36;64" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={hub.x} cy={hub.y} r="36" fill="var(--color-gopher)" />
      <text x={hub.x} y={hub.y - 2} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--color-ink)">
        auth
      </text>
      <text x={hub.x} y={hub.y + 14} textAnchor="middle" fontSize="11" fill="var(--color-ink)">
        gRPC
      </text>

      {projects.map((p, i) => (
        <g key={`node-${i}`}>
          <rect
            x={p.x - 50}
            y={p.y - 20}
            width="100"
            height="40"
            rx="10"
            fill="#2d2d2d"
            stroke="rgba(255,255,255,0.12)"
          />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.85)">
            проект {i + 1}
          </text>

          <circle r="4.5" fill="var(--color-gopher)">
            <animateMotion
              path={`M${edge(p)} L${rim(p)}`}
              dur="1.6s"
              begin={`${-i * 0.55}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="var(--color-paper)">
            <animateMotion
              path={`M${rim(p)} L${edge(p)}`}
              dur="1.6s"
              begin={`${-i * 0.55 - 0.8}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
