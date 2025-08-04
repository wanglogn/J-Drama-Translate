import { TranslationItem } from '@/data/translationData';

// 进度数据结构
interface ProgressData {
  [showId: string]: {
    [episodeNumber: number]: {
      completedLines: number[];
      lastAccessed: number;
    };
  };
}

// 获取所有进度数据
export const getProgressData = (): ProgressData => {
  const saved = localStorage.getItem('learningProgress');
  return saved ? JSON.parse(saved) : {};
};

// 保存进度数据
const saveProgressData = (data: ProgressData) => {
  localStorage.setItem('learningProgress', JSON.stringify(data));
};

// 记录已完成的台词
export const markLineAsCompleted = (
  showId: string, 
  episodeNumber: number, 
  lineId: number
) => {
  const data = getProgressData();
  
  if (!data[showId]) {
    data[showId] = {};
  }
  
  if (!data[showId][episodeNumber]) {
    data[showId][episodeNumber] = {
      completedLines: [],
      lastAccessed: Date.now()
    };
  }
  
  // 只添加未完成的台词ID
  if (!data[showId][episodeNumber].completedLines.includes(lineId)) {
    data[showId][episodeNumber].completedLines.push(lineId);
    data[showId][episodeNumber].lastAccessed = Date.now();
    saveProgressData(data);
  }
};

// 获取某一集的完成进度
export const getEpisodeProgress = (
  showId: string, 
  episodeNumber: number, 
  totalLines: number
): { completed: number; percent: number } => {
  const data = getProgressData();
  
  if (!data[showId] || !data[showId][episodeNumber]) {
    return { completed: 0, percent: 0 };
  }
  
  const completed = data[showId][episodeNumber].completedLines.length;
  return {
    completed,
    percent: totalLines > 0 ? Math.round((completed / totalLines) * 100) : 0
  };
};

// 获取某部剧的总体进度
export const getShowProgress = (
  showId: string, 
  totalEpisodes: number, 
  episodesLineCounts: {[episodeNumber: number]: number}
): { completedEpisodes: number; percent: number; totalLines: number; completedLines: number } => {
  const data = getProgressData();
  let completedEpisodes = 0;
  let totalLines = 0;
  let completedLines = 0;
  
  if (!data[showId]) {
    return { completedEpisodes: 0, percent: 0, totalLines: 0, completedLines: 0 };
  }
  
  // 计算总台词数和已完成台词数
  Object.entries(episodesLineCounts).forEach(([episodeNumber, count]) => {
    const episodeNum = parseInt(episodeNumber);
    totalLines += count;
    
    if (data[showId][episodeNum]) {
      completedLines += data[showId][episodeNum].completedLines.length;
      if (data[showId][episodeNum].completedLines.length === count) {
        completedEpisodes++;
      }
    }
  });
  
  return {
    completedEpisodes,
    percent: totalEpisodes > 0 ? Math.round((completedEpisodes / totalEpisodes) * 100) : 0,
    totalLines,
    completedLines
  };
};

// 清除某部剧的进度
export const clearShowProgress = (showId: string) => {
  const data = getProgressData();
  if (data[showId]) {
    delete data[showId];
    saveProgressData(data);
  }
};

// 清除所有进度
export const clearAllProgress = () => {
  localStorage.removeItem('learningProgress');
};