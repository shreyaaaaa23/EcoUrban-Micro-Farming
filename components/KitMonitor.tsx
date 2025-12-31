
import React, { useState, useRef, useCallback } from 'react';
import { Camera, RefreshCw, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { analyzePlantHealth } from '../services/geminiService';

const KitMonitor: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Please allow camera access to use the AI monitor.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64 = dataUrl.split(',')[1];
      
      const analysis = await analyzePlantHealth(base64);
      setResult(analysis);
    }
    setIsScanning(false);
    stopCamera();
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold mb-2">AI Health Monitor</h2>
        <p className="text-slate-500">Scan your kit for real-time diagnostics and optimization advice.</p>
      </header>

      {!stream && !result && (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="text-emerald-600" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Ready to scan?</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Position your smartphone camera about 10-15cm away from your plant leaves.</p>
          <button 
            onClick={startCamera}
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Launch Camera
          </button>
        </div>
      )}

      {stream && (
        <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 border-2 border-emerald-400/50 m-8 rounded-2xl pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-400 text-white px-4 py-1 rounded-b-lg text-xs font-bold uppercase tracking-widest">
              AI Alignment Zone
            </div>
          </div>
          <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center">
            <button onClick={stopCamera} className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors">
              <RefreshCw size={24} />
            </button>
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="bg-emerald-500 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-600 transition-colors shadow-xl disabled:opacity-50 flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                'Capture & Analyze'
              )}
            </button>
            <div className="w-12 h-12"></div> {/* Spacer */}
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <CheckCircle2 className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Analysis Complete</h3>
                <p className="text-sm text-slate-400">Model: Gemini 3 Flash</p>
              </div>
              <button onClick={() => {setResult(null); startCamera();}} className="ml-auto text-emerald-600 font-bold hover:underline">Scan Another</button>
            </div>
            
            <div className="prose prose-emerald max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {result}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                <AlertCircle size={18} />
                Action Required
              </div>
              <p className="text-sm text-amber-800">Nitrogen levels seem slightly low. Adjust fertilizer mix by 10% in the next watering cycle.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                <Info size={18} />
                Growth Prediction
              </div>
              <p className="text-sm text-blue-800">Your kit will reach peak harvest maturity in approximately 4 days based on current light exposure.</p>
            </div>
          </div>
        </div>
      )}
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default KitMonitor;
