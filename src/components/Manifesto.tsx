import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Manifesto = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <section ref={ref} className="min-h-[80vh] flex flex-col items-center justify-center py-20 relative z-10 px-6">

            {/* Primary Statement */}
            <motion.div
                style={{ opacity, y }}
                className="max-w-4xl text-center relative"
            >
                {/* Decorative subtle corners */}
                <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-text-muted opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-text-muted opacity-20"></div>

                <h2 className="text-2xl md:text-4xl font-extralight leading-relaxed tracking-wide text-text-main">
                    VEIL explores the <span className="text-slate-400 italic font-thin">post-human feminine form</span> as an <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">interface</span> rather than an identity.
                </h2>
            </motion.div>

            {/* Decorative Connection Line */}
            <motion.div
                style={{ scaleY: scrollYProgress }}
                className="w-px h-32 bg-gradient-to-b from-transparent via-haze-violet to-transparent my-16 opacity-50 origin-top"
            />

            {/* Secondary Analysis */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0.4, 1], [0, 1]) }}
                className="max-w-2xl text-center"
            >
                <p className="text-xs md:text-sm font-light tracking-[0.2em] leading-loose text-text-muted uppercase">
                    Through silence, symmetry, and digital abstraction, it examines how bodies are <span className="text-white border-b border-white/20 pb-0.5">perceived</span>, <span className="text-white border-b border-white/20 pb-0.5">fragmented</span>, and <span className="text-white border-b border-white/20 pb-0.5">reassembled</span> within systems of data and signal.
                </p>
            </motion.div>

        </section>
    );
};

export default Manifesto;
