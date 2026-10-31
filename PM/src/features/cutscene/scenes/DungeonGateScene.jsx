import React from 'react';

// A dungeon gate draws almost nothing: the dungeon's own backdrop is already behind the interface, and the scene
// fades the interface away to show it. Here only a band of dark to read the name on; the rule in the dungeon's colour
// sits on the line under the name (.cs-sub::before), so it follows however many lines the name takes.
export function DungeonGateScene() {
  return (
    <div className="cs-art" aria-hidden="true">
      <div className="cs-band" />
    </div>
  );
}
