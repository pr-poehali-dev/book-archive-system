export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-11 p-6">
      <div className="flex justify-between items-center">
        <div className="text-white text-sm tracking-widest font-light">Е & Ю</div>
        <nav className="hidden md:flex gap-8">
          <a href="#story" className="text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-wider uppercase">История</a>
          <a href="#wedding" className="text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-wider uppercase">День свадьбы</a>
          <a href="#venue" className="text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-wider uppercase">Место</a>
          <a href="#rsvp" className="text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-wider uppercase">Участие</a>
        </nav>
      </div>
    </header>
  )
}