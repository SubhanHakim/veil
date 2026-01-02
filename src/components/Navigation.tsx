import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = [
    { id: "hero", label: "HOME", path: "/#hero" },
    { id: "manifesto", label: "EXPLORE", path: "/#manifesto" },
    { id: "gallery", label: "GALLERY", path: "/#gallery" },
    { id: "backrooms", label: "TERMINAL", path: "/backrooms" },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [timeDisplay, setTimeDisplay] = useState("");

    useEffect(() => {
        const zones = [
            { label: 'UTC', timeZone: 'UTC' },
            { label: 'TOK', timeZone: 'Asia/Tokyo' },
            { label: 'NYC', timeZone: 'America/New_York' },
            { label: 'LON', timeZone: 'Europe/London' },
        ];

        let zoneIndex = 0;

        const interval = setInterval(() => {
            const now = new Date();
            const seconds = Math.floor(Date.now() / 3000);
            zoneIndex = seconds % zones.length;
            const currentZone = zones[zoneIndex];

            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: currentZone.timeZone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            setTimeDisplay(`${currentZone.label} // ${timeString}`);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        },
        open: {
            opacity: 1,
            y: "0%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    };

    const linkVariants = {
        closed: { y: 20, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }
        })
    };

    return (
        <>
            {/* Fixed HUD Header */}
            <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-start mix-blend-difference text-white pointer-events-none">

                {/* Brand / Status */}
                <div className="flex flex-col items-start gap-1 pointer-events-auto cursor-pointer group">
                    <Link to="/">
                        <h1 className="text-xl md:text-2xl font-bold tracking-widest group-hover:opacity-50 transition-opacity">
                            VEIL
                        </h1>
                    </Link>
                    <div className="flex items-center gap-2 text-[9px] md:text-[10px] tracking-[0.2em] font-mono opacity-60">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span>SYS.ONLINE</span>
                        <span className="hidden md:inline"> // {timeDisplay}</span>
                    </div>
                </div>

                {/* Menu Trigger */}
                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto group flex flex-col items-end gap-1.5 cursor-pointer"
                >
                    <div className="text-[10px] tracking-widest font-mono mb-1 group-hover:text-haze-violet transition-colors">
                        {isOpen ? "TERMINATE" : "ACCESS"}
                    </div>
                    <div className="space-y-1.5">
                        <motion.div
                            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300"
                        />
                        <motion.div
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-5 h-[1px] bg-white group-hover:w-12 transition-all duration-300 ml-auto"
                        />
                        <motion.div
                            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300"
                        />
                    </div>
                </button>
            </header>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-[90] bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        {/* Decorative Grid Lines */}
                        <div className="absolute inset-0 w-full h-full pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-px h-full bg-white/5"></div>
                            <div className="absolute top-0 right-1/4 w-px h-full bg-white/5"></div>
                            <div className="absolute top-1/3 left-0 w-full h-px bg-white/5"></div>
                            <div className="absolute bottom-1/3 left-0 w-full h-px bg-white/5"></div>
                        </div>

                        <nav className="flex flex-col gap-8 md:gap-12 relative z-10 text-center">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    custom={i}
                                    variants={linkVariants}
                                    className="group relative overflow-hidden"
                                >
                                    {item.path.startsWith("/#") ? (
                                        <a
                                            href={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block"
                                        >
                                            <span className="block text-4xl md:text-7xl font-thin tracking-widest text-text-muted group-hover:text-white transition-colors duration-500">
                                                {item.label}
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-haze-violet transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className="block"
                                        >
                                            <span className="block text-4xl md:text-7xl font-thin tracking-widest text-text-muted group-hover:text-white transition-colors duration-500">
                                                {item.label}
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-haze-violet transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </nav>

                        {/* Menu Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5, transition: { delay: 0.8 } }}
                            className="absolute bottom-12 text-[9px] tracking-[0.3em] font-mono text-text-muted"
                        >
                            COORDINATES: NULL // VOID // 0000
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
