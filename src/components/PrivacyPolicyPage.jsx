import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-slate-500 mb-4">Last Updated: December 15, 2024</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">How iFranchise collects, uses, shares, and protects your information across our franchise marketplace.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-600 leading-relaxed">This Privacy Policy explains how iFranchise, a franchise marketplace platform, handles personal and business information when users browse opportunities, create accounts, submit franchise enquiries, and engage with our advisory services.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed">We collect contact details, profile information, communication records, and transaction-related data. We may also receive usage signals such as device type, browser, IP address, and interaction patterns that help us improve platform performance.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Data</h2>
            <p className="text-slate-600 leading-relaxed">We use data to verify accounts, match users with relevant franchise opportunities, process requests, provide support, improve recommendations, prevent abuse, and meet compliance obligations under applicable Indian law.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sharing of Information</h2>
            <p className="text-slate-600 leading-relaxed">Information may be shared with listed brands, service partners, payment processors, technology providers, and legal authorities only where necessary for service delivery, lawful requests, fraud prevention, or contractual performance.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies &amp; Tracking</h2>
            <p className="text-slate-600 leading-relaxed">We use cookies and similar tools to remember preferences, maintain sessions, analyze traffic, and improve product experience. You can control cookie behavior through browser settings, though some features may not function fully.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 leading-relaxed">We apply administrative, technical, and physical safeguards such as access controls, secure communication channels, and internal review practices designed to protect user data from unauthorized access, misuse, or loss.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Rights</h2>
            <p className="text-slate-600 leading-relaxed">You may request access, correction, or deletion of your personal data, subject to legal and operational limits. You may also object to specific processing activities or withdraw consent where processing is consent-based.</p>
          </div>
          <div className="border-b border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">Data is retained only for as long as reasonably required to deliver services, satisfy legal requirements, resolve disputes, maintain security records, and enforce platform agreements.</p>
          </div>
          <div className="pb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-600 leading-relaxed">For privacy-related requests, users can contact our support and compliance team at legal@ifranchise.in. We may request verification details before processing sensitive account requests.</p>
          </div>
        </div>
        <div className="mt-16 p-6 bg-slate-50 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Privacy Contact Information</h3>
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

export default PrivacyPolicyPage;
