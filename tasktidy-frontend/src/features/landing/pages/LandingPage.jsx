import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    CheckCircle, 
    Clock, 
    Target, 
    Users, 
    BarChart3, 
    Zap,
    Star,
    ArrowRight,
    Play,
    Download,
    Mail,
    Phone,
    MapPin,
    ChevronDown
} from 'lucide-react';
import LottieAnimation from '../../../shared/components/LottieAnimation';
import DarkModeToggle from '../../../shared/components/DarkModeToggle';
import taskAnimationData from '../../../assets/lottie/task_animation.json';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDemo, setShowDemo] = useState(false);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const navigate = useNavigate();

    const features = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Smart Task Management",
            description: "Organize tasks with priorities, categories, and intelligent sorting to focus on what matters most."
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Time Tracking",
            description: "Track time spent on tasks and get insights into your productivity patterns."
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Analytics Dashboard",
            description: "Visualize your progress with detailed analytics and performance metrics."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Team Collaboration",
            description: "Share tasks, assign responsibilities, and collaborate seamlessly with your team."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Quick Actions",
            description: "Use keyboard shortcuts and quick actions to manage tasks efficiently."
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Task Templates",
            description: "Create reusable templates for common workflows and save time."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "TechCorp",
            content: "TaskTidy has transformed how our team manages projects. The analytics help us identify bottlenecks and improve our workflow.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Freelance Developer",
            company: "Self-employed",
            content: "As a freelancer, I need to track time accurately. TaskTidy's time tracking feature is a game-changer for my productivity.",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Marketing Director",
            company: "GrowthCo",
            content: "The task templates feature saves me hours every week. I can quickly set up campaigns and track their progress efficiently.",
            rating: 5
        }
    ];

    const pricingPlans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            features: [
                "Up to 50 tasks",
                "Basic analytics",
                "Task categories",
                "Dark mode",
                "Mobile responsive"
            ],
            cta: "Get Started Free",
            popular: false
        },
        {
            name: "Pro",
            price: "$9",
            period: "per month",
            features: [
                "Unlimited tasks",
                "Advanced analytics",
                "Task templates",
                "Time tracking",
                "Priority support",
                "Export data",
                "Custom categories"
            ],
            cta: "Start Pro Trial",
            popular: true
        },
        {
            name: "Team",
            price: "$29",
            period: "per month",
            features: [
                "Everything in Pro",
                "Team collaboration",
                "Shared workspaces",
                "Admin controls",
                "API access",
                "Custom integrations",
                "Dedicated support"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    const faqs = [
        {
            question: "Can I use TaskTidy for free?",
            answer: "Yes! TaskTidy offers a generous free plan with up to 50 tasks, basic analytics, and core features. You can upgrade anytime to unlock more features."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use industry-standard encryption and security practices to protect your data. Your information is never shared with third parties."
        },
        {
            question: "Can I export my data?",
            answer: "Yes, Pro and Team users can export their data in various formats including CSV, JSON, and PDF for backup or migration purposes."
        },
        {
            question: "Do you offer team collaboration?",
            answer: "Yes! Our Team plan includes shared workspaces, task assignment, real-time collaboration, and admin controls for managing team members."
        },
        {
            question: "Is there a mobile app?",
            answer: "TaskTidy is fully responsive and works great on mobile devices. We're also developing native mobile apps for iOS and Android."
        },
        {
            question: "What kind of support do you offer?",
            answer: "Free users get community support, Pro users get priority email support, and Team users get dedicated support with phone and chat options."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Navigation */}
            <motion.nav 
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
                style={{ y, opacity }}
            >
                <div className="container mx-auto px-4 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <motion.div 
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs sm:text-sm">T</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TaskTidy
                            </span>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm lg:text-base">Features</a>
                            <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm lg:text-base">Pricing</a>
                            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm lg:text-base">Testimonials</a>
                            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm lg:text-base">Contact</a>
                            <DarkModeToggle />
                            <motion.button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors text-sm lg:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/auth')}
                            >
                                Get Started
                            </motion.button>
                        </div>

                        <div className="md:hidden flex items-center space-x-3">
                            <DarkModeToggle />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 dark:text-gray-300 p-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <motion.div 
                            className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="flex flex-col space-y-4">
                                <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">Features</a>
                                <a href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">Pricing</a>
                                <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">Testimonials</a>
                                <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base">Contact</a>
                                <motion.button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-base"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/auth')}
                                >
                                    Get Started
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                                Master Your
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Productivity
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Transform your workflow with intelligent task management, time tracking, and powerful analytics. 
                                Stay organized, focused, and achieve more every day.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <motion.button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/auth')}
                                >
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.button>
                                <motion.button
                                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDemo(true)}
                                >
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Watch Demo</span>
                                </motion.button>
                            </div>
                            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Free forever plan</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Setup in 2 minutes</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                                <LottieAnimation animationData={taskAnimationData} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 sm:py-20 px-4 bg-white dark:bg-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            Everything you need to
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                stay productive
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                            Powerful features designed to help you organize, track, and optimize your workflow for maximum efficiency.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 sm:mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 sm:py-20 px-4 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            Loved by teams worldwide
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                            Join thousands of professionals who have transformed their productivity with TaskTidy.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                    "{testimonial.content}"
                                </p>
                                <div>
                                    <div className="font-semibold text-sm sm:text-base">{testimonial.name}</div>
                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-16 sm:py-20 px-4 bg-white dark:bg-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                            Choose the plan that fits your needs. Upgrade or downgrade anytime.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-xl ${
                                    plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="text-center mb-6 sm:mb-8">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                                        <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">/{plan.period}</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center space-x-3">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                                        plan.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/auth')}
                                >
                                    {plan.cta}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 sm:py-20 px-4 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            Frequently asked questions
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4">
                            Everything you need to know about TaskTidy.
                        </p>
                    </motion.div>

                    <div className="space-y-4 sm:space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm"
                            >
                                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{faq.question}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 sm:py-20 px-4 bg-white dark:bg-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            Ready to get started?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
                            Join thousands of users who have already transformed their productivity with TaskTidy.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in touch</h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    <span className="text-sm sm:text-base">support@tasktidy.com</span>
                                </div>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    <span className="text-sm sm:text-base">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    <span className="text-sm sm:text-base">San Francisco, CA</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <form className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm sm:text-base"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm sm:text-base"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-sm sm:text-base"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                        <div className="col-span-2 sm:col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xs sm:text-sm">T</span>
                                </div>
                                <span className="text-xl sm:text-2xl font-bold">TaskTidy</span>
                            </div>
                            <p className="text-gray-400 mb-4 text-sm sm:text-base">
                                Transform your productivity with intelligent task management and powerful analytics.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
                            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
                            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
                            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
                        <p>&copy; 2024 TaskTidy. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Demo Modal */}
            {showDemo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowDemo(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    TaskTidy Demo
                                </h2>
                                <button
                                    onClick={() => setShowDemo(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <Play className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                            TaskTidy Demo Video
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                                            Watch how TaskTidy can transform your productivity
                                        </p>
                                        <motion.button
                                            onClick={() => navigate('/auth')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Try It Now
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default LandingPage; 