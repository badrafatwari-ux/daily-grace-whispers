import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showNav?: boolean;
}

export function PageLayout({ children, title, showNav = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background safe-area-top">
      {title && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-lg mx-auto px-4 py-4">
            <h1 className="text-lg font-semibold text-center text-foreground">{title}</h1>
          </div>
        </header>
      )}
      
      <main className="max-w-lg mx-auto px-4 pb-24 page-transition">
        {children}
      </main>

      {showNav && <BottomNavigation />}
    </div>
  );
}
