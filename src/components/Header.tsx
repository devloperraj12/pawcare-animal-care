import { PawPrint, ChevronLeft, MapPin } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
}

export default function Header({ showBack, onBack, showLogo = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5" />
                Back
              </button>
            ) : (
              showLogo && (
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white shadow-sm">
                    <PawPrint className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold tracking-tight text-neutral-900">PawCare</span>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-600">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span>Delhi, India</span>
          </div>
        </div>
      </div>
    </header>
  );
}
