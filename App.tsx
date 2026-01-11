
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  BarChart3, 
  Star, 
  ShieldCheck, 
  Zap, 
  Rocket, 
  TrendingUp,
  Plus
} from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import FloatingCTAs from './components/FloatingCTAs';
import Button from './components/Button';
import { SERVICES, PROCESS_STEPS, TESTIMONIALS, CONTACT_LINKS } from './constants';

const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;


// Component for randomized floating symbols in the background
const FloatingBackgroundSymbols = () => {
  const symbols = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      type: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'plus' : 'dot',
      color: i % 3 === 0 ? 'text-brand-purple' : i % 3 === 1 ? 'text-brand-blue' : 'text-brand-green'
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {symbols.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            y: [0, -60, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
          }}
          className={`${s.color}`}
        >
          {s.type === 'star' && <Star size={s.size} fill="currentColor" />}
          {s.type === 'plus' && <Plus size={s.size} strokeWidth={3} />}
          {s.type === 'dot' && <div style={{ width: s.size/2, height: s.size/2 }} className="rounded-full bg-current" />}
        </motion.div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return false;
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Theme Persistence and Tailwind Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);


  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-10 transition-opacity duration-700">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/30 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-brand-green/30 rounded-full blur-[110px] animate-blob animation-delay-4000"></div>
        </div>
        
        <FloatingBackgroundSymbols />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-purple z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center">
        <div className="w-full max-w-5xl flex items-center justify-between glass px-4 md:px-6 py-2.5 rounded-full border border-white/10 dark:border-white/5 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-purple flex items-center justify-center text-white shadow-lg shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight dark:text-white text-slate-900 truncate">
              Vishnu <span className="text-brand-purple">Thakur</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-slate-200 dark:border-slate-800 text-[13px] font-medium dark:text-slate-300 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
              Available
            </div>
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase bg-brand-purple/10 text-brand-purple rounded-full border border-brand-purple/20">
              Expert Meta Ads Strategist
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 dark:text-white text-slate-900 leading-[1.1] md:leading-[1.1]">
              I Help Businesses Scale With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-blue to-brand-green">
                High-ROI Meta Ads
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl dark:text-slate-400 text-slate-600 mb-10 leading-relaxed">
              Unlock explosive growth through precision-targeted lead generation, 
              scalable sales funnels, and data-driven Meta ad campaigns.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button href={CONTACT_LINKS.WHATSAPP} variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                Book Your Audit Free
              </Button>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button href={CONTACT_LINKS.PHONE} variant="outline" icon={<Phone />} className="flex-1 sm:flex-initial">
                  Call Me
                </Button>
                <Button href={CONTACT_LINKS.TELEGRAM} variant="telegram" icon={<Send />} className="p-3 px-4">
                  {""}
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: 'Ad Spend Managed', value: '$1M+' },
                { label: 'Average ROAS', value: '3.8x' },
                { label: 'Projects Completed', value: '1500+' },
                { label: 'Client Satisfaction', value: '100%' },
              ].map((stat, i) => (
                <div key={i} className="glass p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                  <p className="text-2xl md:text-3xl font-bold text-brand-purple">{stat.value}</p>
                  <p className="text-xs md:text-sm font-medium dark:text-slate-400 text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white text-slate-900">Premium Ad Services</h2>
            <p className="dark:text-slate-400 text-slate-600 max-w-xl mx-auto">
              Everything you need to turn visitors into buyers and scale your revenue effectively.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-brand-purple/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white text-slate-900">{service.title}</h3>
                <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 px-4 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white text-slate-900">Why Most Ad Campaigns Fail — <span className="text-brand-purple">And Why I Don't.</span></h2>
              <p className="dark:text-slate-400 text-slate-600 mb-8 leading-relaxed text-lg">
                Most agencies focus on vanity metrics like "Reach" and "Impressions". I focus on your Bottom Line: Sales, Leads, and Profit.
              </p>
              <ul className="space-y-4">
                {[
                  { title: 'Zero Fluff Reporting', icon: <BarChart3 className="w-5 h-5" /> },
                  { title: 'Psychology-Based Ad Copies', icon: <Zap className="w-5 h-5" /> },
                  { title: 'Scientific A/B Testing', icon: <ShieldCheck className="w-5 h-5" /> },
                  { title: 'Scalability-Focused Setup', icon: <Rocket className="w-5 h-5" /> },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 glass p-4 rounded-xl border border-slate-200 dark:border-white/5">
                    <div className="text-brand-purple">{item.icon}</div>
                    <span className="font-semibold dark:text-white text-slate-800">{item.title}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-square glass rounded-3xl border-2 border-brand-purple/20 p-8 flex flex-col justify-center">
                <div className="space-y-6">
                   <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 text-sm">Monthly Revenue</p>
                        <p className="text-2xl font-bold dark:text-white">$124,500.00</p>
                      </div>
                      <div className="text-green-500 bg-green-500/10 p-2 rounded-lg">
                         <TrendingUp className="w-6 h-6" />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                        <p className="text-slate-500 text-sm">Avg. ROAS</p>
                        <p className="text-2xl font-bold text-brand-purple">4.82x</p>
                      </div>
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                        <p className="text-slate-500 text-sm">CPC</p>
                        <p className="text-2xl font-bold text-brand-blue">$0.42</p>
                      </div>
                   </div>
                   <div className="p-6 bg-brand-purple text-white rounded-2xl shadow-2xl flex items-center justify-between">
                      <p className="font-bold">Conversion Rate</p>
                      <p className="text-3xl font-black">12.4%</p>
                   </div>
                </div>
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white text-slate-900">The Growth Workflow</h2>
            <p className="dark:text-slate-400 text-slate-600">A proven 4-step framework to transition from testing to dominance.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 glass p-8 rounded-3xl border border-slate-200 dark:border-white/5 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-purple text-white font-bold text-xl flex items-center justify-center mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white text-slate-900">{step.title}</h3>
                  <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white text-slate-900">Loved By Clients</h2>
              <p className="dark:text-slate-400 text-slate-600">Don't just take my word for it. Here is what business owners say about the results.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-bold dark:text-white text-slate-900">5.0 Rating</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl border border-slate-200 dark:border-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Star className="w-20 h-20 fill-brand-purple" />
                </div>
                <p className="italic mb-8 dark:text-slate-300 text-slate-700 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-purple/20 shadow-md" />
                  <div>
                    <h4 className="font-bold dark:text-white text-slate-900 leading-none mb-1">{t.name}</h4>
                    <p className="text-xs text-brand-purple font-medium uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 mb-20">
        <div className="max-w-5xl mx-auto glass p-10 md:p-20 rounded-[3rem] border-2 border-brand-purple/20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-brand-purple/5 -z-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 dark:text-white text-slate-900">Stop Burning Money On <br /> <span className="text-brand-purple">Useless Clicks.</span></h2>
            <p className="text-lg md:text-xl dark:text-slate-400 text-slate-600 mb-12 max-w-2xl mx-auto">
              Ready to scale your business with a specialist who cares about your profit? 
              Let's have a 15-minute strategy call today.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button href={CONTACT_LINKS.WHATSAPP} variant="primary" className="w-full md:w-auto px-10 py-5 text-xl shadow-brand-purple/30">
                Claim My Free Audit
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button href={CONTACT_LINKS.PHONE} variant="whatsapp" className="w-full sm:w-auto" icon={<MessageCircle />}>
                  WhatsApp Now
                </Button>
                <Button href={CONTACT_LINKS.TELEGRAM} variant="telegram" className="w-full sm:w-auto" icon={<Send />}>
                  Telegram
                </Button>
              </div>
            </div>
            <p className="mt-10 text-sm font-medium dark:text-slate-500 text-slate-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green" /> Limited slots for monthly management.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-white/5 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg dark:text-white text-slate-900">
              Vishnu Thakur
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            &copy; {new Date().getFullYear()} Vishnu Thakur. All Rights Reserved. <br className="md:hidden" />
            Meta Ads Expert & Business Consultant.
          </p>
          <div className="flex items-center justify-center gap-4 text-slate-400">
             <a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a>
             <span>&bull;</span>
             <a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Mobile Floating CTAs */}
      <FloatingCTAs />
    </div>
  );
};

export default App;
