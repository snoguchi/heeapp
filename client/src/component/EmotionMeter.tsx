import * as React from 'react';
import { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';

export interface EmotionMeterProps {
  feverCount: number;
  feverEndAt: number;
}

export const EmotionMeter: React.FC<EmotionMeterProps> = ({ feverCount, feverEndAt }) => {
  const [color, setColor] = useState<'primary' | 'secondary'>('primary');
  const [value, setValue] = useState<number>(feverCount);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setColor('primary');
      setValue(0);
    }, feverEndAt - Date.now());
    setColor(feverCount < 10 ? 'primary' : 'secondary');
    setValue(Math.min(feverCount * 10, 100));
    return () => clearTimeout(timerId);
  }, [feverCount]);

  return <LinearProgress variant='determinate' color={color} value={value} />;
};
