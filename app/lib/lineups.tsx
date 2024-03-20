'use client';

import { useState } from 'react';
import { Slider, Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Image, Divider } from '@nextui-org/react';

const max = 5;

export default function Lineups({ topLineups }: { topLineups: any[] }) {
  const [sliderValue, setSliderValue] = useState(max);
  const [resultsValue, setResultsValue] = useState('3');
  
  const filtered = topLineups
    .filter(lineup => lineup.homeCount === sliderValue)
    .slice(0, Number(resultsValue));
  
    return (
    <>
      <Slider aria-label='Volume' size='lg' color='primary'
        startContent={`${sliderValue} H`}
        endContent={`${max-sliderValue} A`}
        minValue={0} maxValue={max}
        showOutline={true}
        onChange={(value) => setSliderValue(Number(value))}
        className='max-w-xs m-2' defaultValue={max}
      />
      <div className='flex flex-wrap gap-4 m-2'>
        <Tabs key='bordered' variant='bordered' aria-label='filter results'
        color='primary'
        selectedKey={resultsValue} onSelectionChange={(key) => setResultsValue(String(key))}>
          <Tab key='3' title='3'/>
          <Tab key='10' title='10'/>
          <Tab key='30' title='30'/>
        </Tabs>
      </div>
      {filtered.map((lineup, index) => (
        <Card key={index} className='p-1 m-2'>
            <CardHeader className='flex justify-center items-center gap-2 p-2'>
                {lineup.players.map((player: any, index: any) => (
                  <Card key={index} radius='sm' isPressable onPress={() => console.log('item pressed')}>
                    <CardBody className='overflow-visible p-0'>
                      <Image alt='player picture'
                        className='object-cover' radius='sm'
                        width={50} height={81}
                        src={player.pictureUrl}
                      />
                    </CardBody>
                    <CardFooter className='flex justify-center items-center gap-1 p-0'>
                      <span>H</span>
                      <span>{player.capValue}</span>
                      <Image src={`/${player.position}.svg`} alt='position' width={10} height={10} />
                    </CardFooter>
                  </Card>
                ))}
            </CardHeader>
            <Divider/>
            <CardFooter className='flex justify-center items-center p-0'>
              {lineup.totalCap}
            </CardFooter>
        </Card>
      ))}
    </>
  );
}
