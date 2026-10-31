import React from 'react';

// Hana's Color bestowal: a slit of the conferred colour opens in the dark, a ring leaves it, and the name is read out.
// The colour comes from --cs-color, set by the layer from the roll.
export function ColorScene() {
  return (
    <div className="cs-art" aria-hidden="true">
      <div className="cs-hall" />
      <span className="cs-slit" />
      <span className="cs-ring" />
      <span className="cs-ring is-late" />
      <div className="cs-flash" />
    </div>
  );
}
