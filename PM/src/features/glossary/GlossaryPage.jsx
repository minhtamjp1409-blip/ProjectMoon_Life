import React, { useState } from 'react';
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from '../../data/glossary';
import { REGIONS } from '../../data/worldData';
import { useT } from '../../i18n';
import PageBanner from '../../components/PageBanner';
import { RegionMark } from '../../components/RegionMark';
import { Search } from 'lucide-react';

const stripCount = (label) => label.replace(/\s*\(\d+\)\s*$/, '');

const TermsView = () => {
  const { t, lang, bilingual } = useT();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      return [item.term, item.lorVn, item.vi, item.en].some((s) => (s || '').toLowerCase().includes(q));
    });
  }, [category, search]);

  return (
    <section className="panel" aria-label={t('Thuật ngữ', 'Terms')}>
      <div className="toolbar">
        <select className="select show-sm" value={category} onChange={(e) => setCategory(e.target.value)} aria-label={t('Nhóm thuật ngữ', 'Category')}>
          {GLOSSARY_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {stripCount(lang === 'en' ? c.en : c.vi)}
            </option>
          ))}
        </select>
        <div className="seg hide-sm" role="group" aria-label={t('Nhóm thuật ngữ', 'Category')}>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button key={c.id} type="button" className={category === c.id ? 'is-on' : ''} onClick={() => setCategory(c.id)}>
              {stripCount(lang === 'en' ? c.en : c.vi)}
            </button>
          ))}
        </div>
        <label className="search" style={{ width: 280, maxWidth: '100%' }}>
          <Search size={15} />
          <input
            className="input"
            placeholder={t('Tìm: Fixer, Color, Prescript…', 'Search: Fixer, Color, Prescript…')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t('Tìm thuật ngữ', 'Search terms')}
          />
        </label>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table stack-sm" style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th style={{ width: '24%' }}>{t('Thuật ngữ gốc', 'Term')}</th>
              <th style={{ width: '18%' }}>{t('Bản dịch LoR VN', 'LoR VN translation')}</th>
              <th>{t('Giải nghĩa', 'Meaning')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="muted">
                  {t(`Không có thuật ngữ nào khớp “${search}”.`, `No term matches “${search}”.`)}
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.term}</div>
                    <div className="cell-sub">{item.kr}</div>
                  </td>
                  <td className="muted">{item.lorVn}</td>
                  <td>
                    <div style={{ lineHeight: 1.6 }}>{lang === 'en' ? item.en : item.vi}</div>
                    {bilingual && <div className="cell-sub" style={{ fontStyle: 'italic', lineHeight: 1.55 }}>{item.en}</div>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="muted num" style={{ padding: '12px 20px', fontSize: 13, borderTop: '1px solid var(--rule)' }}>
        {filtered.length} / {GLOSSARY_TERMS.length} {t('thuật ngữ', 'terms')}
      </p>
    </section>
  );
};

const DistrictsView = () => {
  const { t, lang } = useT();
  const [openId, setOpenId] = useState(null);

  return (
    <section className="panel" aria-label="Districts">
      <div style={{ overflowX: 'auto' }}>
        <table className="table stack-sm" style={{ minWidth: 720 }}>
          <thead>
            <tr>
              <th>{t('Khu vực', 'District')}</th>
              <th>Singularity</th>
              <th className="num">{t('An ninh', 'Safety')}</th>
              <th className="num">{t('Giàu có', 'Wealth')}</th>
              <th className="num">{t('Tuổi thọ TB', 'Avg. life')}</th>
            </tr>
          </thead>
          <tbody>
            {REGIONS.map((r) => {
              const open = openId === r.id;
              return (
                <React.Fragment key={r.id}>
                  <tr className="is-click" onClick={() => setOpenId(open ? null : r.id)} aria-expanded={open}>
                    <td>
                      <div style={{ fontWeight: 500 }}>
                        {lang === 'en' ? r.nameEn : r.nameVi}
                        <RegionMark r={r} t={t} />
                      </div>
                      <div className="cell-sub">{lang === 'en' ? r.aliasEn : r.aliasVi}</div>
                    </td>
                    <td className="muted">{lang === 'en' ? r.singularityEn : r.singularityVi}</td>
                    <td className="num" data-label={t('An ninh', 'Safety')}>
                      {r.unmapped ? '?' : r.safety}
                      {!r.unmapped && <span className="muted"> /10</span>}
                    </td>
                    <td className="num" data-label={t('Giàu có', 'Wealth')}>
                      {r.unmapped ? '?' : r.wealth}
                      {!r.unmapped && <span className="muted"> /10</span>}
                    </td>
                    <td className="num" data-label={t('Tuổi thọ TB', 'Avg. life')}>
                      {r.unmapped ? '?' : r.avgLife}
                      {!r.unmapped && <span className="muted"> {t('tuổi', 'yrs')}</span>}
                    </td>
                  </tr>
                  {open && (
                    <tr>
                      <td colSpan={5} style={{ background: 'var(--raised)' }}>
                        <p style={{ maxWidth: 760, lineHeight: 1.65 }} className="story">
                          {lang === 'en' ? r.descEn : r.descVi}
                        </p>
                        {(r.industryVi || r.industryEn) && (
                          <p className="cell-sub" style={{ marginTop: 6 }}>
                            {t('Ngành chủ lực: ', 'Industry: ')}
                            {lang === 'en' ? r.industryEn : r.industryVi}
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const GlossaryPage = () => {
  const { t } = useT();
  const [tab, setTab] = useState('terms');

  return (
    <div className="page">
      <PageBanner
        title={t('Từ điển & khu vực', 'Lore & districts')}
        sub={t('Thuật ngữ gốc kèm bản dịch Library of Ruina, và hồ sơ từng District.', 'Original terms with the Library of Ruina translation, and a file on every District.')}
      />

      <div className="tabs" role="tablist" style={{ marginBottom: 16 }}>
        <button type="button" role="tab" aria-selected={tab === 'terms'} className={tab === 'terms' ? 'is-on' : ''} onClick={() => setTab('terms')}>
          {t('Thuật ngữ', 'Terms')}
          <span className="count">{GLOSSARY_TERMS.length}</span>
        </button>
        <button type="button" role="tab" aria-selected={tab === 'districts'} className={tab === 'districts' ? 'is-on' : ''} onClick={() => setTab('districts')}>
          {t('Khu vực', 'Districts')}
          <span className="count">{REGIONS.length}</span>
        </button>
      </div>

      {tab === 'terms' ? <TermsView /> : <DistrictsView />}
    </div>
  );
};

export default GlossaryPage;
