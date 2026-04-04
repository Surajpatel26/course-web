import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function MotionGraphic() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 500;
        canvas.height = 500;

        let angle = 0;
        let particleAngle = 0;
        let animId: number;

        const cx = 250, cy = 250;

        // 3D Cube vertices (centered at origin, half-size 80)
        const s = 90;
        const vertices3D = [
            [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
            [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
        ];
        const edges = [
            [0,1],[1,2],[2,3],[3,0],
            [4,5],[5,6],[6,7],[7,4],
            [0,4],[1,5],[2,6],[3,7],
        ];

        function project(x: number, y: number, z: number) {
            const fov = 400;
            const scale = fov / (fov + z);
            return { x: cx + x * scale, y: cy + y * scale, s: scale };
        }

        function rotateY(x: number, y: number, z: number, a: number) {
            return { x: x * Math.cos(a) + z * Math.sin(a), y, z: -x * Math.sin(a) + z * Math.cos(a) };
        }
        function rotateX(x: number, y: number, z: number, a: number) {
            return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) };
        }
        function rotateZ(x: number, y: number, z: number, a: number) {
            return { x: x * Math.cos(a) - y * Math.sin(a), y: x * Math.sin(a) + y * Math.cos(a), z };
        }

        const orbits = [
            { radius: 180, speed: 0.004, offset: 0, color: '#06b6d4', size: 4 },
            { radius: 155, speed: -0.006, offset: Math.PI / 3, color: '#a855f7', size: 3 },
            { radius: 205, speed: 0.003, offset: Math.PI, color: '#6366f1', size: 5 },
        ];

        const particles: { x: number; y: number; vx: number; vy: number; life: number; alpha: number }[] = [];

        function spawnParticle() {
            const a = Math.random() * Math.PI * 2;
            const r = 80 + Math.random() * 120;
            particles.push({
                x: cx + Math.cos(a) * r,
                y: cy + Math.sin(a) * r,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                life: 1,
                alpha: Math.random() * 0.6 + 0.2,
            });
        }

        for (let i = 0; i < 30; i++) spawnParticle();

        function drawNeonLine(x1: number, y1: number, x2: number, y2: number, color: string, alpha: number) {
            ctx!.save();
            ctx!.strokeStyle = color;
            ctx!.globalAlpha = alpha * 0.15;
            ctx!.lineWidth = 6;
            ctx!.shadowColor = color;
            ctx!.shadowBlur = 20;
            ctx!.beginPath();
            ctx!.moveTo(x1, y1);
            ctx!.lineTo(x2, y2);
            ctx!.stroke();
            ctx!.globalAlpha = alpha;
            ctx!.lineWidth = 1.2;
            ctx!.shadowBlur = 8;
            ctx!.beginPath();
            ctx!.moveTo(x1, y1);
            ctx!.lineTo(x2, y2);
            ctx!.stroke();
            ctx!.restore();
        }

        function drawGlowCircle(x: number, y: number, r: number, color: string, alpha: number) {
            ctx!.save();
            ctx!.globalAlpha = alpha * 0.3;
            ctx!.shadowColor = color;
            ctx!.shadowBlur = 30;
            ctx!.fillStyle = color;
            ctx!.beginPath();
            ctx!.arc(x, y, r * 2.5, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.globalAlpha = alpha;
            ctx!.shadowBlur = 12;
            ctx!.beginPath();
            ctx!.arc(x, y, r, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.restore();
        }

        function draw() {
            ctx!.clearRect(0, 0, 500, 500);

            // background vignette
            const vg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 250);
            vg.addColorStop(0, 'rgba(6,182,212,0.04)');
            vg.addColorStop(0.5, 'rgba(99,102,241,0.03)');
            vg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx!.fillStyle = vg;
            ctx!.fillRect(0, 0, 500, 500);

            // outer grid rings
            [220, 190, 160].forEach((r, i) => {
                ctx!.save();
                ctx!.globalAlpha = 0.06 - i * 0.01;
                ctx!.strokeStyle = '#06b6d4';
                ctx!.lineWidth = 1;
                ctx!.setLineDash([4, 10]);
                ctx!.beginPath();
                ctx!.arc(cx, cy, r, 0, Math.PI * 2);
                ctx!.stroke();
                ctx!.setLineDash([]);
                ctx!.restore();
            });

            // orbiting nodes
            orbits.forEach((orb) => {
                const a = particleAngle * orb.speed * 200 + orb.offset;
                const nx = cx + Math.cos(a) * orb.radius;
                const ny = cy + Math.sin(a) * orb.radius;

                // orbit trail
                ctx!.save();
                ctx!.globalAlpha = 0.04;
                ctx!.strokeStyle = orb.color;
                ctx!.lineWidth = 1;
                ctx!.beginPath();
                ctx!.arc(cx, cy, orb.radius, 0, Math.PI * 2);
                ctx!.stroke();
                ctx!.restore();

                // connection line to center
                drawNeonLine(cx, cy, nx, ny, orb.color, 0.12);
                drawGlowCircle(nx, ny, orb.size, orb.color, 0.9);

                // small trailing dots
                for (let t = 1; t <= 4; t++) {
                    const ta = a - t * 0.12;
                    const tx = cx + Math.cos(ta) * orb.radius;
                    const ty = cy + Math.sin(ta) * orb.radius;
                    drawGlowCircle(tx, ty, orb.size * (1 - t * 0.2), orb.color, 0.4 - t * 0.08);
                }
            });

            // rotating 3D cube
            const projected = vertices3D.map(([x, y, z]) => {
                let v = rotateY(x, y, z, angle * 0.7);
                v = rotateX(v.x, v.y, v.z, angle * 0.4);
                v = rotateZ(v.x, v.y, v.z, angle * 0.2);
                return project(v.x, v.y, v.z);
            });

            edges.forEach(([a, b]) => {
                const pa = projected[a], pb = projected[b];
                drawNeonLine(pa.x, pa.y, pb.x, pb.y, '#06b6d4', 0.7);
            });

            projected.forEach((p, i) => {
                const isCorner = i < 8;
                drawGlowCircle(p.x, p.y, isCorner ? 4 : 2.5, i % 2 === 0 ? '#06b6d4' : '#a855f7', 0.9);
            });

            // floating particles
            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.004;

                if (p.life <= 0) {
                    const a = Math.random() * Math.PI * 2;
                    const r = 80 + Math.random() * 120;
                    particles[idx] = {
                        x: cx + Math.cos(a) * r,
                        y: cy + Math.sin(a) * r,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: (Math.random() - 0.5) * 0.8,
                        life: 1,
                        alpha: Math.random() * 0.6 + 0.2,
                    };
                    return;
                }

                ctx!.save();
                ctx!.globalAlpha = p.life * p.alpha;
                ctx!.fillStyle = Math.random() > 0.5 ? '#06b6d4' : '#a855f7';
                ctx!.shadowColor = '#06b6d4';
                ctx!.shadowBlur = 8;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.restore();
            });

            // Central glowing core
            const cg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 30);
            cg.addColorStop(0, 'rgba(6,182,212,0.9)');
            cg.addColorStop(0.4, 'rgba(99,102,241,0.5)');
            cg.addColorStop(1, 'rgba(168,85,247,0)');
            ctx!.save();
            ctx!.globalAlpha = 0.8;
            ctx!.fillStyle = cg;
            ctx!.shadowColor = '#06b6d4';
            ctx!.shadowBlur = 40;
            ctx!.beginPath();
            ctx!.arc(cx, cy, 14, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.restore();

            // Inner bright dot
            ctx!.save();
            ctx!.fillStyle = '#ffffff';
            ctx!.shadowColor = '#ffffff';
            ctx!.shadowBlur = 20;
            ctx!.globalAlpha = 0.95;
            ctx!.beginPath();
            ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.restore();

            // HUD elements (floating data cards)
            const hudItems = [
                { x: 60, y: 90, label: 'LIVE', value: '94.2%', color: '#06b6d4' },
                { x: 340, y: 360, label: 'SYNC', value: '∞ TPS', color: '#a855f7' },
            ];

            hudItems.forEach(hud => {
                ctx!.save();
                ctx!.globalAlpha = 0.8;
                ctx!.strokeStyle = hud.color;
                ctx!.lineWidth = 1;
                ctx!.shadowColor = hud.color;
                ctx!.shadowBlur = 10;
                ctx!.strokeRect(hud.x, hud.y, 100, 40);

                ctx!.globalAlpha = 0.06;
                ctx!.fillStyle = hud.color;
                ctx!.fillRect(hud.x, hud.y, 100, 40);

                ctx!.globalAlpha = 0.5;
                ctx!.fillStyle = hud.color;
                ctx!.font = 'bold 8px monospace';
                ctx!.fillText(hud.label, hud.x + 8, hud.y + 14);

                ctx!.globalAlpha = 0.95;
                ctx!.fillStyle = '#ffffff';
                ctx!.font = 'bold 13px monospace';
                ctx!.fillText(hud.value, hud.x + 8, hud.y + 29);
                ctx!.restore();
            });

            angle += 0.008;
            particleAngle += 0.016;
            animId = requestAnimationFrame(draw);
        }

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="relative w-full h-full aspect-square flex items-center justify-center">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute inset-10 bg-purple-500/8 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <motion.canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Floating stat badges */}
            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-6 px-4 py-2 rounded-xl border border-cyan-400/30 bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-cyan-500/10"
            >
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60 block">Enrollment</span>
                <span className="text-lg font-black text-cyan-400 font-mono">50K+</span>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-8 left-6 px-4 py-2 rounded-xl border border-purple-400/30 bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-purple-500/10"
            >
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400/60 block">Rate</span>
                <span className="text-lg font-black text-purple-400 font-mono">99%</span>
            </motion.div>
        </div>
    );
}