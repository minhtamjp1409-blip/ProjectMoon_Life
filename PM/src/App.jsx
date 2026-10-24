import React, { useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntdApp, theme as AntdThemeLib, notification } from 'antd';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import AppRouter from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import { useThemeStore } from './store/themeStore';

// Ant Design is kept for modals, tooltips and notifications only; its tokens
// mirror the CSS variables in styles/ui/tokens.css so those surfaces match the screens.
const PALETTE = {
  dark: { primary: '#c8323a', bg: '#141110', elevated: '#1d1917', border: '#3a322e', text: '#ece8e1' },
  light: { primary: '#a8232b', bg: '#f4f1eb', elevated: '#fbf7ef', border: '#c4b7a3', text: '#1e1814' }
};

export const App = () => {
  const { themeMode, lang } = useThemeStore();
  useEffect(() => { notification.config({ maxCount: 1, duration: 3 }); }, []);

  const antTheme = useMemo(() => {
    const p = PALETTE[themeMode] || PALETTE.dark;
    return {
      algorithm: themeMode === 'dark' ? AntdThemeLib.darkAlgorithm : AntdThemeLib.defaultAlgorithm,
      token: {
        colorPrimary: p.primary,
        colorBgContainer: p.bg,
        colorBgElevated: p.elevated,
        colorBorder: p.border,
        colorBorderSecondary: p.border,
        colorText: p.text,
        borderRadius: 3,
        borderRadiusLG: 4,
        fontSize: 16,
        fontFamily: 'Archivo, system-ui, "Segoe UI", sans-serif',
        boxShadow: '0 12px 32px rgba(0,0,0,.18)'
      },
      components: {
        Modal: { titleFontSize: 17, contentBg: p.bg, headerBg: p.bg },
        Tooltip: { fontSize: 13 }
      }
    };
  }, [themeMode]);

  // Static notification calls (codex unlocks in the store) render outside this tree; give them the theme too.
  ConfigProvider.config({
    holderRender: (children) => <ConfigProvider theme={antTheme}>{children}</ConfigProvider>
  });

  return (
    <ConfigProvider theme={antTheme} locale={lang === 'en' ? enUS : viVN}>
      <AntdApp>
        <BrowserRouter>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
