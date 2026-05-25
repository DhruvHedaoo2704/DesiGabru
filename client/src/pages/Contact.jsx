import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCpu } from 'react-icons/fi';
import SEO from '../components/SEO';
import { sendContact, aiChat } from '../services/api';

export default function Contact() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your Desii Gabru AI grooming assistant. Ask me about beard, hair, or skincare.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendAI = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const { data } = await aiChat(userMsg);
      setMessages((m) => [...m, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text: userMsg.toLowerCase().includes('beard')
            ? 'Try our Royal Beard Elixir — apply 4-6 drops after shower.'
            : 'Explore our trending collection for personalized grooming picks!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      await sendContact(form);
      alert('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      alert('Message received (demo mode). Connect SMTP for live emails.');
    }
  };

  return (
    <>
      <SEO title="Contact & AI Assistant" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
            <span className="text-gradient-gold">AI</span> Grooming Assistant
          </h1>
          <p className="text-gray-400 mb-6">Holographic terminal — ask anything about grooming</p>

          <div className="glass rounded-2xl overflow-hidden border border-[#D4AF37]/30 glow-gold">
            <div className="bg-[#111] px-4 py-3 flex items-center gap-2 border-b border-[#D4AF37]/20">
              <FiCpu className="text-[#D4AF37]" />
              <span className="text-sm font-mono text-[#D4AF37]">desii-gabru@ai-terminal</span>
              <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-3 font-mono text-sm">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg max-w-[90%] ${
                    m.role === 'user'
                      ? 'ml-auto bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'bg-[#1a1a1a] text-gray-300 border border-[#D4AF37]/10'
                  }`}
                >
                  {m.role === 'ai' && <span className="text-[#D4AF37]">&gt; </span>}
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="text-[#D4AF37] animate-pulse">&gt; Processing...</div>
              )}
              <div ref={endRef} />
            </div>
            <div className="p-4 border-t border-[#D4AF37]/20 flex gap-2">
              <input
                className="input-field flex-1 font-mono text-sm"
                placeholder="Ask about beard, hair, skin..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendAI()}
              />
              <button onClick={sendAI} className="btn-primary p-3">
                <FiSend />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Orbitron' }}>Contact Us</h2>
          <form onSubmit={handleContact} className="space-y-4">
            {['name', 'email', 'subject'].map((f) => (
              <input
                key={f}
                className="input-field capitalize"
                placeholder={f}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                type={f === 'email' ? 'email' : 'text'}
                required
              />
            ))}
            <textarea
              className="input-field min-h-[120px]"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}
