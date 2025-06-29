'use client';

import { useEffect, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export default function TestComponent() {
    const [status, setStatus] = useState('Initializing...');
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        console.log(message);
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    useEffect(() => {
        const testPDF = async () => {
            try {
                addLog('Starting PDF test...');
                addLog(`Worker source: ${pdfjs.GlobalWorkerOptions.workerSrc}`);
                
                setStatus('Loading PDF...');
                const pdfUrl = '/uploads/Flipbook.pdf';
                addLog(`Loading PDF from: ${pdfUrl}`);
                
                const loadingTask = pdfjs.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;
                
                addLog(`PDF loaded successfully! Pages: ${pdf.numPages}`);
                setStatus(`PDF loaded: ${pdf.numPages} pages`);
                
                // Test rendering first page
                addLog('Rendering first page...');
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1.0 });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                if (context) {
                    await page.render({
                        canvasContext: context,
                        viewport: viewport
                    }).promise;
                    
                    addLog('First page rendered successfully!');
                    setStatus('PDF conversion working correctly!');
                } else {
                    throw new Error('Could not get canvas context');
                }
                
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                addLog(`Error: ${errorMessage}`);
                setStatus(`Error: ${errorMessage}`);
                console.error('Full error:', error);
            }
        };

        testPDF();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">PDF.js Test Page</h1>
                
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Status</h2>
                    <div className={`p-4 rounded ${status.includes('Error') ? 'bg-red-900' : status.includes('working') ? 'bg-green-900' : 'bg-blue-900'}`}>
                        {status}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Logs</h2>
                    <div className="bg-black rounded p-4 font-mono text-sm max-h-96 overflow-y-auto">
                        {logs.map((log, index) => (
                            <div key={index} className="mb-1">
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
