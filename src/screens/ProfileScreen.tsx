import {
  Star,
  ShieldCheck,
  Phone,
  Navigation2,
  MapPin,
  Clock,
  Siren,
  Stethoscope,
  Heart,
  Calendar,
  Info,
} from 'lucide-react';
import type { Provider } from '@/types';

interface ProfileScreenProps {
  provider: Provider;
}

function verifiedLabel(daysAgo: number) {
  if (daysAgo === 0) return 'Verified today';
  if (daysAgo === 1) return 'Last verified 1 day ago';
  return `Last verified ${daysAgo} days ago`;
}

export default function ProfileScreen({ provider }: ProfileScreenProps) {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 sm:px-6 py-6">
      {/* Provider header */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
                {provider.name}
              </h1>
              {provider.verified && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Provider
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="flex items-center gap-0.5 font-semibold text-warning-600">
                <Star className="h-4 w-4 fill-warning-400 text-warning-400" />
                {provider.rating}
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500">{provider.reviews} reviews</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500">{provider.distanceKm} km away</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
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
              {provider.emergency && (
                <span className="inline-flex items-center gap-1 rounded-full bg-error-50 px-2.5 py-1 text-xs font-semibold text-error-600">
                  <Siren className="h-3 w-3" />
                  Emergency Available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-5 flex items-center gap-2.5">
          <a
            href={`tel:${provider.phone.replace(/\s/g, '')}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
          >
            <Phone className="h-5 w-5" />
            Call Clinic
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-700"
          >
            <Navigation2 className="h-5 w-5" />
            Get Directions
          </a>
        </div>
      </div>

      {/* About */}
      <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">About</h2>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">{provider.about}</p>
        <p className="mt-3 text-xs text-neutral-400">
          {provider.yearsActive} years of service · Fictional mock data for prototype
        </p>
      </div>

      {/* Address & Hours */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary-500" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">Address</h2>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">{provider.address}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary-500" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">Hours</h2>
          </div>
          <p className="mt-2.5 text-sm font-semibold text-neutral-700">{provider.hours}</p>
          <p className="mt-1 text-xs text-neutral-400">Phone: {provider.phone}</p>
        </div>
      </div>

      {/* Services */}
      <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">Services</h2>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {provider.services.map((s) => (
            <span
              key={s}
              className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Animals supported */}
      <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">Animals Supported</h2>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {provider.animals.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50/60 px-3 py-1.5 text-sm font-semibold text-primary-700"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Verification info */}
      <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">Verification</h2>
        </div>
        {provider.verified ? (
          <div className="mt-3 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-50">
              <ShieldCheck className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">Verified Provider</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-400">
                <Calendar className="h-3.5 w-3.5" />
                {verifiedLabel(provider.verifiedDaysAgo)}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warning-50">
              <Info className="h-5 w-5 text-warning-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">Verification Pending</p>
              <p className="mt-0.5 text-xs text-neutral-400">
                This provider has not yet been verified by PawCare. Please confirm details before visiting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
