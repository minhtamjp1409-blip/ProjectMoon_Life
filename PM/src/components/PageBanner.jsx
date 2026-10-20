import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';

export const PageBanner = ({ title, sub, action }) => {
  const navigate = useNavigate();
  const lang = useThemeStore((s) => s.lang);
  return (
    <header className="archive-header">
      <div className="archive-heading">
        <button
          className="app-tool"
          onClick={() => navigate('/')}
          aria-label={pick(lang, 'Về biên niên', 'Back to Chronicle')}
        >
          <ArrowLeft size={19} />
        </button>
        <div>
          <h1>{title}</h1>
          {sub && <p>{sub}</p>}
        </div>
      </div>
      {action && <div className="archive-action">{action}</div>}
    </header>
  );
};
export default PageBanner;
