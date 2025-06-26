// UI/UX Design Process Flipbook Content
export interface FlipbookPage {
  id: string;
  type: 'cover' | 'discover' | 'define' | 'develop' | 'deliver' | 'back-cover';
  title: string;
  subtitle?: string;
  content: FlipbookContent;
}

export interface FlipbookContent {
  sections?: ContentSection[];
  visualizations?: Visualization[];
  links?: ExternalLink[];
  backgroundColor?: string;
  backgroundImage?: string;
}

export interface ContentSection {
  title: string;
  points: string[];
  description?: string;
  icon?: string;
}

export interface Visualization {
  type: 'chart' | 'image' | 'diagram' | 'map';
  title: string;
  description: string;
  placeholder?: string;
  data?: Record<string, unknown>;
}

export interface ExternalLink {
  title: string;
  url: string;
  type: 'figma' | 'maze' | 'other';
}

export const flipbookData: FlipbookPage[] = [
  // Cover Page
  {
    id: 'cover',
    type: 'cover',
    title: 'Laporan Akhir',
    subtitle: 'Proses Design Thinking UI/UX',
    content: {
      backgroundColor: 'from-blue-600 via-purple-600 to-indigo-700',
      sections: [
        {
          title: 'Tim Desain UI/UX',
          points: ['Implementasi Design Thinking Process', 'Solusi Inovatif untuk Pengalaman Pengguna'],
          icon: '🎨'
        }
      ]
    }
  },

  // Discover Phase
  {
    id: 'discover-1',
    type: 'discover',
    title: 'Discover (Empathize)',
    subtitle: 'Memahami Masalah - 15 Poin',
    content: {
      backgroundColor: 'from-emerald-500 to-teal-600',
      sections: [
        {
          title: 'Pengenalan Profil Objek Penelitian',
          points: [
            'Target: Mahasiswa dan Dosen Universitas',
            'Platform: Aplikasi Mobile Learning Management',
            'Scope: Fitur jadwal, tugas, dan komunikasi'
          ],
          icon: '👥'
        },
        {
          title: 'Latar Belakang Masalah',
          points: [
            'Kesulitan akses informasi akademik yang tersebar',
            'Komunikasi tidak efektif antara dosen dan mahasiswa',
            'Interface portal akademik yang kompleks',
            'Manajemen deadline tugas yang buruk'
          ],
          icon: '🎯'
        }
      ],
      visualizations: [
        {
          type: 'chart',
          title: 'Survey Response Distribution',
          description: '78% mahasiswa mengalami kesulitan tracking deadline',
          placeholder: 'Bar chart showing user pain points'
        }
      ]
    }
  },

  {
    id: 'discover-2',
    type: 'discover',
    title: 'Research & Empathy Map',
    subtitle: 'Hasil Riset dan Analisis Pengguna',
    content: {
      sections: [
        {
          title: 'Daftar Pertanyaan Penelitian',
          points: [
            'Bagaimana mahasiswa mengakses informasi akademik saat ini?',
            'Apa kendala utama dalam pengumpulan tugas?',
            'Fitur apa yang paling dibutuhkan dalam LMS?',
            'Bagaimana preferensi komunikasi dengan dosen?'
          ],
          icon: '❓'
        },
        {
          title: 'Hasil Empathy Map',
          points: [
            'Says: "Saya sering lupa deadline tugas"',
            'Thinks: Perlu sistem reminder yang efektif',
            'Does: Menggunakan multiple platform untuk belajar',
            'Feels: Frustasi dengan interface yang rumit'
          ],
          icon: '🧠'
        },
        {
          title: 'Metode Riset',
          points: [
            'Wawancara mendalam: 15 mahasiswa, 5 dosen',
            'Survey online: 150 responden',
            'Observasi penggunaan portal akademik',
            'User testing platform existing'
          ],
          icon: '🔍'
        }
      ]
    }
  },

  {
    id: 'discover-3',
    type: 'discover',
    title: 'Persona & Journey Map',
    subtitle: 'Target User dan Pain Points',
    content: {
      sections: [
        {
          title: 'Persona Pengguna: Rahman (20 tahun)',
          points: [
            'Mahasiswa Teknik Informatika Semester 5',
            'Goals: Lulus tepat waktu, nilai baik, seimbang kuliah-organisasi',
            'Frustrations: Tracking deadline, akses materi, interface rumit',
            'Tech-savvy: Menggunakan smartphone untuk sebagian besar aktivitas'
          ],
          icon: '👨‍🎓'
        },
        {
          title: 'Journey Map Utama',
          points: [
            'Morning: Cek jadwal hari ini (Pain: info tersebar)',
            'Class: Akses materi kuliah (Pain: sulit ditemukan)',
            'Afternoon: Kerjakan tugas (Pain: deadline tidak jelas)',
            'Evening: Submit assignment (Pain: proses rumit)'
          ],
          icon: '🗺️'
        }
      ],
      visualizations: [
        {
          type: 'map',
          title: 'User Journey Mapping',
          description: 'Perjalanan harian mahasiswa dengan pain points',
          placeholder: 'Journey map visualization dengan touchpoints dan emotions'
        },
        {
          type: 'image',
          title: 'Observasi Field Study',
          description: 'Dokumentasi penggunaan portal akademik existing',
          placeholder: 'Foto observasi mahasiswa menggunakan sistem lama'
        }
      ]
    }
  },

  // Define Phase
  {
    id: 'define',
    type: 'define',
    title: 'Define',
    subtitle: 'Merumuskan Masalah - 10 Poin',
    content: {
      backgroundColor: 'from-amber-500 to-orange-600',
      sections: [
        {
          title: 'Problem Statement (How Might We)',
          points: [
            'HMW membuat akses informasi akademik menjadi terpusat dan mudah?',
            'HMW membantu mahasiswa mengelola deadline dengan efektif?',
            'HMW menyederhanakan komunikasi dosen-mahasiswa?',
            'HMW membuat interface yang intuitif untuk semua user?'
          ],
          icon: '💡'
        },
        {
          title: 'Core Problem Identified',
          points: [
            'Informasi akademik tersebar di multiple platform',
            'Tidak ada sistem notifikasi deadline yang efektif',
            'Interface portal akademik tidak user-friendly',
            'Komunikasi dosen-mahasiswa tidak real-time'
          ],
          icon: '🎯'
        }
      ],
      visualizations: [
        {
          type: 'diagram',
          title: 'Diagram Sebab Akibat',
          description: 'Root cause analysis dari masalah utama',
          placeholder: 'Fishbone diagram showing problem relationships'
        },
        {
          type: 'diagram',
          title: 'Mind Map Permasalahan',
          description: 'Pemetaan hubungan antar masalah dan dampaknya',
          placeholder: 'Mind map visualization of interconnected problems'
        }
      ]
    }
  },

  // Develop Phase
  {
    id: 'develop-1',
    type: 'develop',
    title: 'Develop (Ideate & Prototype)',
    subtitle: 'Eksplorasi Solusi - 10 Poin',
    content: {
      backgroundColor: 'from-violet-500 to-purple-600',
      sections: [
        {
          title: 'Brainstorming Solusi',
          points: [
            'Dashboard utama dengan info penting (jadwal, deadline)',
            'Sistem notifikasi push yang customizable',
            'Chat terintegrasi untuk komunikasi dosen-mahasiswa',
            'Quick access untuk submission tugas',
            'Calendar view untuk semua aktivitas akademik'
          ],
          icon: '🧠'
        },
        {
          title: 'Prioritas Fitur (MoSCoW)',
          points: [
            'Must: Dashboard, jadwal, submission tugas',
            'Should: Notifikasi, akses materi, profil',
            'Could: Chat, kalender, gamifikasi',
            'Wont: Social features, advanced analytics'
          ],
          icon: '📋'
        }
      ],
      visualizations: [
        {
          type: 'image',
          title: 'Sketsa Awal Konsep',
          description: 'Hand-drawn wireframes dan ide layout',
          placeholder: 'Sketches of initial app concepts and layout ideas'
        }
      ]
    }
  },

  {
    id: 'develop-2',
    type: 'develop',
    title: 'Wireframe & Prototype',
    subtitle: 'Digital Design & Figma Link',
    content: {
      sections: [
        {
          title: 'Wireframe Development',
          points: [
            'Low-fidelity wireframes untuk alur utama',
            'Information architecture yang jelas',
            'Navigation pattern yang konsisten',
            'Responsive design untuk mobile-first approach'
          ],
          icon: '📱'
        },
        {
          title: 'High-Fidelity Prototype',
          points: [
            'Visual design dengan brand identity',
            'Interactive prototype dengan micro-interactions',
            'Design system components',
            'Accessibility considerations (WCAG compliance)'
          ],
          icon: '🎨'
        }
      ],
      visualizations: [
        {
          type: 'image',
          title: 'Wireframe Progression',
          description: 'Evolusi dari sketsa ke digital wireframe',
          placeholder: 'Before and after: sketches to digital wireframes'
        },
        {
          type: 'image',
          title: 'Final Prototype Screens',
          description: 'Key screens dari aplikasi final',
          placeholder: 'Showcase of main app screens and interactions'
        }
      ],
      links: [
        {
          title: 'Figma Prototype Link',
          url: 'https://figma.com/proto/ui-ux-project-prototype',
          type: 'figma'
        }
      ]
    }
  },

  // Deliver Phase
  {
    id: 'deliver-1',
    type: 'deliver',
    title: 'Deliver (Test)',
    subtitle: 'Pengujian & Iterasi - 10 Poin',
    content: {
      backgroundColor: 'from-rose-500 to-pink-600',
      sections: [
        {
          title: 'Hasil Uji Coba Prototipe',
          points: [
            'Usability testing dengan 10 mahasiswa target',
            'Task completion rate: 85% untuk core features',
            'Average time to complete main tasks: 2.3 menit',
            'User satisfaction score: 4.2/5.0'
          ],
          icon: '🧪'
        },
        {
          title: 'Key Findings dari Testing',
          points: [
            'Dashboard layout sangat membantu orientasi',
            'Proses submission tugas lebih intuitif',
            'Beberapa icon perlu clarification',
            'Font size perlu diperbesar untuk accessibility'
          ],
          icon: '📊'
        }
      ],
      visualizations: [
        {
          type: 'chart',
          title: 'User Testing Results',
          description: 'Metrics dari usability testing sessions',
          placeholder: 'Charts showing task success rates and user satisfaction'
        }
      ]
    }
  },

  {
    id: 'deliver-2',
    type: 'deliver',
    title: 'Feedback & Iterasi',
    subtitle: 'Perbaikan Berdasarkan Testing',
    content: {
      sections: [
        {
          title: 'Feedback Analysis',
          points: [
            'Positif: Interface bersih, navigasi intuitif',
            'Concerns: Beberapa fitur masih hidden, loading time',
            'Suggestions: Tambah shortcuts, improve onboarding',
            'Priority fixes: Icon clarity, font sizing'
          ],
          icon: '💬'
        },
        {
          title: 'Iterasi Desain Final',
          points: [
            'Revision 1: Perbaikan icon dan labeling',
            'Revision 2: Accessibility improvements',
            'Revision 3: Performance optimization',
            'Final: Integration dengan backend system'
          ],
          icon: '🔄'
        }
      ],
      visualizations: [
        {
          type: 'image',
          title: 'Before vs After Revisions',
          description: 'Perbandingan desain sebelum dan sesudah testing',
          placeholder: 'Side-by-side comparison of design iterations'
        }
      ],
      links: [
        {
          title: 'Maze User Testing',
          url: 'https://maze.co/testing-results-ui-ux',
          type: 'maze'
        }
      ]
    }
  },

  // Back Cover
  {
    id: 'back-cover',
    type: 'back-cover',
    title: 'Terima Kasih',
    subtitle: 'Design Thinking Process Completed',
    content: {
      backgroundColor: 'from-slate-600 to-slate-800',
      sections: [
        {
          title: 'Project Summary',
          points: [
            'Successfully completed Design Thinking process',
            'Created user-centered mobile learning solution',
            'Achieved 85% task completion rate in testing',
            'Ready for development implementation'
          ],
          icon: '✅'
        },
        {
          title: 'Next Steps',
          points: [
            'Technical implementation planning',
            'Backend architecture design',
            'Beta testing with larger user group',
            'Continuous improvement based on real usage'
          ],
          icon: '🚀'
        }
      ]
    }
  }
];

// Utility functions
export const getPagesByType = (type: FlipbookPage['type']) => {
  return flipbookData.filter(page => page.type === type);
};

export const getTotalPoints = () => {
  const points = {
    discover: 15,
    define: 10,
    develop: 10,
    deliver: 10
  };
  return Object.values(points).reduce((total, point) => total + point, 0);
};
