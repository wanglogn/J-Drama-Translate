import { Link } from 'react-router-dom';
import { shows } from '@/data/shows';
import { cn } from '@/lib/utils';

export default function ShowSelection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">选择日剧</h2>
        <p className="text-gray-600 dark:text-gray-400">选择你想练习的日剧台词</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {shows.map((show) => (
          <Link
            key={show.id}
            to={`/episodes?show=${show.id}`}
            className={cn(
              "group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl",
              "transform hover:-translate-y-1"
            )}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={show.coverImage}
                alt={show.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{show.title}</h3>
                <p className="text-gray-200 mb-4 line-clamp-2">{show.description}</p>
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {show.episodeCount} 集
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}