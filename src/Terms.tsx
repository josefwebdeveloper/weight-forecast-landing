import React from 'react';
import { Banana, FileText, Mail, Globe } from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';
const LANDING_URL = 'https://www.weight-forecast.com';

const Terms: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
            <FileText size={16} />
            Terms of Service
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-slate-400 text-lg">
            Last updated: December 22, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none space-y-8">
          
          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Agreement to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing or using Weight Forecast ("the Service", "the App", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Description of Service</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Weight Forecast is a weight tracking and goal forecasting application that provides:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>AI-powered weight goal date predictions using linear regression</li>
              <li>Weight and health metrics tracking (3x daily measurements)</li>
              <li>AI food calorie estimation from photos and text</li>
              <li>Daily diary entries with day rating system (1-5 stars)</li>
              <li>Color-coded progress cards based on day ratings</li>
              <li>BMI calculations and progress visualization</li>
              <li>Offline functionality via Progressive Web App (PWA)</li>
              <li>Cloud synchronization across devices</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              The Service is provided free of charge for personal, non-commercial use.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">User Accounts</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Account Creation</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              To use Weight Forecast, you must:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Be at least 13 years of age</li>
              <li>Create an account using Google OAuth authentication</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Account Responsibilities</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>All activities that occur under your account</li>
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information remains accurate</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Account Termination</h3>
            <p className="text-slate-300 leading-relaxed">
              You may delete your account at any time through the app settings. We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Acceptable Use</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">You May</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Use the Service for personal health and fitness tracking</li>
              <li>Track your weight, calories, and activity data</li>
              <li>Upload progress photos for personal use</li>
              <li>Use AI features to estimate calories from food</li>
              <li>Access the Service from multiple devices</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-red-400 mt-6">You May NOT</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Use the Service for commercial purposes without permission</li>
              <li>Share your account with others</li>
              <li>Attempt to reverse engineer, decompile, or hack the Service</li>
              <li>Upload malicious content, viruses, or harmful code</li>
              <li>Upload inappropriate, illegal, or offensive content</li>
              <li>Scrape, harvest, or collect data from other users</li>
              <li>Overwhelm our servers with excessive requests (abuse API limits)</li>
              <li>Use the Service to violate any laws or regulations</li>
              <li>Impersonate others or provide false information</li>
            </ul>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Medical Disclaimer</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-red-300 font-semibold text-lg">
                ⚠️ IMPORTANT: Weight Forecast is NOT a medical device or service.
              </p>
            </div>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong>By using this Service, you acknowledge that:</strong>
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Weight Forecast provides <strong>estimates and predictions</strong> based on mathematical models (linear regression), not medical advice</li>
              <li>AI calorie estimations are <strong>approximate</strong> and may not be accurate</li>
              <li>BMI calculations are <strong>general guidelines</strong> and do not account for muscle mass, body composition, or individual health conditions</li>
              <li>Weight loss predictions are <strong>not guarantees</strong> and results vary based on many factors</li>
              <li>You should <strong>consult a healthcare professional</strong> before starting any weight loss program</li>
              <li>The Service is <strong>not a substitute</strong> for professional medical advice, diagnosis, or treatment</li>
              <li>We are <strong>not liable</strong> for any health outcomes, injuries, or issues arising from use of the Service</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              <strong>If you experience health issues, seek immediate medical attention.</strong>
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">AI Features & Limitations</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">AI Predictions</h3>
            <p className="text-slate-300 leading-relaxed">
              Our AI weight prediction uses linear regression on your historical data. Predictions become more accurate with more data points (minimum 2 weeks recommended). Results are estimates, not guarantees.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">AI Food Scanner</h3>
            <p className="text-slate-300 leading-relaxed">
              The AI food calorie estimator analyzes photos to identify food and estimate calories. This feature is provided "as-is" and may produce inaccurate results. Always verify with nutritional labels when possible.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">No Medical Claims</h3>
            <p className="text-slate-300 leading-relaxed">
              We make no claims that our AI features are medically validated, FDA-approved, or suitable for medical diagnosis or treatment.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Our Content</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              The Service and its original content (excluding user data), features, and functionality are owned by Weight Forecast and are protected by:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>International copyright laws</li>
              <li>Trademark laws</li>
              <li>Patent laws</li>
              <li>Other intellectual property rights</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Your Content</h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              You retain all rights to your personal data (weight logs, photos, notes). By using the Service, you grant us a limited license to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Store and process your data to provide the Service</li>
              <li>Use AI models to analyze your data (only for your benefit)</li>
              <li>Create backups and ensure data synchronization</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              <strong>We do NOT claim ownership of your data and will not use it for purposes outside of providing the Service.</strong>
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              The Service integrates with third-party services:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Google OAuth:</strong> For authentication</li>
              <li><strong>OpenAI API:</strong> For AI food analysis</li>
              <li><strong>Firebase:</strong> For database and authentication</li>
              <li><strong>Cloudinary:</strong> For photo storage</li>
              <li><strong>Google Analytics:</strong> For usage statistics</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              These services have their own terms and privacy policies. We are not responsible for their content, policies, or practices.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Disclaimer of Warranties</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</strong>
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              We disclaim all warranties, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness of information</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Security or freedom from viruses</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              <strong>Use of the Service is at your own risk.</strong>
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <p className="text-slate-300 leading-relaxed mb-3">
              Weight Forecast, its developers, officers, employees, and affiliates shall NOT be liable for:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Health issues, injuries, or medical conditions</li>
              <li>Inaccurate predictions or calorie estimations</li>
              <li>Data loss, corruption, or security breaches</li>
              <li>Service interruptions or downtime</li>
              <li>Third-party actions or content</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              <strong>Our total liability shall not exceed $100 USD or the amount you paid us in the last 12 months (whichever is greater).</strong>
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Indemnification</h2>
            <p className="text-slate-300 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Weight Forecast and its affiliates from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-3">
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Content you upload or create</li>
            </ul>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Changes to Service & Terms</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Service Changes</h3>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time without notice. We are not liable for any modification, suspension, or discontinuation.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Terms Changes</h3>
            <p className="text-slate-300 leading-relaxed">
              We may revise these Terms at any time. We will notify you by updating the "Last updated" date. Your continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Governing Law & Disputes</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Governing Law</h3>
            <p className="text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Weight Forecast operates, without regard to conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-amber-400 mt-6">Dispute Resolution</h3>
            <p className="text-slate-300 leading-relaxed">
              In the event of any dispute, you agree to first contact us to attempt to resolve the issue informally. If unresolved, disputes will be settled through binding arbitration in accordance with applicable arbitration rules.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Severability</h2>
            <p className="text-slate-300 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section className="glass border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Entire Agreement</h2>
            <p className="text-slate-300 leading-relaxed">
              These Terms, along with our Privacy Policy, constitute the entire agreement between you and Weight Forecast regarding the Service and supersede all prior agreements and understandings.
            </p>
          </section>

          <section className="glass border border-amber-500/20 rounded-2xl p-6 md:p-8 bg-amber-500/5">
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
              <Mail className="text-amber-400" size={24} />
              Contact Us
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
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

export default Terms;

