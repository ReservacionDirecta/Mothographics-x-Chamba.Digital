import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RafflePage from './RafflePage';

const RaffleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/sorteo" element={<RafflePage />} />
      <Route path="/raffle" element={<RafflePage />} />
    </Routes>
  );
};

export default RaffleRoutes;
