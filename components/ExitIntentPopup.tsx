import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import pralayaPreview from '../assets/pralaya.webp';

const EXIT_INTENT_SHOWN_KEY = 'exit_intent_shown';
const EXIT_INTENT_DISMISSED_KEY = 'exit_intent_dismissed';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if already shown or dismissed in this session
    const hasShown = sessionStorage.getItem(EXIT_INTENT_SHOWN_KEY);
    const hasDismissed = sessionStorage.getItem(EXIT_INTENT_DISMISSED_KEY);
    
    if (hasShown || hasDismissed) return;

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect mouse leaving from top of viewport (trying to close tab/window)
      if (e.clientY <= 0 && !hasTriggered) {
        hasTriggered = true;
        setIsOpen(true);
        sessionStorage.setItem(EXIT_INTENT_SHOWN_KEY, 'true');
      }
    };

    // Add event listener after 3 seconds (let them browse first)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(EXIT_INTENT_DISMISSED_KEY, 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({ variant: 'destructive', title: 'Please enter a valid email' });
      return;
    }

    setSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase.from('exit_intent_leads').insert({
        email,
        source: 'exit_popup',
      });

      if (error && error.code !== '23505') { // Ignore duplicate
        throw error;
      }

      // Send poster via email (optional - will fail gracefully if function doesn't exist)
      try {
        await supabase.functions.invoke('send-poster-email', {
          body: { to: email }
        });
      } catch (emailErr) {
        console.error('Email send failed (this is okay for now):', emailErr);
      }

      toast({
        title: '🎉 Thank You!',
        description: 'We\'ve saved your email. Check back soon for the poster!',
      });

      setShowSuccess(true);
      
      // Close after showing success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);

    } catch (err) {
      console.error('Failed to capture email:', err);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!showSuccess ? (
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">⏸️</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Wait! Before you go...
              </h2>
              <p className="text-gray-600 text-lg">
                Get this exclusive digital poster as our gift to you
              </p>
            </div>

            {/* Poster Preview */}
            <div className="mb-6 max-w-md mx-auto">
              <div className="relative">
                <img 
                  src={pralayaPreview}
                  alt="Pralaya poster preview"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Details */}
            <div className="text-center mb-6 text-sm text-gray-600">
              <p className="mb-2">
                <strong className="text-gray-800">Pralaya by Michael Gallagher</strong>
              </p>
              <p>Permanent Collection, Solomon R. Guggenheim Museum</p>
              <p className="mt-3 text-gray-500">
                High-resolution digital download • Perfect for framing
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center text-lg h-12"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {submitting ? 'Sending...' : 'Send Me The Poster 🎨'}
              </Button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
              >
                No thanks, I'll pass
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-400">
              🔒 We respect your privacy. Unsubscribe anytime.
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Thank You!
            </h3>
            <p className="text-gray-600">
              We've saved your email: <strong>{email}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
