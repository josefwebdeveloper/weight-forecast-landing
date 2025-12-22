import React from 'react';
import { Banana, Shield, Mail, Globe } from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';
const LANDING_URL = 'https://www.weight-forecast.com';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href={LANDING_URL} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Banana className="text-slate-950" size={18} />
            </div>
            <span className="font-bold text-lg">Weight Forecast</span>
          </a>
          <a
            href={APP_URL}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg font-semibold transition-all text-slate-950 text-sm"
          >
            Launch App →
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6">
            <Shield size={16} />
            Privacy Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-lg">
            Last updated: December 22, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none space-y-8">
          
          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              Weight Forecast ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our weight tracking and AI prediction application.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              By using Weight Forecast, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Personal Information</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              When you create an account using Google OAuth, we collect:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Your name</li>
              <li>Email address</li>
              <li>Profile picture (optional)</li>
              <li>Google account ID</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Health & Fitness Data</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              You voluntarily provide:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Weight measurements (morning, afternoon, evening)</li>
              <li>Height and desired target weight</li>
              <li>BMI calculations</li>
              <li>Activity type, distance, duration, and calories burned</li>
              <li>Calories consumed (manual entry or AI food scanning)</li>
              <li>Sleep quality and duration</li>
              <li>Heart rate and RPE (Rate of Perceived Exertion)</li>
              <li>Personal notes and progress photos</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Photos & AI Analysis</h3>
            <p className="text-slate-300 leading-relaxed">
              When you use our AI food scanner, photos are temporarily processed to estimate calories. Photos are stored securely in your account and are never shared publicly.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Usage Data</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              We automatically collect:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Device information (browser type, operating system)</li>
              <li>IP address (anonymized)</li>
              <li>Usage patterns and feature interactions</li>
              <li>Performance metrics and error logs</li>
            </ul>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Provide AI predictions:</strong> Calculate your estimated goal date using linear regression on your weight history</li>
              <li><strong>Track your progress:</strong> Store and display your weight entries, BMI, and health metrics</li>
              <li><strong>Analyze food:</strong> Process food photos with AI to estimate calories</li>
              <li><strong>Sync across devices:</strong> Ensure your data is accessible on all your devices</li>
              <li><strong>Improve the app:</strong> Analyze usage patterns to enhance features and performance</li>
              <li><strong>Send notifications:</strong> Alert you about important updates (with your consent)</li>
              <li><strong>Provide support:</strong> Respond to your questions and technical issues</li>
            </ul>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Data Storage & Security</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Where Your Data is Stored</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              Your data is stored securely using:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Firebase Firestore:</strong> Encrypted cloud database with strict security rules</li>
              <li><strong>Local storage:</strong> Cached data for offline functionality (syncs when online)</li>
              <li><strong>Cloudinary:</strong> Secure image storage for photos with restricted access</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Security Measures</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              We implement industry-standard security practices:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>End-to-end encryption for data transmission (HTTPS/TLS)</li>
              <li>Firebase Authentication with secure token-based access</li>
              <li>Role-based access control (only you can access your data)</li>
              <li>Regular security audits and vulnerability scanning</li>
              <li>Data isolation: Your data is never mixed with other users</li>
            </ul>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Data Sharing & Disclosure</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">We Do NOT Sell Your Data</h3>
            <p className="text-slate-300 leading-relaxed font-semibold text-lg">
              Your health data is never sold, rented, or traded to third parties. Period.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Third-Party Services</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use trusted third-party services that may process your data:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Google OAuth:</strong> For secure authentication (name, email, profile picture)</li>
              <li><strong>OpenAI API:</strong> For AI-powered food calorie estimation (food photos only, not stored)</li>
              <li><strong>Firebase (Google Cloud):</strong> For database and authentication</li>
              <li><strong>Cloudinary:</strong> For secure photo storage</li>
              <li><strong>Vercel:</strong> For hosting and content delivery</li>
              <li><strong>Google Analytics:</strong> For anonymized usage statistics (you can opt out)</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              These services are bound by their own privacy policies and are GDPR/CCPA compliant.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Legal Requirements</h3>
            <p className="text-slate-300 leading-relaxed">
              We may disclose your information if required by law, court order, or to protect the rights, property, or safety of Weight Forecast, our users, or the public.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Your Rights & Choices</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Access & Control</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Access your data:</strong> View all stored information in your account</li>
              <li><strong>Export your data:</strong> Download a copy of your data in JSON format</li>
              <li><strong>Edit your data:</strong> Update or correct any information</li>
              <li><strong>Delete your data:</strong> Permanently delete your account and all associated data</li>
              <li><strong>Opt-out of analytics:</strong> Disable Google Analytics tracking</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Data Retention</h3>
            <p className="text-slate-300 leading-relaxed">
              We retain your data for as long as your account is active. If you delete your account, all data is permanently removed within 30 days, except as required by law.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">GDPR & CCPA Compliance</h3>
            <p className="text-slate-300 leading-relaxed">
              If you are in the EU or California, you have additional rights under GDPR or CCPA. Contact us to exercise these rights.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Cookies & Tracking</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Essential Cookies</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use cookies for:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Authentication (keeping you logged in)</li>
              <li>Session management</li>
              <li>Offline functionality (PWA)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Analytics Cookies</h3>
            <p className="text-slate-300 leading-relaxed">
              We use Google Analytics to understand how users interact with our app. You can opt out by disabling cookies in your browser or using browser extensions like uBlock Origin.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Children's Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Weight Forecast is not intended for users under 13 years old. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Changes to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-3">
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification (for material changes)</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Your continued use of the app after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="glass border border-amber-500/20 rounded-2xl p-6 md:p-8 bg-amber-500/5">
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
              <Mail className="text-amber-400" size={24} />
              Contact Us
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-white font-semibold flex items-center gap-2">
                <Mail size={16} className="text-amber-400" />
                Email: <a href="mailto:working.projects.info@gmail.com" className="text-amber-400 hover:text-amber-300 underline">working.projects.info@gmail.com</a>
              </p>
              <p className="text-white font-semibold flex items-center gap-2">
                <Globe size={16} className="text-amber-400" />
                Website: <a href={LANDING_URL} className="text-amber-400 hover:text-amber-300 underline">www.weight-forecast.com</a>
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              We aim to respond to all inquiries within 48 hours.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Banana className="text-slate-950" size={16} />
              </div>
              <span className="font-bold">Weight Forecast</span>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-400">
              <a href={LANDING_URL} className="hover:text-white transition-colors">Home</a>
              <a href={`${LANDING_URL}/privacy`} className="hover:text-white transition-colors">Privacy</a>
              <a href={`${LANDING_URL}/terms`} className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800/50 text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} Weight Forecast. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;

