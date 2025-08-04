import { useSearchParams } from 'react-router-dom';
import ShowSelection from '@/components/ShowSelection';
import { Link } from 'react-router-dom';
import { getEpisodesByShow } from '@/data/translationData';
import { getShowById } from '@/data/shows';
import { cn } from '@/lib/utils';

export default function Home() {
  const [searchParams] = useSearchParams();
  const showId = searchParams.get('show');
  
  // 如果已选择剧集，则显示集数选择
  if (showId) {
    const episodes = getEpisodesByShow(showId);
    const show = getShowById(showId);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          {/* 返回剧集选择 */}
          <div className="text-left mb-6">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center w-fit"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> 返回剧集选择
            </Link>
          </div>
          
          {/* 当前剧集信息 */}
          {show && (
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{show.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {show.description}
              </p>
            </div>
          )}
          
          {/* 集数选择 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">选择集数</h2>
            
            {episodes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {episodes.map((episode) => (
                  <Link
                    key={episode.number}
                    to={`/practice?show=${showId}&episode=${episode.number}`}
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-300 group-hover:text-white">第{episode.number}集</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium text-center">{episode.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{episode.lineCount}句台词</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-film text-2xl text-gray-500 dark:text-gray-400"></i>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">暂无剧集数据</h3>
                <p className="text-gray-600 dark:text-gray-400">该日剧的练习数据正在整理中，敬请期待...</p>
              </div>
            )}
          </div>
          
          {/* 页脚 */}
          <footer className="text-center text-gray-500 dark:text-gray-500 text-sm py-6">
            <p>日语翻译练习 &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    );
  }
  
  // 默认显示剧集选择
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <header className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">日语翻译练习</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            通过热门日剧台词，提升你的日语翻译能力和口语水平
          </p>
        </header>
        
        {/* 主要内容区 */}
        <main className="mb-16">
          {/* 特色介绍 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-book text-blue-500 dark:text-blue-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">丰富台词库</h3>
              <p className="text-gray-600 dark:text-gray-400">
                精选多部热门日剧经典台词，覆盖不同难度级别
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-comments text-green-500 dark:text-green-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">翻译练习</h3>
              <p className="text-gray-600 dark:text-gray-400">
                提供翻译输入区域，可与参考答案对比，帮助你提升翻译能力
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-volume-up text-purple-500 dark:text-purple-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">口语练习</h3>
              <p className="text-gray-600 dark:text-gray-400">
                日语原文朗读功能，帮助你学习标准发音和语调
              </p>
            </div>
          </div>
          
          {/* 剧集选择 */}
          <ShowSelection />
        </main>
        
        {/* 页脚 */}
        <footer className="text-center text-gray-500 dark:text-gray-500 text-sm py-6">
          <p>日语翻译练习 &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}