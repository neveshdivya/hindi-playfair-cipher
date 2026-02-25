import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Eye, EyeOff, Terminal, BookOpen, Send, RefreshCw, Info } from 'lucide-react';

const HINDI_ALPHABET = [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ',
    'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श',
    'ष', 'स', 'ह', 'अं', 'अः', '्', 'क्ष', 'ज्ञ'
];

const SAMPLES = [
    { text: "नमस्ते", key: "भारत", description: "Standard Greeting" },
    { text: "विज्ञान", key: "खोज", description: "Science & Discovery" },
    { text: "स्वतन्त्रता", key: "आजादी", description: "Freedom" },
    { text: "विद्यार्थी", key: "ज्ञान", description: "Student & Knowledge" },
    { text: "संगणक", key: "यंत्र", description: "Computer & Machine" }
];

export default function App() {
    const [inputText, setInputText] = useState('');
    const [key, setKey] = useState('');
    const [matrix, setMatrix] = useState<string[][]>([]);
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        updateMatrix();
    }, [key]);

    const updateMatrix = async () => {
        try {
            const resp = await fetch('/api/matrix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key })
            });
            const data = await resp.json();
            setMatrix(data.matrix);
        } catch (err) {
            console.error("Failed to fetch matrix", err);
        }
    };

    const handleProcess = async () => {
        if (!inputText) return;
        setLoading(true);
        setError('');
        try {
            const endpoint = mode === 'encrypt' ? 'encrypt' : 'decrypt';
            const resp = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText, key })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            setOutput(data.result);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const loadSample = (sample: typeof SAMPLES[0]) => {
        setInputText(sample.text);
        setKey(sample.key);
        setMode('encrypt');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                            <Shield className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Hindi Playfair Cipher
                        </h1>
                    </motion.div>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A specialized cryptographic tool for the Devanagari script using a 7x7 Playfair matrix.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="lg:col-span-5 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-2xl"
                        >
                            <div className="flex items-center gap-2 mb-6 text-indigo-400">
                                <Terminal className="w-5 h-5" />
                                <h2 className="font-semibold uppercase tracking-wider text-sm">Control Panel</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-500 mb-2 px-1">Encryption Key (Hindi)</label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            type="text"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors text-xl font-medium"
                                            placeholder="e.g. भारत"
                                            value={key}
                                            onChange={(e) => setKey(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-500 mb-2 px-1">Target Text</label>
                                    <textarea
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-indigo-500 transition-colors text-2xl"
                                        placeholder="Enter Hindi text here..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                    />
                                </div>

                                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                                    <button
                                        onClick={() => setMode('encrypt')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'encrypt' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        Encrypt
                                    </button>
                                    <button
                                        onClick={() => setMode('decrypt')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'decrypt' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        Decrypt
                                    </button>
                                </div>

                                <button
                                    onClick={handleProcess}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {mode === 'encrypt' ? 'Secure Text' : 'Reveal Original'}
                                </button>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl text-center">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Output Panel */}
                        <AnimatePresence>
                            {output && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-3xl"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Result</span>
                                        <RefreshCw className="w-4 h-4 text-indigo-400 cursor-pointer hover:rotate-180 transition-transform" onClick={() => setOutput('')} />
                                    </div>
                                    <p className="text-3xl font-bold break-all">{output}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Matrix Visualization */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-indigo-400">
                                    <BookOpen className="w-5 h-5" />
                                    <h2 className="font-semibold uppercase tracking-wider text-sm">7x7 Cipher Grid</h2>
                                </div>
                                <div className="text-[10px] text-slate-500 flex gap-2">
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Key Chars</span>
                                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Alphabet</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {matrix.map((row, r) =>
                                    row.map((char, c) => {
                                        const isKeyChar = key.includes(char);
                                        return (
                                            <motion.div
                                                key={`${r}-${c}`}
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                                                className={`aspect-square flex items-center justify-center text-xl md:text-2xl rounded-lg border transition-all duration-300 ${isKeyChar ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                                                    }`}
                                            >
                                                {char}
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>
                        </motion.div>

                        {/* Samples */}
                        <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-6">
                            <div className="flex items-center gap-2 mb-4 text-slate-400">
                                <Info className="w-4 h-4" />
                                <h3 className="text-sm font-semibold uppercase tracking-wide">Try these Examples</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {SAMPLES.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => loadSample(s)}
                                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 px-4 py-2 rounded-xl text-sm transition-colors flex flex-col items-start gap-1"
                                    >
                                        <span className="font-bold text-slate-200">{s.text}</span>
                                        <span className="text-[10px] text-slate-500">Key: {s.key}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
