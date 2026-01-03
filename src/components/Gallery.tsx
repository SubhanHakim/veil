import { useState } from 'react';
import { motion } from 'framer-motion';

import img1 from '../assets/gallery/gallery1.png';
import img2 from '../assets/gallery/gallery2.png';
import img3 from '../assets/gallery/gallery3.png';
import img4 from '../assets/gallery/gallery4.png';

const visualData = [
    { id: 1, src: img1, label: "ECHOES", sub: "DATA_001", desc: "Digital remnants of a forgotten era." },
    { id: 2, src: img2, label: "CONSTRUCT", sub: "DATA_002", desc: "A framework suspended in void." },
    { id: 3, src: img3, label: "SIGNAL", sub: "DATA_003", desc: "Transmission received from the deep web." },
    { id: 4, src: img4, label: "SYNTHESIS", sub: "DATA_004", desc: "Merging organic thought with machine logic." },
];

const Gallery = () => {
    return (
        <section className="w-full py-32 px-6 md:px-12 relative z-10">

            {/* Section Header */}
            <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-4">
                <h3 className="text-xl md:text-3xl font-thin tracking-widest text-text-main">
                    OBSERVATION LOG
                </h3>
                <span className="hidden md:block text-[10px] items-end font-mono text-text-muted opacity-50">
                // ARCHIVE_READ_ONLY
                </span>
            </div>

            {/* Grid Layout - Full Height / Natural Aspect Ratio */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-1">
                {visualData.map((item) => (
                    <GalleryItem key={item.id} item={item} />
                ))}
            </div>

        </section>
    );
};

const GalleryItem = ({ item }: { item: any }) => {
    const [isHovered, setHovered] = useState(false);

    return (
        <motion.div
            className="relative w-full h-auto overflow-hidden bg-sub-void group cursor-none"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* Image Layer */}
            <motion.img
                src={item.src}
                alt={item.label}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    filter: isHovered ? "grayscale(0%) brightness(1.1)" : "grayscale(80%) brightness(1.0)"
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-700 block"
            />

            {/* Scanline Overlay on Hover */}
            <motion.div
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] pointer-events-none"
            />

            {/* Information Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: isHovered ? 0 : "100%" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="bg-void/80 backdrop-blur-sm p-4 border-l-2 border-haze-violet"
                    >
                        <div className="text-[10px] font-mono text-haze-violet mb-1 tracking-widest">{item.sub}</div>
                        <h4 className="text-xl font-light tracking-widest text-white mb-2">{item.label}</h4>
                        <p className="text-xs text-text-muted font-light">{item.desc}</p>
                    </motion.div>
                </div>
            </div>

            {/* Static Label (Always Visible) */}
            <motion.div
                animate={{ opacity: isHovered ? 0 : 1 }}
                className="absolute top-6 left-6 text-[10px] tracking-[0.2em] text-white/40 font-mono"
            >
                {item.sub}
            </motion.div>

        </motion.div>
    );
}

export default Gallery;
