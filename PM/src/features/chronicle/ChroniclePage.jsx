import React from 'react';
import { useGameStore } from '../../store/gameStore';
import BirthSetupPanel from './components/BirthSetupPanel';
import CharacterDossierCard from './components/CharacterDossierCard';
import LiveStageFeed from './components/LiveStageFeed';
import PlayBar from './components/PlayBar';

export const ChroniclePage = () => {
  const inRun = useGameStore((s) => s.inRun);

  if (!inRun) {
    return <BirthSetupPanel />;
  }

  return (
    <div className="play">
      <h1 className="sr-only">The City Chronicles</h1>
      <PlayBar />
      <div className="play-body">
        <CharacterDossierCard />
        <LiveStageFeed />
      </div>
    </div>
  );
};

export default ChroniclePage;
