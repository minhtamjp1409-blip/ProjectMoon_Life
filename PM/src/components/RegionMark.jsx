import React from 'react';
import { Tooltip } from 'antd';

/**
 * Small tag after a District name when its content is not from official lore
 * (adapted) or when official lore says it is missing from the map (unmapped).
 */
export function RegionMark({ r, t }) {
  if (r.unmapped) {
    return (
      <Tooltip title={t('Lore chính thức: có tồn tại, nhưng không có trên bản đồ.', 'Official lore: it exists, but is not on the map.')}>
        <span className="pill region-mark">{t('Không có trên bản đồ', 'Not on the map')}</span>
      </Tooltip>
    );
  }
  if (r.adapted) {
    return (
      <Tooltip title={t('Lore chính thức chưa nói về Wing này. Nội dung do game phóng tác.', 'Official lore says nothing about this Wing yet. The content is this game’s adaptation.')}>
        <span className="pill region-mark">{t('Phóng tác', 'Adapted')}</span>
      </Tooltip>
    );
  }
  return null;
}
