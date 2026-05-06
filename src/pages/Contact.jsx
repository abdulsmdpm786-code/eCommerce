import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-12 relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold tracking-wider mb-6">
          GET IN TOUCH
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-400 mb-6 drop-shadow-sm leading-tight">
          We'd Love to <br className="hidden md:block"/> Hear From You
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you have a question about our products, need assistance with your order, or just want to share your feedback, our team is ready to help.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="flex flex-col space-y-6 lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 text-indigo-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-slate-400 mb-4">Our friendly team is here to help.</p>
            <a href="mailto:support@ecommerce.com" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">support@ecommerce.com</a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-300">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
            <p className="text-slate-400 mb-4">Come say hello at our headquarters.</p>
            <span className="text-indigo-400 font-medium">100 Innovation Drive, Tech City, TC 10010</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-300">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-slate-400 mb-4">Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+1234567890" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">+1 (234) 567-890</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center mb-8">
              <MessageSquare className="w-8 h-8 text-indigo-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Send a Message</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="subject" className="text-sm font-medium text-slate-300 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div className="flex flex-col mb-8">
              <label htmlFor="message" className="text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] group"
            >
              Send Message
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
