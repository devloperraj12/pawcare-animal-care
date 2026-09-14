import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import type { ServiceCategory, Provider } from '@/types';
import { providers } from '@/data';
import ProviderCard from '@/components/ProviderCard';

interface SearchScreenProps {
  category: ServiceCategory;
  onSelectProvider: (provider: Provider) => void;
}

export default function SearchScreen({ category, onSelectProvider }: SearchScreenProps) {
  const [filters, setFilters] = useState({
    openNow: false,
    within5km: false,
    emergency: false,
  });

  const heading = category === 'NGO / Rescue' ? 'Find an NGO / Rescue' : `Find a ${category}`;

  const filteredProviders = useMemo(() => {
    let result = providers.filter((p) => {
      if (category === 'Vet') return p.type === 'Vet';
      if (category === 'Ambulance') return p.type === 'Ambulance';
      if (category === 'Emergency') return p.emergency;
      if (category === 'Boarding') return p.type === 'Boarding';
      if (category === 'NGO / Rescue') return p.type === 'NGO / Rescue';
      return true;
    });

    if (filters.openNow) result = result.filter((p) => p.openNow);
    if (filters.within5km) result = result.filter((p) => p.distanceKm <= 5);
    if (filters.emergency) result = result.filter((p) => p.emergency);

    // Emergency providers prioritized
    result = [...result].sort((a, b) => {
      if (category === 'Emergency') {
        if (a.isEmergencyPriority && !b.isEmergencyPriority) return -1;
        if (!a.isEmergencyPriority && b.isEmergencyPriority) return 1;
      }
      return a.distanceKm - b.distanceKm;
    });

    return result;
  }, [category, filters]);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="animate-fade-in mx-auto max-w-5xl px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">{heading}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">Dog</span>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
              {category === 'Vet' ? 'Veterinary' : category}
            </span>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">Delhi</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-primary-600">{filteredProviders.length}</span>
          <p className="text-xs font-medium text-neutral-400">results</p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-400">
          <SlidersHorizontal className="h-4 w-4" />
          Filters:
        </div>
        {([
          { key: 'openNow', label: 'Open Now' },
          { key: 'within5km', label: 'Within 5 km' },
          { key: 'emergency', label: 'Emergency' },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
              filters[key]
                ? 'bg-primary-500 text-white shadow-sm'
                : 'border border-neutral-200 bg-white text-neutral-600 hover:border-primary-200'
            }`}
          >
            {filters[key] && <X className="h-3.5 w-3.5" />}
            {label}
          </button>
        ))}
        {activeFilterCount > 0 && (
          <button
            onClick={() => setFilters({ openNow: false, within5km: false, emergency: false })}
            className="text-sm font-medium text-neutral-400 hover:text-error-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results */}
      <div className="mt-5 space-y-3">
        {filteredProviders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white py-16">
            <Filter className="h-10 w-10 text-neutral-300" />
            <p className="mt-3 text-sm font-medium text-neutral-400">No providers match these filters.</p>
            <button
              onClick={() => setFilters({ openNow: false, within5km: false, emergency: false })}
              className="mt-2 text-sm font-semibold text-primary-600"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} onSelect={() => onSelectProvider(provider)} />
          ))
        )}
      </div>

      {/* Mock data notice */}
      <p className="mt-6 text-center text-xs text-neutral-300">
        Providers shown are fictional mock data for prototype purposes.
      </p>
    </div>
  );
}
