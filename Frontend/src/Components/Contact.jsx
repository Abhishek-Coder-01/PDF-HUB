import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";


function Contact() {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        emailjs.sendForm(
            "service_7ipfx1u",
            "template_mxnu8ig",
            formRef.current,
            "pj9DmWpHrB7izjlYu"
        )
            .then(() => {
                setSubmitStatus('success');
                setIsSubmitting(false);
                formRef.current.reset();

                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            })
            .catch((err) => {
                console.error(err);
                setSubmitStatus('error');
                setIsSubmitting(false);

                // Auto-hide error message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            });
    };

    return (
        <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-10 sm:mb-14 md:mb-16 fade-in-up"    data-aos="fade-up" data-aos-delay="200" data-aos-duration="900" >
                    <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full mb-6 shadow-sm">

                        <i className="fa-solid fa-user text-indigo-600 mr-2 text-xs sm:text-sm"></i>
                        
                        <span className="text-gray-700 font-semibold text-sm tracking-wide">Contact us</span>
                    </div>
                    <h2
                        style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight dark:text-white"
                        data-aos="fade-up" data-aos-offset="200" data-aos-duration="900"
                    >
                        Get in{' '}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                            Touch
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
                        Ready to start your project? Let's create something amazing together.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12" >
                    {/* Contact Form */}
                    <div
                        className="
    w-full lg:w-1/2 p-5 sm:p-6 md:p-8
    rounded-2xl sm:rounded-3xl
    relative fade-in-up
    bg-white/90 dark:bg-slate-900/60
    border border-slate-200/60 dark:border-white/10
    backdrop-blur-xl
  "
                        data-aos="fade-up" data-aos-delay="200" data-aos-duration="900"   >
                        <form
                            ref={formRef}
                            onSubmit={sendEmail}
                            id="contact-form"
                            className="space-y-4 sm:space-y-6"
                        >
                            {/* Name */}
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    disabled={isSubmitting}
                                    placeholder="John Doe"
                                    className="
          w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
          bg-white dark:bg-white/5
          text-slate-900 dark:text-slate-100
          placeholder-slate-400 dark:placeholder-slate-500
          border border-slate-300/70 dark:border-white/10
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
        "
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    disabled={isSubmitting}
                                    placeholder="john@example.com"
                                    className="
          w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
          bg-white dark:bg-white/5
          text-slate-900 dark:text-slate-100
          placeholder-slate-400 dark:placeholder-slate-500
          border border-slate-300/70 dark:border-white/10
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
        "
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    disabled={isSubmitting}
                                    placeholder="Project Inquiry"
                                    className="
          w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
          bg-white dark:bg-white/5
          text-slate-900 dark:text-slate-100
          placeholder-slate-400 dark:placeholder-slate-500
          border border-slate-300/70 dark:border-white/10
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
        "
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    disabled={isSubmitting}
                                    placeholder="Tell us about your project..."
                                    className="
          w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl resize-none
          bg-white dark:bg-white/5
          text-slate-900 dark:text-slate-100
          placeholder-slate-400 dark:placeholder-slate-500
          border border-slate-300/70 dark:border-white/10
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
        "
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
        w-full relative overflow-hidden
        px-6 py-3 rounded-xl font-semibold text-white
        bg-gradient-to-r from-purple-600 to-indigo-600
        hover:from-purple-500 hover:to-indigo-500
        shadow-lg shadow-purple-600/30
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
      "
                            >
                                <span
                                    className={`flex items-center justify-center gap-2 ${isSubmitting ? "opacity-0" : "opacity-100"
                                        } transition-opacity`}
                                >
                                    Send Message
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>

                                {isSubmitting && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Success */}
                        {submitStatus === "success" && (
                            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md animate-slideInUp">
                                <h4 className="text-emerald-400 font-semibold mb-1">
                                    Message Sent Successfully! 🎉
                                </h4>
                                <p className="text-emerald-300 text-sm">
                                    Thank you for reaching out! We'll get back to you soon.
                                </p>
                            </div>
                        )}

                        {/* Error */}
                        {submitStatus === "error" && (
                            <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-md animate-slideInUp">
                                <h4 className="text-rose-400 font-semibold mb-1">
                                    Failed to Send Message ❌
                                </h4>
                                <p className="text-rose-300 text-sm">
                                    Something went wrong. Please try again.
                                </p>
                            </div>
                        )}
                    </div>


                    {/* Contact Info - (rest remains the same) */}
                    <div
                        className="w-full lg:w-1/2 space-y-4 sm:space-y-6 fade-in-up"
                        data-aos="fade-up" data-aos-delay="200" data-aos-duration="900"
                    >
                        {/* Email */}
                        <div
                            className="
      p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl hover-lift
      bg-white/90 dark:bg-slate-900/60
      border border-slate-200/100 dark:border-white/10
      backdrop-blur-xl
    "
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div
                                    className="
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
          rounded-lg sm:rounded-xl
          bg-white/70 dark:bg-white/10
          border border-slate-200/100 dark:border-white/10
          flex items-center justify-center flex-shrink-0
        "
                                >
                                    {/* SVG SAME */}
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M3 8L10.89 13.26C11.5433 13.6778 12.4567 13.6778 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                                            stroke="url(#contactGradient1)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <defs>
                                            <linearGradient id="contactGradient1">
                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                <stop offset="100%" stopColor="#EC4899" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-white">
                                        Email Us
                                    </h4>
                                    <a
                                        href="mailto:abhishekyadav749994@gmail.com"
                                        className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition"
                                    >
                                        abhishekyadav749994@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div
                            className="
      p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl hover-lift
      bg-white/90 dark:bg-slate-900/60
      border border-slate-200/60 dark:border-white/10
      backdrop-blur-xl
    "
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div
                                    className="
          w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
          rounded-lg sm:rounded-xl
          bg-white/70 dark:bg-white/10
          border border-slate-200/60 dark:border-white/10
          flex items-center justify-center flex-shrink-0
        "
                                >
                                    {/* SVG SAME */}
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                                            stroke="url(#contactGradient2)"
                                            strokeWidth="2"
                                        />
                                        <defs>
                                            <linearGradient id="contactGradient2">
                                                <stop offset="0%" stopColor="#3B82F6" />
                                                <stop offset="100%" stopColor="#06B6D4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-white">
                                        Call Us
                                    </h4>
                                    <a
                                        href="tel:+917499949407"
                                        className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition"
                                    >
                                        +91 7499949407
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div
                            className="
    p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl hover-lift
    bg-white/90 dark:bg-slate-900/60
    border border-slate-200/60 dark:border-white/10
    backdrop-blur-xl
  "
                        >
                            <div className="flex items-center gap-3 sm:gap-4">

                                {/* Icon Box */}
                                <div
                                    className="
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
        rounded-lg sm:rounded-xl
        bg-white/70 dark:bg-white/10
        border border-slate-200/100 dark:border-white/10
        flex items-center justify-center flex-shrink-0
      "
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999
             C12.6327 21.681 11.3677 21.6814 10.5866 20.9003
             C9.26234 19.576 7.34159 17.6553 6.34315 16.6569
             C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315
             C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315
             C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z"
                                            stroke="url(#contactGradient3)"
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx="12"
                                            cy="11"
                                            r="3"
                                            stroke="url(#contactGradient3)"
                                            strokeWidth="2"
                                        />
                                        <defs>
                                            <linearGradient id="contactGradient3">
                                                <stop offset="0%" stopColor="#10B981" />
                                                <stop offset="100%" stopColor="#06B6D4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Text */}
                                <div>
                                    <a
                                        href="https://www.google.com/maps/place/Bal+Vidya+Niketan+Hindi+School/@19.2736684,73.0512374,17z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Open location on map"
                                    >
                                        <h4 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-white">
                                            Visit Us
                                        </h4>
                                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-emerald-400 transition">
                                            Om Sai Nagar, Kamatghar Bhiwandi
                                        </p>
                                    </a>
                                </div>

                            </div>
                        </div>


                        {/* Social */}

                        <div
                            className="
      p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl
      bg-white/90 dark:bg-slate-900/60
      border border-slate-200/60 dark:border-white/10
      backdrop-blur-xl
    "
                        >
                            <h4 className="font-semibold text-base sm:text-lg mb-4 text-slate-800 dark:text-white">
                                Follow Us
                            </h4>
                            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 ">

                                <a href="https://github.com/Abhishek-Coder-01" className=" w-10 h-10 sm:w-12 sm:h-12
            rounded-lg sm:rounded-xl
            bg-white/70 dark:bg-white/10
            border border-slate-200/100 dark:border-white/10
 flex items-center justify-center hover-lift hover:scale-105 transition-transform duration-200">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="https://github.com/Abhishek-Coder-01" className="w-10 h-10 sm:w-12 sm:h-12
            rounded-lg sm:rounded-xl
            bg-white/70 dark:bg-white/10
            border border-slate-200/100 dark:border-white/10
 flex items-center justify-center hover-lift hover:scale-105 transition-transform duration-200">
                                    <svg
                                        class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
       0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
       -.546-1.387-1.333-1.756-1.333-1.756
       -1.09-.745.083-.73.083-.73
       1.205.085 1.84 1.236 1.84 1.236
       1.07 1.834 2.807 1.304 3.492.997
       .108-.776.418-1.305.762-1.605
       -2.665-.304-5.466-1.332-5.466-5.93
       0-1.31.468-2.38 1.235-3.22
       -.123-.303-.535-1.524.117-3.176
       0 0 1.008-.322 3.3 1.23
       .957-.266 1.983-.399 3.003-.404
       1.02.005 2.047.138 3.006.404
       2.29-1.552 3.296-1.23 3.296-1.23
       .653 1.653.241 2.874.118 3.176
       .77.84 1.233 1.91 1.233 3.22
       0 4.61-2.805 5.625-5.476 5.922
       .43.37.823 1.096.823 2.21
       0 1.595-.015 2.88-.015 3.27
       0 .322.216.694.825.576
       C20.565 21.796 24 17.297 24 12
       24 5.37 18.627 0 12 0z"
                                        />
                                    </svg>

                                </a>
                                <a href="https://www.instagram.com/a._k._y._121/" className="w-10 h-10 sm:w-12 sm:h-12
            rounded-lg sm:rounded-xl
            bg-white/70 dark:bg-white/10
            border border-slate-200/100 dark:border-white/10
 flex items-center justify-center hover-lift hover:scale-105 transition-transform duration-200">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/abhishek-yadav-292ba9308/" className="w-10 h-10 sm:w-12 sm:h-12
            rounded-lg sm:rounded-xl
            bg-white/70 dark:bg-white/10
            border border-slate-200/100 dark:border-white/10
 flex items-center justify-center hover-lift hover:scale-105 transition-transform duration-200">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contact;