'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize, ZoomIn, ZoomOut, Users, Target, Lightbulb, TestTube, CheckCircle, Book, Map, Milestone, ClipboardCheck } from 'lucide-react';

// --- DATA KONTEN FLIPBOOK ---
// Konten diperbarui sesuai data sementara yang Anda berikan.
const pageData = [
     // 1. Cover
     {
          type: 'cover',
          title: 'Studi Kasus UI/UX: Desain Aplikasi Mobile E-Learning yang Berpusat pada Mahasiswa',
          team: 'Tim Desain UI/UX',
          logo: 'https://placehold.co/150x150/F5F5F5/123458?text=Logo', // Placeholder untuk logo
          description: 'Proyek ini bertujuan merancang aplikasi mobile e-learning yang intuitif untuk mahasiswa, dengan fokus pada akses cepat ke jadwal, tugas, dan materi untuk mengurangi beban kognitif.'
     },
     // 2. Discover (Empathize)
     {
          type: 'discover',
          title: 'Discover (Empathize)',
          mainQuote: '"Hal yang paling saya butuhkan setiap pagi adalah: kelas hari ini jam berapa dan di mana."',
          surveyFinding: '78% mahasiswa merasa kesulitan melacak semua deadline tugas.',
          personaName: 'Rahman',
          personaAge: '20 Tahun',
          personaJob: 'Mahasiswa Teknik Informatika',
          personaGoals: ['Lulus tepat waktu dengan nilai baik.', 'Menyeimbangkan waktu kuliah, tugas, dan organisasi.'],
          personaFrustrations: ['Sering bingung melacak deadline.', 'Kesulitan menemukan materi kuliah.', 'Antarmuka portal akademik rumit.'],
          userFlow: 'Home > Halaman Tugas > Detail Tugas > Tambah Submission > Konfirmasi'
     },
     // 3. Define
     {
          type: 'define',
          title: 'Define (Problem Statement)',
          problemStatement: 'Mahasiswa yang sibuk seperti Rahman membutuhkan sebuah platform mobile yang terpusat dan mudah digunakan untuk melihat jadwal harian, mengakses materi, dan mengelola tugas-tugasnya secara efisien, agar tidak ada informasi atau deadline penting yang terlewatkan sehingga ia dapat lebih fokus pada proses pembelajaran.'
     },
     // 4. Develop
     {
          type: 'develop',
          title: 'Develop',
          solutions: [
               { title: 'Dashboard Utama', description: 'Menyajikan info relevan: jadwal hari ini dan tugas terdekat.' },
               { title: 'Navigasi Cepat', description: 'Akses cepat ke Courses, Assignments, Grades, dan Schedule.' },
               { title: 'Alur Pengumpulan Tugas Jelas', description: 'Proses unggah tugas yang sederhana dengan feedback yang jelas.' },
          ],
          prototypeImage: 'https://placehold.co/800x600/e2e8f0/4a5568?text=Prototipe+High-Fidelity'
     },
     // 5. Deliver
     {
          type: 'deliver',
          title: 'Deliver',
          mission1Success: '90%',
          mission1Finding: 'Beberapa pengguna (10%) menginginkan informasi lokasi/platform dibuat lebih menonjol.',
          mission2Success: '80%',
          mission2Finding: 'Beberapa pengguna (20%) sempat bingung saat mencari tombol "Add Submission" yang kurang kontras.',
          feedback: '"Tampilan jadwal di halaman depan sangat membantu, saya suka itu."',
          revisions: [
               'Menambahkan ikon lokasi/kamera pada kartu jadwal.',
               'Mengubah gaya tombol "Add Submission" menjadi lebih menonjol.',
               'Menambahkan halaman konfirmasi setelah tugas diunggah.'
          ]
     },
     // 6. Kesimpulan
     {
          type: 'conclusion',
          title: 'Kesimpulan & Roadmap',
          summary: 'Desain aplikasi ini berhasil menjawab kebutuhan utama mahasiswa dengan menyediakan dashboard informatif, navigasi jelas, dan alur kerja efisien, menghasilkan produk yang lebih intuitif dan fungsional.',
          roadmap: [
               { phase: 'Fase 2', task: 'Pengembangan fitur Notifikasi Push.' },
               { phase: 'Fase 3', task: 'Integrasi Kalender pribadi pengguna.' },
               { phase: 'Fase 4', task: 'Pengembangan fitur Laporan Kemajuan Belajar.' },
          ]
     }
];

const totalPages = pageData.length;

// --- KOMPONEN HALAMAN ---

const CoverPage = ({ page }) => (
     <div className="h-full bg-gradient-to-br from-[#123458] to-[#1e4a7a] text-white flex flex-col justify-center items-center p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=\'40\'%20height=\'40\'%20viewBox=\'0%200%2040%2040\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'white\'%20fill-opacity=\'0.05\'%3E%3Cpath%20d=\'M20%2020c0-11.046-8.954-20-20-20v20h20z\'/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <img src={page.logo} alt="Logo Proyek" className="w-24 h-24 mb-6 rounded-full bg-white/20 p-2" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">{page.title}</h1>
          <p className="text-lg font-light mb-8 max-w-3xl">{page.description}</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
               <p className="font-semibold">{page.team}</p>
          </div>
     </div>
);

const DiscoverPage = ({ page }) => (
     <div className="h-full bg-[#F5F5F5] p-8 overflow-y-auto">
          <div className="flex items-center mb-6"><Users className="w-8 h-8 text-[#123458] mr-3" /><h2 className="text-3xl font-bold text-[#123458]">{page.title}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                    <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 italic text-blue-800">"{page.mainQuote}"</blockquote>
                    <div className="bg-white p-4 rounded-lg shadow"><h3 className="font-bold text-[#123458] mb-2">User Persona: {page.personaName}</h3><p>{page.personaAge}, {page.personaJob}</p><h4 className="font-semibold mt-3">Goals:</h4><ul className="list-disc pl-5 text-sm"> {page.personaGoals.map(g => <li key={g}>{g}</li>)} </ul><h4 className="font-semibold mt-3 text-red-600">Frustrations:</h4><ul className="list-disc pl-5 text-sm">{page.personaFrustrations.map(f => <li key={f}>{f}</li>)}</ul></div>
               </div>
               <div>
                    <div className="bg-white p-4 rounded-lg shadow mb-4"><h3 className="font-bold text-[#123458] mb-2">Temuan Survei</h3><p className="text-2xl font-bold text-[#123458]">{page.surveyFinding}</p></div>
                    <div className="bg-white p-4 rounded-lg shadow"><h3 className="font-bold text-[#123458] mb-2">Contoh User Flow</h3><div className="flex items-center space-x-2 text-sm overflow-x-auto p-1">{page.userFlow.split('>').map((step, i, arr) => (<React.Fragment key={step}><span className="bg-[#123458]/10 px-2 py-1 rounded">{step.trim()}</span>{i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400" />}</React.Fragment>))}</div></div>
               </div>
          </div>
     </div>
);

const DefinePage = ({ page }) => (
     <div className="h-full bg-[#F5F5F5] p-8 flex flex-col justify-center items-center text-center">
          <div className="flex items-center mb-6"><Target className="w-10 h-10 text-[#123458] mr-3" /><h2 className="text-3xl font-bold text-[#123458]">{page.title}</h2></div>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
               <h3 className="text-xl font-semibold text-[#123458] mb-4">Problem Statement</h3>
               <p className="text-lg text-gray-700 leading-relaxed">{page.problemStatement}</p>
          </div>
     </div>
);

const DevelopPage = ({ page }) => (
     <div className="h-full bg-[#F5F5F5] p-8 overflow-y-auto">
          <div className="flex items-center mb-6"><Lightbulb className="w-8 h-8 text-[#123458] mr-3" /><h2 className="text-3xl font-bold text-[#123458]">{page.title}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                    <h3 className="font-bold text-[#123458] mb-3 text-xl">Ide Solusi</h3>
                    <div className="space-y-4">{page.solutions.map(sol => (<div key={sol.title} className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold text-[#123458]">{sol.title}</h4><p className="text-sm text-gray-600">{sol.description}</p></div>))}</div>
               </div>
               <div>
                    <h3 className="font-bold text-[#123458] mb-3 text-xl">Prototipe High-Fidelity</h3>
                    <img src={page.prototypeImage} alt="Prototipe" className="rounded-lg shadow-lg w-full" />
               </div>
          </div>
     </div>
);

const DeliverPage = ({ page }) => (
     <div className="h-full bg-[#F5F5F5] p-8 overflow-y-auto">
          <div className="flex items-center mb-6"><TestTube className="w-8 h-8 text-[#123458] mr-3" /><h2 className="text-3xl font-bold text-[#123458]">{page.title}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                    <h3 className="font-bold text-[#123458] mb-3 text-xl">Hasil Uji Coba</h3>
                    <div className="space-y-4">
                         <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold">Misi 1: Mencari Detail Kelas</h4><p className="text-2xl font-bold text-green-600">{page.mission1Success}</p><p className="text-sm text-gray-600">{page.mission1Finding}</p></div>
                         <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-semibold">Misi 2: Mengumpulkan Tugas</h4><p className="text-2xl font-bold text-green-600">{page.mission2Success}</p><p className="text-sm text-gray-600">{page.mission2Finding}</p></div>
                    </div>
                    <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 italic text-blue-800">"{page.feedback}"</blockquote>
               </div>
               <div>
                    <h3 className="font-bold text-[#123458] mb-3 text-xl">Revisi Desain</h3>
                    <ul className="list-disc pl-5 space-y-2 bg-white p-4 rounded-lg shadow">{page.revisions.map(rev => <li key={rev}>{rev}</li>)}</ul>
               </div>
          </div>
     </div>
);

const ConclusionPage = ({ page }) => (
     <div className="h-full bg-[#F5F5F5] p-8 overflow-y-auto">
          <div className="flex items-center mb-6"><Milestone className="w-8 h-8 text-[#123458] mr-3" /><h2 className="text-3xl font-bold text-[#123458]">{page.title}</h2></div>
          <div className="space-y-6">
               <div className="bg-white p-6 rounded-lg shadow"><h3 className="font-bold text-[#123458] mb-2">Ringkasan Solusi</h3><p>{page.summary}</p></div>
               <div>
                    <h3 className="font-bold text-[#123458] mb-3 text-xl">Rencana ke Depan (Roadmap)</h3>
                    <div className="space-y-2">{page.roadmap.map(item => (<div key={item.phase} className="flex items-center bg-white p-3 rounded-lg shadow"><span className="bg-[#123458] text-white text-sm font-bold px-3 py-1 rounded-full mr-4">{item.phase}</span><p>{item.task}</p></div>))}</div>
               </div>
          </div>
     </div>
);

// --- Page Dispatcher ---
const PageContent = ({ page }) => {
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

// --- Custom Hook for Sound ---
const usePageFlipSound = () => {
     return useCallback(() => {
          try {
               const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
          } catch (e) {
               console.log("Web Audio API not supported or failed.");
          }
     }, []);
};

// --- KOMPONEN UTAMA ---
export default function Flipbook() {
     const [currentPage, setCurrentPage] = useState(0);
     const [isFullscreen, setIsFullscreen] = useState(false);
     const [zoom, setZoom] = useState(1);
     const flipbookRef = useRef(null);
     const playFlipSound = usePageFlipSound();

     const changePage = useCallback((newPage) => {
          if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
               setCurrentPage(newPage);
               playFlipSound();
          }
     }, [currentPage, playFlipSound]);

     const toggleFullscreen = useCallback(() => {
          if (!document.fullscreenElement) {
               flipbookRef.current?.requestFullscreen().catch(err => console.error(err));
          } else {
               document.exitFullscreen();
          }
     }, []);

     useEffect(() => {
          const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
          document.addEventListener('fullscreenchange', onFullscreenChange);
          return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
     }, []);

     const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
     const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.8));

     return (
          <div ref={flipbookRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 font-sans">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

               <div className="absolute top-6 right-6 flex space-x-2 z-20">
                    <button onClick={zoomOut} className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors" title="Zoom Out"><ZoomOut className="w-5 h-5" /></button>
                    <button onClick={zoomIn} className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors" title="Zoom In"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={toggleFullscreen} className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors" title="Fullscreen"><Maximize className="w-5 h-5" /></button>
               </div>

               <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300" style={{ transform: `scale(${zoom})`, width: isFullscreen ? '95vw' : '80vw', height: isFullscreen ? '90vh' : '70vh', maxWidth: '1200px', aspectRatio: '16/10' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#123458] to-[#1e4a7a] shadow-inner z-10"></div>
                    <div className="absolute left-2 top-0 bottom-0 w-1 bg-white/20 rounded-full z-10"></div>

                    <div className="ml-6 h-full relative overflow-hidden">
                         <div className="h-full transition-transform duration-700 ease-in-out flex" style={{ transform: `translateX(-${currentPage * 100}%)`, width: `${totalPages * 100}%` }}>
                              {pageData.map((page, index) => (
                                   <div key={index} className="flex-shrink-0 w-full h-full bg-[#F5F5F5]">
                                        <PageContent page={page} />
                                   </div>
                              ))}
                         </div>
                    </div>

                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0} className="absolute left-8 top-1/2 -translate-y-1/2 bg-[#123458]/80 text-white p-3 rounded-full hover:bg-[#123458] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg z-20"><ChevronLeft className="w-6 h-6" /></button>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages - 1} className="absolute right-8 top-1/2 -translate-y-1/2 bg-[#123458]/80 text-white p-3 rounded-full hover:bg-[#123458] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg z-20"><ChevronRight className="w-6 h-6" /></button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                         {pageData.map((_, index) => (
                              <button key={index} onClick={() => changePage(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentPage ? 'bg-[#123458]' : 'bg-gray-300 hover:bg-gray-400'}`} />
                         ))}
                    </div>
                    <div className="absolute bottom-4 right-6 text-sm text-gray-500 font-medium z-20">
                         {currentPage + 1} / {totalPages}
                    </div>
               </div>
          </div>
     );
};
