'use client';

interface TestAdBannerProps {
  type: 'header' | 'content' | 'footer' | 'sidebar';
  className?: string;
}

export default function TestAdBanner({ type, className = '' }: TestAdBannerProps) {
  const getAdConfig = () => {
    switch (type) {
      case 'header':
        return {
          size: 'w-full h-20 md:h-16',
          text: '헤더 배너 광고 (728x90)',
          bg: 'bg-gray-200 border-gray-300'
        };
      case 'content':
        return {
          size: 'w-full h-32 md:h-24',
          text: '컨텐츠 중간 디스플레이 광고 (300x250)',
          bg: 'bg-blue-50 border-blue-200'
        };
      case 'footer':
        return {
          size: 'w-full h-20 md:h-16',
          text: '푸터 배너 광고 (728x90)',
          bg: 'bg-green-50 border-green-200'
        };
      case 'sidebar':
        return {
          size: 'w-full h-64 md:w-48',
          text: '사이드바 광고 (160x600)',
          bg: 'bg-purple-50 border-purple-200'
        };
      default:
        return {
          size: 'w-full h-20',
          text: '테스트 광고',
          bg: 'bg-gray-100 border-gray-300'
        };
    }
  };

  const config = getAdConfig();

  return (
    <div className={`${config.size} ${config.bg} border-2 border-dashed rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center p-4">
        <div className="text-sm font-bold text-gray-600 mb-1">
          🧪 테스트 광고 영역
        </div>
        <div className="text-xs text-gray-500">
          {config.text}
        </div>
        <div className="text-xs text-red-500 mt-1">
          (실제 배포 시 제거될 예정)
        </div>
      </div>
    </div>
  );
} 