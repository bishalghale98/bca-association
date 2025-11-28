import { footerLink } from '@/constant/footerLink'
import Link from 'next/link'
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
                            <div className="h-8 bg-white rounded-lg flex items-center justify-center ">
                                <span className="text-vercel-black font-bold text-sm">BCA Association</span>
                            </div>
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
                                <Link
                                    key={index}
                                    href={item.slug}
                                    className="text-vercel-gray-400 hover:text-gray-800 transition-colors text-sm font-medium"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Resources</h4>
                        <div className="flex flex-col space-y-3">
                            {['Documentation', 'Help Center', 'Privacy', 'Terms'].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-vercel-gray-400 hover:text-gray-800 transition-colors text-sm font-medium"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Credit Section */}
                    <div className="flex flex-col space-y-4">
                        {/* <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Connect</h4>
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="mailto:contact@bca.edu"
                                className="text-vercel-gray-400 hover:text-gray-800 transition-colors text-sm font-medium"
                            >
                                contact@bca.edu
                            </Link>
                            <Link
                                href="tel:+977-1-1234567"
                                className="text-vercel-gray-400 hover:text-gray-800 transition-colors text-sm font-medium"
                            >
                                +977-1-1234567
                            </Link>
                        </div> */}

                        {/* Developer Credit */}
                        <div className="pt-4 mt-4  border-vercel-gray-800">
                            <p className="text-vercel-gray-500 text-xs">
                                Designed & Developed by{' '}
                                <Link
                                    href="https://bishalghale.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-vercel-gray-400 hover:text-gray-800 transition-colors font-medium underline underline-offset-2"
                                >
                                    Bishal Ghale
                                </Link>
                            </p>
                        </div>
                    </div>
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
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="text-vercel-gray-400 hover:text-gray-800 transition-colors text-sm font-medium"
                                >
                                    {social.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer