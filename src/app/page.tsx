import ClientRoot from "../components/ClientRoot";
import TestAdBanner from "@/components/TestAdBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 px-4">
        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full flex justify-center my-4">
            <TestAdBanner type="content" className="max-w-md" />
          </div>
          <ClientRoot />
          <div className="w-full flex justify-center my-8">
            <TestAdBanner type="content" className="max-w-md" />
          </div>
        </div>
        
        {/* 사이드바 광고 영역 (데스크톱에서만 표시) */}
        <div className="hidden lg:block lg:w-48 flex-shrink-0">
          <div className="sticky top-4 space-y-4">
            <TestAdBanner type="sidebar" />
            <TestAdBanner type="sidebar" />
          </div>
        </div>
      </div>
    </main>
  );
}
