'use client';

import { useState } from 'react';
import Image from 'next/image';

const max = 5;

export default function Lineups({ topLineups }: { topLineups: any[] }) {
  const [sliderValue, setSliderValue] = useState(max);
  
  const filtered = topLineups
    .filter(lineup => lineup.homeCount === sliderValue)
  
    return (
    <>
      <div className='flex justify-center items-center m-4'>
          <span className='mr-2'>{sliderValue}</span>
          <input type='range' min='0' max={max} value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
          <span className='ml-2'>{max - sliderValue}</span>
      </div>
      {filtered.map((lineup, index) => (
        <div key={index} className='border border-gray-600 rounded-2xl p-3 m-1'>
            <div className='flex justify-center items-center'>
                {lineup.players.map((player: any, index: any) => (
                    <div key={index} className='flex flex-col justify-center items-center mr-1 ml-1'>
                        <Image src={player.pictureUrl} alt='player picture' width={50} height={81} />
                        <span>{player.capValue}</span>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center'>
                <span>{lineup.totalCap}</span>
            </div>
        </div>
      ))}
    </>
  );
}
