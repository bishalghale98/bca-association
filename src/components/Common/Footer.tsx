import { footerLink } from '@/constant/footerLink'
import React from 'react'

const Footer = () => {
    return (
        <div className="border-t border-vercel-gray-200 bg-vercel-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-vercel-black font-bold text-sm">BCA</span>
                            </div>
                            <span className="font-semibold text-white text-lg">BCA Association</span>
                        </div>
                        <p className="text-vercel-gray-400 text-sm leading-relaxed">
                            Empowering BCA students at Tribhuvan University with better resources, events, and career opportunities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigation</h4>
                        <div className="flex flex-col space-y-3">
                            {footerLink.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.slug}
                                    className="text-vercel-gray-400 hover:text-white transition-colors text-sm font-medium"
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Resources</h4>
                        <div className="flex flex-col space-y-3">
                            {['Documentation', 'Help Center', 'Privacy', 'Terms'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-vercel-gray-400 hover:text-white transition-colors text-sm font-medium"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-vercel-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-vercel-gray-400 text-sm">
                            © {new Date().getFullYear()} BCA Association, Tribhuvan University. All rights reserved.
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-6">
                            {[
                                { name: 'Twitter', href: '#' },
                                { name: 'GitHub', href: '#' },
                                { name: 'LinkedIn', href: '#' }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="text-vercel-gray-400 hover:text-white transition-colors text-sm font-medium"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer