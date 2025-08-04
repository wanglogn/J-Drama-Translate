 import { useState } from 'react';
 import { TranslationItem } from '@/data/translationData';
 import { cn } from '@/lib/utils';
 
 interface TranslationCardProps {
   item: TranslationItem;
   onNext: () => void;
   onPrevious: () => void;
 }
 
 export default function TranslationCard({ item, onNext, onPrevious }: TranslationCardProps) {
   const [userTranslation, setUserTranslation] = useState('');
   const [showAnswer, setShowAnswer] = useState(false);
   const [isSpeaking, setIsSpeaking] = useState(false);
   const [translationDirection, setTranslationDirection] = useState<'jp-to-cn' | 'cn-to-jp'>('jp-to-cn');
 
   const toggleTranslationDirection = () => {
     setTranslationDirection(prev => prev === 'jp-to-cn' ? 'cn-to-jp' : 'jp-to-cn');
     // 重置用户输入和答案显示状态
     setUserTranslation('');
     setShowAnswer(false);
   };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserTranslation(e.target.value);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

   const speakSourceLanguage = () => {
     if ('speechSynthesis' in window) {
       setIsSpeaking(true);
       const textToSpeak = translationDirection === 'jp-to-cn' ? item.japanese : item.chinese;
       const utterance = new SpeechSynthesisUtterance(textToSpeak);
       utterance.lang = translationDirection === 'jp-to-cn' ? 'ja-JP' : 'zh-CN';
       
       utterance.onend = () => {
         setIsSpeaking(false);
       };
       
       speechSynthesis.speak(utterance);
     }
   };

  // 简单的翻译检查功能
  const hasTranslated = userTranslation.trim().length > 0;
  const isSimilar = hasTranslated 
    ? userTranslation.length > item.chinese.length * 0.7 
    : false;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
       {/* 难度标签和集数 */}
       <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium flex justify-between items-center">
         <div>
           <span className="capitalize">{item.difficulty}</span> 级别
           {item.context && (
             <span className="ml-2 text-xs opacity-80">• {item.context}</span>
           )}
         </div>
         <div className="text-xs opacity-90">
           第 {item.episode} 集
         </div>
      </div>

      {/* 日语原文区域 */}
       <div className="p-6">
         <div className="flex justify-between items-start mb-6">
           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
             {translationDirection === 'jp-to-cn' ? '日语原文' : '中文原文'}
           </h3>
           <div className="flex space-x-2">
             <button 
               onClick={toggleTranslationDirection}
               className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
               aria-label="切换翻译方向"
             >
               <i className="fa-solid fa-exchange-alt"></i>
             </button>
             <button 
               onClick={speakSourceLanguage}
               disabled={isSpeaking}
               className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
               aria-label={translationDirection === 'jp-to-cn' ? "朗读日语" : "朗读中文"}
             >
               <i className="fa-solid fa-volume-up"></i>
             </button>
           </div>
         </div>
         
         <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
           <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
             {translationDirection === 'jp-to-cn' ? item.japanese : item.chinese}
           </p>
           {translationDirection === 'jp-to-cn' && item.romaji && (
             <p className="text-sm text-gray-500 dark:text-gray-400 italic">{item.romaji}</p>
           )}
         </div>

         {/* 用户翻译输入 */}
         <div className="mb-6">
           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
             {translationDirection === 'jp-to-cn' ? '我的翻译' : '我的日语翻译'}
           </h3>
           <textarea
             value={userTranslation}
             onChange={handleInputChange}
             placeholder={translationDirection === 'jp-to-cn' ? '请输入你的中文翻译...' : '请输入你的日语翻译...'}
             className="w-full p-4 min-h-[120px] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white transition-all resize-none"
           />
         </div>

         {/* 参考答案区域 */}
         <div className="mb-6">
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
               {translationDirection === 'jp-to-cn' ? '参考答案' : '日语参考译文'}
             </h3>
             <button 
               onClick={toggleAnswer}
               className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
             >
               {showAnswer ? '隐藏答案' : '显示答案'}
             </button>
           </div>
           
           <div className={`p-4 rounded-lg transition-all duration-300 ${
             showAnswer 
               ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800' 
               : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-20 flex items-center justify-center'
           }`}>
             {showAnswer ? (
               <p className="text-gray-900 dark:text-white">
                 {translationDirection === 'jp-to-cn' ? item.chinese : item.japanese}
               </p>
             ) : (
               <p className="text-gray-500 dark:text-gray-400 italic">点击"显示答案"查看参考翻译</p>
             )}
           </div>
        </div>

        {/* 翻译反馈 */}
        {showAnswer && hasTranslated && (
          <div className={`p-3 rounded-lg mb-6 ${
            isSimilar 
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
              : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
          }`}>
            <p className="text-sm flex items-center">
              <i className={`fa-solid ${isSimilar ? 'fa-check-circle' : 'fa-lightbulb'} mr-2`}></i>
              {isSimilar 
                ? '翻译得不错！意思基本准确。' 
                : '可以再尝试改进一下，注意语句的自然流畅度。'}
            </p>
          </div>
        )}

        {/* 导航按钮 */}
        <div className="flex justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> 上一题
          </button>
          
          <button
            onClick={onNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            下一题 <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}