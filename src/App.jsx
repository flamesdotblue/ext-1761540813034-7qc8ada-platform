import { useEffect } from 'react';
import Hero from './components/Hero';
import FiltersPanel from './components/FiltersPanel';
import GalaxySphere from './components/GalaxySphere';
import TradeFlowView from './components/TradeFlowView';
import { useAtlasStore } from './components/store';

export default function App() {
  const { selectedAsset, closeTradeFlow } = useAtlasStore();

  useEffect(() => {
    // Lock body scroll when drawer open
    if (selectedAsset) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [selectedAsset]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-md bg-gradient-to-br from-cyan-500 to-fuchsia-500" />
            <div className="font-semibold tracking-tight">Fulo Atlas Sphere</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#galaxy" className="hover:text-white">Galaxy</a>
            <a href="#signals" className="hover:text-white">Signals</a>
            <a href="#trade" className="hover:text-white">Trade</a>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <section id="hero" className="relative h-[90vh] sm:h-screen">
          <Hero />
        </section>

        <section id="galaxy" className="relative border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">Atlas Sphere — Market Intelligence + Trading</h2>
            <p className="text-white/60 text-sm md:text-base">Explore a zoomable 3D galaxy of assets. Filter by sector, chain, risk, and more. Click any bubble to open Trade Flow View with live charts, liquidity, ARPI, and routes.</p>
          </div>
          <div className="mx-auto max-w-7xl px-4">
            <FiltersPanel />
          </div>
          <div className="h-[70vh] md:h-[80vh] w-full">
            <GalaxySphere />
          </div>
        </section>
      </main>

      <TradeFlowView open={!!selectedAsset} onClose={closeTradeFlow} />
    </div>
  );
}
