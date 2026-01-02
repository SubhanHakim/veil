import { useEffect, useRef } from 'react';

const ASCIIOverlay = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const chars = 'XYZ01./';

        const draw = () => {
            // Slow down the chaotic update
            t++;
            if (t % 8 !== 0) { // Update every 8 frames for slower, "thinking" feel
                animationFrameId = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.05)'; // Indigo-ish hint, very transparent
            ctx.font = '12px monospace';

            const cols = Math.floor(canvas.width / 20);
            const rows = Math.floor(canvas.height / 20);

            for (let i = 0; i < 50; i++) { // Render 50 random noise artifacts per tick
                const x = Math.floor(Math.random() * cols) * 20;
                const y = Math.floor(Math.random() * rows) * 20;
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, x, y);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1] mix-blend-screen"
        />
    );
};

export default ASCIIOverlay;
