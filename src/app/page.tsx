/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, ZoomIn, ZoomOut, Users, Target, Lightbulb, TestTube, Milestone } from 'lucide-react';

interface BasePageData {
     type: 'cover' | 'discover' | 'define' | 'develop' | 'deliver' | 'conclusion';
     title: string;
}

interface CoverPageData extends BasePageData {
     type: 'cover';
     team: string;
     logo: string;
     description: string;
}

interface DiscoverPageData extends BasePageData {
     type: 'discover';
     mainQuote: string;
     surveyFinding: string;
     personaName: string;
     personaAge: string;
     personaJob: string;
     personaGoals: string[];
     personaFrustrations: string[];
     userFlow: string;
}

interface DefinePageData extends BasePageData {
     type: 'define';
     problemStatement: string;
}

interface DevelopPageData extends BasePageData {
     type: 'develop';
     solutions: { title: string; description: string }[];
     prototypeImage: string;
}

interface DeliverPageData extends BasePageData {
     type: 'deliver';
     mission1Success: string;
     mission1Finding: string;
     mission2Success: string;
     mission2Finding: string;
     feedback: string;
     revisions: string[];
}

interface ConclusionPageData extends BasePageData {
     type: 'conclusion';
     summary: string;
     roadmap: { phase: string; task: string }[];
}

// Union type yang solid tanpa 'any'
type PageData = CoverPageData | DiscoverPageData | DefinePageData | DevelopPageData | DeliverPageData | ConclusionPageData;


// --- DATA KONTEN FLIPBOOK ---
const pageData: PageData[] = [
     { type: 'cover', title: 'Studi Kasus UI/UX: Desain Aplikasi Mobile E-Learning', team: 'Tim Desain UI/UX', logo: 'https://placehold.co/150x150/F5F5F5/123458?text=Logo', description: 'Merancang aplikasi mobile e-learning yang intuitif dengan fokus pada akses cepat ke jadwal, tugas, dan materi untuk mengurangi beban kognitif mahasiswa.' },
     { type: 'discover', title: 'Discover (Empathize)', mainQuote: 'Hal yang paling saya butuhkan setiap pagi adalah: kelas hari ini jam berapa dan di mana.', surveyFinding: '78% mahasiswa merasa kesulitan melacak semua deadline tugas.', personaName: 'Rahman', personaAge: '20 Tahun', personaJob: 'Mahasiswa Teknik Informatika', personaGoals: ['Lulus tepat waktu dengan nilai baik.', 'Menyeimbangkan waktu kuliah, tugas, dan organisasi.'], personaFrustrations: ['Sering bingung melacak deadline.', 'Kesulitan menemukan materi kuliah.', 'Antarmuka portal akademik rumit.'], userFlow: 'Home > Halaman Tugas > Detail Tugas > Tambah Submission > Konfirmasi' },
     { type: 'define', title: 'Define (Problem Statement)', problemStatement: 'Mahasiswa sibuk seperti Rahman membutuhkan platform mobile terpusat dan mudah digunakan untuk melihat jadwal, mengakses materi, dan mengelola tugas secara efisien, agar tidak ada informasi atau deadline penting yang terlewatkan.' },
     { type: 'develop', title: 'Develop', solutions: [{ title: 'Dashboard Utama', description: 'Menyajikan info relevan: jadwal hari ini dan tugas terdekat.' }, { title: 'Navigasi Cepat', description: 'Akses cepat ke Courses, Assignments, Grades, dan Schedule.' }, { title: 'Alur Pengumpulan Tugas Jelas', description: 'Proses unggah tugas yang sederhana dengan feedback yang jelas.' }], prototypeImage: 'https://placehold.co/800x600/123458/F5F5F5?text=Prototipe+High-Fidelity' },
     { type: 'deliver', title: 'Deliver', mission1Success: '90%', mission1Finding: 'Beberapa pengguna (10%) menginginkan informasi lokasi/platform dibuat lebih menonjol.', mission2Success: '80%', mission2Finding: 'Beberapa (20%) bingung saat mencari tombol "Add Submission" yang kurang kontras.', feedback: 'Tampilan jadwal di halaman depan sangat membantu, saya suka itu.', revisions: ['Menambahkan ikon lokasi/kamera pada kartu jadwal.', 'Mengubah gaya tombol "Add Submission" menjadi lebih menonjol.', 'Menambahkan halaman konfirmasi setelah tugas diunggah.'] },
     { type: 'conclusion', title: 'Kesimpulan & Roadmap', summary: 'Desain aplikasi ini berhasil menjawab kebutuhan utama mahasiswa dengan menyediakan dashboard informatif, navigasi jelas, dan alur kerja efisien, menghasilkan produk yang lebih intuitif dan fungsional.', roadmap: [{ phase: 'Fase 2', task: 'Pengembangan fitur Notifikasi Push.' }, { phase: 'Fase 3', task: 'Integrasi Kalender pribadi pengguna.' }, { phase: 'Fase 4', task: 'Pengembangan fitur Laporan Kemajuan Belajar.' }] }
];

const totalPages = pageData.length;

// --- KOMPONEN HALAMAN ---

const CoverPage = ({ page }: { page: CoverPageData }) => (
     <div className="h-full bg-gradient-to-br from-[#123458] to-[#1e4a7a] text-white flex flex-col justify-center items-center p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=\'40\'%20height=\'40\'%20viewBox=\'0%200%2040%2040\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'white\'%20fill-opacity=\'0.05\'%3E%3Cpath%20d=\'M20%2020c0-11.046-8.954-20-20-20v20h20z\'/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <motion.img
               initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
               src={page.logo}
               alt="Logo Proyek"
               className="w-24 h-24 mb-6 rounded-full bg-white/20 p-2 shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl text-slate-100">{page.title}</h1>
          <p className="text-lg font-light mb-8 max-w-3xl text-slate-300">{page.description}</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
               <p className="font-semibold text-slate-200">{page.team}</p>
          </div>
     </div>
);

const PageLayout = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
     <div className="h-full bg-[#F5F5F5] p-6 md:p-8 overflow-y-auto text-slate-800">
          <div className="flex items-center mb-6">
               <Icon className="w-8 h-8 text-[#123458] mr-3" />
               <h2 className="text-3xl font-bold text-[#123458]">{title}</h2>
          </div>
          {children}
     </div>
);

const DiscoverPage = ({ page }: { page: DiscoverPageData }) => (
     <PageLayout title={page.title} icon={Users}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                    <blockquote className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4 italic text-blue-900">&quot;{page.mainQuote}&quot;</blockquote>
                    <div className="bg-white p-4 rounded-lg shadow-sm"><h3 className="font-bold text-[#123458] mb-2">User Persona: {page.personaName}</h3><p className="text-slate-600">{page.personaAge}, {page.personaJob}</p><h4 className="font-semibold mt-3 text-slate-700">Goals:</h4><ul className="list-disc pl-5 text-sm text-slate-600"> {page.personaGoals.map((g) => <li key={g}>{g}</li>)} </ul><h4 className="font-semibold mt-3 text-red-700">Frustrations:</h4><ul className="list-disc pl-5 text-sm text-red-700">{page.personaFrustrations.map((f) => <li key={f}>{f}</li>)}</ul></div>
               </div>
               <div>
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4"><h3 className="font-bold text-[#123458] mb-2">Temuan Survei</h3><p className="text-2xl font-bold text-[#123458]">{page.surveyFinding}</p></div>
                    <div className="bg-white p-4 rounded-lg shadow-sm"><h3 className="font-bold text-[#123458] mb-2">Contoh User Flow</h3><div className="flex items-center flex-wrap gap-2 text-sm p-1">{page.userFlow.split('>').map((step, i, arr) => (<React.Fragment key={step}><span className="bg-[#123458]/10 px-2 py-1 rounded-md font-medium text-slate-700">{step.trim()}</span>{i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400" />}</React.Fragment>))}</div></div>
               </div>
          </div>
     </PageLayout>
);

const DefinePage = ({ page }: { page: DefinePageData }) => (
     <div className="h-full bg-[#F5F5F5] p-8 flex flex-col justify-center items-center text-center">
          <div className="flex items-center mb-6"><Target className="w-10 h-10 text-[#123458] mr-3" /><h2 className="text-3xl font-bold text-[#123458]">{page.title}</h2></div>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
               <h3 className="text-xl font-semibold text-slate-800 mb-4">Problem Statement</h3>
               <p className="text-lg text-slate-700 leading-relaxed">{page.problemStatement}</p>
          </div>
     </div>
);

const DevelopPage = ({ page }: { page: DevelopPageData }) => (
     <PageLayout title={page.title} icon={Lightbulb}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                    <h3 className="font-bold text-slate-800 mb-3 text-xl">Ide Solusi</h3>
                    <div className="space-y-4">{page.solutions.map((sol) => (<div key={sol.title} className="bg-white p-4 rounded-lg shadow-sm"><h4 className="font-semibold text-[#123458]">{sol.title}</h4><p className="text-sm text-slate-600">{sol.description}</p></div>))}</div>
               </div>
               <div>
                    <h3 className="font-bold text-slate-800 mb-3 text-xl">Prototipe High-Fidelity</h3>
                    <img src={page.prototypeImage} alt="Prototipe" className="rounded-lg shadow-lg w-full" />
               </div>
          </div>
     </PageLayout>
);

const DeliverPage = ({ page }: { page: DeliverPageData }) => (
     <PageLayout title={page.title} icon={TestTube}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                    <h3 className="font-bold text-slate-800 mb-3 text-xl">Hasil Uji Coba</h3>
                    <div className="space-y-4">
                         <div className="bg-white p-4 rounded-lg shadow-sm"><h4 className="font-semibold text-slate-700">Misi 1: Mencari Detail Kelas</h4><p className="text-2xl font-bold text-green-600">{page.mission1Success}</p><p className="text-sm text-slate-600">{page.mission1Finding}</p></div>
                         <div className="bg-white p-4 rounded-lg shadow-sm"><h4 className="font-semibold text-slate-700">Misi 2: Mengumpulkan Tugas</h4><p className="text-2xl font-bold text-red-600">{page.mission2Success}</p><p className="text-sm text-slate-600">{page.mission2Finding}</p></div>
                    </div>
                    <blockquote className="bg-blue-100 border-l-4 border-blue-500 p-4 mt-6 italic text-blue-900">&quot;{page.feedback}&quot;</blockquote>
               </div>
               <div>
                    <h3 className="font-bold text-slate-800 mb-3 text-xl">Revisi Desain</h3>
                    <ul className="list-disc pl-5 space-y-2 bg-white p-4 rounded-lg shadow-sm text-slate-700">{page.revisions.map((rev) => <li key={rev}>{rev}</li>)}</ul>
               </div>
          </div>
     </PageLayout>
);

const ConclusionPage = ({ page }: { page: ConclusionPageData }) => (
     <PageLayout title={page.title} icon={Milestone}>
          <div className="space-y-6">
               <div className="bg-white p-6 rounded-lg shadow-sm"><h3 className="font-bold text-slate-800 mb-2">Ringkasan Solusi</h3><p className="text-slate-700">{page.summary}</p></div>
               <div>
                    <h3 className="font-bold text-slate-800 mb-3 text-xl">Rencana ke Depan (Roadmap)</h3>
                    <div className="space-y-2">{page.roadmap.map((item) => (<div key={item.phase} className="flex items-center bg-white p-3 rounded-lg shadow-sm"><span className="bg-[#123458] text-white text-sm font-bold px-3 py-1 rounded-full mr-4">{item.phase}</span><p className="text-slate-700">{item.task}</p></div>))}</div>
               </div>
          </div>
     </PageLayout>
);

const PageContent = ({ page }: { page: PageData }) => {
     switch (page.type) {
          case 'cover': return <CoverPage page={page} />;
          case 'discover': return <DiscoverPage page={page} />;
          case 'define': return <DefinePage page={page} />;
          case 'develop': return <DevelopPage page={page} />;
          case 'deliver': return <DeliverPage page={page} />;
          case 'conclusion': return <ConclusionPage page={page} />;
          default: return <div className="p-8">Konten belum tersedia.</div>;
     }
};

const usePageFlipSound = () => {
     return useCallback(() => {
          try {
               const audioContext = new (window.AudioContext)();
               const oscillator = audioContext.createOscillator();
               const gainNode = audioContext.createGain();
               oscillator.connect(gainNode);
               gainNode.connect(audioContext.destination);
               oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
               oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
               gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
               gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
               oscillator.start(audioContext.currentTime);
               oscillator.stop(audioContext.currentTime + 0.1);
          } catch (error) {
               console.error("Web Audio API not supported or failed:", error);
          }
     }, []);
};

// --- KOMPONEN UTAMA ---
export default function Flipbook() {
     const [currentPage, setCurrentPage] = useState(0);
     const [zoom, setZoom] = useState(1);
     const flipbookRef = useRef<HTMLDivElement>(null);
     const playFlipSound = usePageFlipSound();

     const changePage = useCallback((newPage: number) => {
          if (newPage >= 0 && newPage < totalPages) {
               setCurrentPage(newPage);
               playFlipSound();
          }
     }, [playFlipSound]);

     const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
          const dragThreshold = 50;
          if (info.offset.x < -dragThreshold) {
               changePage(currentPage + 1);
          } else if (info.offset.x > dragThreshold) {
               changePage(currentPage - 1);
          }
     };

     const toggleFullscreen = useCallback(() => {
          if (flipbookRef.current) {
               if (!document.fullscreenElement) {
                    flipbookRef.current.requestFullscreen().catch(err => console.error(err));
               } else {
                    document.exitFullscreen();
               }
          }
     }, []);

     useEffect(() => {
          const onFullscreenChange = () => {
               // Logika bisa ditambahkan di sini jika perlu bereaksi pada perubahan fullscreen
          };
          document.addEventListener('fullscreenchange', onFullscreenChange);
          return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
     }, []);

     const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
     const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.8));

     return (
          <div ref={flipbookRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4 font-sans">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

               <div className="absolute top-4 right-4 md:top-6 md:right-6 flex space-x-2 z-50">
                    <button onClick={zoomOut} className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors" title="Zoom Out"><ZoomOut className="w-5 h-5" /></button>
                    <button onClick={zoomIn} className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors" title="Zoom In"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={toggleFullscreen} className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors" title="Fullscreen"><Maximize className="w-5 h-5" /></button>
               </div>

               <div className="w-full max-w-5xl aspect-[16/9] relative" style={{ perspective: '2000px', transform: `scale(${zoom})` }}>
                    <div className="absolute inset-0 bg-[#F5F5F5] rounded-lg shadow-2xl"></div>

                    {pageData.map((page, index) => {
                         const isFlipped = index < currentPage;
                         const zIndex = totalPages - index;
                         return (
                              <motion.div
                                   key={index}
                                   className="absolute inset-0 w-full h-full"
                                   style={{
                                        transformStyle: 'preserve-3d',
                                        transformOrigin: 'left center',
                                        zIndex: zIndex,
                                   }}
                                   initial={{ rotateY: 0 }}
                                   animate={{ rotateY: isFlipped ? -180 : 0 }}
                                   transition={{ duration: 0.6, ease: 'easeInOut' }}
                                   drag={!isFlipped && index === currentPage ? "x" : false}
                                   dragConstraints={{ left: 0, right: 0 }}
                                   onDragEnd={handleDragEnd}
                              >
                                   <div className="absolute w-full h-full rounded-r-lg shadow-lg overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                                        <PageContent page={page} />
                                   </div>
                                   <div className="absolute w-full h-full bg-slate-200 rounded-l-lg shadow-inner overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                        <div className="flex h-full w-full items-center justify-center">
                                             <p className="text-slate-400">Halaman Belakang</p>
                                        </div>
                                   </div>
                              </motion.div>
                         );
                    })}
               </div>

               <div className="flex items-center justify-center space-x-4 mt-8 z-50">
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0} className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft className="w-6 h-6" /></button>
                    <div className="text-white/80 font-medium text-lg">{currentPage + 1} / {totalPages}</div>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages - 1} className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="w-6 h-6" /></button>
               </div>
          </div>
     );
};
