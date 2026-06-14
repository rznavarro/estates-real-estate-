import React, { useState, useEffect } from 'react';
import { InquireFormData } from '../types';
import { Phone, Calendar, Mail, Check, AlertCircle, Building, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  prefilledPlan: { name: string; upgrades: string[]; price: number } | null;
  onClearPrefills: () => void;
}

export default function ContactForm({ prefilledPlan, onClearPrefills }: ContactFormProps) {
  const [formData, setFormData] = useState<InquireFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'United States',
    bookAppointment: false,
    message: ''
  });

  const [errors, setErrors] = useState<Partial<InquireFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync prefill messages
  useEffect(() => {
    if (prefilledPlan) {
      setFormData(prev => ({
        ...prev,
        bookAppointment: true,
        message: `I would like to inquire about reserving ${prefilledPlan.name} (Estimated Price: $${prefilledPlan.price.toLocaleString()}) with the following upgrades selected:\n${prefilledPlan.upgrades.length > 0 ? prefilledPlan.upgrades.map(u => `- ${u}`).join('\n') : 'None - Standard Premium Specs'}`
      }));
    }
  }, [prefilledPlan]);

  const validate = () => {
    const newErrors: Partial<InquireFormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please provide a valid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error
    if (errors[name as keyof InquireFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate luxury API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1800);
  };

  const handleResetSuccess = () => {
    setSubmitSuccess(false);
    onClearPrefills();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: 'United States',
      bookAppointment: false,
      message: ''
    });
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden scroll-mt-20">
      
      {/* Background paper texture from original */}
      <div className="absolute inset-0 z-0 bg-brand">
        <img 
          src="https://www.cchomes.com/wp-content/uploads/2024/07/TurnberryBrown.jpg" 
          alt="Luxury textured background" 
          className="w-full h-full object-cover opacity-35 filter contrast-125"
        />
        <div className="absolute inset-0 bg-[#664a46]/92 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* Contact Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-[#e8e0da]/80 font-sans text-xs tracking-widest uppercase font-semibold block">
            EXTRAORDINARY LIVING AWAITS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight">
            Learn More
          </h2>
          <div className="w-12 h-px bg-[#e8e0da]/30 mx-auto my-4"></div>
          <p className="text-[#e8e0da] font-sans text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            There’s so much new happening! Stay informed – Fill out this form and we will be in contact with you shortly.
          </p>
          <div className="pt-2">
            <a 
              href="tel:305-424-2203" 
              className="inline-flex items-center space-x-2 text-white bg-white/10 hover:bg-white/15 px-5 py-2.5 rounded-full border border-white/20 text-xs tracking-widest uppercase font-bold transition-all shadow-md font-sans"
            >
              <Phone className="w-3.5 h-3.5 fill-[#66c085] text-[#66c085]" />
              <span>Call Us at (305) 424‑2203</span>
            </a>
          </div>
        </div>

        {/* Floating Context Notification for Pre-fills */}
        <AnimatePresence>
          {prefilledPlan && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#fcfaf7] border-l-4 border-[#66c085] p-4.5 rounded-lg mb-8 shadow-xl text-brand-dark font-sans text-xs leading-relaxed flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5 pr-4">
                <span className="p-2 bg-[#66c085]/10 text-[#66c085] rounded-full">
                  <Sparkles className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <h4 className="font-extrabold uppercase tracking-wider text-[10px] text-stone-400">Bespoke Pre-filled Selection</h4>
                  <p className="text-[#33221e] mt-1">
                    Currently requesting custom specifications list matching the {prefilledPlan.name} Residence layout (${prefilledPlan.price.toLocaleString()})
                  </p>
                </div>
              </div>
              <button 
                onClick={onClearPrefills}
                className="text-stone-400 hover:text-brand font-black underline ml-2 uppercase text-[9px] tracking-widest cursor-pointer select-none"
              >
                Clear Selection
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form Fields Panel */}
        <div className="bg-white rounded-xl border border-white/10 shadow-2xl p-6 sm:p-10 relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* First Name */}
              <div className="space-y-1.5 align-left">
                <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">First Name *</label>
                <div className="relative">
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-[#fbfbf9] text-brand-dark px-4 py-3 rounded-md border text-sm font-sans focus:outline-none transition-all ${
                      errors.firstName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#e8dcd0] focus:border-brand focus:ring-1 focus:ring-brand'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />}
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Last Name *</label>
                <div className="relative">
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-[#fbfbf9] text-brand-dark px-4 py-3 rounded-md border text-sm font-sans focus:outline-none transition-all ${
                      errors.lastName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#e8dcd0] focus:border-brand focus:ring-1 focus:ring-brand'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Email Address *</label>
                <div className="relative">
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#fbfbf9] text-brand-dark px-4 py-3 rounded-md border text-sm font-sans focus:outline-none transition-all ${
                      errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#e8dcd0] focus:border-brand focus:ring-1 focus:ring-brand'
                    }`}
                    placeholder="name@email.com"
                  />
                  {errors.email && <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Phone Number *</label>
                <div className="relative">
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-[#fbfbf9] text-brand-dark px-4 py-3 rounded-md border text-sm font-sans focus:outline-none transition-all ${
                      errors.phone ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#e8dcd0] focus:border-brand focus:ring-1 focus:ring-brand'
                    }`}
                    placeholder="(305) 555-0199"
                  />
                  {errors.phone && <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />}
                </div>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Your City</label>
                <input 
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#fbfbf9] text-brand-dark px-4 py-3 rounded-md border border-[#e8dcd0] text-sm font-sans focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="e.g. Davie"
                />
              </div>

              {/* State & Country */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Your State</label>
                  <input 
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-[#fbfbf9] text-brand-dark px-4 py-3 rounded-md border border-[#e8dcd0] text-sm font-sans focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                    placeholder="Florida"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Country</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#fbfbf9] text-[#55443e] px-4 py-3.5 rounded-md border border-[#e8dcd0] text-xs font-sans focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-bold uppercase tracking-wider"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Spain">Spain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Appointment check box */}
            <label className="flex items-center space-x-3 p-4 bg-[#fbfbf9] rounded-lg border border-[#e8dcd0]/50 select-none cursor-pointer mt-4">
              <input 
                type="checkbox"
                name="bookAppointment"
                checked={formData.bookAppointment}
                onChange={handleChange}
                className="accent-brand w-4 h-4 cursor-pointer"
              />
              <span className="text-xs font-sans font-semibold text-brand-dark uppercase tracking-widest">
                I would like to book a private VIP appointment in the Design Studio
              </span>
            </label>

            {/* Message statement */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-stone-400">Message / Request Specs</label>
              <textarea 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#fbfbf9] text-brand-dark p-4 rounded-md border border-[#e8dcd0] text-sm font-sans focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand leading-relaxed font-light"
                placeholder="Share your specific architectural interests or timing constraints..."
              ></textarea>
            </div>

            {/* Disclaimer consent */}
            <p className="text-[10px] text-stone-400 font-sans leading-normal">
              By filling out the form above, you consent to receive marketing communications (via mail, email, telephone, or text message at the number you provided) from CC Homes & Turnberry. You may unsubscribe at any time. Review our private <span className="underline decoration-stone-300">privacy policy</span> for terms of safety.
            </p>

            {/* Button call to action */}
            <div className="pt-4 flex justify-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto bg-[#664a46] hover:bg-[#33221e] text-white text-xs font-sans font-bold tracking-widest uppercase py-4 px-14 rounded-md shadow-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                  isSubmitting ? 'opacity-85 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin"></span>
                    <span>SUBMITTING INQUIRY...</span>
                  </>
                ) : (
                  <>
                    <span>CC HOMES CONTACT US</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* Submission success Modal feedback */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#261c19]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white max-w-lg w-full rounded-2xl p-8 border border-brand/20 shadow-2xl text-center space-y-6 relative overflow-hidden"
            >
              {/* Confetti element simulation */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#66c085]"></div>
              
              <div className="mx-auto w-16 h-16 bg-[#66c085]/10 text-[#66c085] rounded-full flex items-center justify-center border border-[#66c085]/20 animate-pulse">
                <Check className="w-8 h-8 font-black" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-widest text-[#66c085] uppercase font-black font-sans">Corporate Registration Logged</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-brand-dark font-light">
                  Thank You, {formData.firstName}!
                </h3>
              </div>

              <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed p-1 font-light">
                Your luxury pre-construction consultation registration has been securely filed with the Estates by Turnberry Online Booking Bureau. 
                {formData.bookAppointment && " A Private Design Studio Tour and VIP consultation slot is being mapped for your itinerary."}
                <br /><br />
                A Senior CC Homes & Turnberry Representative will contact you at <strong className="text-brand-dark font-bold font-sans">{formData.phone}</strong> or email <strong className="text-brand-dark font-bold font-sans">{formData.email}</strong> within 2 hours.
              </p>

              <button 
                onClick={handleResetSuccess}
                className="w-full bg-[#664a46] hover:bg-[#33221e] text-white font-sans text-xs tracking-widest uppercase py-3.5 rounded-lg font-bold shadow-md cursor-pointer transition-all"
              >
                ✕ Close Confirmation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
