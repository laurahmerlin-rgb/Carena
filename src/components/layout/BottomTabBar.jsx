import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, FlaskConical, BookOpen } from 'lucide-react';
import { useTabNavigation } from '@/contexts/TabNavigationContext';

const TABS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Camera, label: 'Scan', path: '/scan' },
  { icon: FlaskConical, label: 'Routine', path: '/routine' },
  { icon: BookOpen, label: 'Glossary', path: '/glossary' },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { switchTab, resetTab, getLastPathForTab } = useTabNavigation();

  const currentTab = TABS.find(t =>
    location.pathname === t.path ||
    (t.path !== '/' && location.pathname.startsWith(t.path))
  ) || TABS[0];

  const handleTabPress = (tab) => {
    if (currentTab.path === tab.path) {
      resetTab(tab.path);
      navigate(tab.path);
    } else {
      switchTab(tab.path);
      const lastPath = getLastPathForTab(tab.path);
      navigate(lastPath);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {TABS.map(({ icon: Icon, label, path }) => {
        const active = currentTab.path === path;
        return (
          <button
            key={path}
            onClick={() => handleTabPress({ icon: Icon, label, path })}
            aria-label={label}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 min-h-[56px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
              active ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}