import React from 'react';
import Link from 'next/link';
import features from '@/features.json'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">



            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Subtle depth with shadow */}
                    <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-2 mb-8 shadow-sm border border-slate-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-slate-600 text-sm font-medium">Live - Tribhuvan University</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        BCA Student
                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Association Portal
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Connect, collaborate, and shape your academic journey. Share your career goals,
                        skills, and event preferences to help us build a better BCA community together.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/form"
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 flex items-center space-x-2"
                        >
                            <span>Submit Your Form</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        <Link
                            href="/admin"
                            className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:border-slate-400 transition-all hover:bg-white/50 active:scale-95"
                        >
                            Admin Login
                        </Link>
                    </div>

                    {/* Stats */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-2xl mx-auto">
                        {[
                            { number: '500+', label: 'Students' },
                            { number: '50+', label: 'Events' },
                            { number: '25+', label: 'Skills Tracked' },
                            { number: '95%', label: 'Satisfaction' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
                                <div className="text-slate-500 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/50">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Simple steps to make your voice heard and shape your BCA experience
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all hover:scale-105 group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl shadow-blue-500/25">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Share Your Voice?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join hundreds of BCA students who are already helping shape the future of our program.
                    </p>
                    <Link
                        href="/form"
                        className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg active:scale-95"
                    >
                        <span>Get Started Now</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default Home;