import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import ASCIIOverlay from '../components/ASCIIOverlay';
import Manifesto from '../components/Manifesto';
import Cursor from '../components/Cursor';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import VoidField from '../components/VoidField';

function Home() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="bg-void min-h-[200vh] text-text-main selection:bg-haze-violet selection:text-white overflow-hidden relative">
            <VoidField />
            <Cursor />
            <Navigation />
            <ASCIIOverlay />

            <section id="hero">
                <Hero />
            </section>

            {/* Generous Spacing */}
            <div className="spacer h-32 md:h-64"></div>

            <section id="manifesto">
                <Manifesto />
            </section>

            <div className="spacer h-32 md:h-64"></div>

            <section id="gallery">
                <Gallery />
            </section>

            <Footer />
        </main>
    );
}

export default Home;
