import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// =========================================================================
// 💳 MAGIC CONFIG ZONE: YOUR STRIPE LINK IS LIVE!
// =========================================================================
const STRIPE_PRO_PAYMENT_LINK = "https://buy.stripe.com/6oUdR2b764Rt2A51tv3Nm00";
const STRIPE_ENTERPRISE_PAYMENT_LINK = "https://buy.stripe.com/6oUdR2b764Rt2A51tv3Nm00"; 
// =========================================================================

// Custom SVG Icons to avoid external library dependency issues
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
  const [view, setView] = useState('landing'); 
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [formInputs, setFormInputs] = useState({});
  const [apiResult, setApiResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [usageLimit, setUsageLimit] = useState(3); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem('writespark_history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    const savedProStatus = localStorage.getItem('writespark_pro_status');
    if (savedProStatus === 'true') {
      setStripeConnected(true);
      setUsageLimit(9999);
    }

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('success') === 'true' || queryParams.get('session') === 'success') {
      setStripeConnected(true);
      setUsageLimit(9999);
      localStorage.setItem('writespark_pro_status', 'true');
      showNotification("🎉 Checkout successful! Welcome to WriteSpark PRO.", "success");
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

  const handleStripeRedirect = (tier) => {
    if (tier === 'pro' || tier === 'enterprise') {
      window.location.href = STRIPE_PRO_PAYMENT_LINK;
    }
  };

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

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: selectedTemplate.systemPrompt }] }
    };

    let delay = 1000;
    let success = false;
    let generatedText = '';

    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`API error`);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-xl border transition-all ${
          notification.type === 'error' ? 'bg-red-950 border-red-800 text-red-200' : 'bg-emerald-950 border-emerald-800 text-emerald-200'
        }`}>
          <span className="mr-3">{notification.type === 'error' ? '⚠️' : '✨'}</span>
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {view === 'landing' && (
        <>
          <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-4 md:px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2" onClick={() => setView('landing')}>
                <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg text-white">
                  <Icons.Sparkles />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  WriteSpark<span className="text-indigo-500">.ai</span>
                </span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-sm text-slate-400 hover:text-white transition">Features</a>
                <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition">Pricing</a>
                <button onClick={() => setView('dashboard')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-600/20">
                  Go to App Dashboard
                </button>
              </nav>
            </div>
          </header>

          <section className="relative pt-24 pb-20 px-4 md:px-8 text-center overflow-hidden">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Create High-Converting Copy <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">In Seconds, Not Hours.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              WriteSpark is your micro-SaaS content assistant. Generate blog posts, viral captions, sales outreach, and product sheets instantly.
            </p>
            <button onClick={() => setView('dashboard')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              Start Writing for Free
            </button>
          </section>

          <section id="pricing" className="py-20 border-t border-slate-900 px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                <div className="text-4xl font-extrabold text-white mb-6">$0</div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm text-slate-300"><Icons.Check /> 3 generation tokens</li>
                  <li className="flex items-center gap-3 text-sm text-slate-300"><Icons.Check /> Core content models</li>
                </ul>
                <button onClick={() => setView('dashboard')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl">Start Writing Free</button>
              </div>

              <div className="bg-gradient-to-b from-slate-900 to-indigo-950/60 border-2 border-indigo-500 p-8 rounded-2xl flex flex-col relative transform scale-105 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Pro Creator</h3>
                <div className="text-4xl font-extrabold text-white mb-6">$19 <span className="text-sm font-normal text-slate-400">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm text-slate-200 font-medium"><Icons.Check /> Unlimited Generations</li>
                  <li className="flex items-center gap-3 text-sm text-slate-200 font-medium"><Icons.Check /> All Premium AI Templates</li>
                </ul>
                <button onClick={() => handleStripeRedirect('pro')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/30">
                  Upgrade to Pro Creator
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {view !== 'landing' && (
        <div className="flex flex-1 flex-col md:flex-row h-screen overflow-hidden">
          <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <span className="text-lg font-bold text-white" onClick={() => setView('landing')}>WriteSpark Workspace</span>
            </div>
            <nav className="p-4 space-y-1">
              <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${view === 'dashboard' || view === 'generator' ? 'bg-indigo-600' : 'text-slate-400'}`}>Templates</button>
              <button onClick={() => setView('monetize')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-400 hover:bg-slate-800">Stripe System</button>
            </nav>
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                <span>Tokens Left</span>
                <span>{stripeConnected ? "Unlimited Pro" : `${usageLimit}/3`}</span>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10">
            {view === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TEMPLATES.map((tmpl) => (
                  <div key={tmpl.id} onClick={() => { setSelectedTemplate(tmpl); setFormInputs({}); setApiResult(''); setView('generator'); }} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl cursor-pointer hover:border-indigo-500 transition">
                    <h3 className="text-lg font-bold text-white mb-2">{tmpl.title}</h3>
                    <p className="text-slate-400 text-sm">{tmpl.description}</p>
                  </div>
                ))}
              </div>
            )}

            {view === 'generator' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleGenerate} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
                  {selectedTemplate.fields.map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">{field.label}</label>
                      <input type="text" required onChange={(e) => setFormInputs({ ...formInputs, [field.name]: e.target.value })} className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-sm" />
                    </div>
                  ))}
                  <button type="submit" disabled={loading} className="w-full bg-indigo-600 py-3 rounded-xl font-semibold">{loading ? "Processing..." : "Generate"}</button>
                </form>

                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[350px]">
                  {apiResult ? <div className="whitespace-pre-line text-slate-300 text-sm leading-relaxed">{apiResult}</div> : <p className="text-slate-500 text-center py-12">Submit form inputs to output original content blocks.</p>}
                </div>
              </div>
            )}

            {view === 'monetize' && (
              <div className="bg-slate-900 p-8 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold">Stripe Automated Architecture</h2>
                <p className="text-slate-400 text-sm">Your payment link configuration is securely activated on premium components.</p>
                <button onClick={() => { setStripeConnected(true); setUsageLimit(9999); localStorage.setItem('writespark_pro_status', 'true'); showNotification("PRO Access Simulated"); }} className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-sm">
                  💳 Test Simulation Redirect Route
                </button>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

// 🚀 MOUNT TO ROOT ELEMENT (This compiles standard React components onto your index.html DOM!)
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
