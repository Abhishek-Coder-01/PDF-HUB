
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import {

    FiFileText,

} from "react-icons/fi";

const Footer = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const socialLinks = [
        {
            icon: <FaGithub />,
            label: "GitHub",
            url: "https://github.com/abhishek-coder-01"
        },
        {
            icon: <FaTwitter />,
            label: "Twitter",
            url: "https://twitter.com/abhishek_coder01"
        },
        {
            icon: <FaLinkedin />,
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/abhishek-yadav-292ba9308"
        },
        {
            icon: <FaEnvelope />,
            label: "Email",
            url: "mailto:abhishekyadav749994@gmail.com"
        }
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center transform rotate-3 shadow-lg shadow-emerald-500/20">
                                    <FiFileText className="text-white text-2xl" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"></div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    PDF HUB



                                </h2>
                                <p className="text-sm text-gray-400">AI-Powered • Fast • Secure</p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Advanced PDF processing platform powered by artificial intelligence. Convert, merge, lock, and unlock 10,000+ PDFs with industry-leading speed and security using our cutting-edge document processing technology.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-8">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-12 h-12 rounded-xl
                 bg-gray-800/50
                 hover:bg-gradient-to-br from-green-500/20 to-emerald-600/20
                 flex items-center justify-center
                 transition-all duration-300
                 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20
                 border border-gray-700 hover:border-emerald-500/30"
                                    aria-label={social.label}
                                >
                                    <span className="text-gray-400 group-hover:text-indigo-400 text-lg transition-colors">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700">
                            <h4 className="font-semibold mb-2">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-bold mb-6 flex items-center">
                            <span className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-purple-400 rounded-full mr-3"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {['Home', 'Features', 'How It Works', 'About', 'Contact'].map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center group"
                                    >
                                        <FaChevronRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-bold mb-6 flex items-center">
                            <span className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-purple-400 rounded-full mr-3"></span>
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {['Documentation', 'API Access', 'Plant Database', 'Research Papers', 'Case Studies'].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center group"
                                    >
                                        <FaChevronRight className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold mb-6 flex items-center">
                            <span className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-purple-400 rounded-full mr-3"></span>
                            Legal & Support
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="space-y-3">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-3">
                                {['Support Center', 'Contact Us', 'FAQ', 'Community'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-400">10K+</div>
                                <div className="text-xs text-gray-400">Plant Species</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-400">95%</div>
                                <div className="text-xs text-gray-400">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-400">24/7</div>
                                <div className="text-xs text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 mb-2">
                                PDF HUB uses advanced machine learning to identify plants with 95% accuracy
                            </p>
                            <p className="text-gray-500 text-sm">
                                Powered by Plant.id API | © {new Date().getFullYear()}   PDF HUB. All rights reserved.
                            </p>
                        </div>





                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                <span className="text-gray-400">System Status: </span>
                                <span className="text-indigo-400 font-medium">Operational</span>
                            </div>
                            <a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                                Status Page
                            </a>
                        </div>
                    </div>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {['React', 'Node.js', 'API', 'AWS', 'Tailwind', 'Python'].map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-xs bg-gray-800/50 text-gray-300 border border-gray-700"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;