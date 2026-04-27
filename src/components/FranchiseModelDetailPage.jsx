import { useMemo, useState } from 'react';

// Franchise model data with complete information
const franchiseModelDetails = {
  'urban-coffee-co': {
    id: 'urban-coffee-co',
    slug: 'urban-coffee-co',
    title: 'Urban Coffee Co',
    description: 'Premium specialty coffee experience with artisanal brewing methods and sustainable sourcing. Perfect for entrepreneurs who want to enter the premium coffee market with established brand recognition.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$30K - $60K',
      setupCost: '$80K - $150K',
      workingCapital: '$20K - $40K',
      totalInvestment: '$130K - $250K'
    },
    model: 'FOFO',
    roi: '28%',
    payback: '18 months',
    locations: 'Metro cities across India',
    features: [
      'Artisanal brewing methods',
      'Sustainable sourcing practices',
      'Premium quality ingredients',
      'Brand recognition support',
      'Marketing toolkit provided'
    ],
    benefits: [
      'Growing coffee market',
      'Premium positioning',
      'Established brand',
      'Training programs',
      'Supply chain support'
    ],
    requirements: [
      'Minimum investment: $130K',
      'Commercial space: 800-1200 sq ft',
      'Food service experience preferred',
      'Passion for coffee culture'
    ]
  },
  'fitlife-studios': {
    id: 'fitlife-studios',
    slug: 'fitlife-studios',
    title: 'FitLife Studios',
    description: 'High-end fitness boutique with personalized training and wellness programs. Ideal for fitness entrepreneurs who want to offer premium wellness experiences.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$40K - $80K',
      setupCost: '$100K - $200K',
      workingCapital: '$30K - $60K',
      totalInvestment: '$170K - $340K'
    },
    model: 'FICO',
    roi: '35%',
    payback: '24 months',
    locations: 'Tier 1 & Tier 2 cities',
    features: [
      'Personalized training programs',
      'Wellness integration',
      'Premium equipment',
      'Professional staff training',
      'Marketing support'
    ],
    benefits: [
      'High-end market positioning',
      'Recurring revenue model',
      'Brand differentiation',
      'Multiple revenue streams',
      'Scalable business model'
    ],
    requirements: [
      'Minimum investment: $170K',
      'Commercial space: 2000-3500 sq ft',
      'Fitness industry experience',
      'Certification requirements'
    ]
  },
  'bella-italia-ristorante': {
    id: 'bella-italia-ristorante',
    slug: 'bella-italia-ristorante',
    title: 'Bella Italia Ristorante',
    description: 'Authentic Italian dining experience with traditional recipes and modern ambiance. Perfect for restaurateurs who want to bring authentic Italian cuisine to new markets.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$50K - $100K',
      setupCost: '$120K - $250K',
      workingCapital: '$40K - $80K',
      totalInvestment: '$210K - $430K'
    },
    model: 'FOCO',
    roi: '32%',
    payback: '30 months',
    locations: 'Major cities nationwide',
    features: [
      'Traditional Italian recipes',
      'Modern restaurant ambiance',
      'Central supply chain',
      'Staff training programs',
      'Brand development support'
    ],
    benefits: [
      'Strong brand heritage',
      'Authentic cuisine',
      'Growing restaurant market',
      'Comprehensive support',
      'Proven business model'
    ],
    requirements: [
      'Minimum investment: $210K',
      'Commercial space: 1500-2500 sq ft',
      'Restaurant experience required',
      'Culinary background preferred'
    ]
  },
  'kidszone-play-center': {
    id: 'kidszone-play-center',
    slug: 'kidszone-play-center',
    title: 'KidsZone Play Center',
    description: 'Interactive entertainment and educational activities for children aged 3-12. Perfect for entrepreneurs who want to create a fun, safe, and engaging space for families.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$40K - $80K',
      setupCost: '$100K - $200K',
      workingCapital: '$30K - $60K',
      totalInvestment: '$170K - $340K'
    },
    model: 'FOFO',
    roi: '42%',
    payback: '20 months',
    locations: 'Suburban and urban areas',
    features: [
      'Interactive play structures',
      'Educational activity zones',
      'Safety-focused design',
      'Party hosting services',
      'Professional staff training'
    ],
    benefits: [
      'Growing family entertainment market',
      'Recurring revenue streams',
      'Community impact',
      'Brand differentiation',
      'Scalable business model'
    ],
    requirements: [
      'Minimum investment: $170K',
      'Commercial space: 3000-5000 sq ft',
      'Childcare experience preferred',
      'Safety certifications required'
    ]
  },
  'quickclean-services': {
    id: 'quickclean-services',
    slug: 'quickclean-services',
    title: 'QuickClean Services',
    description: 'Professional cleaning solutions for residential and commercial properties with eco-friendly practices and reliable service delivery.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$20K - $40K',
      setupCost: '$30K - $60K',
      workingCapital: '$15K - $30K',
      totalInvestment: '$65K - $130K'
    },
    model: 'FICO',
    roi: '45%',
    payback: '15 months',
    locations: 'Metro cities and suburbs',
    features: [
      'Eco-friendly cleaning products',
      'Professional training programs',
      'Scheduling software provided',
      'Quality assurance systems',
      'Marketing support materials'
    ],
    benefits: [
      'Low investment barrier',
      'High profit margins',
      'Recurring revenue model',
      'Professional support',
      'Environmental responsibility'
    ],
    requirements: [
      'Minimum investment: $65K',
      'Commercial space: 500-1000 sq ft',
      'Cleaning experience preferred',
      'Insurance and bonding required'
    ]
  },
  'techrepair-pro': {
    id: 'techrepair-pro',
    slug: 'techrepair-pro',
    title: 'TechRepair Pro',
    description: 'Comprehensive device repair and technology support services with certified technicians and modern repair facilities.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$30K - $60K',
      setupCost: '$40K - $80K',
      workingCapital: '$20K - $40K',
      totalInvestment: '$90K - $180K'
    },
    model: 'FOFO',
    roi: '38%',
    payback: '16 months',
    locations: 'Tech hubs and commercial areas',
    features: [
      'Certified technician network',
      'Modern repair facilities',
      'Inventory management system',
      'Customer service training',
      'Technology support services'
    ],
    benefits: [
      'Growing tech repair market',
      'Multiple revenue streams',
      'Brand differentiation',
      'Technical expertise',
      'Scalable operations'
    ],
    requirements: [
      'Minimum investment: $90K',
      'Commercial space: 800-1500 sq ft',
      'Technical certifications required',
      'Industry experience preferred'
    ]
  },
  'foco-model': {
    id: 'foco-model',
    slug: 'foco-model',
    code: 'FOCO',
    title: 'Franchise Owned, Company Operated',
    description: 'The franchise partner owns unit while our central team manages operations, staffing, and quality delivery. This model is ideal for passive investors who want ownership without operational responsibilities.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$25K - $50K',
      setupCost: '$150K - $300K',
      workingCapital: '$50K - $100K',
      totalInvestment: '$225K - $450K'
    },
    model: 'FOCO',
    roi: '35-45%',
    payback: '24-30 months',
    locations: 'Major cities across India',
    features: [
      'Zero operational management required',
      'Professional team handles daily operations',
      'Quarterly performance reports',
      'Standardized quality control',
      'Central marketing support'
    ],
    benefits: [
      'Passive income opportunity',
      'Professional management team',
      'Proven operational systems',
      'Brand consistency',
      'Lower time commitment'
    ],
    requirements: [
      'Minimum investment: $225K',
      'Commercial space: 1000-2000 sq ft',
      'Location approval required',
      'Financial background check'
    ]
  },
  'fofo-model': {
    id: 'fofo-model',
    slug: 'fofo-model',
    code: 'FOFO',
    title: 'Franchise Owned and Operated',
    description: 'The franchise partner owns and runs daily business operations with standardized systems and growth support. Perfect for hands-on entrepreneurs who want to actively manage their business.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$30K - $60K',
      setupCost: '$100K - $250K',
      workingCapital: '$40K - $80K',
      totalInvestment: '$170K - $390K'
    },
    model: 'FOFO',
    roi: '40-55%',
    payback: '18-24 months',
    locations: 'Tier 1 & Tier 2 cities',
    features: [
      'Complete operational control',
      'Comprehensive training program',
      'Standard operating procedures',
      'Supply chain management',
      'Marketing toolkit provided'
    ],
    benefits: [
      'Higher profit margins',
      'Full business ownership',
      'Operational independence',
      'Direct customer relationships',
      'Scalable growth model'
    ],
    requirements: [
      'Minimum investment: $170K',
      'Commercial space: 800-1500 sq ft',
      'Operational experience preferred',
      'Full-time commitment required'
    ]
  },
  'fico-model': {
    id: 'fico-model',
    slug: 'fico-model',
    code: 'FICO',
    title: 'Franchise Invested, Company Operated',
    description: 'Investors fund expansion while the company executes operations end-to-end with transparent reporting. Ideal for investors seeking passive returns with professional management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    investment: {
      franchiseFee: '$50K - $100K',
      setupCost: '$200K - $400K',
      workingCapital: '$75K - $150K',
      totalInvestment: '$325K - $650K'
    },
    model: 'FICO',
    roi: '25-35%',
    payback: '36-48 months',
    locations: 'Premium commercial locations',
    features: [
      'Fully managed operations',
      'Monthly performance reports',
      'Professional management team',
      'Quality assurance systems',
      'Transparent financial reporting'
    ],
    benefits: [
      'Completely passive investment',
      'Professional management',
      'Lower risk profile',
      'Consistent returns',
      'No operational headaches'
    ],
    requirements: [
      'Minimum investment: $325K',
      'No operational experience needed',
      'Financial accreditation required',
      'Long-term investment horizon'
    ]
  }
};

function FranchiseModelDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const selectedModel = useMemo(() => {
    const path = window.location.pathname;
    console.log('Current path:', path);
    
    // Extract slug from /franchise/slug format
    const pathParts = path.split('/');
    const slug = pathParts[pathParts.length - 1];
    
    console.log('Extracted slug:', slug);
    
    const model = franchiseModelDetails[slug] || null;
    
    // Simulate loading completion
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return model;
  }, []);

  if (!selectedModel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Franchise Model Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">The franchise model you're looking for doesn't exist.</p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="rounded-full bg-[#0B1220] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#1a2332]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={selectedModel.image}
          alt={selectedModel.title}
          className={`h-96 w-full object-cover transition-opacity duration-500 ${imageLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=80';
            setImageLoaded(true);
          }}
        />
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center text-white">
            <h1 className={`text-5xl font-bold mb-4 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>{selectedModel.title}</h1>
            <p className={`text-xl max-w-3xl mx-auto px-4 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>{selectedModel.description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Investment Details */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Investment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Franchise Fee</p>
                    <p className="text-xl font-bold text-slate-900">{selectedModel.investment.franchiseFee}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Setup Cost</p>
                    <p className="text-xl font-bold text-slate-900">{selectedModel.investment.setupCost}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Working Capital</p>
                    <p className="text-xl font-bold text-slate-900">{selectedModel.investment.workingCapital}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Investment</p>
                    <p className="text-xl font-bold text-slate-900">{selectedModel.investment.totalInvestment}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedModel.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#0B1220] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-slate-700">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
              <div className="space-y-4">
                {selectedModel.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-slate-600">{index + 1}</span>
                    </div>
                    <p className="text-slate-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Quick Info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Model Type</p>
                  <p className="text-lg font-bold text-slate-900">{selectedModel.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Expected ROI</p>
                  <p className="text-lg font-bold text-green-600">{selectedModel.roi}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Payback Period</p>
                  <p className="text-lg font-bold text-slate-900">{selectedModel.payback}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Available Locations</p>
                  <p className="text-lg font-bold text-slate-900">{selectedModel.locations}</p>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Benefits</h3>
              <div className="space-y-3">
                {selectedModel.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-[#0B1220] to-[#1a2332] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-sm mb-6 opacity-90">Take the first step towards owning your franchise.</p>
              <button
                className="w-full rounded-full bg-white text-[#0B1220] px-6 py-3 text-sm font-semibold transition duration-300 hover:bg-slate-100"
                onClick={() => {
                  window.history.pushState({}, '', '/contact');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                Get Started
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiseModelDetailPage;
