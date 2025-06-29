'use client';

import dynamic from 'next/dynamic';

// Dynamic import untuk menghindari SSR error dengan PDF.js dan PageFlip
const FlipbookClient = dynamic(
     () => import('./FlipbookClient'),
     {
          ssr: false,
          loading: () => (
               <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                    <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                         <div className="animate-spin w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-6"></div>
                         <p className="text-2xl font-bold text-white mb-2">Initializing Flipbook</p>
                         <p className="text-cyan-200">Setting up PDF reader...</p>
                    </div>
               </div>
          )
     }
);

export default function Page() {
     return <FlipbookClient />;
}
