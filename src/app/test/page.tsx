'use client';

import dynamic from 'next/dynamic';

const TestComponent = dynamic(() => import('./TestComponent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading test...</p>
        </div>
    </div>
});

export default function TestPage() {
    return <TestComponent />;
}
