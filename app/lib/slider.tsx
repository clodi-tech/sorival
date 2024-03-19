'use client';

import { useState } from 'react';

const max = 5;

export default function Slider() {
  const [sliderValue, setSliderValue] = useState(max);
  return (
    <div className='flex justify-center items-center m-4'>
        <span className='mr-2'>{sliderValue}</span>
        <input type='range' min='0' max='5' value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
        <span className='ml-2'>{max - sliderValue}</span>
    </div>
  );
}
