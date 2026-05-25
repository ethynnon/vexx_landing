import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Country {
  code: string;
  name: string;
  status: "active" | "soon";
}

export interface Region {
  id: string;
  label: string;
  countries: Country[];
}

interface ServerLocationsProps {
  subtitle?: string;
  title?: string;
  description: string;
  regions: Region[];
}

export function ServerLocations({
  subtitle,
  title,
  description,
  regions,
}: ServerLocationsProps) {
  const [openRegionId, setOpenRegionId] = useState<string | null>("europe");

  const toggleRegion = (id: string) => {
    setOpenRegionId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto font-sans antialiased">
      {(title || subtitle) && (
        <div className="text-center mb-12 space-y-4">
          {subtitle && (
            <div className="inline-flex items-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-sm mb-2">
               <GlobeIcon className="size-4 text-[var(--color-accent)] mr-2" />
               {subtitle}
            </div>
          )}
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              {title}
            </h2>
          )}
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
             {description}
          </p>
        </div>
      )}

      <div className="rounded-3xl border border-[var(--color-text-secondary)]/20 bg-[#171616] overflow-hidden">
        <div className="divide-y divide-[var(--color-text-secondary)]/10">
          {regions.map((region) => (
            <RegionRow
              key={region.id}
              region={region}
              isOpen={openRegionId === region.id}
              onToggle={() => toggleRegion(region.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionRow({
  region,
  isOpen,
  onToggle,
}: {
  region: Region;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const visible = region.countries.slice(0, 8);
  const hidden = region.countries.slice(8);

  return (
    <div
      className={cn(
        'transition-colors duration-200',
        isOpen ? 'bg-[var(--color-surface)]/40' : 'hover:bg-[var(--color-surface)]/20',
      )}
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="flex items-center justify-between md:block md:w-40 flex-shrink-0 pt-0.5 cursor-pointer" onClick={onToggle}>
          <span className="text-sm font-bold tracking-widest uppercase text-[var(--color-text-secondary)]">
            {region.label}
          </span>
          {hidden.length > 0 && (
            <button
              className={cn(
                'md:hidden flex items-center gap-1.5 text-xs font-medium transition-colors duration-200',
                isOpen ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              )}
            >
              <span>{isOpen ? 'Меньше' : 'Больше'}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="text-base leading-none"
              >
                +
              </motion.span>
            </button>
          )}
        </div>

        <div className="flex-grow">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visible.map((country) => (
              <CountryItem key={country.code} country={country} />
            ))}
          </ul>

          <AnimatePresence>
            {isOpen && hidden.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {hidden.map((country) => (
                    <CountryItem key={country.code} country={country} />
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hidden.length > 0 && (
          <div className="hidden md:flex md:w-24 justify-end flex-shrink-0 pt-0.5">
            <button
              onClick={onToggle}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium transition-colors duration-200',
                isOpen ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              )}
            >
              <span>{isOpen ? 'Скрыть' : 'Все'}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="text-base leading-none"
              >
                +
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CountryItem({ country }: { country: Country }) {
  return (
    <li className="group/item flex items-center gap-4 px-4 py-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-text-secondary)]/10 hover:border-[var(--color-accent)]/50 transition-all duration-200 cursor-default shadow-sm">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-white/10">
        <img
          src={`https://flagcdn.com/${country.code}.svg`}
          alt={country.name}
          loading="lazy"
          className={cn("w-full h-full object-cover", country.status === "soon" && "grayscale opacity-50")}
        />
      </div>
      <div className="flex flex-col">
        <span className={cn("text-sm font-semibold truncate transition-colors", country.status === "soon" ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-primary)]")}>
          {country.name}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          {country.status === "active" ? (
             <>
               <span className="relative flex h-1.5 w-1.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
               </span>
               <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold">Работает</span>
             </>
          ) : (
             <>
               <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-text-secondary)]/50"></span>
               <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Скоро</span>
             </>
          )}
        </div>
      </div>
    </li>
  );
}
