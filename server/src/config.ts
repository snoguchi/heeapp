import { Emotion } from 'shared/api-interfaces';

const createdAt = new Date('2020-10-01').getTime();

export function getDefaultEmotions(): Emotion[] {
  return [
    {
      emotionId: 'hee',
      createdAt,
      label: 'へぇ',
      soundUrl: '/sound/hee.mp3',
      count: 0,
      feverSoundUrl: null,
      feverCount: 0,
      feverEndAt: 0,
    },
    {
      emotionId: 'laugh',
      createdAt,
      label: '笑',
      soundUrl: '/sound/laugh.mp3',
      count: 0,
      feverSoundUrl: null,
      feverCount: 0,
      feverEndAt: 0,
    },
    {
      emotionId: 'clap',
      createdAt,
      label: '拍手',
      soundUrl: '/sound/clap.mp3',
      count: 0,
      feverSoundUrl: '/sound/applause.mp3',
      feverCount: 0,
      feverEndAt: 0,
    },
    {
      emotionId: 'coin',
      createdAt,
      label: '＄',
      soundUrl: '/sound/coin.mp3',
      count: 0,
      feverSoundUrl: '/sound/1up.mp3',
      feverCount: 0,
      feverEndAt: 0,
    },
  ];
}
