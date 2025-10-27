import Spline from '@splinetool/react-spline';
import { Rocket, Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/N8g2VNcx8Rycz93J/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />

      <div className="relative h-full w-full flex items-center">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
              Fulo Atlas Sphere
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Market intelligence + trading UI</span>
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg">
              A zoomable 3D galaxy of crypto markets. Signals, heatmaps, and one-click routing. Mobile-first and ARPI-aware.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#galaxy" className="inline-flex items-center gap-2 rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition pointer-events-auto">
                <Rocket className="size-4" />
                Launch Atlas
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10 transition pointer-events-auto">
                <Play className="size-4" />
                Watch demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
