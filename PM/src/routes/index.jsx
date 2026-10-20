import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ChroniclePage from '../features/chronicle/ChroniclePage';
import { useT } from '../i18n';

// The chronicle is the landing screen; the archive pages load when first opened.
const WeaverAiPage = lazy(() => import('../features/weaver-ai/WeaverAiPage'));
const GlossaryPage = lazy(() => import('../features/glossary/GlossaryPage'));
const BloodlinePage = lazy(() => import('../features/bloodline/BloodlinePage'));
const CodexPage = lazy(() => import('../features/codex/CodexPage'));

const PageLoading = () => { const { t } = useT(); return <div className="page-loading" aria-busy="true" role="status">{t('Đang mở hồ sơ…', 'Opening the archive…')}</div>; };

export const AppRouter = () => {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<ChroniclePage />} />
          <Route path="/weaver-ai" element={<WeaverAiPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/bloodline" element={<BloodlinePage />} />
          <Route path="/codex" element={<CodexPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default AppRouter;
