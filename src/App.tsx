import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import HomeScreen from '@/screens/HomeScreen';
import SearchScreen from '@/screens/SearchScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import AIReportScreen from '@/screens/AIReportScreen';
import type { ScreenName, ServiceCategory, Provider } from '@/types';

function App() {
  const [screen, setScreen] = useState<ScreenName>('home');
  const [searchCategory, setSearchCategory] = useState<ServiceCategory>('Vet');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const goHome = useCallback(() => setScreen('home'), []);

  const handleSearch = useCallback((category: ServiceCategory) => {
    setSearchCategory(category);
    setScreen('search');
  }, []);

  const handleSelectProvider = useCallback((provider: Provider) => {
    setSelectedProvider(provider);
    setScreen('profile');
  }, []);

  const handleBack = useCallback(() => {
    if (screen === 'profile') setScreen('search');
    else if (screen === 'search' || screen === 'ai-report') setScreen('home');
  }, [screen]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header
        showBack={screen !== 'home'}
        onBack={handleBack}
        showLogo={screen === 'home' || screen === 'ai-report'}
      />

      <main>
        {screen === 'home' && <HomeScreen onSearch={handleSearch} onAIReport={() => setScreen('ai-report')} />}
        {screen === 'search' && (
          <SearchScreen category={searchCategory} onSelectProvider={handleSelectProvider} />
        )}
        {screen === 'profile' && selectedProvider && <ProfileScreen provider={selectedProvider} />}
        {screen === 'ai-report' && <AIReportScreen />}
      </main>

      {/* Footer */}
      {screen === 'home' && (
        <footer className="border-t border-neutral-200/70 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
            <p className="text-center text-xs text-neutral-400">
              PawCare is a conceptual prototype. All provider data is fictional and for demonstration purposes only.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
