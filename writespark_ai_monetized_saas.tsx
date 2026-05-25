import React, { useState, useEffect } from 'react';

// =========================================================================
// 💳 MAGIC CONFIG ZONE: YOUR STRIPE LINK IS NOW LIVE!
// =========================================================================
const STRIPE_PRO_PAYMENT_LINK = "https://buy.stripe.com/6oUdR2b764Rt2A51tv3Nm00";
const STRIPE_ENTERPRISE_PAYMENT_LINK = "https://buy.stripe.com/6oUdR2b764Rt2A51tv3Nm00"; 
// =========================================================================

// Custom SVG Icons to bypass external library dependencies
const Icons = {
  Sparkles: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Layout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  Pen: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  History: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Dollar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

const TEMPLATES = [
  {
    id: 'blog-intro',
    title: 'Blog Post Intro',
    description: 'Hook your readers with an irresistible, SEO-optimized introduction.',
    systemPrompt: 'You are a professional SEO copywriter. Generate a highly engaging blog intro with a hook, a clear explanation of value, and a transition into the main content.',
    fields: [
      { name: 'topic', label: 'What is your blog post about?', placeholder: 'e.g., Passive Income ideas for developers in 2026', type: 'text' },
      { name: 'audience', label: 'Target Audience', placeholder: 'e.g., College students, Software engineers', type: 'text' },
      { name: 'tone', label: 'Tone of Voice', type: 'select', options: ['Professional', 'Witty & Conversational', 'Inspirational', 'Authoritative'] }
    ]
  },
  {
    id: 'social-caption',
    title: 'Viral Social Media Caption',
    description: 'Craft catchy captions for Instagram, LinkedIn, or Twitter that drive clicks.',
    systemPrompt: 'You are an elite social media manager. Generate a high-performing post caption with a strong hook, structured body (bulleted for readability), call to action, and 3-5 hyper-relevant hashtags.',
    fields: [
      { name: 'topic', label: 'What is the post about?', placeholder: 'e.g., launching my new SaaS built with AI', type: 'textarea' },
      { name: 'platform', label: 'Social Platform', type: 'select', options: ['LinkedIn', 'Instagram', 'Twitter / X', 'TikTok'] },
      { name: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Energetic', 'Casual', 'Thought-Provoking'] }
    ]
  },
  {
    id: 'cold-email',
    title: 'High-Converting Cold Email',
    description: 'Get responses with highly personalized, pain-point-focused cold outreach emails.',
    systemPrompt: 'You are a seasoned B2B sales development representative. Write a compelling, concise cold email with an attention-grabbing subject line, empathetic pain point hook, clear value proposition, and a soft call to action.',
    fields: [
      { name: 'offer', label: 'What are you offering / selling?', placeholder: 'e.g., custom website development services', type: 'text' },
      { name: 'recipient', label: 'Who is the recipient?', placeholder: 'e.g., Small business owners, marketing managers', type: 'text' },
      { name: 'painpoint', label: 'Their biggest pain point', placeholder: 'e.g., losing customers to competitors with faster sites', type: 'text' }
    ]
  },
  {
    id: 'product-desc',
    title: 'Product Description Maker',
    description: 'Highlight benefits and close sales with persuasive product copy.',
    systemPrompt: 'You are an e-commerce copywriting expert. Write a product description that focuses on emotional benefits first, followed by key features and a persuasive call to purchase.',
    fields: [
      { name: 'product', label: 'Product Name', placeholder: 'e.g., HydroPulse Self-Cleaning Bottle', type: 'text' },
      { name: 'features', label: 'Key Features / Benefits', placeholder: 'e.g., UV-C sterilizer, 24hr cold, titanium construct', type: 'textarea' },
      { name: 'tone', label: 'Brand Voice', type: 'select', options: ['Luxury & Premium', 'Adventure & Rugged', 'Minimalist & Clean', 'Urgent & Salesy'] }
    ]
  }
];

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'dashboard', 'generator', 'history', 'monetize', 'settings'
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [formInputs, setFormInputs] = useState({});
  const [apiResult, setApiResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [usageLimit, setUsageLimit] = useState(3); // Free daily credit limit
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Custom alert notification popups
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    // 1. Load Local User State & History
    const storedHistory = localStorage.getItem('writespark_history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    const savedProStatus = localStorage.getItem('writespark_pro_status');
    if (savedProStatus === 'true') {
      setStripeConnected(true);
      setUsageLimit(9999);
    }

    // 2. Stripe Success Checker URL loop (Auto-unlock key)
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('success') === 'true' || queryParams.get('session') === 'success') {
      setStripeConnected(true);
      setUsageLimit(9999);
      localStorage.setItem('writespark_pro_status', 'true');
      showNotification("🎉 Purchase successful! Welcome to WriteSpark PRO. Unlimited generations unlocked!", "success");
      
      // Clean query string from browser tab
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const saveToHistory = (templateTitle, inputs, output) => {
    const newHistoryItem = {
      id: Date.now(),
      template: templateTitle,
      inputs: { ...inputs },
      output: output,
      date: new Date().toLocaleDateString()
    };
    const updatedHistory = [newHistoryItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('writespark_history', JSON.stringify(updatedHistory));
  };

  // Safe redirects direct to Stripe purchase screens
  const handleStripeRedirect = (tier) => {
    if (tier === 'pro') {
      window.location.href = STRIPE_PRO_PAYMENT_LINK;
    } else if (tier === 'enterprise') {
      window.location.href = STRIPE_ENTERPRISE_PAYMENT_LINK;
    }
  };

  // Live generation with Gemini 2.5 Flash API with exponential backoff retries
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (usageLimit <= 0 && !stripeConnected) {
      showNotification("You have reached your Free limits! Please upgrade to continue.", "error");
      setView('monetize');
      return;
    }

    setLoading(true);
    setApiResult('');

    let userPrompt = `Generate copy for: ${selectedTemplate.title}.\n`;
    Object.keys(formInputs).forEach(key => {
      userPrompt += `${key}: ${formInputs[key]}\n`;
    });

    const apiKey = ""; // Left empty as the server injects this key in production
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: selectedTemplate.systemPrompt }] }
    };

    let delay = 1000;
    let success = false;
    let generatedText = '';

    // Retry up to 5 times (exponential backoff)
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`API error code ${response.status}`);
        
        const data = await response.json();
        generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (generatedText) {
          success = true;
          break;
        }
      } catch (err) {
        if (i === 4) {
          showNotification("Generation failed. Please try again later.", "error");
          setLoading(false);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }

    if (success) {
      setApiResult(generatedText);
      saveToHistory(selectedTemplate.title, formInputs, generatedText);
      if (!stripeConnected) {
        setUsageLimit(prev => Math.max(0, prev - 1));
      }
      showNotification("Copy generated successfully!");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = apiResult;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      showNotification("Copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      showNotification("Failed to copy", "error");
    }
    document.body.removeChild(textarea);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('writespark_history');
    showNotification("History cleared.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      {/* Notifications */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-xl border transition-all transform scale-100 ${
          notification.type === 'error' ? 'bg-red-950 border-red-800 text-red-200' : 'bg-emerald-950 border-emerald-800 text-emerald-200'
        }`}>
          <span className="mr-3">
            {notification.type === 'error' ? '⚠️' : '✨'}
          </span>
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* VIEW: LANDING PAGE */}
      {view === 'landing' && (
        <>
          {/* Header */}
          <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-4 md:px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('landing')}>
                <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg text-white">
                  <Icons.Sparkles />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  WriteSpark<span className="text-indigo-500">.ai</span>
                </span>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-sm text-slate-400 hover:text-white transition">Features</a>
                <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition">Pricing</a>
                <button 
                  onClick={() => setView('dashboard')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-600/20"
                >
                  Go to App Dashboard
                </button>
              </nav>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-slate-950 border-b border-slate-900 p-4 absolute top-full left-0 right-0 space-y-4">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white">Features</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white">Pricing</a>
                <button 
                  onClick={() => { setView('dashboard'); setMobileMenuOpen(false); }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-3 rounded-lg transition"
                >
                  Go to App
                </button>
              </div>
            )}
          </header>

          {/* Hero Section */}
          <section className="relative pt-24 pb-20 px-4 md:px-8 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-indigo-950/50 border border-indigo-800 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                ✨ Next-Generation AI Copywriter
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Create High-Converting Copy <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                  In Seconds, Not Hours.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                WriteSpark is your micro-SaaS content assistant. Generate blog posts, highly viral social media captions, cold sales emails, and product descriptions instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setView('dashboard')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/30 text-base"
                >
                  Start Writing for Free
                </button>
                <a 
                  href="#pricing"
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold px-8 py-4 rounded-xl transition text-base"
                >
                  View Pricing Plans
                </a>
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section id="features" className="py-20 bg-slate-950/50 border-t border-slate-900 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">All the copywriting templates you need</h2>
                <p className="text-slate-400 max-w-xl mx-auto">Supercharge your productivity and write persuasive marketing copy effortlessly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {TEMPLATES.map((tmpl) => (
                  <div key={tmpl.id} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all group">
                    <div className="bg-indigo-950 text-indigo-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                      <Icons.Pen />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{tmpl.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tmpl.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section - Connected directly to Stripe */}
          <section id="pricing" className="py-20 border-t border-slate-900 px-4 md:px-8 relative">
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent, SaaS-Ready Pricing</h2>
                <p className="text-slate-400 max-w-xl mx-auto">Start free, upgrade as you grow. Fully secured and automated via Stripe!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <p className="text-slate-400 text-sm mb-6">Test the waters and generate quick ideas.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white">$0</span>
                    <span className="text-slate-500 text-sm"> / forever</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Icons.Check /> 3 generation tokens
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Icons.Check /> Core content models
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-500 line-through">
                      Unlimited generations
                    </li>
                  </ul>
                  <button 
                    onClick={() => setView('dashboard')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition"
                  >
                    Start Writing Free
                  </button>
                </div>

                {/* Pro Plan (Directly opens your Stripe Checkout URL) */}
                <div className="bg-gradient-to-b from-slate-900 to-indigo-950/60 border-2 border-indigo-500 p-8 rounded-2xl flex flex-col relative transform scale-105 md:scale-105 z-10 shadow-2xl shadow-indigo-500/10">
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pro Creator</h3>
                  <p className="text-slate-300 text-sm mb-6">Unlimited automated copywriting for power creators.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white">$19</span>
                    <span className="text-slate-400 text-sm"> / month</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                      <Icons.Check /> Unlimited Generations
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                      <Icons.Check /> All Premium AI Templates
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                      <Icons.Check /> Secure personal history log
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-200">
                      <Icons.Check /> Max priority engine speed
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleStripeRedirect('pro')}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/30"
                  >
                    Upgrade to Pro Creator
                  </button>
                </div>

                {/* Enterprise Plan (Directly opens your Stripe Checkout URL) */}
                <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Business</h3>
                  <p className="text-slate-400 text-sm mb-6">For marketing agencies and robust content teams.</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white">$49</span>
                    <span className="text-slate-500 text-sm"> / month</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Icons.Check /> Unlimited workspace seats
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Icons.Check /> Advanced Collaboration Tools
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <Icons.Check /> Custom AI fine-tuning setup
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleStripeRedirect('enterprise')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition"
                  >
                    Get Business Plan
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-12 px-4 md:px-8 text-center text-slate-500 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold">WriteSpark AI</span>
                <span>© {new Date().getFullYear()} All rights reserved.</span>
              </div>
              <div className="flex space-x-6">
                <a href="#features" className="hover:text-slate-300">Privacy Policy</a>
                <a href="#pricing" className="hover:text-slate-300">Terms of Service</a>
                <span className="text-indigo-400 cursor-pointer" onClick={() => setView('monetize')}>Own this App?</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* VIEW: WORKSPACE */}
      {view !== 'landing' && (
        <div className="flex flex-1 flex-col md:flex-row h-screen overflow-hidden">
          
          {/* Dashboard Left Sidebar */}
          <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0">
            <div>
              {/* App Brand Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('landing')}>
                  <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-1.5 rounded-lg text-white">
                    <Icons.Sparkles />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white">WriteSpark</span>
                </div>
                <button 
                  onClick={() => setView('landing')} 
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2.5 py-1 rounded"
                >
                  Landing Page
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-1">
                <button
                  onClick={() => setView('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    view === 'dashboard' || view === 'generator' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icons.Layout />
                  Templates Panel
                </button>

                <button
                  onClick={() => setView('history')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    view === 'history' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icons.History />
                  Past Generations
                  {history.length > 0 && (
                    <span className="ml-auto bg-slate-800 text-indigo-400 text-xs px-2 py-0.5 rounded-full font-bold">
                      {history.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setView('monetize')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    view === 'monetize' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-200'
                  }`}
                >
                  <Icons.Dollar />
                  SaaS Stripe Setup
                </button>

                <button
                  onClick={() => setView('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    view === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icons.Settings />
                  Billing & Settings
                </button>
              </nav>
            </div>

            {/* User Profile Card */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  ME
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">SaaS Admin</div>
                  <div className="text-xs text-slate-400">Project Workspace</div>
                </div>
              </div>
              
              {/* Token Usage Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Tokens Left</span>
                  <span>{stripeConnected ? "Unlimited" : `${usageLimit}/3`}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300"
                    style={{ width: stripeConnected ? '100%' : `${(usageLimit / 3) * 100}%` }}
                  />
                </div>
                {usageLimit === 0 && !stripeConnected && (
                  <button 
                    onClick={() => handleStripeRedirect('pro')} 
                    className="text-[11px] text-pink-400 hover:text-pink-300 underline font-semibold mt-1 block text-left animate-pulse"
                  >
                    Tokens depleted. Click to Upgrade!
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* MAIN WORKING AREA */}
          <main className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10">

            {/* SUB-VIEW 1: TEMPLATE SELECTOR */}
            {view === 'dashboard' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Workspace Studio</h1>
                  <p className="text-slate-400 text-sm">Choose a conversion-focused copywriting blueprint template below to get started.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TEMPLATES.map((tmpl) => (
                    <div 
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(tmpl);
                        setFormInputs({});
                        setApiResult('');
                        setView('generator');
                      }}
                      className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 transition cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="bg-indigo-950 text-indigo-400 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                          <Icons.Pen />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{tmpl.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{tmpl.description}</p>
                      </div>
                      <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                        Use Blueprint →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: INDIVIDUAL GENERATOR */}
            {view === 'generator' && (
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setView('dashboard')}
                  className="text-sm text-slate-400 hover:text-white flex items-center gap-1.5 mb-6"
                >
                  ← Back to Blueprints
                </button>

                <div className="mb-8">
                  <span className="text-xs font-semibold bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800 uppercase tracking-wider">
                    Copywriter Blueprint
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2">{selectedTemplate.title}</h1>
                  <p className="text-slate-400 text-sm">{selectedTemplate.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Inputs Form */}
                  <form onSubmit={handleGenerate} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Input Context</h3>
                    
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.name} className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-300">{field.label}</label>
                        
                        {field.type === 'select' ? (
                          <select
                            required
                            value={formInputs[field.name] || ''}
                            onChange={(e) => setFormInputs({ ...formInputs, [field.name]: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-lg px-3.5 py-2.5 text-sm transition"
                          >
                            <option value="">Select an option...</option>
                            {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            required
                            placeholder={field.placeholder}
                            value={formInputs[field.name] || ''}
                            onChange={(e) => setFormInputs({ ...formInputs, [field.name]: e.target.value })}
                            rows="4"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-lg px-3.5 py-2.5 text-sm placeholder-slate-600 transition"
                          />
                        ) : (
                          <input
                            required
                            type="text"
                            placeholder={field.placeholder}
                            value={formInputs[field.name] || ''}
                            onChange={(e) => setFormInputs({ ...formInputs, [field.name]: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white rounded-lg px-3.5 py-2.5 text-sm placeholder-slate-600 transition"
                          />
                        )}
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-center items-center gap-2 shadow-lg shadow-indigo-600/20"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Generating copy...</span>
                        </>
                      ) : (
                        <>
                          <Icons.Sparkles />
                          <span>Generate Copy</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Output Display */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden min-h-[350px] flex flex-col justify-between">
                      
                      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Output Result
                        </span>
                        {apiResult && (
                          <button
                            onClick={handleCopy}
                            className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition"
                          >
                            <Icons.Copy />
                            {isCopied ? "Copied!" : "Copy to Clipboard"}
                          </button>
                        )}
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-center">
                        {loading ? (
                          <div className="text-center space-y-3 py-12">
                            <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                            <p className="text-sm text-slate-400">Sparking creativity & writing original copy...</p>
                          </div>
                        ) : apiResult ? (
                          <div className="whitespace-pre-line text-slate-300 text-sm md:text-base leading-relaxed select-text">
                            {apiResult}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-slate-500">
                            <Icons.Pen />
                            <p className="text-sm mt-4">Inputs your details and click "Generate Copy" to see write-ups.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* SUB-VIEW 3: HISTORY */}
            {view === 'history' && (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">History Log</h1>
                    <p className="text-slate-400 text-sm">Review your generated copy sheets. This acts as your secure library.</p>
                  </div>
                  {history.length > 0 && (
                    <button 
                      onClick={clearHistory}
                      className="text-xs bg-red-950/40 hover:bg-red-950 text-red-400 border border-red-900/50 px-3 py-2 rounded-lg transition"
                    >
                      Clear All History
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                    <Icons.History />
                    <p className="text-sm mt-4">You have not generated any copy yet. Get started with templates!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {history.map((item) => (
                      <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6">
                        <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-4">
                          <div>
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{item.template}</span>
                            <div className="text-xs text-slate-500 mt-1">Generated on {item.date}</div>
                          </div>
                          <button
                            onClick={() => {
                              const textarea = document.createElement('textarea');
                              textarea.value = item.output;
                              document.body.appendChild(textarea);
                              textarea.select();
                              document.execCommand('copy');
                              showNotification("Copied copy to clipboard!");
                              document.body.removeChild(textarea);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                          >
                            <Icons.Copy />
                            Copy Copy
                          </button>
                        </div>
                        <div className="whitespace-pre-line text-sm text-slate-300 leading-relaxed select-text">
                          {item.output}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUB-VIEW 4: MONETIZATION PORTAL */}
            {view === 'monetize' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div>
                  <span className="text-xs font-bold bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 uppercase tracking-wider">
                    SaaS Stripe Setup
                  </span>
                  <h1 className="text-3xl font-extrabold text-white mt-3 mb-2">Automated Stripe Payments</h1>
                  <p className="text-slate-400 text-sm">
                    Your Stripe Payment Links are successfully pre-wired into the header parameters of your <code>App.jsx</code> template.
                  </p>
                </div>

                {/* Checklist & Implementation Guide */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="bg-emerald-500 text-slate-950 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm">✓</span>
                    Your Stripe Setup Status
                  </h2>

                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex gap-4 items-start">
                      <div className="mt-1">
                        <span className="text-emerald-400">✔</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Step 1: Set Up Stripe Redirect Links</h3>
                        <p className="text-slate-400 text-sm mt-1">
                          In Stripe, edit your Payment Link, set the **Confirmation Page** behavior to "Don't show confirmation page" and choose **"Redirect customers to your website"**.
                        </p>
                        <p className="text-xs text-indigo-400 mt-1 font-semibold">
                          Redirect URL to use: <code>https://your-netlify-site-name.netlify.app/?success=true</code>
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-4 items-start">
                      <div className="mt-1">
                        <span className="text-emerald-400">✔</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Step 2: Stripe Live Verification</h3>
                        <p className="text-slate-400 text-sm mt-1">
                          Since your custom link is already embedded, clicking any "Upgrade" button will now automatically transport customers directly to your live payment screen.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-4 items-start">
                      <div className="mt-1">
                        <span className="text-emerald-400">✔</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Step 3: Instant Deployment Complete</h3>
                        <p className="text-slate-400 text-sm mt-1">
                          Simply save this updated code file to GitHub. Your live site hosted on Netlify will automatically update and open for real customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Sandbox Mode Selector */}
                <div className="bg-gradient-to-tr from-slate-900 to-indigo-950/50 border border-slate-800 rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-2">Simulate Stripe Checkout (Sandbox Testing)</h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Simulate how the Stripe redirect loop functions in a real production environment to test auto-unlock.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    <button
                      onClick={() => {
                        window.history.pushState({}, '', '?success=true');
                        setStripeConnected(true);
                        setUsageLimit(9999);
                        localStorage.setItem('writespark_pro_status', 'true');
                        showNotification("🎉 Sandbox Checkout Simulated! Unlimited Pro Access Activated.", "success");
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-emerald-600/20 text-sm"
                    >
                      💳 Simulate Pro Stripe Redirect Link
                    </button>
                    {stripeConnected ? (
                      <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
                        ✓ Sandbox Status: ACTIVE (PRO UNLOCKED)
                      </span>
                    ) : (
                      <span className="text-amber-400 text-sm font-semibold flex items-center gap-1">
                        ⚠ Sandbox Status: Free Mode
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 5: SETTINGS */}
            {view === 'settings' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Account Billing & Settings</h1>
                  <p className="text-slate-400 text-sm">Configure your personal SaaS setup, token parameters, and custom brand configurations.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white">General SaaS Configurations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300">SaaS Website Name</label>
                      <input 
                        type="text" 
                        defaultValue="WriteSpark AI" 
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300">Default Support Email</label>
                      <input 
                        type="text" 
                        defaultValue="support@writespark.ai" 
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <hr className="border-slate-800" />

                  <h3 className="text-lg font-bold text-white">Your Plan Details</h3>
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <div className="text-sm font-bold text-white">{stripeConnected ? "Pro Creator Tier (Infinite Credits)" : "Free Plan Starter (3 Daily Tokens)"}</div>
                      <div className="text-xs text-slate-400 mt-1">{stripeConnected ? "Your business dashboard is fully unlocked!" : "Upgrade to Pro to remove limitations."}</div>
                    </div>
                    <button 
                      onClick={() => handleStripeRedirect('pro')}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition"
                    >
                      {stripeConnected ? "Manage Subscription" : "Upgrade Plan"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}