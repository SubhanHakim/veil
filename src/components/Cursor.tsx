import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Center initially
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // Snappy inner dot
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8, // Slow, "breathing" follower
                ease: 'power3.out'
            });
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="hidden md:block fixed w-1 h-1 bg-white rounded-full pointer-events-none z-[100] top-0 left-0 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="hidden md:block fixed w-8 h-8 border border-haze-violet rounded-full pointer-events-none z-[99] top-0 left-0 opacity-30"
            />
        </>
    );
};

export default Cursor;
