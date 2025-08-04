import { Show } from './shows';

  // 导入重启人生剧集数据
  import restartLifeEpisode1 from './shows/restart-life/episodes/episode1.json';
  import restartLifeEpisode2 from './shows/restart-life/episodes/episode2.json';
  import restartLifeEpisode3 from './shows/restart-life/episodes/episode3.json';
  import restartLifeEpisode4 from './shows/restart-life/episodes/episode4.json';
  import restartLifeEpisode5 from './shows/restart-life/episodes/episode5.json';
  import restartLifeEpisode6 from './shows/restart-life/episodes/episode6.json';
  import restartLifeEpisode7 from './shows/restart-life/episodes/episode7.json';
  import restartLifeEpisode8 from './shows/restart-life/episodes/episode8.json';
  import restartLifeEpisode9 from './shows/restart-life/episodes/episode9.json';
  import restartLifeEpisode10 from './shows/restart-life/episodes/episode10.json';

// 导入请和我男朋友结婚剧集数据
import marryBoyfriendEpisode1 from './shows/please-marry-my-boyfriend/episodes/episode1.json';
import marryBoyfriendEpisode2 from './shows/please-marry-my-boyfriend/episodes/episode2.json';
import marryBoyfriendEpisode3 from './shows/please-marry-my-boyfriend/episodes/episode3.json';
import marryBoyfriendEpisode4 from './shows/please-marry-my-boyfriend/episodes/episode4.json';
import marryBoyfriendEpisode5 from './shows/please-marry-my-boyfriend/episodes/episode5.json';
import marryBoyfriendEpisode6 from './shows/please-marry-my-boyfriend/episodes/episode6.json';
import marryBoyfriendEpisode7 from './shows/please-marry-my-boyfriend/episodes/episode7.json';
import marryBoyfriendEpisode8 from './shows/please-marry-my-boyfriend/episodes/episode8.json';
import marryBoyfriendEpisode9 from './shows/please-marry-my-boyfriend/episodes/episode9.json';
import marryBoyfriendEpisode10 from './shows/please-marry-my-boyfriend/episodes/episode10.json';
import marryBoyfriendEpisode11 from './shows/please-marry-my-boyfriend/episodes/episode11.json';
import marryBoyfriendEpisode12 from './shows/please-marry-my-boyfriend/episodes/episode12.json';

 // 导入日常日语会话剧集数据
 import dailyConvEpisode1 from './shows/daily-conversations/episodes/episode1.json';
 import dailyConvEpisode2 from './shows/daily-conversations/episodes/episode2.json';
 import dailyConvEpisode3 from './shows/daily-conversations/episodes/episode3.json';
 import dailyConvEpisode4 from './shows/daily-conversations/episodes/episode4.json';
 import dailyConvEpisode5 from './shows/daily-conversations/episodes/episode5.json';
 import dailyConvEpisode6 from './shows/daily-conversations/episodes/episode6.json';
 import dailyConvEpisode7 from './shows/daily-conversations/episodes/episode7.json';
 import dailyConvEpisode8 from './shows/daily-conversations/episodes/episode8.json';
 import dailyConvEpisode9 from './shows/daily-conversations/episodes/episode9.json';
 import dailyConvEpisode10 from './shows/daily-conversations/episodes/episode10.json';
 import dailyConvEpisode11 from './shows/daily-conversations/episodes/episode11.json';
 import dailyConvEpisode12 from './shows/daily-conversations/episodes/episode12.json';

// 翻译项目接口定义
export interface TranslationItem {
  id: number;
  japanese: string;
  romaji?: string;
  chinese: string;
  context?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  episode: number;
}

// 剧集数据接口
interface EpisodeData {
  number: number;
  title: string;
  lines: TranslationItem[];
}

// 按剧集组织所有数据
const showData = {
  'restart-life': {
    episodes: [
      restartLifeEpisode1,
      restartLifeEpisode2,
      restartLifeEpisode3,
      restartLifeEpisode4,
      restartLifeEpisode5,
      restartLifeEpisode6,
      restartLifeEpisode7,
      restartLifeEpisode8,
      restartLifeEpisode9,
      restartLifeEpisode10
    ] as EpisodeData[]
  },
  'please-marry-my-boyfriend': {
    episodes: [
      marryBoyfriendEpisode1,
      marryBoyfriendEpisode2,
      marryBoyfriendEpisode3,
      marryBoyfriendEpisode4,
      marryBoyfriendEpisode5,
      marryBoyfriendEpisode6,
      marryBoyfriendEpisode7,
      marryBoyfriendEpisode8,
      marryBoyfriendEpisode9,
      marryBoyfriendEpisode10,
      marryBoyfriendEpisode11,
      marryBoyfriendEpisode12
    ] as EpisodeData[]
   },
   'daily-conversations': {
     episodes: [
       dailyConvEpisode1,
       dailyConvEpisode2,
       dailyConvEpisode3,
       dailyConvEpisode4,
       dailyConvEpisode5,
       dailyConvEpisode6,
       dailyConvEpisode7,
       dailyConvEpisode8,
       dailyConvEpisode9,
       dailyConvEpisode10,
       dailyConvEpisode11,
       dailyConvEpisode12
     ] as EpisodeData[]
   }
 };

// 获取指定剧集的所有集数信息
export const getEpisodesByShow = (showId: string) => {
  const show = showData[showId as keyof typeof showData];
  if (!show) return [];
  
  return show.episodes.map(episode => ({
    number: episode.number,
    title: episode.title,
    lineCount: episode.lines.length
  }));
};

// 根据剧集和集数获取台词
export const getLinesByShowAndEpisode = (showId: string, episodeNumber: number): TranslationItem[] => {
  const show = showData[showId as keyof typeof showData];
  if (!show) return [];
  
  const episode = show.episodes.find(ep => ep.number === episodeNumber);
  return episode ? episode.lines : [];
};

// 获取指定剧集的所有台词
export const getAllItemsByShow = (showId: string): TranslationItem[] => {
  const show = showData[showId as keyof typeof showData];
  if (!show) return [];
  
  return show.episodes.flatMap(episode => episode.lines);
};

// 获取指定剧集和ID的台词
export const getTranslationItemById = (showId: string, id: number): TranslationItem | undefined => {
  return getAllItemsByShow(showId).find(item => item.id === id);
};