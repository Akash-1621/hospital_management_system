import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const quickActions = [
  { label: '🏥 Departments', message: 'What departments do you have?' },
  { label: '👨‍⚕️ Doctors', message: 'Tell me about your doctors' },
  { label: '📅 Book Appt', message: 'How do I book an appointment?' },
  { label: '⏰ Visiting Hrs', message: 'What are the visiting hours?' },
  { label: '🚑 Emergency', message: 'Emergency contact' },
  { label: '🛏️ Beds', message: 'Tell me about bed availability' },
];

// Simple markdown-like bold text renderer
const formatMessage = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ChatMessage = ({ message, isBot }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
  >
    {isBot && (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md">
        <Bot size={16} style={{ color: 'white' }} />
      </div>
    )}
    <div
      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
        isBot
          ? 'bg-white/90 border border-slate-200/60 text-slate-700 rounded-tl-md shadow-sm'
          : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-md shadow-md shadow-cyan-500/20'
      }`}
    >
      {isBot ? formatMessage(message) : message}
    </div>
    {!isBot && (
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
        <User size={16} className="text-slate-600" />
      </div>
    )}
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex gap-2.5 justify-start"
  >
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md">
      <Bot size={16} style={{ color: 'white' }} />
    </div>
    <div className="bg-white/90 border border-slate-200/60 rounded-2xl rounded-tl-md px-5 py-3 shadow-sm">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! 👋 I'm **CareSphere AI Assistant**. I can help you with hospital information, doctor details, appointment booking, and more!\n\nHow can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    const lowerUserMsg = userMsg.toLowerCase();
    
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // 3. Smart Symptom Checker & Triage (NLP Heuristic)
    const triageRules = [
      { keywords: ['chest pain', 'heart', 'palpitations', 'breath'], department: 'Cardiology', severity: 'High' },
      { keywords: ['bone', 'fracture', 'joint', 'knee', 'back pain'], department: 'Orthopedics', severity: 'Medium' },
      { keywords: ['skin', 'rash', 'acne', 'itching', 'mole'], department: 'Dermatology', severity: 'Low' },
      { keywords: ['stomach', 'digestion', 'vomit', 'nausea', 'acid'], department: 'Gastroenterology', severity: 'Medium' },
      { keywords: ['headache', 'migraine', 'dizzy', 'faint', 'numbness'], department: 'Neurology', severity: 'High' },
      { keywords: ['child', 'baby', 'fever', 'vaccine', 'pediatric'], department: 'Pediatrics', severity: 'Medium' },
      { keywords: ['eye', 'vision', 'blur', 'glasses', 'cataract'], department: 'Ophthalmology', severity: 'Low' },
      { keywords: ['tooth', 'dental', 'gum', 'cavity'], department: 'Dentistry', severity: 'Low' }
    ];

    let triaged = null;
    for (const rule of triageRules) {
      if (rule.keywords.some(kw => lowerUserMsg.includes(kw))) {
         triaged = rule;
         break;
      }
    }

    if (triaged) {
      // Simulate typing delay for a natural feel
      await new Promise((r) => setTimeout(r, 800));
      setIsTyping(false);
      
      const triageMessage = `**AI Symptom Analysis:** Based on your description, I recommend consulting our **${triaged.department}** department.\n\nSeverity Assessment: **${triaged.severity}**\n\nWould you like me to help you book an appointment with a specialist in this department?`;
      
      setMessages((prev) => [...prev, { text: triageMessage, isBot: true }]);
      return; 
    }

    try {
      const res = await fetch(`${API_BASE}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();

      // Simulate typing delay for a natural feel
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

      if (data.success) {
        setMessages((prev) => [...prev, { text: data.data.reply, isBot: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "Sorry, I couldn't process that. Please try again.", isBot: true }]);
      }
    } catch (e) {
      await new Promise((r) => setTimeout(r, 500));
      setMessages((prev) => [...prev, { text: "I'm having trouble connecting to the server. Please make sure the backend is running on port 5000.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-shadow group"
            id="chatbot-toggle"
          >
            <MessageCircle size={24} style={{ color: 'white' }} className="group-hover:scale-110 transition-transform" />
            {/* Pulse ring */}
            <span className="absolute w-full h-full rounded-full bg-cyan-400/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-8 z-50 w-[380px] h-[540px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-200/60"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles size={20} style={{ color: 'white' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'white' }}>CareSphere AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Online — Ready to help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={16} style={{ color: 'white' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto shrink-0">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(action.message)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-xs font-semibold text-slate-600 hover:text-cyan-700 transition-all whitespace-nowrap shrink-0"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-slate-200/60 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none text-sm text-slate-700 placeholder-slate-400 disabled:opacity-50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/25 disabled:opacity-50 disabled:shadow-none transition-all"
                >
                  {isTyping ? (
                    <Loader2 size={16} className="animate-spin" style={{ color: 'white' }} />
                  ) : (
                    <Send size={16} style={{ color: 'white' }} />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
