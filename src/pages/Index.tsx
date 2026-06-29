import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import { useEffect, useState, useRef } from "react"

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return timeLeft
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)" }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }} className={className}>
      {children}
    </div>
  )
}

const WEDDING_DATE = new Date("2026-08-25T15:00:00")

const schedule = [
  { time: "15:00", title: "Сбор гостей", desc: "Приветственные напитки и фотосессия" },
  { time: "16:00", title: "Свадебная церемония", desc: "Обмен клятвами и кольцами" },
  { time: "17:30", title: "Ужин", desc: "Начало праздничного ужина" },
  { time: "19:00", title: "Празднование", desc: "Тосты, речи и первый танец" },
  { time: "20:30", title: "Свадебный торт", desc: "Церемония разрезания торта" },
  { time: "21:00", title: "Танцы", desc: "Танцы и празднование до поздней ночи" },
]

const dressCodes = [
  { color: "#FAFAFA", label: "Белый" },
  { color: "#F5E6C8", label: "Бежевый" },
  { color: "#E8D5A3", label: "Шампань" },
  { color: "#B09A7A", label: "Тауп" },
  { color: "#7B5C3E", label: "Коричневый" },
  { color: "#1A1A1A", label: "Чёрный" },
]

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE)
  const [formState, setFormState] = useState({ firstName: "", lastName: "", phone: "", attendance: "", drinks: [] as string[], drinkNotes: "", food: [] as string[], additionalWishes: "" })
  const [submitted, setSubmitted] = useState(false)

  function handleCheck(field: "drinks" | "food", value: string) {
    setFormState(s => ({
      ...s,
      [field]: s[field].includes(value) ? s[field].filter(v => v !== value) : [...s[field], value]
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-[#0d0500] text-[#f0e0c8] font-light">
      {/* HERO */}
      <div className="relative h-screen">
        <ShaderBackground>
          <Header />
          <HeroContent />
          <PulsingCircle />
        </ShaderBackground>
        <a href="#invitation" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/50 text-xs tracking-widest uppercase flex flex-col items-center gap-2 hover:text-white/80 transition-colors">
          <span>Листать вниз</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>

      {/* INVITATION */}
      <section id="invitation" className="py-24 px-6 text-center max-w-2xl mx-auto">
        <FadeSection>
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87c] mb-4 block">Приглашение</span>
          <h2 className="text-3xl md:text-4xl font-light mb-6">Дорогие семья и друзья</h2>
          <div className="w-16 h-px bg-[#c9a87c] mx-auto mb-8" />
          <div className="space-y-4 text-[#d4b896] text-sm leading-relaxed">
            <p>С сердцами, полными любви и радости, мы приглашаем вас отпраздновать наш свадебный день.</p>
            <p>После прекрасного пути вместе мы готовы начать нашу вечность как муж и жена. Ваше присутствие будет означать для нас целый мир, когда мы обменяемся клятвами и начнём эту новую главу нашей жизни.</p>
            <p className="pt-2">С любовью,<br /><em className="text-[#f0e0c8]">Екатерина и Юрий</em></p>
          </div>
        </FadeSection>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-6 bg-[#1a0d04]/60 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <FadeSection>
            <div className="flex justify-center gap-8 md:gap-16">
              {[
                { val: countdown.days, label: "Дней" },
                { val: countdown.hours, label: "Часов" },
                { val: countdown.minutes, label: "Минут" },
                { val: countdown.seconds, label: "Секунд" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl md:text-6xl font-light text-white tabular-nums">{String(val).padStart(2, "0")}</div>
                  <div className="text-xs tracking-widest uppercase text-[#c9a87c] mt-2">{label}</div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="wedding" className="py-24 px-6 max-w-2xl mx-auto">
        <FadeSection className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87c] mb-4 block">Программа</span>
          <h2 className="text-3xl md:text-4xl font-light">День свадьбы</h2>
        </FadeSection>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#c9a87c]/20 -translate-x-1/2" />
          <div className="space-y-8">
            {schedule.map((item, i) => (
              <FadeSection key={i}>
                <div className={`flex items-start gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="text-[#c9a87c] text-xs tracking-widest mb-1">{item.time}</div>
                    <h3 className="text-base font-normal text-[#f0e0c8]">{item.title}</h3>
                    <p className="text-xs text-[#a08060] mt-1">{item.desc}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#c9a87c] mt-1 flex-shrink-0 relative z-10" />
                  <div className="flex-1" />
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="py-24 px-6 bg-[#1a0d04]/40">
        <div className="max-w-4xl mx-auto">
          <FadeSection className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87c] mb-4 block">Локация</span>
            <h2 className="text-3xl md:text-4xl font-light">Место проведения</h2>
          </FadeSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <div className="overflow-hidden rounded-sm">
                <img src="https://static1-repo.aif.ru/1/7c/1828327/9922bc93477ad02c32305ab7f3323fc2.jpg" alt="BEERMAN на речке" className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </FadeSection>
            <FadeSection>
              <div className="space-y-4">
                <h3 className="text-xl tracking-widest uppercase text-[#f0e0c8]">BEERMAN на речке</h3>
                <p className="text-[#a08060] text-sm leading-relaxed">ул. Добролюбова, 2А,<br />Новосибирск</p>
                <a href="https://maps.google.com/?q=ул.+Добролюбова,+2А,+Новосибирск" target="_blank" rel="noreferrer" className="inline-block px-6 py-2 border border-[#c9a87c]/40 text-[#c9a87c] text-xs tracking-wider uppercase hover:bg-[#c9a87c]/10 transition-colors">
                  Открыть в картах
                </a>
                <p className="text-[#a08060] text-xs italic leading-relaxed pt-2">"Мы не можем дождаться, чтобы отпраздновать этот незабываемый день вместе с вами."</p>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      <section id="dresscode" className="py-24 px-6 text-center max-w-xl mx-auto">
        <FadeSection>
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87c] mb-4 block">Дресс-код</span>
          <h2 className="text-3xl md:text-4xl font-light mb-8">Дресс-код</h2>
          <p className="text-[#a08060] text-sm mb-10">Пожалуйста, выберите элегантный наряд, соответствующий праздничной атмосфере нашего торжества.</p>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            {dressCodes.map(({ color, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-white/10" style={{ backgroundColor: color }} title={label} />
                <span className="text-[10px] text-[#a08060]">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#8a6a4a]">Пожалуйста, избегайте ярких цветов</p>
        </FadeSection>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-24 px-6 bg-[#1a0d04]/40">
        <div className="max-w-xl mx-auto">
          <FadeSection className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87c] mb-4 block">Подтверждение</span>
            <h2 className="text-3xl md:text-4xl font-light">Подтвердить участие</h2>
          </FadeSection>
          <FadeSection>
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <h3 className="text-2xl font-light text-[#f0e0c8]">Спасибо!</h3>
                <p className="text-[#a08060] text-sm">Мы с нетерпением ждём встречи с вами на празднике.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-[#a08060]">Имя</label>
                    <input type="text" required value={formState.firstName} onChange={e => setFormState(s => ({ ...s, firstName: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#c9a87c]/30 pb-2 text-sm text-[#f0e0c8] outline-none focus:border-[#c9a87c] transition-colors placeholder:text-[#5a4030]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-[#a08060]">Фамилия</label>
                    <input type="text" required value={formState.lastName} onChange={e => setFormState(s => ({ ...s, lastName: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#c9a87c]/30 pb-2 text-sm text-[#f0e0c8] outline-none focus:border-[#c9a87c] transition-colors placeholder:text-[#5a4030]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase text-[#a08060]">Телефон</label>
                  <input type="tel" required value={formState.phone} onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full bg-transparent border-b border-[#c9a87c]/30 pb-2 text-sm text-[#f0e0c8] outline-none focus:border-[#c9a87c] transition-colors" />
                </div>

                <div className="space-y-3">
                  <label className="text-xs tracking-wider uppercase text-[#a08060]">Сможете ли вы присутствовать?</label>
                  {[["yes", "С удовольствием приду"], ["no", "К сожалению, не смогу"]].map(([val, text]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="attendance" value={val} required checked={formState.attendance === val} onChange={e => setFormState(s => ({ ...s, attendance: e.target.value }))} className="accent-[#c9a87c]" />
                      <span className="text-sm text-[#d4b896]">{text}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="text-xs tracking-wider uppercase text-[#a08060]">Предпочтения по напиткам</label>
                  {[["white-wine", "Белое вино"], ["red-wine", "Красное вино"], ["champagne", "Шампанское"]].map(([val, text]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formState.drinks.includes(val)} onChange={() => handleCheck("drinks", val)} className="accent-[#c9a87c]" />
                      <span className="text-sm text-[#d4b896]">{text}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase text-[#a08060]">Дополнительные пожелания по напиткам</label>
                  <textarea value={formState.drinkNotes} onChange={e => setFormState(s => ({ ...s, drinkNotes: e.target.value }))} rows={2}
                    placeholder="Любые предпочтения или ограничения..."
                    className="w-full bg-transparent border border-[#c9a87c]/20 p-3 text-sm text-[#f0e0c8] outline-none focus:border-[#c9a87c]/50 transition-colors placeholder:text-[#5a4030] resize-none" />
                </div>

                <div className="space-y-3">
                  <label className="text-xs tracking-wider uppercase text-[#a08060]">Предпочтения по еде</label>
                  {[["meat", "Мясо"], ["fish", "Рыба"], ["chicken", "Курица"]].map(([val, text]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formState.food.includes(val)} onChange={() => handleCheck("food", val)} className="accent-[#c9a87c]" />
                      <span className="text-sm text-[#d4b896]">{text}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase text-[#a08060]">Дополнительные пожелания</label>
                  <textarea value={formState.additionalWishes} onChange={e => setFormState(s => ({ ...s, additionalWishes: e.target.value }))} rows={3}
                    placeholder="Любая другая информация..."
                    className="w-full bg-transparent border border-[#c9a87c]/20 p-3 text-sm text-[#f0e0c8] outline-none focus:border-[#c9a87c]/50 transition-colors placeholder:text-[#5a4030] resize-none" />
                </div>

                <div className="pt-4 text-center">
                  <button type="submit" className="px-12 py-3 border border-[#c9a87c]/50 text-[#c9a87c] text-xs tracking-widest uppercase hover:bg-[#c9a87c]/10 transition-colors">
                    Отправить ответ
                  </button>
                </div>
              </form>
            )}
          </FadeSection>
        </div>
      </section>

      {/* FINAL */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden bg-[#0d0500]">
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-3xl font-light text-white">Екатерина и Юрий</h2>
          <div className="w-16 h-px bg-[#c9a87c] mx-auto" />
          <p className="text-[#a08060] text-xs tracking-widest">Спасибо, что разделяете с нами этот особенный день.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-[#c9a87c]/10">
        <p className="text-xs tracking-widest text-[#5a4030] uppercase">25 августа 2026</p>
      </footer>

      {/* MOBILE STICKY */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-gradient-to-t from-[#0d0500] to-transparent">
        <a href="#rsvp" className="block w-full text-center py-3 border border-[#c9a87c]/50 text-[#c9a87c] text-xs tracking-widest uppercase hover:bg-[#c9a87c]/10 transition-colors">
          Подтвердить участие
        </a>
      </div>
    </div>
  )
}