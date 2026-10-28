import React, { useEffect, useMemo, useState } from 'react';
import { REGIONS } from '../../../data/worldData';

export const ATLAS_VIEW = { x: 0, y: 0, width: 1000, height: 760 };

// District positions follow the broad arrangement of the City's familiar A–Z map.
export const DISTRICT_POINTS = {
  A: [493, 415], B: [460, 338], C: [574, 350], D: [572, 477],
  E: [423, 490], F: [351, 365], G: [431, 254], H: [605, 255],
  I: [685, 410], J: [626, 561], K: [472, 569], L: [320, 531],
  M: [242, 377], N: [275, 222], O: [450, 156], P: [560, 164],
  Q: [740, 231], R: [790, 472], S: [735, 611], T: [583, 633],
  U: [406, 650], V: [239, 557], W: [129, 367], X: [168, 224],
  Y: [315, 113], Z: [700, 187], OUTSKIRTS: [905, 609]
};

const CITY_OUTLINE = 'M 76 270 L 103 187 L 181 102 L 306 42 L 421 35 L 515 76 L 595 105 L 671 163 L 775 192 L 837 254 L 852 349 L 877 388 L 875 506 L 842 582 L 776 664 L 640 684 L 540 709 L 437 695 L 325 706 L 266 654 L 194 622 L 122 566 L 86 467 L 65 374 Z';
const WALL_PATH = 'M 900 34 C 948 113 956 220 976 339 C 1007 510 970 648 850 713';
const CITY_REGIONS = REGIONS.filter((region) => region.id !== 'OUTSKIRTS');
const INITIAL_CELL = [[0, 0], [1000, 0], [1000, 760], [0, 760]];

function clipHalfPlane(points, a, b, c) {
  const result = [];
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const currentValue = a * current[0] + b * current[1] - c;
    const nextValue = a * next[0] + b * next[1] - c;
    if (currentValue <= 0) result.push(current);
    if ((currentValue < 0 && nextValue > 0) || (currentValue > 0 && nextValue < 0)) {
      const fraction = currentValue / (currentValue - nextValue);
      result.push([
        current[0] + (next[0] - current[0]) * fraction,
        current[1] + (next[1] - current[1]) * fraction
      ]);
    }
  }
  return result;
}

function districtCell(id) {
  const [x, y] = DISTRICT_POINTS[id];
  return CITY_REGIONS.reduce((cell, other) => {
    if (other.id === id || !cell.length) return cell;
    const [ox, oy] = DISTRICT_POINTS[other.id];
    return clipHalfPlane(cell, 2 * (ox - x), 2 * (oy - y), ox * ox + oy * oy - x * x - y * y);
  }, INITIAL_CELL).map((point) => point.map((value) => Math.round(value * 10) / 10).join(',')).join(' ');
}

const CELLS = Object.fromEntries(CITY_REGIONS.map((region) => [region.id, districtCell(region.id)]));

export function atlasTargetView(regionId) {
  const [x, y] = DISTRICT_POINTS[regionId] || DISTRICT_POINTS.A;
  const width = regionId === 'OUTSKIRTS' ? 490 : 370;
  const height = width * ATLAS_VIEW.height / ATLAS_VIEW.width;
  return {
    x: Math.max(0, Math.min(ATLAS_VIEW.width - width, x - width / 2)),
    y: Math.max(0, Math.min(ATLAS_VIEW.height - height, y - height / 2)),
    width,
    height
  };
}

function MapInk({ selected, onSelect, interactive = false, t }) {
  return (
    <>
      <rect className="atlas-scanlines" x="0" y="0" width="1000" height="760" />
      <path className="atlas-wall-shadow" d={WALL_PATH} />
      <path className="atlas-wall" d={WALL_PATH} />
      <path className="atlas-boundary" d={CITY_OUTLINE} />
      <g clipPath="url(#city-atlas-boundary)">
        <rect className="atlas-ground" x="0" y="0" width="1000" height="760" />
        <rect className="atlas-blocks" x="0" y="0" width="1000" height="760" fill="url(#city-atlas-blocks)" />
        <rect className="atlas-blocks-fine" x="0" y="0" width="1000" height="760" fill="url(#city-atlas-fine-blocks)" />
        <rect className="atlas-blocks-large" x="0" y="0" width="1000" height="760" fill="url(#city-atlas-arteries)" />
        <g className="atlas-streets" aria-hidden="true">
          <path d="M 72 240 C 320 300 615 208 856 352 M 69 370 C 330 313 605 452 883 422 M 112 520 C 360 452 615 582 858 536 M 220 93 C 280 292 440 460 409 694 M 446 43 C 417 275 576 470 540 709 M 663 145 C 592 346 768 475 739 678" />
          <path d="M 111 315 C 273 380 497 190 825 287 M 142 565 C 389 538 592 361 854 477 M 291 52 C 370 222 302 484 297 665 M 576 101 C 509 303 635 542 630 681" />
        </g>
        <path className="atlas-inner-ring" d="M 240 383 C 269 222 404 149 548 182 C 692 213 795 306 777 450 C 758 601 600 681 448 624 C 293 566 208 519 240 383 Z" />
        <path className="atlas-inner-ring is-core" d="M 372 399 C 384 319 449 287 532 300 C 611 313 667 376 638 466 C 607 557 477 571 414 502 C 381 467 365 433 372 399 Z" />
        {CITY_REGIONS.map((region) => (
          <g
            key={region.id}
            className={`atlas-district${selected === region.id ? ' is-selected' : ''}${interactive ? ' is-interactive' : ''}`}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? `District ${region.ward}, ${region.id} Corp` : undefined}
            aria-pressed={interactive ? selected === region.id : undefined}
            onClick={interactive ? () => onSelect(region.id) : undefined}
            onKeyDown={interactive ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(region.id);
              }
            } : undefined}
          >
            <polygon points={CELLS[region.id]} />
            <text className="atlas-district-letter" x={DISTRICT_POINTS[region.id][0]} y={DISTRICT_POINTS[region.id][1]} textAnchor="middle" dominantBaseline="middle">{region.id}</text>
            <text className="atlas-district-number" x={DISTRICT_POINTS[region.id][0]} y={DISTRICT_POINTS[region.id][1] + 29} textAnchor="middle">District {region.ward}</text>
            <title>{`District ${region.ward}, ${region.id} Corp`}</title>
          </g>
        ))}
      </g>
      <path className="atlas-boundary-line" d={CITY_OUTLINE} />
      <path className="atlas-border-echo" d={CITY_OUTLINE} />
      <text className="atlas-outskirts-label" x="897" y="544" textAnchor="middle">{t('Ngoài bức tường', 'Beyond the wall')}</text>
      <g
        className={`atlas-outskirts-hit${selected === 'OUTSKIRTS' ? ' is-selected' : ''}${interactive ? ' is-interactive' : ''}`}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? 'Outskirts' : undefined}
        aria-pressed={interactive ? selected === 'OUTSKIRTS' : undefined}
        onClick={interactive ? () => onSelect('OUTSKIRTS') : undefined}
        onKeyDown={interactive ? (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect('OUTSKIRTS');
          }
        } : undefined}
      >
        <circle cx="905" cy="609" r="49" />
        <text x="905" y="615" textAnchor="middle">OUT</text>
      </g>
    </>
  );
}

export function CityBirthAtlas({ selected, displayRegion, viewport, moving, starting, onSelect, onRandom, onReset, onStart, t, lang }) {
  const [pointer, setPointer] = useState(null);
  useEffect(() => {
    if (moving) setPointer(null);
  }, [moving]);
  const activeId = displayRegion?.id || selected;
  const activeRegion = useMemo(() => REGIONS.find((region) => region.id === activeId), [activeId]);
  const center = DISTRICT_POINTS[activeId] || [545, 305];
  const lensScale = viewport.width / ATLAS_VIEW.width;
  const lensRadius = 59 * lensScale;
  const lensMagnification = 1 + 1.3 * lensScale;
  const lens = moving
    ? [viewport.x + viewport.width / 2, viewport.y + viewport.height / 2]
    : pointer || center;
  const position = `${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`;

  const moveLens = (event) => {
    if (event.pointerType === 'touch' || moving) return;
    const svg = event.currentTarget;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const mapped = point.matrixTransform(svg.getScreenCTM().inverse());
    setPointer([
      Math.max(viewport.x + lensRadius, Math.min(viewport.x + viewport.width - lensRadius, mapped.x)),
      Math.max(viewport.y + lensRadius, Math.min(viewport.y + viewport.height - lensRadius, mapped.y))
    ]);
  };

  return (
    <div className="city-birth-atlas">
      <div className="city-birth-atlas-frame">
        <svg className="city-birth-atlas-svg" viewBox={position} role="group" aria-label={t('Bản đồ 26 District của The City và Outskirts', 'Map of the City’s 26 Districts and the Outskirts')} onPointerMove={moveLens} onPointerLeave={() => setPointer(null)}>
          <defs>
            <clipPath id="city-atlas-boundary"><path d={CITY_OUTLINE} /></clipPath>
            <clipPath id="city-atlas-lens"><circle cx={lens[0]} cy={lens[1]} r={lensRadius} /></clipPath>
            <pattern id="city-atlas-blocks" width="58" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(-11)">
              <path d="M 2 2 H 21 V 12 H 2 Z M 25 2 H 55 V 18 H 25 Z M 2 17 H 20 V 32 H 2 Z M 25 23 H 42 V 35 H 25 Z M 46 23 H 56 V 45 H 46 Z M 2 38 H 39 V 50 H 2 Z" />
            </pattern>
            <pattern id="city-atlas-fine-blocks" width="29" height="27" patternUnits="userSpaceOnUse" patternTransform="rotate(9)">
              <path d="M 1 2 H 11 V 8 H 1 Z M 14 1 H 27 V 11 H 14 Z M 2 12 H 10 V 24 H 2 Z M 13 15 H 27 V 25 H 13 Z" />
            </pattern>
            <pattern id="city-atlas-arteries" width="148" height="130" patternUnits="userSpaceOnUse" patternTransform="rotate(-11)">
              <path d="M 0 69 H 148 M 79 0 V 130 M 80 6 H 128 V 23 H 80 M 12 82 H 65 V 113 H 12" />
            </pattern>
            <pattern id="city-atlas-scanlines" width="1000" height="5" patternUnits="userSpaceOnUse">
              <path d="M 0 4.5 H 1000" />
            </pattern>
          </defs>
          <MapInk selected={activeId} onSelect={onSelect} interactive={!moving} t={t} />
          <g className="atlas-lens" aria-hidden="true" pointerEvents="none" style={{ '--atlas-lens-rim': `${14 * lensScale}px`, '--atlas-lens-line': `${2.5 * lensScale}px` }}>
              <g clipPath="url(#city-atlas-lens)">
                <rect className="atlas-lens-ground" x="0" y="0" width="1000" height="760" />
                <g transform={`translate(${(1 - lensMagnification) * lens[0]} ${(1 - lensMagnification) * lens[1]}) scale(${lensMagnification})`}>
                  <MapInk selected={activeId} t={t} />
                </g>
              </g>
              <circle cx={lens[0]} cy={lens[1]} r={lensRadius} />
              <circle cx={lens[0]} cy={lens[1]} r={54 * lensScale} />
          </g>
        </svg>
        <div className="atlas-corner-label" aria-live="polite">
          <strong>{activeRegion ? activeRegion.id === 'OUTSKIRTS' ? 'Outskirts' : `District ${activeRegion.ward}` : 'The City'}</strong>
          <span>{activeRegion ? (lang === 'en' ? activeRegion.aliasEn : activeRegion.aliasVi) : t('Chọn nơi sinh trên bản đồ', 'Choose a birthplace on the map')}</span>
        </div>
      </div>
      <div className="atlas-actions">
        <button type="button" onClick={onRandom} disabled={moving}>{t('Để The City chọn', 'Let the City choose')}</button>
        {viewport.width < 900 && <button type="button" onClick={onReset}>{t('Toàn bản đồ', 'Full map')}</button>}
        <button type="button" className="atlas-start-action" onClick={onStart} disabled={starting || moving}>{starting ? t('Đang mở hồ sơ…', 'Opening your record…') : t('Bước vào The City', 'Enter The City')}</button>
      </div>
    </div>
  );
}

export default CityBirthAtlas;
