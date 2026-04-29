import React from 'react';

function LicensesPage() {
  const sections = [
    { title: 'Software Licenses', body: 'iFranchise platform utilizes various open-source and proprietary software components. This section outlines the licensing terms and attributions for third-party libraries, frameworks, and tools integrated into our service delivery infrastructure.' },
    { title: 'Open Source Components', body: 'We acknowledge and comply with the licensing requirements of open-source software used in our platform, including but not limited to React, Node.js, and various npm packages. Full attribution details are maintained in our technical documentation.' },
    { title: 'Content Licensing', body: 'All original content, including text, images, graphics, and multimedia elements created by iFranchise, is protected under applicable copyright laws. Users are granted limited rights to view and interact with this content for legitimate business evaluation purposes.' },
    { title: 'Third-Party Content', body: 'Franchise brand information, logos, and promotional materials displayed on our platform remain the intellectual property of their respective owners. iFranchise serves as a marketplace facilitator and does not claim ownership of brand-specific content.' },
    { title: 'API and Integration Licenses', body: "Our platform integrates with various third-party services for payment processing, analytics, and communication. These integrations are governed by the respective service providers' licensing terms and usage policies." },
    { title: 'User-Generated Content', body: 'Content submitted by users, including franchise applications, reviews, and communications, remains the property of the submitting party. By using our platform, users grant iFranchise necessary rights to process and display this content for service delivery.' },
    { title: 'Trademark Usage', body: 'The iFranchise name, logo, and associated trademarks are proprietary to our organization. Unauthorized use of our trademarks for commercial purposes is prohibited without explicit written permission.' },
    { title: 'Data Processing Licenses', body: 'Our data processing activities are conducted under applicable Indian data protection regulations and international compliance frameworks. Users consent to data processing as outlined in our Privacy Policy.' },
    { title: 'Geographic Licensing', body: 'iFranchise services are primarily designed for the Indian market and comply with Indian regulatory requirements. International usage may be subject to additional licensing considerations and local law compliance.' },
    { title: 'License Updates', body: 'Licensing terms may be updated periodically to reflect changes in third-party dependencies, regulatory requirements, or service enhancements. Users will be notified of material changes through appropriate channels.' },
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-slate-500 mb-4">Last Updated: December 15, 2024</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Licenses</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Information about software licenses, content usage rights, and intellectual property attributions.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((s, i) => (
            <div key={i} className={i < sections.length - 1 ? 'border-b border-slate-200 pb-8' : 'pb-8'}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h2>
              <p className="text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
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

export default LicensesPage;