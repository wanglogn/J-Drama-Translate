// 剧集封面图片URL
const restartLifeCover = 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Japanese%20drama%20Restart%20Life%20poster%2C%20minimalist%20design%2C%20blue%20and%20white%20color%20scheme&sign=880140920b1ccd8657bb4f24e5bdfdf6';
const pleaseMarryMyBoyfriendCover = 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Japanese%20drama%20Please%20Marry%20My%20Boyfriend%20poster%2C%20minimalist%20design%2C%20pink%20and%20white%20color%20scheme&sign=c6ef1f588c01820f179c2d40f6f8d982';

// 剧集元数据接口
export interface Show {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  episodeCount: number;
}

// 所有支持的剧集
export const shows: Show[] = [
  {
    id: 'restart-life',
    title: '重启人生',
    description: '一部关于女主角不断重生以改变命运的喜剧剧情片',
    coverImage: restartLifeCover,
    episodeCount: 10
  },
  {
    id: 'please-marry-my-boyfriend',
    title: '请和我男朋友结婚',
    description: '一部浪漫爱情剧，讲述了女主角与男友之间的情感纠葛',
    coverImage: pleaseMarryMyBoyfriendCover,
    episodeCount: 12
  },
  {
    id: 'daily-conversations',
    "title": "日常日语会话",
    "description": "包含各种日常场景的实用日语对话，适合学习日常生活用语",
    "coverImage": "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Japanese%20daily%20conversation%20poster%2C%20minimalist%20design%2C%20green%20and%20white%20color%20scheme&sign=eaac38d4b632e3806e4bed69c19fd967",
    "episodeCount": 12
  }
];

// 根据ID获取剧集信息
export const getShowById = (id: string): Show | undefined => {
  return shows.find(show => show.id === id);
};