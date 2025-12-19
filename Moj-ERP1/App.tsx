
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Philosophy from './components/Philosophy';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import NeonVault from './pages/NeonVault';
import SecureHub from './pages/SecureHub';
import AuraSkincare from './pages/AuraSkincare';
import Registration from './pages/Registration';
import SecureHubProfile from './pages/SecureHubProfile';
import SecureHubOnboarding from './pages/SecureHubOnboarding';
import SecureHubResults from './pages/SecureHubResults';
import SecureHubCheckout from './pages/SecureHubCheckout';
import SecureHubPayment from './pages/SecureHubPayment';
import SecureHubSuccess from './pages/SecureHubSuccess';

type ViewState = 
  | 'portfolio' 
  | 'neon-vault' 
  | 'secure-hub' 
  | 'aura-skincare' 
  | 'secure-hub-registration' 
  | 'secure-hub-profile' 
  | 'secure-hub-onboarding' 
  | 'secure-hub-results'
  | 'secure-hub-checkout'
  | 'secure-hub-payment'
  | 'secure-hub-success';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('portfolio');
  const [selectedOffer, setSelectedOffer] = useState<{name: string, totalPrice: number} | null>(null);

  useEffect(() => {
    if (currentView === 'portfolio') {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (!targetId || targetId === '#') return;
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'neon-vault':
        return <NeonVault onBack={() => setCurrentView('portfolio')} />;
      case 'secure-hub':
        return (
          <SecureHub 
            onBack={() => setCurrentView('portfolio')} 
            onStart={() => setCurrentView('secure-hub-registration')}
          />
        );
      case 'secure-hub-registration':
        return (
          <Registration 
            onBack={() => setCurrentView('secure-hub')} 
            onSuccess={() => setCurrentView('secure-hub-profile')}
          />
        );
      case 'secure-hub-profile':
        return (
          <SecureHubProfile 
            onBack={() => setCurrentView('secure-hub-registration')} 
            onComplete={() => setCurrentView('secure-hub-onboarding')}
          />
        );
      case 'secure-hub-onboarding':
        return (
          <SecureHubOnboarding 
            onBack={() => setCurrentView('secure-hub-profile')} 
            onFinish={() => setCurrentView('secure-hub-results')}
          />
        );
      case 'secure-hub-results':
        return (
          <SecureHubResults 
            onBack={() => setCurrentView('secure-hub-onboarding')} 
            onSelect={(offer) => {
              setSelectedOffer(offer);
              setCurrentView('secure-hub-checkout');
            }}
          />
        );
      case 'secure-hub-checkout':
        return (
          <SecureHubCheckout 
            offer={selectedOffer!}
            onBack={() => setCurrentView('secure-hub-results')}
            onComplete={() => setCurrentView('secure-hub-payment')}
          />
        );
      case 'secure-hub-payment':
        return (
          <SecureHubPayment 
            offer={selectedOffer!}
            onBack={() => setCurrentView('secure-hub-checkout')}
            onSuccess={() => setCurrentView('secure-hub-success')}
          />
        );
      case 'secure-hub-success':
        return (
          <SecureHubSuccess 
            offer={selectedOffer!}
            onFinish={() => setCurrentView('secure-hub')}
          />
        );
      case 'aura-skincare':
        return <AuraSkincare onBack={() => setCurrentView('portfolio')} />;
      default:
        return (
          <div className="relative min-h-screen bg-[#030303] text-white selection:bg-white/20">
            <Navbar />
            <main>
              <Hero />
              <BentoGrid onProjectClick={(id) => {
                if (id === '1') setCurrentView('neon-vault');
                if (id === '6') setCurrentView('secure-hub');
                if (id === '2') setCurrentView('aura-skincare');
              }} />
              <Philosophy />
              <SocialProof />
            </main>
            <Footer />
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full" />
          </div>
        );
    }
  };

  return (
    <>
      <CustomCursor />
      {renderView()}
    </>
  );
}

export default App;
