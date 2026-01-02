const Footer = () => {
    return (
        <footer className="w-full relative z-10 border-t border-white/5 bg-void py-20 flex flex-col items-center justify-center text-center">

            {/* Title & Tagline */}
            <div className="mb-12">
                <h2 className="text-4xl font-thin tracking-[0.2em] text-text-main mb-4">VEIL</h2>
                <p className="text-[10px] tracking-widest text-text-muted opacity-50 uppercase">
                    A digital exploration of silence.
                </p>
            </div>

            {/* Minimal Links */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
                {['Manifesto', 'Observation', 'Protocol', 'Status'].map(item => (
                    <a
                        key={item}
                        href="#"
                        className="text-xs font-light text-text-muted hover:text-white transition-colors duration-300 uppercase tracking-widest"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* System Meta - Bare minimum */}
            <div className="flex flex-col gap-2 items-center">
                <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent opacity-20 mb-4"></div>
                <div className="text-[9px] tracking-[0.3em] text-text-muted opacity-30 font-mono">
                    DESIGNED BY MOONCHAD // SYS.VER.2.0.4 // © 2026
                </div>
            </div>

        </footer>
    );
};

export default Footer;
