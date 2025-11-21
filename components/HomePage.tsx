import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, Mail, Star, CheckCircle, Users, Award, Globe, Calendar } from 'lucide-react';

export default function HomePage() {
  const handleGetStarted = () => {
    // Navigate to signup view
    window.dispatchEvent(new CustomEvent('navigate-to-signup'));
  };

  const handleCallNow = () => {
    window.open('tel:+13102345678');
  };

  // Add this useEffect AFTER the handleCallNow function
  useEffect(() => {
    const handleNavigateToSignup = () => {
      window.history.pushState({}, '', '/signup');
      window.location.reload();
    };

    window.addEventListener('navigate-to-signup', handleNavigateToSignup);
    return () => window.removeEventListener('navigate-to-signup', handleNavigateToSignup);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🎨 GALLAGHER ART SCHOOL
            </h1>
            <h2 className="text-2xl text-blue-600 mb-6">
              Western Fine Art Instruction from a Yale MFA Graduate
            </h2>
            <div className="flex justify-center items-center gap-8 flex-wrap mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">30+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-600" />
                <span className="font-medium">Former Soho Gallery Artist</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                <span className="font-medium">95% College Acceptance Rate</span>
              </div>
            </div>
            
            {/* Age Programs Quick Nav */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-2">🌟 Ages 6-12</h3>
                <p className="text-sm text-orange-800">Foundation Building</p>
                <p className="text-xs text-orange-600">$380/month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">🎓 Ages 16-18</h3>
                <p className="text-sm text-blue-800">Portfolio Preparation</p>
                <p className="text-xs text-blue-600">$4,800/12 months</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-2">✨ Adults</h3>
                <p className="text-sm text-green-800">Classical Training</p>
                <p className="text-xs text-green-600">$2,400/6 months</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                onClick={handleGetStarted}
              >
                Find Your Perfect Program →
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={handleCallNow}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (310) 234-5678
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Gallagher Art School?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Yale MFA Graduate</h3>
              <p className="text-gray-600">Master of Fine Arts from one of America's most prestigious art programs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Professional Gallery Experience</h3>
              <p className="text-gray-600">Former representation in Soho, New York's premier art district</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">500+ Students Taught</h3>
              <p className="text-gray-600">30+ years of experience across all age groups and skill levels</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">College Acceptance</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">30+</div>
                <div className="text-sm text-gray-600">Years Teaching</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chinese Families Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">🏮 Welcome Chinese Families</h2>
          <h3 className="text-xl text-red-800 mb-8">欢迎中国家庭 - Authentic Western Art Education</h3>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-bold text-lg mb-4">Why Chinese Families Choose Us:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Classical American and European techniques</li>
                <li>✓ Art history and cultural context included</li>
                <li>✓ Understanding of Asian family educational values</li>
                <li>✓ Long-term student relationships (3-8 years typical)</li>
                <li>✓ Proven success with Chinese students</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Perfect For:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• College portfolio preparation (US university standards)</li>
                <li>• Cultural immersion through Western art tradition</li>
                <li>• Small class sizes with personal attention</li>
                <li>• Teacher who understands dedication to excellence</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg">
            <p className="text-lg text-gray-700 italic mb-2">
              "作为华人家庭，我们选择Michael因为他理解我们对教育质量的要求"
            </p>
            <p className="text-gray-600">
              "As a Chinese family, we chose Michael because he understands our commitment to educational excellence"
            </p>
          </div>

          <Button 
            className="mt-8 bg-red-600 hover:bg-red-700" 
            onClick={handleGetStarted}
          >
            Schedule Consultation →
          </Button>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">⭐ Student Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 mb-4">
                "Michael helped my daughter get into RISD with a substantial scholarship. 
                His Yale background and gallery experience made all the difference."
              </p>
              <div className="text-sm text-gray-500">— Linda Chen, Parent (Portfolio Student)</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 mb-4">
                "Four years with Michael transformed my son from complete beginner to confident artist. 
                We followed him from Orange County!"
              </p>
              <div className="text-sm text-gray-500">— James Wang, Parent (Long-term Student)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Program Details</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Elementary */}
            <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="text-xl font-bold text-orange-900 mb-4">🌟 Foundation Building</h3>
              <p className="text-orange-800 mb-4">Ages 6-12 • Build creativity and fundamentals</p>
              <div className="text-sm text-orange-700 mb-4 space-y-1">
                <div>💰 <strong>$380/month</strong> (4 weekly sessions)</div>
                <div>🎨 Drawing, painting, art appreciation</div>
                <div>⏰ 1 hour weekly sessions</div>
                <div>👨‍🏫 Patient, age-appropriate instruction</div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleGetStarted}>
                Learn More →
              </Button>
            </div>

            {/* Portfolio */}
            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50 relative">
              <div className="absolute -top-2 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Most Popular!
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 mt-4">🎓 Portfolio Preparation</h3>
              <p className="text-blue-800 mb-4">Ages 16-18 • College application ready</p>
              <div className="text-sm text-blue-700 mb-4 space-y-1">
                <div>💰 <strong>$4,800</strong> over 12 months</div>
                <div>🎨 15-20 finished portfolio pieces</div>
                <div>⏰ 1.5 hours weekly + intensives</div>
                <div>🏆 95% acceptance to top schools</div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
                Start Assessment →
              </Button>
            </div>

            {/* Skills */}
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold text-green-900 mb-4">✨ Skills Development</h3>
              <p className="text-green-800 mb-4">All Ages • Classical techniques</p>
              <div className="text-sm text-green-700 mb-4 space-y-1">
                <div>💰 <strong>$2,400</strong> over 6 months</div>
                <div>🎨 Oil painting & drawing mastery</div>
                <div>⏰ 1.5 hours weekly</div>
                <div>🌟 Perfect for serious hobbyists</div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleGetStarted}>
                Get Started →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Michael */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">👨‍🎨 Meet Your Instructor</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Michael Gallagher</h3>
                <p className="text-gray-700 mb-4">
                  30+ years ago, I began teaching with a simple mission: share the classical Western art 
                  techniques I learned at Yale with students who truly want to grow as artists.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>🎓 MFA from Yale University School of Art</div>
                  <div>🖼️ Professional gallery representation in Soho, NY</div>
                  <div>👥 500+ students taught from age 6 to 60+</div>
                  <div>🏆 Students accepted to every major US art school</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">What Makes My Teaching Different:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• One-on-one attention in small groups</li>
                  <li>• Classical techniques you can't learn online</li>
                  <li>• Long-term relationships (many students stay 5+ years)</li>
                  <li>• Experience with international families</li>
                  <li>• Understanding of both technique AND cultural context</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Artistic Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 500+ students who've discovered their artistic potential at Gallagher Art School.
          </p>
          
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <p className="text-lg mb-4">Get your personalized program recommendation in 3 minutes:</p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold"
              onClick={handleGetStarted}
            >
              Start Your Assessment →
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center text-center">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Call: (310) 234-5678</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              <span>hello@gallagherartschool.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Limited availability</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
