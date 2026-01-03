import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/hero.png';
import dexIcon from '../assets/dexscreener.svg';

const XIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const Hero = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section ref={targetRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">

            {/* Background Atmosphere - Global VoidGrid Visible */}
            {/* <div className="absolute inset-0 bg-void"></div> */}

            {/* Hero Image - Post-human figure */}
            <motion.div
                style={{ opacity, scale, y }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <div className="relative w-[300px] md:w-[500px] h-[70vh] opacity-80 mix-blend-lighten animate-breathe">
                    <img
                        src={heroImg}
                        alt="Presence"
                        className="w-full h-full object-contain filter grayscale contrast-125 brightness-75 sepia-[.3] hue-rotate-[190deg]"
                    />
                    {/* Glitch Overlay within image container */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80"></div>
                </div>
            </motion.div>

            {/* Title - "Silent Interface" */}
            <motion.div
                className="relative z-20 text-center mix-blend-difference flex flex-col items-center"
            >
                <motion.h1
                    initial={{ opacity: 0, letterSpacing: "1em", filter: "blur(10px)" }}
                    animate={{ opacity: 1, letterSpacing: "0.25em", filter: "blur(0px)" }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="text-7xl md:text-[10rem] font-thin text-text-main leading-none select-none"
                >
                    VEIL
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                    className="mt-6 md:mt-10 text-xs md:text-sm font-light tracking-widest text-text-muted select-none uppercase opacity-60"
                >
                    A silent interface where form dissolves into signal.
                </motion.p>

                {/* Social Buttons "Cool" Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="mt-12 flex gap-4 md:gap-6 z-30"
                >
                    <SocialButton href="https://bonk.fun/token/8mkryty7ucTeARVX2eaBYYgEF6NUvhxDSTSyq34Ebonk" icon={<img src={dexIcon} alt="Dex" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />} label="bonk" />
                    <SocialButton href="https://x.com/veil_line" icon={<XIcon />} label="X" />
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-text-muted to-transparent"></div>
            </motion.div>

        </section>
    );
};

const SocialButton = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
    <a href={href} className="group relative px-6 py-3 overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-haze-violet/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]">
        {/* Animated Background Scan */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-scan-fast" />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-1 h-1 bg-white/20 group-hover:bg-haze-violet transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/20 group-hover:bg-haze-violet transition-colors duration-300" />

        <div className="relative flex items-center gap-3">
            <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-white">
                {icon}
            </span>
            <span className="text-[10px] tracking-[0.2em] font-mono text-text-muted group-hover:text-haze-violet transition-colors duration-300">
                {label}
            </span>
        </div>
    </a>
);

export default Hero;
