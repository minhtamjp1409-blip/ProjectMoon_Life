import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntdApp, theme as AntdThemeLib } from 'antd';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import AppRouter from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import { useThemeStore } from './store/themeStore';

// Ant Design is kept for modals, tooltips and notifications only; its tokens
// mirror the CSS variables in index.css so those surfaces match the screens.
const PALETTE = {
  dark: { primary: '#c9a24b', bg: '#121419', elevated: '#191c23', border: '#252832', text: '#eeede9' },
  light: { primary: '#a87f22', bg: '#ffffff', elevated: '#ffffff', border: '#e4e1d9', text: '#17171a' }
};

export const App = () => {
  const { themeMode, lang } = useThemeStore();

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
        borderRadius: 6,
        borderRadiusLG: 8,
        fontSize: 16,
        fontFamily: '"Be Vietnam Pro", system-ui, "Segoe UI", sans-serif',
        boxShadow: '0 12px 28px rgba(0,0,0,.28)'
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
