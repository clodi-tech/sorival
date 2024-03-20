'use client';

import { useState } from 'react';
import Image from 'next/image';
import {Tabs, Tab} from '@nextui-org/react';

const max = 5;

export default function Lineups({ topLineups }: { topLineups: any[] }) {
  const [sliderValue, setSliderValue] = useState(max);
  const [resultsValue, setResultsValue] = useState('3');
  
  const filtered = topLineups
    .filter(lineup => lineup.homeCount === sliderValue)
    .slice(0, Number(resultsValue));
  
    return (
    <>
      <div className='flex justify-center items-center m-4'>
          <span className='mr-2'>{sliderValue}</span>
          <input type='range' min='0' max={max} value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
          <span className='ml-2'>{max - sliderValue}</span>
      </div>
      <div className='flex flex-wrap gap-4 mb-4'>
        <Tabs key='bordered' variant='bordered' aria-label='filter results'
        selectedKey={resultsValue} onSelectionChange={(key) => setResultsValue(String(key))}>
          <Tab key='3' title='3'/>
          <Tab key='10' title='10'/>
          <Tab key='30' title='30'/>
        </Tabs>
      </div>
      {filtered.map((lineup, index) => (
        <div key={index} className='border border-gray-600 rounded-2xl p-3 m-1'>
            <div className='flex justify-center items-center'>
                {lineup.players.map((player: any, index: any) => (
                    <div key={index} className='flex flex-col justify-center items-center mr-1 ml-1'>
                        <Image src={player.pictureUrl} alt='player picture' width={50} height={81} />
                        <div className='flex items-center justify-center gap-1'>
                          <span>{player.capValue}</span>
                          <Image src={`/${player.position}.svg`} alt='position' width={15} height={15} />
                        </div>
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
