'use client';

import { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import { flipbookData, FlipbookPage } from './data/flipbook-content';
import { ChevronLeft, ChevronRight, Maximize, ExternalLink, FileText, Users, Target, Lightbulb, TestTube, CheckCircle } from 'lucide-react';

// Page Components
const CoverPage = ({ page }: { page: FlipbookPage }) => (
     <div className={`w-full h-full bg-gradient-to-br ${page.content.backgroundColor || 'from-blue-600 to-purple-700'} text-white relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
               <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
               <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
               <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
               <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-white/20 rounded-full"></div>
          </div>

          {/* Page Corner Effect */}
          <div className="page-corner"></div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-center">
               <div className="mb-8">
                    <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm shadow-2xl">
                         <FileText className="w-14 h-14" />
                    </div>
                    <h1 className="text-6xl font-bold mb-6 leading-tight drop-shadow-lg">{page.title}</h1>
                    <p className="text-2xl text-blue-100 mb-8 drop-shadow-md">{page.subtitle}</p>
               </div>

               {page.content.sections?.map((section, idx) => (
                    <div key={idx} className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-4 max-w-md shadow-xl border border-white/20">
                         <div className="flex items-center mb-3">
                              <span className="text-2xl mr-3">{section.icon}</span>
                              <h3 className="text-lg font-semibold">{section.title}</h3>
                         </div>
                         {section.points.map((point, pointIdx) => (
                              <p key={pointIdx} className="text-sm text-blue-100 mb-1">{point}</p>
                         ))}
                    </div>
               ))}

               <div className="mt-8 text-sm text-blue-200 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    Design Thinking Process • 45 Poin Total
               </div>
          </div>
     </div>
);

const ContentPage = ({ page }: { page: FlipbookPage }) => {
     const getPhaseIcon = (type: string) => {
          const icons = {
               discover: Users,
               define: Target,
               develop: Lightbulb,
               deliver: TestTube,
               'back-cover': CheckCircle
          };
          return icons[type as keyof typeof icons] || FileText;
     };

     const PhaseIcon = getPhaseIcon(page.type);

     return (
          <div className="w-full h-full bg-white relative overflow-hidden">
               {/* Header */}
               <div className={`bg-gradient-to-r ${page.content.backgroundColor || 'from-gray-600 to-gray-800'} text-white p-6`}>
                    <div className="flex items-center mb-2">
                         <PhaseIcon className="w-8 h-8 mr-3" />
                         <div>
                              <h1 className="text-2xl font-bold">{page.title}</h1>
                              {page.subtitle && <p className="text-sm opacity-90">{page.subtitle}</p>}
                         </div>
                    </div>
               </div>

               {/* Content */}
               <div className="p-6 space-y-6 h-full overflow-y-auto">
                    {page.content.sections?.map((section, idx) => (
                         <div key={idx} className="border-l-4 border-blue-500 pl-4 mb-6">
                              <div className="flex items-center mb-3">
                                   <span className="text-2xl mr-2">{section.icon}</span>
                                   <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
                              </div>
                              <div className="space-y-2">
                                   {section.points.map((point, pointIdx) => (
                                        <div key={pointIdx} className="flex items-start">
                                             <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                             <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                                        </div>
                                   ))}
                              </div>
                              {section.description && (
                                   <p className="text-sm text-gray-600 mt-2 italic">{section.description}</p>
                              )}
                         </div>
                    ))}

                    {/* Visualizations */}
                    {page.content.visualizations?.map((viz, idx) => (
                         <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-gray-800 mb-2">{viz.title}</h4>
                              <div className="bg-white rounded-lg p-8 border-2 border-dashed border-gray-300 text-center">
                                   <div className="text-gray-400 mb-2">
                                        {viz.type === 'chart' && '📊'}
                                        {viz.type === 'image' && '🖼️'}
                                        {viz.type === 'diagram' && '📋'}
                                        {viz.type === 'map' && '🗺️'}
                                   </div>
                                   <p className="text-sm text-gray-600">{viz.placeholder}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">{viz.description}</p>
                         </div>
                    ))}

                    {/* External Links */}
                    {page.content.links?.map((link, idx) => (
                         <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center">
                                        <ExternalLink className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="font-medium text-blue-800">{link.title}</span>
                                   </div>
                                   <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                        {link.type.toUpperCase()}
                                   </span>
                              </div>
                              <p className="text-sm text-blue-600 mt-1 font-mono">{link.url}</p>
                         </div>
                    ))}
               </div>
          </div>
     );
};

const BackCoverPage = ({ page }: { page: FlipbookPage }) => (
     <div className={`w-full h-full bg-gradient-to-br ${page.content.backgroundColor || 'from-slate-600 to-slate-800'} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-5">
               <div className="grid grid-cols-8 grid-rows-12 gap-4 h-full p-4">
                    {Array.from({ length: 96 }).map((_, i) => (
                         <div key={i} className="border border-white/20 rounded"></div>
                    ))}
               </div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-center">
               <CheckCircle className="w-16 h-16 mb-6 text-green-400" />
               <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
               <p className="text-lg text-slate-300 mb-8">{page.subtitle}</p>

               {page.content.sections?.map((section, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4 max-w-lg">
                         <div className="flex items-center mb-3">
                              <span className="text-xl mr-3">{section.icon}</span>
                              <h3 className="text-lg font-semibold">{section.title}</h3>
                         </div>
                         {section.points.map((point, pointIdx) => (
                              <p key={pointIdx} className="text-sm text-slate-300 mb-1">{point}</p>
                         ))}
                    </div>
               ))}

               <div className="mt-8 text-sm text-slate-400">
                    UI/UX Design Process • Completed Successfully
               </div>
          </div>
     </div>
);

export default function FlipbookPage() {
     const bookRef = useRef<HTMLDivElement>(null);
     const pageFlipRef = useRef<PageFlip | null>(null);
     const [currentPage, setCurrentPage] = useState(0);
     const [totalPages, setTotalPages] = useState(0);
     const [isFullscreen, setIsFullscreen] = useState(false);
     const [isLoading, setIsLoading] = useState(true);

     // Calculate progress percentage
     const progressPercentage = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

     useEffect(() => {
          if (!bookRef.current) return;

          // A4 ratio (210:297) scaled for screen
          const width = 420;
          const height = 594;

          const pageFlip = new PageFlip(bookRef.current, {
               width,
               height,
               maxShadowOpacity: 0.5,
               showCover: true,
               mobileScrollSupport: false,
               usePortrait: false,
               startZIndex: 0,
               autoSize: true,
               flippingTime: 1000,
          });

          pageFlipRef.current = pageFlip;

          // Load pages after a short delay to ensure DOM is ready
          setTimeout(() => {
               const pages = document.querySelectorAll('.flipbook-page') as NodeListOf<HTMLElement>;
               if (pages.length > 0) {
                    pageFlip.loadFromHTML(pages);
                    setTotalPages(pages.length);
                    setIsLoading(false);
               }
          }, 100);

          // Event listeners
          pageFlip.on('flip', (e) => {
               setCurrentPage(Number(e.data));
          });

          pageFlip.on('changeOrientation', () => {
               const pages = document.querySelectorAll('.flipbook-page') as NodeListOf<HTMLElement>;
               pageFlip.updateFromHtml(pages);
          });

          // Keyboard navigation
          const handleKeyPress = (e: KeyboardEvent) => {
               if (e.key === 'ArrowRight' || e.key === ' ') {
                    e.preventDefault();
                    pageFlip.flipNext();
               } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    pageFlip.flipPrev();
               } else if (e.key === 'Escape') {
                    if (document.fullscreenElement) {
                         document.exitFullscreen();
                         setIsFullscreen(false);
                    }
               }
          };

          document.addEventListener('keydown', handleKeyPress);

          return () => {
               document.removeEventListener('keydown', handleKeyPress);
               if (pageFlipRef.current) {
                    pageFlipRef.current.destroy();
               }
          };
     }, []);

     const flipToNext = () => {
          pageFlipRef.current?.flipNext();
     };

     const flipToPrev = () => {
          pageFlipRef.current?.flipPrev();
     };

     const toggleFullscreen = () => {
          if (!isFullscreen) {
               bookRef.current?.requestFullscreen();
          } else {
               document.exitFullscreen();
          }
          setIsFullscreen(!isFullscreen);
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex flex-col items-center justify-center p-4">
               {/* Progress Bar */}
               <div className="fixed top-0 left-0 w-full z-50">
                    <div className="h-1 bg-gray-200">
                         <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
                              style={{ width: `${progressPercentage}%` }}
                         ></div>
                    </div>
               </div>

               {/* Loading State */}
               {isLoading && (
                    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-40">
                         <div className="text-center">
                              <div className="loading-animation w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
                              <p className="text-lg font-medium text-gray-700">Loading Flipbook...</p>
                              <p className="text-sm text-gray-500">Preparing your UI/UX report</p>
                         </div>
                    </div>
               )}

               {/* Controls */}
               <div className="flex items-center justify-between w-full max-w-4xl mb-6">
                    <div className="flex items-center space-x-2">
                         <button
                              onClick={flipToPrev}
                              disabled={currentPage === 0}
                              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                              <ChevronLeft className="w-5 h-5" />
                              <span className="hidden sm:inline">Previous</span>
                         </button>

                         <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg font-medium">
                              {currentPage + 1} / {totalPages}
                         </span>

                         <button
                              onClick={flipToNext}
                              disabled={currentPage >= totalPages - 1}
                              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                              <span className="hidden sm:inline">Next</span>
                              <ChevronRight className="w-5 h-5" />
                         </button>
                    </div>

                    <div className="flex items-center space-x-2">
                         <button
                              onClick={() => pageFlipRef.current?.turnToPage(0)}
                              className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
                              title="Go to First Page"
                         >
                              <FileText className="w-5 h-5" />
                         </button>
                         
                         <button
                              onClick={toggleFullscreen}
                              className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
                              title="Toggle Fullscreen"
                         >
                              <Maximize className="w-5 h-5" />
                         </button>
                         
                         <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs">
                              <span className="font-medium">Progress: {Math.round(progressPercentage)}%</span>
                         </div>
                    </div>
               </div>

               {/* Flipbook Container */}
               <div className="relative">
                    <div ref={bookRef} className="shadow-2xl">
                         {flipbookData.map((page) => (
                              <div key={page.id} className="flipbook-page" data-density="hard">
                                   {page.type === 'cover' && <CoverPage page={page} />}
                                   {page.type === 'back-cover' && <BackCoverPage page={page} />}
                                   {!['cover', 'back-cover'].includes(page.type) && <ContentPage page={page} />}
                              </div>
                         ))}
                    </div>
               </div>

               {/* Footer Info */}
               <div className="mt-6 text-center text-slate-600 space-y-2">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
                         <p className="text-sm font-medium">
                              📚 Design Thinking Process Report • 📄 A4 Format • ⚡ Interactive Flipbook
                         </p>
                         <div className="flex items-center justify-center space-x-4 mt-2 text-xs">
                              <span>🖱️ Click and drag corners</span>
                              <span>⌨️ Use arrow keys</span>
                              <span>📱 Touch-friendly</span>
                              <span>🔄 {totalPages} total pages</span>
                         </div>
                    </div>
                    
                    <div className="text-xs opacity-70">
                         Built with Next.js + StPageFlip • Enhanced with Tailwind CSS
                    </div>
               </div>
          </div>
     );
}
