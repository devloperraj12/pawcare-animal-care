import { Star, ShieldCheck, Phone, Navigation2, MapPin, Clock } from 'lucide-react';
import type { Provider } from '@/types';

interface ProviderCardProps {
  provider: Provider;
  onSelect: () => void;
}

function verifiedLabel(daysAgo: number) {
  if (daysAgo === 0) return 'Verified today';
  if (daysAgo === 1) return 'Verified 1 day ago';
  return `Verified ${daysAgo} days ago`;
}

export default function ProviderCard({ provider, onSelect }: ProviderCardProps) {
  const isEmergency = provider.emergency;

  return (
    <button
      onClick={onSelect}
      className="group w-full rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5 text-left shadow-card transition-all hover:border-primary-200 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
              {provider.name}
            </h3>
            {provider.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-0.5 font-semibold text-warning-600">
              <Star className="h-4 w-4 fill-warning-400 text-warning-400" />
              {provider.rating}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500">{provider.reviews} reviews</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500">{provider.distanceKm} km</span>
          </div>

          <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {provider.area}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              provider.openNow
                ? 'bg-success-50 text-success-700'
                : 'bg-neutral-100 text-neutral-500'
            }`}
          >
            <Clock className="h-3 w-3" />
            {provider.openNow ? 'Open Now' : 'Closed'}
          </span>
          {isEmergency && (
            <span className="inline-flex items-center gap-1 rounded-full bg-error-50 px-2.5 py-1 text-xs font-semibold text-error-600">
              Emergency
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {provider.services.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
          >
            {s}
          </span>
        ))}
        {provider.services.length > 3 && (
          <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500">
            +{provider.services.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
        {provider.verified ? (
          <>
            <ShieldCheck className="h-3.5 w-3.5 text-primary-400" />
            <span>{verifiedLabel(provider.verifiedDaysAgo)}</span>
          </>
        ) : (
          <span className="text-warning-600">Verification pending</span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={`tel:${provider.phone.replace(/\s/g, '')}`}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700"
        >
          <Navigation2 className="h-4 w-4" />
          Directions
        </a>
      </div>
    </button>
  );
}
