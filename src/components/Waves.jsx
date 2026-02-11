import { useRef, useEffect } from "react";
import eventsData from "../events.json";

class Grad {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot2(x, y) {
    return this.x * x + this.y * y;
  }
}

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103,
      30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62,
      94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136,
      171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229,
      122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63,
      161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188,
      159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
      147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223,
      183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
      129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97,
      228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
      239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127,
      4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
      61, 156, 180,
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }
  seed(seed) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }
  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
  perlin2(x, y) {
    let X = Math.floor(x);
    let Y = Math.floor(y);
    x -= X;
    y -= Y;
    X &= 255;
    Y &= 255;
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
    const u = this.fade(x);
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y));
  }
}

const EVENT_NAMES = Object.values(eventsData)
  .map((event) => event?.name)
  .filter(Boolean);

const TEXT_EFFECTS = ["pulse", "neon", "flicker", "scan"];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const rand = (min, max) => min + Math.random() * (max - min);

function hexToRgba(hex, alpha) {
  const fallback = `rgba(20,184,166,${alpha})`;
  if (!hex || typeof hex !== "string") return fallback;
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  if (full.length !== 6) return fallback;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return fallback;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function splitLabel(text, maxChars = 16) {
  if (!text) return ["COGNITIO", "EVENT"];
  if (text.length <= maxChars) return [text, ""];
  const words = text.split(" ");
  let lineA = "";
  let lineB = "";
  words.forEach((word) => {
    const next = `${lineA}${lineA ? " " : ""}${word}`;
    if (next.length <= maxChars) lineA = next;
    else lineB = `${lineB}${lineB ? " " : ""}${word}`;
  });
  if (!lineB) {
    const mid = Math.ceil(text.length / 2);
    return [text.slice(0, mid).trim(), text.slice(mid).trim()];
  }
  return [lineA, lineB];
}

function centerSafeArea(width, height, isMobile) {
  const safeW = isMobile ? width * 0.9 : clamp(width * 0.58, 460, 980);
  const safeH = isMobile ? height * 0.74 : height * 0.64;
  return {
    x: width * 0.5,
    y: isMobile ? height * 0.57 : height * 0.55,
    w: safeW,
    h: safeH,
    left: width * 0.5 - safeW * 0.5,
    right: width * 0.5 + safeW * 0.5,
    top: (isMobile ? height * 0.57 : height * 0.55) - safeH * 0.5,
    bottom: (isMobile ? height * 0.57 : height * 0.55) + safeH * 0.5,
  };
}

function randomSidePosition(width, height, side, safe, top, bottom, isMobile) {
  const margin = isMobile ? 10 : 24;
  const textPad = isMobile ? 64 : 120;
  const leftMin = margin + textPad;
  const leftMax = Math.max(leftMin + 6, safe.left - (isMobile ? 14 : 32));
  const rightMin = Math.min(width - margin - textPad, safe.right + (isMobile ? 14 : 32));
  const rightMax = width - margin - textPad;

  const x =
    side === "left"
      ? rand(leftMin, leftMax)
      : rand(Math.max(rightMin, leftMin + 6), Math.max(rightMax, rightMin + 6));

  let y = top + 34;
  let attempts = 0;
  while (attempts < 20) {
    attempts += 1;
    const candidate = rand(top + 34, bottom - 30);
    const inBlockedY =
      candidate > safe.y - safe.h * 0.44 && candidate < safe.y + safe.h * 0.44;
    if (!inBlockedY) {
      y = candidate;
      break;
    }
    y = candidate;
  }

  return { x, y };
}

function drawGear(ctx, gear, color) {
  const { x, y, radius, angle } = gear;
  const teeth = 12;
  const step = (Math.PI * 2) / teeth;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.fillStyle = "rgba(7, 20, 31, 0.66)";
  ctx.lineWidth = 2.2;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 2.9;
  for (let i = 0; i < teeth; i += 1) {
    const start = i * step + step * 0.16;
    const end = start + step * 0.52;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.08, start, end);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDrone(ctx, drone, time, color) {
  const bob = Math.sin(time * 1.5 + drone.phase) * 4;
  const x = drone.x;
  const y = drone.y + bob;
  const s = drone.scale;
  const spin = time * (4 + drone.speed * 12);

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = "rgba(7,21,33,0.74)";
  ctx.lineWidth = 2.2;

  ctx.beginPath();
  ctx.ellipse(0, 0, 18 * s, 10 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const arm = 24 * s;
  const rotors = [
    [-arm, -arm * 0.6],
    [arm, -arm * 0.6],
    [-arm, arm * 0.6],
    [arm, arm * 0.6],
  ];

  rotors.forEach(([rx, ry]) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(rx * 0.5, ry * 0.32, rx, ry);
    ctx.stroke();

    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(spin);
    ctx.beginPath();
    ctx.ellipse(0, 0, 8 * s, 3.2 * s, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, 8 * s, 3.2 * s, Math.PI / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });
  ctx.restore();
}

function drawMachine(ctx, machine, time, color) {
  const s = machine.scale;
  const x = machine.x;
  const y = machine.y;
  const stroke = color;
  const slider = Math.sin(time * 2.2 + machine.phase) * 6 * s;

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2.2;

  ctx.beginPath();
  ctx.moveTo(-20 * s, 0);
  ctx.lineTo(20 * s, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(-25 * s, -8 * s, 12 * s, 16 * s);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(13 * s + slider, -7 * s, 12 * s, 14 * s);
  ctx.stroke();
  ctx.restore();
}

function drawPlane(ctx, plane, time, color) {
  const x = plane.x + Math.sin(time * 0.7 + plane.phase) * plane.range;
  const y = plane.y + Math.cos(time * 0.9 + plane.phase) * 4;
  const s = plane.scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = "rgba(10,24,36,0.68)";
  ctx.lineWidth = 1.9;

  ctx.beginPath();
  ctx.moveTo(-20 * s, 0);
  ctx.quadraticCurveTo(0, -8 * s, 22 * s, 0);
  ctx.quadraticCurveTo(0, 6 * s, -20 * s, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-3 * s, 0);
  ctx.lineTo(5 * s, -10 * s);
  ctx.lineTo(2 * s, 0);
  ctx.stroke();
  ctx.restore();
}

function drawEventText(ctx, tag, time, color) {
  const fade = Math.sin(Math.PI * tag.phase);
  if (fade <= 0.03) return;

  const x = tag.x + Math.sin(time * tag.driftSpeed + tag.seed) * tag.driftX;
  const y = tag.y + Math.cos(time * tag.driftSpeed * 0.78 + tag.seed) * tag.driftY;
  let alpha = fade;
  if (tag.effect === "flicker") {
    alpha *= 0.68 + 0.32 * Math.abs(Math.sin(time * 16 + tag.seed));
  }

  const [lineA, lineB] = splitLabel(tag.text, 16);
  const accent = color;
  const glow = hexToRgba(accent, 0.86 * alpha);
  const fill = hexToRgba("#f8fafc", 0.95 * alpha);
  const textAlign = tag.side === "left" ? "right" : "left";
  const textX = x;

  ctx.save();
  ctx.textAlign = textAlign;
  ctx.textBaseline = "middle";
  ctx.font = `700 ${tag.size}px "Space Grotesk", sans-serif`;

  if (tag.effect === "pulse") {
    ctx.shadowBlur = 12 + Math.sin(time * 5 + tag.seed) * 4;
    ctx.shadowColor = glow;
    ctx.fillStyle = fill;
    ctx.fillText(lineA, textX, y - (lineB ? 10 : 0));
  } else if (tag.effect === "neon") {
    ctx.shadowBlur = 16;
    ctx.shadowColor = glow;
    ctx.strokeStyle = hexToRgba(accent, 0.85 * alpha);
    ctx.lineWidth = 1.5;
    ctx.strokeText(lineA, textX, y - (lineB ? 10 : 0));
    ctx.fillStyle = fill;
    ctx.fillText(lineA, textX, y - (lineB ? 10 : 0));
  } else if (tag.effect === "scan") {
    const grad =
      tag.side === "left"
        ? ctx.createLinearGradient(textX - 140, y, textX + 10, y)
        : ctx.createLinearGradient(textX - 10, y, textX + 140, y);
    grad.addColorStop(0, hexToRgba(accent, 0.4 * alpha));
    grad.addColorStop(0.45, hexToRgba("#f8fafc", 0.96 * alpha));
    grad.addColorStop(1, hexToRgba(accent, 0.5 * alpha));
    ctx.shadowBlur = 10;
    ctx.shadowColor = glow;
    ctx.fillStyle = grad;
    ctx.fillText(lineA, textX, y - (lineB ? 10 : 0));
  } else {
    ctx.shadowBlur = 8;
    ctx.shadowColor = glow;
    ctx.fillStyle = fill;
    ctx.fillText(lineA, textX, y - (lineB ? 10 : 0));
  }

  if (lineB) {
    ctx.font = `700 ${Math.max(11, tag.size - 2)}px "Space Grotesk", sans-serif`;
    ctx.fillStyle = fill;
    ctx.fillText(lineB, textX, y + 10);
  }
  ctx.restore();
}

export default function Waves({
  lineColor = "black",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const noiseRef = useRef(new Noise(Math.random()));
  const linesRef = useRef([]);
  const tagsRef = useRef([]);
  const mechsRef = useRef({ gears: [], drones: [], machines: [], planes: [] });
  const eventCursorRef = useRef(0);
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    ctxRef.current = canvas.getContext("2d");

    let lastTime = 0;

    function nextEventName() {
      if (!EVENT_NAMES.length) return "COGNITIO EVENT";
      const value = EVENT_NAMES[eventCursorRef.current % EVENT_NAMES.length];
      eventCursorRef.current += 1;
      return value;
    }

    function recycleTag(tag, safe, isMobile, top, bottom) {
      const pos = randomSidePosition(
        boundingRef.current.width,
        boundingRef.current.height,
        tag.side,
        safe,
        top,
        bottom,
        isMobile
      );
      tag.x = pos.x;
      tag.y = pos.y;
      tag.text = nextEventName();
      tag.effect = TEXT_EFFECTS[Math.floor(Math.random() * TEXT_EFFECTS.length)];
      tag.seed = Math.random() * 10;
      tag.phase = 0;
      tag.driftX = rand(2, isMobile ? 4 : 7);
      tag.driftY = rand(1.5, isMobile ? 3.8 : 6);
      tag.driftSpeed = rand(0.5, 1.25);
      tag.speed = rand(0.08, 0.13);
      tag.size = isMobile ? rand(11, 14) : rand(13, 20);
    }

    function setSize() {
      boundingRef.current = container.getBoundingClientRect();
      canvas.width = boundingRef.current.width;
      canvas.height = boundingRef.current.height;
    }

    function setLines() {
      const { width, height } = boundingRef.current;
      linesRef.current = [];
      const oWidth = width + 200;
      const oHeight = height + 30;
      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);
      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;
      for (let i = 0; i <= totalLines; i += 1) {
        const pts = [];
        for (let j = 0; j <= totalPoints; j += 1) {
          pts.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        linesRef.current.push(pts);
      }
    }

    function setDecor() {
      const { width, height } = boundingRef.current;
      const isMobile = width < 768;
      const safe = centerSafeArea(width, height, isMobile);
      const top = 18;
      const bottom = Math.max(top + 80, height - 18);

      const count = isMobile ? 2 : width < 1100 ? 4 : 6;
      tagsRef.current = Array.from({ length: count }).map((_, i) => {
        const side = i % 2 === 0 ? "left" : "right";
        const pos = randomSidePosition(width, height, side, safe, top, bottom, isMobile);
        return {
          side,
          x: pos.x,
          y: pos.y,
          text: nextEventName(),
          effect: TEXT_EFFECTS[i % TEXT_EFFECTS.length],
          phase: i / count,
          speed: rand(0.08, 0.13),
          size: isMobile ? rand(10, 13) : rand(13, 20),
          driftX: rand(2, isMobile ? 4 : 7),
          driftY: rand(1.5, isMobile ? 3.8 : 6),
          driftSpeed: rand(0.5, 1.25),
          seed: Math.random() * 10,
        };
      });

      const leftX = Math.max(24, safe.left - (isMobile ? 8 : 70));
      const rightX = Math.min(width - 24, safe.right + (isMobile ? 8 : 70));

      mechsRef.current = {
        gears: [
          {
            x: leftX,
            y: top + height * 0.2,
            radius: isMobile ? 16 : 24,
            angle: 0.2,
            speed: -0.6,
          },
          {
            x: rightX,
            y: top + height * 0.24,
            radius: isMobile ? 15 : 22,
            angle: 0.7,
            speed: 0.52,
          },
        ],
        drones: [
          {
            x: leftX + (isMobile ? 8 : 18),
            y: top + height * 0.1,
            scale: isMobile ? 0.58 : 0.78,
            phase: 0.4,
            speed: 0.22,
          },
          {
            x: rightX - (isMobile ? 8 : 18),
            y: top + height * 0.12,
            scale: isMobile ? 0.58 : 0.78,
            phase: 1.2,
            speed: 0.24,
          },
        ],
        machines: [
          {
            x: leftX + (isMobile ? 8 : 16),
            y: bottom - height * 0.17,
            scale: isMobile ? 0.58 : 0.8,
            phase: 1.3,
          },
          {
            x: rightX - (isMobile ? 8 : 16),
            y: bottom - height * 0.17,
            scale: isMobile ? 0.58 : 0.8,
            phase: 2.1,
          },
        ],
        planes: [
          {
            x: leftX - 10,
            y: top + height * 0.32,
            scale: isMobile ? 0.55 : 0.8,
            range: isMobile ? 8 : 14,
            phase: 0.2,
          },
          {
            x: rightX + 10,
            y: top + height * 0.35,
            scale: isMobile ? 0.55 : 0.8,
            range: isMobile ? 8 : 14,
            phase: 2.5,
          },
        ],
      };
    }

    function movePoints(time) {
      const lines = linesRef.current;
      const mouse = mouseRef.current;
      const noise = noiseRef.current;
      lines.forEach((pts) => {
        pts.forEach((p) => {
          const move = noise.perlin2(
            (p.x + time * waveSpeedX) * 0.002,
            (p.y + time * waveSpeedY) * 0.0015
          ) * 12;
          p.wave.x = Math.cos(move) * waveAmpX;
          p.wave.y = Math.sin(move) * waveAmpY;

          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const dist = Math.hypot(dx, dy);
          const l = Math.max(175, mouse.vs);
          if (dist < l) {
            const s = 1 - dist / l;
            const f = Math.cos(dist * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }

          p.cursor.vx += (0 - p.cursor.x) * tension;
          p.cursor.vy += (0 - p.cursor.y) * tension;
          p.cursor.vx *= friction;
          p.cursor.vy *= friction;
          p.cursor.x += p.cursor.vx * 2;
          p.cursor.y += p.cursor.vy * 2;

          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));
          p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y));
        });
      });
    }

    function moved(point, withCursor = true) {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    }

    function drawLines() {
      const { width, height } = boundingRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      linesRef.current.forEach((points) => {
        let p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);
        points.forEach((p, idx) => {
          const isLast = idx === points.length - 1;
          p1 = moved(p, !isLast);
          const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast);
          ctx.lineTo(p1.x, p1.y);
          if (isLast) ctx.moveTo(p2.x, p2.y);
        });
      });
      ctx.stroke();
    }

    function updateDecor(dt, time) {
      const { width, height } = boundingRef.current;
      const isMobile = width < 768;
      const safe = centerSafeArea(width, height, isMobile);
      const top = 18;
      const bottom = Math.max(top + 80, height - 18);

      tagsRef.current.forEach((tag) => {
        const prev = tag.phase;
        tag.phase += dt * tag.speed;
        if (tag.phase > 1) tag.phase -= 1;
        if (prev > tag.phase) recycleTag(tag, safe, isMobile, top, bottom);
      });

      mechsRef.current.gears.forEach((gear) => {
        gear.angle += dt * gear.speed;
      });

      mechsRef.current.planes.forEach((plane) => {
        plane.phase += dt * 0.6;
      });
      mechsRef.current.drones.forEach((drone) => {
        drone.phase += dt * 0.38;
      });
      mechsRef.current.machines.forEach((machine) => {
        machine.phase += dt * 0.45;
      });

      if (!Number.isFinite(time)) return;
    }

    function drawDecor(time) {
      const ctx = ctxRef.current;
      const accent = lineColor;

      mechsRef.current.gears.forEach((gear) => {
        drawGear(ctx, gear, hexToRgba(accent, 0.58));
      });
      mechsRef.current.drones.forEach((drone) => {
        drawDrone(ctx, drone, time, hexToRgba(accent, 0.8));
      });
      mechsRef.current.machines.forEach((machine) => {
        drawMachine(ctx, machine, time, hexToRgba(accent, 0.72));
      });
      mechsRef.current.planes.forEach((plane) => {
        drawPlane(ctx, plane, time, hexToRgba("#93c5fd", 0.72));
      });
      tagsRef.current.forEach((tag) => {
        drawEventText(ctx, tag, time, accent);
      });
    }

    function tick(timestamp) {
      const mouse = mouseRef.current;
      const time = timestamp * 0.001;
      const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 1 / 24) : 1 / 60;
      lastTime = timestamp;

      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      container.style.setProperty("--x", `${mouse.sx}px`);
      container.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(timestamp);
      drawLines();
      updateDecor(dt, time);
      drawDecor(time);
      requestAnimationFrame(tick);
    }

    function onResize() {
      setSize();
      setLines();
      setDecor();
    }
    function onMouseMove(e) {
      updateMouse(e.pageX, e.pageY);
    }
    function onTouchMove(e) {
      const touch = e.touches[0];
      updateMouse(touch.clientX, touch.clientY);
    }
    function updateMouse(x, y) {
      const mouse = mouseRef.current;
      const b = boundingRef.current;
      mouse.x = x - b.left;
      mouse.y = y - b.top + window.scrollY;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    setSize();
    setLines();
    setDecor();
    requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        ...style,
      }}
      className={`absolute top-0 left-0 w-full h-full overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 left-0 bg-[#160000] rounded-full w-[0.5rem] h-[0.5rem]"
        style={{
          transform: "translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)",
          willChange: "transform",
        }}
      />
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
