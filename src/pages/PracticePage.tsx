import { useState, useEffect } from 'react';
import TranslationCard from '@/components/TranslationCard';
import { getLinesByShowAndEpisode, getEpisodesByShow, TranslationItem } from '@/data/translationData';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getShowById } from '@/data/shows';

export default function PracticePage() {
  const [translationItems, setTranslationItems] = useState<TranslationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [episode, setEpisode] = useState<number | null>(null);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [showTitle, setShowTitle] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // 从URL获取剧集和集数参数
    const showParam = searchParams.get('show');
    const episodeParam = searchParams.get('episode');
    
    if (!showParam || !episodeParam) {
      navigate('/'); // 如果参数不完整，返回首页
      return;
    }
    
    const episodeNumber = parseInt(episodeParam, 10);
    if (isNaN(episodeNumber)) {
      navigate('/');
      return;
    }
    
    // 获取剧集信息
    const show = getShowById(showParam);
    if (!show) {
      navigate('/');
      return;
    }
    
    // 获取该集的台词
    const lines = getLinesByShowAndEpisode(showParam, episodeNumber);
    if (lines.length === 0) {
      navigate(`/episodes?show=${showParam}`);
      return;
    }
    
    // 获取集数标题
    const episodes = getEpisodesByShow(showParam);
    const currentEpisode = episodes.find(ep => ep.number === episodeNumber);
    
    setShowTitle(show.title);
    setEpisode(episodeNumber);
    setEpisodeTitle(currentEpisode?.title || `第${episodeNumber}集`);
    setTranslationItems(lines);
    setCurrentIndex(0);
    
    // 从本地存储获取该集的练习进度（按剧集和集数区分）
    const savedProgress = localStorage.getItem(`translationProgress_${showParam}_ep${episodeNumber}`);
    if (savedProgress) {
      const savedIndex = parseInt(savedProgress, 10);
      if (!isNaN(savedIndex) && savedIndex < lines.length) {
        setCurrentIndex(savedIndex);
      }
    }
  }, [navigate, searchParams]);
  
  useEffect(() => {
    // 保存当前练习进度到本地存储（按剧集和集数区分）
    const showParam = searchParams.get('show');
    if (translationItems.length > 0 && episode && showParam) {
      localStorage.setItem(
        `translationProgress_${showParam}_ep${episode}`, 
        currentIndex.toString()
      );
    }
  }, [currentIndex, translationItems.length, episode, searchParams]);
  
  const handleNext = () => {
    if (currentIndex < translationItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 最后一题，显示完成提示
      alert(`恭喜您完成了《${showTitle} - ${episodeTitle}》的所有翻译练习！`);
    }
  };
  
  const handlePrevious = () => {
    const showParam = searchParams.get('show');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (showParam) {
      navigate(`/episodes?show=${showParam}`);
    } else {
      navigate('/');
    }
  };
  
  if (translationItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-book-open text-2xl text-gray-500 dark:text-gray-400"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">加载练习数据中</h2>
          <p className="text-gray-600 dark:text-gray-400">请稍候，我们正在准备翻译练习内容...</p>
        </div>
      </div>
    );
  }
  
  const currentItem = translationItems[currentIndex];
  const showParam = searchParams.get('show');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 页面标题和进度 */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-1">{showTitle}</h1>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{episodeTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            第 {currentIndex + 1} 题 / 共 {translationItems.length} 题
          </p>
          
          {/* 进度条 */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / translationItems.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* 翻译练习卡片 */}
        <TranslationCard 
          item={currentItem} 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
        />
       
        {/* 返回按钮 */}
        <div className="mt-6 text-center">
          <button
            onClick={() => showParam ? navigate(`/episodes?show=${showParam}`) : navigate('/')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex items-center justify-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> {showParam ? '返回集数选择' : '返回首页'}
          </button>
        </div>
      </div>
    </div>
  );
}