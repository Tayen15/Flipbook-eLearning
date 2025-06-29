'use client';

import { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import * as pdfjs from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, Maximize, Home } from 'lucide-react';

// Configure PDF.js worker - using local worker file
if (typeof window !== 'undefined') {
     pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export default function FlipbookClient() {
     const bookRef = useRef<HTMLDivElement>(null);
     const pageFlipRef = useRef<PageFlip | null>(null);

     const [currentPage, setCurrentPage] = useState(0);
     const [totalPages, setTotalPages] = useState(0);
     const [isFullscreen, setIsFullscreen] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [pageImages, setPageImages] = useState<string[]>([]);

     // Path to the uploaded PDF
     const pdfUrl = '/uploads/Flipbook.pdf';

     // Calculate progress percentage
     const progressPercentage = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

     // Convert PDF pages to images
     const convertPDFToImages = async () => {
          try {
               console.log('Starting PDF conversion...', { pdfUrl, workerSrc: pdfjs.GlobalWorkerOptions.workerSrc });
               
               const loadingTask = pdfjs.getDocument(pdfUrl);
               const pdf = await loadingTask.promise;
               
               console.log('PDF loaded successfully, pages:', pdf.numPages);
               const images: string[] = [];

               for (let i = 1; i <= pdf.numPages; i++) {
                    console.log(`Processing page ${i}/${pdf.numPages}`);
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    if (context) {
                         await page.render({
                              canvasContext: context,
                              viewport: viewport
                         }).promise;

                         images.push(canvas.toDataURL('image/jpeg', 0.8));
                    }
               }

               console.log('PDF conversion completed, total images:', images.length);
               setPageImages(images);
               return images;
          } catch (error) {
               console.error('Error converting PDF to images:', error);
               console.error('Error details:', {
                    message: error instanceof Error ? error.message : 'Unknown error',
                    stack: error instanceof Error ? error.stack : undefined,
                    pdfUrl,
                    workerSrc: pdfjs.GlobalWorkerOptions.workerSrc
               });
               setIsLoading(false);
               alert(`Error loading PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
               return [];
          }
     };

     useEffect(() => {
          convertPDFToImages();
     }, []);

     useEffect(() => {
          const initFlipbook = () => {
               if (!bookRef.current || pageImages.length === 0) return;

               // A4 dimensions: 210mm x 297mm converted to pixels for web display
               // A4 ratio is 210:297 = 1:1.414 (√2 ratio)
               // Using 2.8x scale factor: 210mm * 2.8 ≈ 588px, 297mm * 2.8 ≈ 832px
               // This provides better clarity while maintaining exact A4 proportions
                  // Calculate dimensions based on screen size while maintaining A4 ratio (√2)
                  const maxHeight = window.innerHeight * 0.7; // 70% of screen height
                  const maxWidth = window.innerWidth * 0.8;   // 80% of screen width
                  
                  // A4 ratio is 1:√2 (approximately 1:1.414)
                  const a4Ratio = 1.414;
                  
                  // Calculate optimal dimensions maintaining A4 ratio
                  let width = maxHeight / a4Ratio;
                  let height = maxHeight;
                  
                  // If width exceeds max width, scale down
                  if (width > maxWidth) {
                         width = maxWidth;
                         height = maxWidth * a4Ratio;
                  }
                  
                  // Ensure minimum readable size
                  const minWidth = 400;
                  const minHeight = minWidth * a4Ratio;
                  
                  if (width < minWidth) {
                         width = minWidth;
                         height = minHeight;
                  }

               const pageFlip = new PageFlip(bookRef.current, {
                    width,
                    height,
                    maxShadowOpacity: 0.5,
                    showCover: false,
                    mobileScrollSupport: false,
                    usePortrait: true,
                    startZIndex: 0,
                    autoSize: true,
                    flippingTime: 800,
                    drawShadow: true
               });

               pageFlipRef.current = pageFlip;

               // Load images into flipbook using the documented method
               pageFlip.loadFromImages(pageImages);
               setTotalPages(pageImages.length);
               setIsLoading(false);

               // Event listeners
               pageFlip.on('flip', (e) => {
                    setCurrentPage(Number(e.data));
               });

               pageFlip.on('changeOrientation', () => {
                    // Handle orientation change if needed
               });
          };

          if (pageImages.length > 0) {
               initFlipbook();
          }
     }, [pageImages]);

     useEffect(() => {
          // Keyboard navigation
          const handleKeyPress = (e: KeyboardEvent) => {
               if (!pageFlipRef.current) return;

               if (e.key === 'ArrowRight' || e.key === ' ') {
                    e.preventDefault();
                    pageFlipRef.current.flipNext();
               } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    pageFlipRef.current.flipPrev();
               } else if (e.key === 'Escape') {
                    if (document.fullscreenElement) {
                         document.exitFullscreen();
                         setIsFullscreen(false);
                    }
               }
          };

          document.addEventListener('keydown', handleKeyPress);
          return () => document.removeEventListener('keydown', handleKeyPress);
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

     const goToFirstPage = () => {
          pageFlipRef.current?.turnToPage(0);
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
               {/* Progress Bar */}
               <div className="fixed top-0 left-0 w-full z-50">
                    <div className="h-2 bg-black/20">
                         <div
                              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-lg"
                              style={{ width: `${progressPercentage}%` }}
                         ></div>
                    </div>
               </div>

               {/* Loading State */}
               {isLoading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-40">
                         <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                              <div className="animate-spin w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-6"></div>
                              <p className="text-2xl font-bold text-white mb-2">Loading Flipbook</p>
                              <p className="text-cyan-200">Converting PDF to interactive experience...</p>
                         </div>
                    </div>
               )}

               {/* Header */}
               <div className="w-full max-w-6xl mb-8 text-center">
                    <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                         Digital Flipbook
                    </h1>
                    <p className="text-xl text-cyan-100 font-medium">Experience PDFs like never before</p>
               </div>

               {/* Controls */}
               <div className="flex items-center justify-center w-full max-w-4xl mb-8">
                    <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/10">
                         <button
                              onClick={flipToPrev}
                              disabled={currentPage === 0}
                              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                         >
                              <ChevronLeft className="w-5 h-5" />
                              <span className="font-semibold">Prev</span>
                         </button>

                         <div className="flex items-center space-x-4">
                              <span className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-xl font-bold text-white text-lg">
                                   {currentPage + 1} / {totalPages}
                              </span>

                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-white text-sm font-semibold">
                                   {Math.round(progressPercentage)}%
                              </div>
                         </div>

                         <button
                              onClick={flipToNext}
                              disabled={currentPage >= totalPages - 1}
                              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                         >
                              <span className="font-semibold">Next</span>
                              <ChevronRight className="w-5 h-5" />
                         </button>

                         <div className="w-px h-8 bg-white/20 mx-2"></div>

                         <button
                              onClick={goToFirstPage}
                              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                              title="Go to First Page"
                         >
                              <Home className="w-5 h-5 text-white" />
                         </button>

                         <button
                              onClick={toggleFullscreen}
                              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                              title="Toggle Fullscreen"
                         >
                              <Maximize className="w-5 h-5 text-white" />
                         </button>
                    </div>
               </div>

               {/* Flipbook Container */}
               <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur opacity-30"></div>
                    <div ref={bookRef} className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20"></div>
               </div>

               {/* Footer Controls */}
               <div className="text-center text-white/80 space-y-4">
                    <div className="bg-black/20 backdrop-blur-xl rounded-xl px-8 py-4 border border-white/10 max-w-2xl mx-auto">
                         <p className="text-lg font-semibold mb-3 text-cyan-200">Interactive Controls</p>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                   <span className="text-cyan-400">🖱️</span>
                                   <span>Click & Drag</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                   <span className="text-purple-400">⌨️</span>
                                   <span>Arrow Keys</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                   <span className="text-pink-400">📱</span>
                                   <span>Touch Friendly</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                   <span className="text-cyan-400">📄</span>
                                   <span>{totalPages} Pages</span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
