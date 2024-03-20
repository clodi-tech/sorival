'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Slider, Tabs, Tab } from '@nextui-org/react';

const max = 5;

export default function Lineups({ topLineups }: { topLineups: any[] }) {
  const [sliderValue, setSliderValue] = useState(max);
  const [resultsValue, setResultsValue] = useState('3');
  
  const filtered = topLineups
    .filter(lineup => lineup.homeCount === sliderValue)
    .slice(0, Number(resultsValue));
  
    return (
    <>
      <Slider aria-label="Volume" size="lg" color="primary"
        startContent={`${sliderValue} H`}
        endContent={`${max-sliderValue} A`}
        minValue={0} maxValue={max}
        showOutline={true}
        onChange={(value) => setSliderValue(Number(value))}
        className="max-w-xs m-2" defaultValue={max}
      />
      <div className='flex flex-wrap gap-4 m-2'>
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
