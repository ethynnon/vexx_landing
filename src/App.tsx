import { SparklesCore } from './components/ui/sparkles';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { BorderTrail } from './components/ui/border-trail';
import { PlusIcon, ShieldCheckIcon, ZapIcon, GlobeIcon, ChevronRightIcon, NetworkIcon, PlayIcon, Gamepad2Icon, ChevronDownIcon, BriefcaseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaSpotify, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import { SiOpenai, SiGoogle, SiDiscord, SiNetflix, SiTiktok, SiAnthropic } from 'react-icons/si';
import { BsStars } from 'react-icons/bs';
import { Navbar } from './components/ui/navbar';
import { ServerLocations, type Region } from './components/ui/server-locations';
import { GlowyWavesBackground } from './components/ui/glowy-waves-hero';
import { TextScramble } from './components/ui/text-scramble';
import { siteContent } from '@/content';
import { HoverSlider, HoverSliderImageWrap, HoverSliderImage, TextStaggerHover, useHoverSliderContext } from './components/ui/animated-slideshow';
import { BentoGrid, type BentoItem } from './components/ui/bento-grid';

// Helper to wrap specific keywords with TextScramble
const renderWithScramble = (text: string) => {
  const keywords = ['шифрованием', 'шифрование', 'защиту', 'безопасность'];
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (keywords.includes(part.toLowerCase())) {
      return <TextScramble key={i} as="span" className="font-bold text-[var(--color-accent)]">{part}</TextScramble>;
    }
    return part;
  });
};

const regionsData: Region[] = [
  {
    id: "europe",
    label: "Европа",
    countries: [
      { code: "de", name: "Германия", status: "active" },
      { code: "se", name: "Швеция", status: "active" },
      { code: "fi", name: "Финляндия", status: "soon" },
    ]
  },
  {
    id: "other",
    label: "Остальные",
    countries: [
      { code: "us", name: "США", status: "soon" },
      { code: "ru", name: "РФ", status: "soon" },
    ]
  }
];

const PricingCard = ({ 
  title, 
  description, 
  features, 
  traffic, 
  devices, 
  oldPrice, 
  price, 
  isPopular 
}: any) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl ${isPopular ? 'border border-[var(--color-accent)] bg-black/40' : ''}`}>
      {isPopular && (
        <BorderTrail
          style={{
            boxShadow: '0px 0px 60px 30px rgba(200, 56, 90, 0.3), 0 0 100px 60px rgba(200, 56, 90, 0.2), 0 0 140px 90px rgba(200, 56, 90, 0.1)',
          }}
          size={100}
        />
      )}

      <div className="w-full flex-1 flex flex-col">
        <div className="space-y-1 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="leading-none font-bold text-2xl">{title}</h3>
            {isPopular && <Badge>Популярный</Badge>}
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm mt-2">{description}</p>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <ShieldCheckIcon className="size-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
          <li className="flex items-start gap-2 text-sm mt-4 pt-4 border-t border-[var(--color-text-secondary)]/20">
            <span className="font-semibold">{traffic}</span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="font-semibold">{devices}</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
            Сброс раз в 30 дней
          </li>
        </ul>

        <div className="mt-auto space-y-4 pt-6 border-t border-[var(--color-text-secondary)]/20">
          <div className="flex items-center gap-x-2">
            <span className="text-[var(--color-text-secondary)] text-sm line-through">{oldPrice} ₽</span>
            <Badge variant="secondary">-5%</Badge>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tighter">
              {price}
            </span>
            <span className="text-[var(--color-text-secondary)] text-lg mb-1">₽ / мес</span>
          </div>
          
          <div className="pt-4">
            {isPopular ? (
              <Button variant="default" className="w-full h-12 text-md" onClick={() => window.location.href = siteContent.header.ctaLink}>
                {siteContent.pricing.ctaButton}
              </Button>
            ) : (
              <Button variant="outline" className="relative w-full h-12 text-md font-bold overflow-hidden group border-[var(--color-text-secondary)]/20 hover:border-[var(--color-accent)]/50 transition-colors" onClick={() => window.location.href = siteContent.header.ctaLink}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={200}
                    className="w-full h-full"
                    particleColor="#C8385A"
                  />
                </div>
                <span className="relative z-10">{siteContent.pricing.ctaButton}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[var(--color-text-secondary)]/20 rounded-2xl bg-[#171616] overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDownIcon className="size-5 text-[var(--color-text-secondary)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-[var(--color-text-secondary)] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SliderTabs = () => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  return (
    <div className="space-y-6">
      {siteContent.dashboardShowcase.items.map((item, idx) => {
        const isActive = activeSlide === idx;
        return (
          <div 
            key={idx} 
            className="group relative pl-6 border-l-2 cursor-pointer transition-all duration-300 py-2"
            style={{ borderColor: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)' }}
            onMouseEnter={() => changeSlide(idx)}
            onClick={() => changeSlide(idx)}
          >
            {/* Glow indicator */}
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-accent)] shadow-[0_0_15px_var(--color-accent)]" />
            )}
            <h3 className="text-xl font-bold leading-none mb-2">
              <TextStaggerHover text={item.title} index={idx} />
            </h3>
            <motion.p 
              initial={false}
              animate={{ 
                height: isActive ? "auto" : 0, 
                opacity: isActive ? 1 : 0.4,
                marginTop: isActive ? 8 : 0 
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-[var(--color-text-secondary)] text-sm leading-relaxed overflow-hidden"
            >
              {item.description}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "GlobeIcon": return <GlobeIcon className="text-[var(--color-accent)] size-6" />;
      case "ZapIcon": return <ZapIcon className="text-[var(--color-accent)] size-6" />;
      case "NetworkIcon": return <NetworkIcon className="text-[var(--color-accent)] size-6" />;
      default: return <ShieldCheckIcon className="text-[var(--color-accent)] size-6" />;
    }
  };


  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white bg-[var(--color-background)]">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
          
          {/* Glowy Waves Canvas (background) */}
          <GlowyWavesBackground className="z-0" />

          {/* Blurred Background Icons (10 items) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
             <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] text-[var(--color-text-secondary)] opacity-20 blur-[2px]"><SiOpenai size={80} /></motion.div>
             <motion.div animate={{ y: [0, 25, 0], x: [0, -15, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[60%] left-[15%] text-[var(--color-accent)] opacity-10 blur-[4px]"><BsStars size={120} /></motion.div>
             <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[25%] right-[10%] text-[var(--color-text-secondary)] opacity-20 blur-[3px]"><FaTelegramPlane size={90} /></motion.div>
             <motion.div animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[65%] right-[15%] text-[var(--color-accent)] opacity-15 blur-[5px]"><FaYoutube size={140} /></motion.div>
             <motion.div animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[10%] left-[40%] text-[var(--color-text-secondary)] opacity-10 blur-[2px]"><FaSpotify size={70} /></motion.div>
             <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute top-[80%] left-[45%] text-[var(--color-accent)] opacity-15 blur-[3px]"><SiNetflix size={90} /></motion.div>
             <motion.div animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute top-[15%] right-[30%] text-[var(--color-text-secondary)] opacity-15 blur-[4px]"><SiAnthropic size={100} /></motion.div>
             <motion.div animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-[75%] right-[35%] text-[var(--color-text-secondary)] opacity-20 blur-[2px]"><SiDiscord size={75} /></motion.div>
             <motion.div animate={{ y: [0, -20, 0], x: [0, 20, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 5.9, repeat: Infinity, ease: "easeInOut", delay: 1.8 }} className="absolute top-[40%] left-[5%] text-[var(--color-accent)] opacity-10 blur-[3px]"><SiTiktok size={85} /></motion.div>
             <motion.div animate={{ y: [0, 25, 0], x: [0, -25, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 7.1, repeat: Infinity, ease: "easeInOut", delay: 3.5 }} className="absolute top-[45%] right-[5%] text-[var(--color-text-secondary)] opacity-15 blur-[4px]"><SiGoogle size={110} /></motion.div>
          </div>

          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <div className="inline-flex items-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-sm mb-6">
                <span className="flex size-2 rounded-full bg-[var(--color-accent)] animate-pulse mr-2"></span>
                {siteContent.hero.badge}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl mx-auto leading-tight relative z-20">
                {siteContent.hero.titlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#f45c7e]">{siteContent.hero.titlePart2}</span> {siteContent.hero.subtitle}
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 relative z-20">
                {siteContent.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(200,56,90,0.2)] hover:shadow-[0_0_30px_rgba(200,56,90,0.5)] hover:scale-[1.02]" 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {siteContent.hero.ctaButton} <ChevronRightIcon className="ml-2 size-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="relative h-14 px-8 text-lg rounded-full font-bold overflow-hidden group border-white/20 hover:border-[var(--color-accent)]/50 transition-all duration-300 hover:scale-[1.02]" 
                  onClick={() => window.location.href = siteContent.header.ctaLink}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <SparklesCore
                      background="transparent"
                      minSize={0.4}
                      maxSize={1}
                      particleDensity={200}
                      className="w-full h-full"
                      particleColor="#C8385A"
                    />
                  </div>
                  <span className="relative z-10">{siteContent.hero.ctaTestButton}</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[var(--color-background)] relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{siteContent.features.title}</h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">{siteContent.features.description}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {siteContent.features.items.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-[#171616] p-8 rounded-2xl border border-[var(--color-text-secondary)]/10 hover:border-[var(--color-accent)]/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[var(--color-accent)]/10 group-hover:bg-[var(--color-accent)]/20 transition-colors rounded-xl flex items-center justify-center mb-6">
                      {getFeatureIcon(item.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 relative z-10 overflow-hidden bg-black/50">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{siteContent.useCases.title}</h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">{renderWithScramble(siteContent.useCases.description)}</p>
            </div>



            {/* Bento Grid Cards */}
            <div className="max-w-5xl mx-auto">
              <BentoGrid items={([
                {
                  title: siteContent.useCases.items[0].title,
                  description: siteContent.useCases.items[0].description,
                  icon: <PlayIcon className="w-4 h-4 text-red-400" />,
                  status: 'CDN-доступ',
                  tags: ['Глобальный CDN', 'API', 'Высокая скорость'],
                  cta: 'Подключайся',
                  colSpan: 2,
                  hasPersistentHover: false,
                  accentColor: "#ef4444",
                  glowColor: "rgba(239, 68, 68, 0.15)",
                  onClick: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }),
                },
                {
                  title: siteContent.useCases.items[1].title,
                  description: siteContent.useCases.items[1].description,
                  icon: <Gamepad2Icon className="w-4 h-4 text-purple-400" />,
                  status: 'Оптимальный Ping',
                  tags: ['Низкий Ping', 'VoIP', 'Без лагов'],
                  cta: 'Пробуй',
                  hasPersistentHover: true,
                  accentColor: "#a855f7",
                  glowColor: "rgba(168, 85, 247, 0.15)",
                  onClick: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }),
                },
                {
                  title: siteContent.useCases.items[2].title,
                  description: siteContent.useCases.items[2].description,
                  icon: <ShieldCheckIcon className="w-4 h-4 text-cyan-400" />,
                  status: 'Безопасность',
                  tags: ['Шифрование', 'Secure Tunnel'],
                  cta: 'Узнай больше',
                  hasPersistentHover: false,
                  accentColor: "#06b6d4",
                  glowColor: "rgba(6, 182, 212, 0.15)",
                  onClick: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }),
                },
                {
                  title: 'Стабильный доступ для удаленной работы (Remote Work)',
                  description: 'Надежное шифрование данных и гарантированная скорость для стабильного подключения к зарубежным репозиториям, CRM-системам, SaaS-платформам и корпоративным инструментам без сбоев.',
                  icon: <BriefcaseIcon className="w-4 h-4 text-amber-400" />,
                  status: 'Удаленка',
                  tags: ['SaaS', 'API', 'Высокий Uptime'],
                  cta: 'Начинай работу',
                  colSpan: 2,
                  hasPersistentHover: false,
                  accentColor: "#fbbf24",
                  glowColor: "rgba(251, 191, 36, 0.15)",
                  onClick: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }),
                },
              ] as BentoItem[])}
              />
            </div>
          </div>
        </section>

        {/* Dashboard Showcase Section */}
        <section className="py-24 bg-gradient-to-b from-[#111] to-[#0a0a0a] border-t border-white/5 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{siteContent.dashboardShowcase.title}</h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">{siteContent.dashboardShowcase.description}</p>
            </div>
            
            {/* Interactive Hover Slider */}
            <HoverSlider className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Tabs */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <SliderTabs />
              </div>
              
              {/* Right Column: Custom Phone Mockup Images Directly */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center relative group w-full">
                {/* Glow Effect behind the phone */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-accent)]/25 to-[#f45c7e]/15 rounded-[32px] blur-3xl opacity-50 pointer-events-none group-hover:opacity-75 transition duration-1000" />
                
                {/* Image Container with custom aspect-ratio and user mockup sizes */}
                <div className="relative w-full max-w-[340px] aspect-[1300/2642] z-10 filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.01]">
                  <HoverSliderImageWrap className="w-full h-full relative z-10 overflow-hidden rounded-2xl">
                    {siteContent.dashboardShowcase.items.map((item, idx) => (
                      <HoverSliderImage 
                        key={idx}
                        index={idx}
                        imageUrl={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                    ))}
                  </HoverSliderImageWrap>
                </div>
              </div>
            </HoverSlider>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 relative z-10">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{siteContent.pricing.title}</h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">{siteContent.pricing.description}</p>
            </div>
            
            <div className="relative mx-auto max-w-6xl rounded-3xl border border-[var(--color-text-secondary)]/20 bg-[#171616] p-8 overflow-hidden">
              <div
                className="z-0 pointer-events-none absolute inset-0 size-full opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              
              <PlusIcon className="absolute -top-3 -left-3 size-6 text-[var(--color-text-secondary)]/30" />
              <PlusIcon className="absolute -top-3 -right-3 size-6 text-[var(--color-text-secondary)]/30" />
              <PlusIcon className="absolute -bottom-3 -left-3 size-6 text-[var(--color-text-secondary)]/30" />
              <PlusIcon className="absolute -bottom-3 -right-3 size-6 text-[var(--color-text-secondary)]/30" />

              <div className="relative z-10 grid md:grid-cols-3 gap-6 md:gap-2">
                {siteContent.pricing.plans.map((plan, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                    <PricingCard
                      title={plan.title}
                      description={plan.description}
                      features={plan.features}
                      traffic={plan.traffic}
                      devices={plan.devices}
                      oldPrice={plan.oldPrice}
                      price={plan.price}
                      isPopular={plan.isPopular}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 text-center text-[var(--color-text-secondary)] text-sm flex items-center justify-center gap-2">
              <ShieldCheckIcon className="size-4 text-emerald-500" />
              <span>{siteContent.pricing.secureNote}</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-[var(--color-background)] relative z-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{siteContent.faq.title}</h2>
            </div>
            <div>
              {siteContent.faq.items.map((item, idx) => (
                <FaqItem key={idx} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations" className="py-24 relative z-10">
          <ServerLocations
            subtitle={siteContent.locations.subtitle}
            title={siteContent.locations.title}
            description={siteContent.locations.description}
            regions={regionsData}
          />
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--color-text-secondary)]/20 py-12 bg-[#171616] relative z-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div style={{ fontFamily: '"Dela Gothic One", sans-serif', fontSize: '1.2rem', lineHeight: 1 }}>
                <span className="text-[#c9c6c1]">{siteContent.header.logoTextPart1}</span><span className="text-[var(--color-accent)]">{siteContent.header.logoTextPart2}</span>
              </div>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm">
              © {new Date().getFullYear()} {siteContent.footer.copyright}
            </p>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              {siteContent.footer.links.map((link, idx) => (
                <a key={idx} href={link.href} className="hover:text-[var(--color-accent)] transition">{link.label}</a>
              ))}
              <a href={`mailto:${siteContent.footer.supportEmail}`} className="hover:text-[var(--color-accent)] transition">{siteContent.footer.supportEmail}</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
