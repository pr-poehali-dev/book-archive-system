export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">25 августа 2026</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic">Екатерина</span>
          <br />
          <span className="font-light tracking-tight text-white/60 text-3xl">&</span>
          <br />
          <span className="font-medium italic">Юрий</span>
        </h1>

        {/* Description */}
        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          Мы женимся. С радостью приглашаем вас разделить с нами этот особенный день,<br />
          наполненный любовью, теплом и счастьем.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <a href="#wedding" className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            Программа дня
          </a>
          <a href="#rsvp" className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Подтвердить участие
          </a>
        </div>
      </div>
    </main>
  )
}