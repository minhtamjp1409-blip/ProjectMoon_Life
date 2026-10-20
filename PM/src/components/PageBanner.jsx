import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';

// The title block of every archive screen: clean typographical header with back navigation.
export const PageBanner = ({ title, sub, action }) => {
  const navigate = useNavigate();
  const lang = useThemeStore((s) => s.lang);
  const back = () => (window.history.length > 1 ? navigate(-1) : navigate('/'));

  return (
    <header className="banner">
      <button type="button" className="icon-btn banner-back" onClick={back} aria-label={pick(lang, 'Quay lại', 'Back')} title={pick(lang, 'Quay lại', 'Back')}>
        <ArrowLeft size={18} />
      </button>
      <div className="banner-body">
        <div>
          <h1>{title}</h1>
          {sub && <p>{sub}</p>}
        </div>
        {action && <div className="banner-action">{action}</div>}
      </div>
    </header>
  );
};

export default PageBanner;
