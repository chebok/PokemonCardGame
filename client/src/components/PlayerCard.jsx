import React, { useState } from 'react';
import { Progress } from 'antd';
import { useEffect } from 'react';

export default function PlayerCard({ spriteBack }) {
  const [percent, setPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const increase = () => {
      let newPercent = percent;
  
      setTimeout(() => {
        newPercent = percent + 1;
        if (newPercent >= 100) {
          newPercent = 100;
          setIsReady(true);
        }
  
        setPercent(newPercent);
      }, 2000);
    };
    increase();
  }, [percent]);

  return (
    <div className='playerCard'>
      <div
        className='pokemonSprite'
      >
        <img src={spriteBack} alt='pokemon' />
      </div>
      <Progress percent={percent} />
    </div>
  )
};
