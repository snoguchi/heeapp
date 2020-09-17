import { Emotion } from 'shared/api-interfaces';

export default function getDefaultEmotions(): Emotion[] {
  return [
    {
      emotionId: 'hee',
      createdBy: null,
      label: 'へぇ',
      soundUrl: '/sound/hee.mp3',
      total: 0,
      fever: 0,
      feverEndAt: 0,
      feverSoundUrl: null,
    },
    {
      emotionId: 'laugh',
      createdBy: null,
      label: '笑',
      soundUrl: '/sound/laugh.mp3',
      total: 0,
      fever: 0,
      feverEndAt: 0,
      feverSoundUrl: null,
    },
    {
      emotionId: 'clap',
      createdBy: null,
      label: '拍手👏',
      soundUrl: '/sound/clap.mp3',
      total: 0,
      fever: 0,
      feverEndAt: 0,
      feverSoundUrl: '/sound/applause.mp3',
    },
    {
      emotionId: 'coin',
      createdBy: null,
      label: 'コイン💰',
      soundUrl: '/sound/coin.mp3',
      total: 0,
      fever: 0,
      feverEndAt: 0,
      feverSoundUrl: '/sound/1up.mp3',
    },
  ];
}
