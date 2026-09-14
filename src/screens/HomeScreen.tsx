import { useState } from 'react';
import {
  PawPrint,
  Search,
  Stethoscope,
  Truck,
  Siren,
  Home as HomeIcon,
  HeartHandshake,
  ArrowRight,
  FileText,
  Sparkles,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import type { ServiceCategory } from '@/types';

interface HomeScreenProps {
  onSearch: (category: ServiceCategory) => void;
  onAIReport: () => void;
}

const categories: { label: ServiceCategory; icon: typeof Stethoscope; color: string }[] = [
  { label: 'Vet', icon: Stethoscope, color: 'bg-primary-50 text-primary-600' },
  { label: 'Ambulance', icon: Truck, color: 'bg-accent-50 text-accent-600' },
  { label: 'Emergency', icon: Siren, color: 'bg-error-50 text-error-600' },
  { label: 'Boarding', icon: HomeIcon, color: 'bg-secondary-50 text-secondary-600' },
  { label: 'NGO / Rescue', icon: HeartHandshake, color: 'bg-warning-50 text-warning-700' },
];

export default function HomeScreen({ onSearch, onAIReport }: HomeScreenProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showLocations, setShowLocations] = useState(false);

  const handleSearchSubmit = () => {
    onSearch('Vet');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white">
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #147a65 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-12 sm:pt-16 sm:pb-16">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/20">
              <PawPrint className="h-7 w-7" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              PawCare
            </h1>
            <p className="mt-2 max-w-md text-lg font-medium text-neutral-500 text-balance">
              Find the right care. When they need it.
            </p>
          </div>

          {/* Location selector */}
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <button
                onClick={() => setShowLocations(!showLocations)}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-colors hover:border-primary-200"
              >
                <MapPin className="h-4 w-4 text-primary-500" />
                Delhi, India
                <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${showLocations ? 'rotate-180' : ''}`} />
              </button>
              {showLocations && (
                <div className="absolute left-1/2 top-full z-20 mt-2 w-48 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg">
                  {['Delhi, India', 'Mumbai, India', 'Bengaluru, India', 'Pune, India'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setShowLocations(false)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 ${
                        loc === 'Delhi, India' ? 'text-primary-700' : 'text-neutral-600'
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-soft">
              <Search className="ml-2 h-5 w-5 text-neutral-400" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                type="text"
                placeholder="What does your pet need?"
                className="flex-1 bg-transparent text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                onClick={handleSearchSubmit}
                className="flex items-center gap-1.5 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-400">
          Browse by category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {categories.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => onSearch(label)}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-neutral-200/80 bg-white p-4 transition-all hover:border-primary-200 hover:shadow-card-hover"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} transition-transform group-hover:scale-110`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-neutral-700">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Emergency banner */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
        <button
          onClick={() => onSearch('Emergency')}
          className="group flex w-full items-center justify-between rounded-2xl border-2 border-error-200 bg-gradient-to-r from-error-50 to-error-100/50 p-4 sm:p-5 transition-all hover:shadow-card-hover"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error-500 text-white shadow-sm">
              <Siren className="h-6 w-6 animate-pulse-soft" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-error-800">Emergency Help</h3>
              <p className="text-sm text-error-600/80">24×7 emergency vets, ambulances & rescues near you</p>
            </div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-error-500 text-white transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </div>
        </button>
      </section>

      {/* AI Report Assistant card */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12">
        <button
          onClick={onAIReport}
          className="group flex w-full flex-col gap-4 rounded-2xl border border-neutral-200/80 bg-white p-5 text-left shadow-card transition-all hover:border-primary-200 hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/20">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Understand a medical report</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Upload your pet's blood test, scan, or prescription. Our AI assistant breaks it down into simple, clear language.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700">
                <FileText className="h-4 w-4" />
                Upload report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </button>
      </section>
    </div>
  );
}
