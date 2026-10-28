"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ReactNode } from "react";
import { fmtInt } from "./Ui";

const GREEN = "#1f6b3a";
const GRID = "#ece6da";
const AXIS = "#7d8a83";

const axisStyle = { fontSize: 11, fill: AXIS, fontFamily: "var(--font-sans)" };

/* ------------------------------------------------------------------ */
/* Tooltip                                                              */
/* ------------------------------------------------------------------ */

interface TipPayload {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
}

function Tip({ active, payload, label, format, title }: { active?: boolean; payload?: TipPayload[]; label?: string | number; format: (n: number) => string; title?: (label: string | number | undefined) => ReactNode }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="ad-tip" role="status">
      {title ? <b>{title(label)}</b> : label !== undefined && <b>{label}</b>}
      {payload.map((p) => (
        <span key={String(p.name)}>
          <i style={{ background: p.color ?? GREEN }} />
          {p.name && <em>{p.name}</em>}
          {format(Number(p.value))}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue area                                                         */
/* ------------------------------------------------------------------ */

export function SalesArea({
  data,
  height = 200,
  dayLabel,
  yTicks,
  yFormat,
  tickDays = [1, 7, 14, 21, 28],
  dots = true,
  id = "sales",
}: {
  data: { day: number; revenue: number }[];
  height?: number;
  dayLabel: (d: number) => string;
  yTicks?: number[];
  yFormat: (n: number) => string;
  tickDays?: number[];
  dots?: boolean;
  id?: string;
}) {
  return (
    <div className="ad-chart" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5fae7a" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#5fae7a" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} strokeDasharray="0" />
          <XAxis dataKey="day" ticks={tickDays} tickFormatter={dayLabel} axisLine={false} tickLine={false} tick={axisStyle} dy={6} />
          <YAxis ticks={yTicks} tickFormatter={yFormat} axisLine={false} tickLine={false} tick={axisStyle} width={58} />
          <Tooltip content={<Tip format={(n) => `${yFormat(n)} MXN`} title={(l) => dayLabel(Number(l))} />} cursor={{ stroke: GREEN, strokeDasharray: "3 3", strokeOpacity: 0.5 }} />
          <Area type="monotone" dataKey="revenue" stroke={GREEN} strokeWidth={2} fill={`url(#grad-${id})`} dot={dots ? { r: 3.2, fill: GREEN, strokeWidth: 0 } : false} activeDot={{ r: 5.5, fill: GREEN, stroke: "#fff", strokeWidth: 2 }} isAnimationActive animationDuration={1200} animationEasing="ease-out" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut                                                                */
/* ------------------------------------------------------------------ */

export function Donut({ data, size = 160, thickness = 26, center, startAngle = 90 }: { data: { name: string; value: number; color: string }[]; size?: number; thickness?: number; center?: { big: string; small: string }; startAngle?: number }) {
  const outer = size / 2;
  return (
    <div className="ad-donut" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={outer - thickness} outerRadius={outer} startAngle={startAngle} endAngle={startAngle - 360} paddingAngle={1.5} stroke="#fff" strokeWidth={2} isAnimationActive animationDuration={1100} animationEasing="ease-out">
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<Tip format={(n) => fmtInt(n)} />} />
        </PieChart>
      </ResponsiveContainer>
      {center && (
        <span className="ad-donut__center">
          <b>{center.big}</b>
          <small>{center.small}</small>
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Coloured bars (sales by dosage)                                      */
/* ------------------------------------------------------------------ */

export function ColorBars({ data, height = 190, yTicks = [0, 100, 200, 300, 400, 500] }: { data: { label: string; value: number; color: string }[]; height?: number; yTicks?: number[] }) {
  return (
    <div className="ad-chart" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 22, right: 6, left: -16, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={axisStyle} dy={6} />
          <YAxis ticks={yTicks} axisLine={false} tickLine={false} tick={axisStyle} />
          <Tooltip content={<Tip format={fmtInt} />} cursor={{ fill: "#f3efe6" }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={1000} animationEasing="ease-out">
            {data.map((d) => (
              <Cell key={d.label} fill={d.color} />
            ))}
            <LabelList dataKey="value" position="top" formatter={(v: unknown) => fmtInt(Number(v))} style={{ fontSize: 12, fontWeight: 600, fill: "#1d3b2f", fontFamily: "var(--font-sans)" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Retention line (%)                                                   */
/* ------------------------------------------------------------------ */

export function RateLine({ data, height = 150, dayLabel, id = "rate" }: { data: { day: number; rate: number }[]; height?: number; dayLabel: (d: number) => string; id?: string }) {
  return (
    <div className="ad-chart" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5fae7a" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5fae7a" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="day" ticks={[1, 7, 14, 21, 28]} tickFormatter={dayLabel} axisLine={false} tickLine={false} tick={axisStyle} dy={6} />
          <YAxis ticks={[0, 10, 20, 30, 40, 50]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} tick={axisStyle} />
          <Tooltip content={<Tip format={(n) => `${n.toFixed(1)}%`} title={(l) => dayLabel(Number(l))} />} cursor={{ stroke: GREEN, strokeDasharray: "3 3", strokeOpacity: 0.5 }} />
          <Area type="monotone" dataKey="rate" stroke={GREEN} strokeWidth={2} fill={`url(#grad-${id})`} dot={{ r: 2.8, fill: GREEN, strokeWidth: 0 }} activeDot={{ r: 5, fill: GREEN, stroke: "#fff", strokeWidth: 2 }} isAnimationActive animationDuration={1200} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single-hue bars (activations by day)                                 */
/* ------------------------------------------------------------------ */

export function DayBars({ data, height = 150, dayLabel, yTicks = [0, 100, 200, 300, 400], highlightLast }: { data: { day: number; count: number }[]; height?: number; dayLabel: (d: number) => string; yTicks?: number[]; highlightLast?: boolean }) {
  return (
    <div className="ad-chart" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="day" ticks={[1, 7, 14, 21, 28]} tickFormatter={dayLabel} axisLine={false} tickLine={false} tick={axisStyle} dy={6} />
          <YAxis ticks={yTicks} axisLine={false} tickLine={false} tick={axisStyle} />
          <Tooltip content={<Tip format={fmtInt} title={(l) => dayLabel(Number(l))} />} cursor={{ fill: "#f3efe6" }} />
          <Bar dataKey="count" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={1000}>
            {data.map((d, i) => (
              <Cell key={d.day} fill={highlightLast && i === data.length - 1 ? GREEN : i % 2 ? "#8fc89d" : "#b7dcc0"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Two-series bars (new vs returning, phone reports)                    */
/* ------------------------------------------------------------------ */

export function PairBars({ data, height = 120, dayLabel, names }: { data: { day: number; nuevos: number; recurrentes: number }[]; height?: number; dayLabel: (d: number) => string; names: [string, string] }) {
  return (
    <div className="ad-chart" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 6, right: 4, left: -22, bottom: 0 }} barCategoryGap="30%" barGap={1}>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="day" ticks={[1, 8, 15, 22, 30]} tickFormatter={dayLabel} axisLine={false} tickLine={false} tick={axisStyle} dy={4} />
          <YAxis ticks={[0, 200, 400]} axisLine={false} tickLine={false} tick={axisStyle} />
          <Tooltip content={<Tip format={fmtInt} title={(l) => dayLabel(Number(l))} />} cursor={{ fill: "#f3efe6" }} />
          <Bar dataKey="nuevos" name={names[0]} stackId="a" fill="#b7dcc0" isAnimationActive animationDuration={900} />
          <Bar dataKey="recurrentes" name={names[1]} stackId="a" fill={GREEN} radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
