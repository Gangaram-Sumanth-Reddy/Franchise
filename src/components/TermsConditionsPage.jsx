import React from 'react';

function TermsConditionsPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-slate-500 mb-4">Last Updated: December 15, 2024</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms &amp; Conditions</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">The rules and responsibilities that apply when you use iFranchise services and platform features.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">By accessing or using iFranchise, you confirm that you have read, understood, and agreed to these terms, our privacy commitments, and any supplemental policies published for specific services.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Responsibilities</h2>
            <p className="text-slate-600 leading-relaxed">Users must provide accurate information, keep account credentials secure, and use the platform lawfully. You are responsible for all actions performed through your account unless unauthorized use is reported promptly.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Platform Usage Rules</h2>
            <p className="text-slate-600 leading-relaxed">You agree not to misuse platform content, submit misleading franchise applications, interfere with system security, scrape restricted data, or attempt unauthorized access to any account, API, or infrastructure component.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Payments &amp; Transactions</h2>
            <p className="text-slate-600 leading-relaxed">Certain services may involve fees, partner payments, or transaction processing terms. Pricing, taxes, refunds, and settlement timelines are governed by the specific service agreement shown at checkout or onboarding.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">All platform materials, trademarks, designs, and software elements are owned by iFranchise or its licensors. Limited usage rights are provided only for lawful personal or business evaluation purposes.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">To the extent permitted by law, iFranchise is not liable for indirect, incidental, or consequential losses arising from platform use, delays, third-party acts, investment outcomes, or business decisions by users.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Termination</h2>
            <p className="text-slate-600 leading-relaxed">We may suspend or terminate access for policy violations, security concerns, legal requirements, or misuse of services. Users may stop using the platform at any time, subject to any pending obligations.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law (India)</h2>
            <p className="text-slate-600 leading-relaxed">These terms are governed by the laws of India. Regulatory interpretations and enforceability shall be evaluated under applicable Indian statutes and jurisdictional principles.</p>
          </div>
          <div className="pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-600 leading-relaxed">For legal notices and terms-related questions, contact legal@ifranchise.in. Please include your account details and issue summary for faster resolution.</p>
          </div>
        </div>
        <div className="mt-16 p-6 bg-slate-50 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Legal Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Email</p>
              <a href="mailto:legal@ifranchise.in" className="text-blue-600 hover:underline">legal@ifranchise.in</a>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Phone</p>
              <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 98765 43210</a>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Address</p>
              <p className="text-slate-600">Bangalore, Karnataka, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsConditionsPage;
