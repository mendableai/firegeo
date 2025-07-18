'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExistingAccountOptions, setShowExistingAccountOptions] = useState(false);
  const [domain, setDomain] = useState('');

  // Get domain from URL params
  useEffect(() => {
    const domainParam = searchParams.get('domain');
    if (domainParam) {
      setDomain(domainParam);
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowExistingAccountOptions(false);

    try {
      const response = await signUp.email({
        name,
        email,
        password,
      });
      
      // Only redirect if signup was successful
      if (!response.error) {
        // Wait a moment for the session to be properly set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Redirect to brand monitor with domain if provided, otherwise to home
        const redirectUrl = domain ? `/brand-monitor?domain=${encodeURIComponent(domain)}` : '/';
        window.location.href = redirectUrl;
      } else {
        throw response.error;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to register';
      setError(errorMessage);
      
      // Check if the error is about existing account
      // Better Auth returns 422 status for existing accounts
      if (err.status === 422 ||
          errorMessage.toLowerCase().includes('already exists') || 
          errorMessage.toLowerCase().includes('already registered') ||
          errorMessage.toLowerCase().includes('existing email') ||
          errorMessage.toLowerCase().includes('email already') ||
          errorMessage.toLowerCase().includes('user already exists')) {
        setShowExistingAccountOptions(true);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Orange gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 via-orange-500/90 to-orange-600/90" />
        <div className="relative z-10 max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Join thousands of developers</h1>
          <p className="text-lg opacity-90">
            Start building with our powerful API and unlock new possibilities for your applications.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited API access</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time collaboration</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="lg:hidden mb-8 flex justify-center">
              <Image
                src="/firecrawl-logo-with-fire.webp"
                alt="Firecrawl"
                width={180}
                height={37}
                priority
              />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            {domain && (
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Ready to analyze <span className="font-semibold text-orange-600">{domain}</span>
                </p>
              </div>
            )}
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                sign in to existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Choose a strong password"
                />
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
              </div>
            </div>

            {error && (
              <div className={`border px-4 py-3 rounded-lg ${showExistingAccountOptions ? 'bg-gray-900 border-gray-800' : 'bg-red-50 border-red-200'}`}>
                <p className={showExistingAccountOptions ? 'text-white font-medium' : 'text-red-600'}>
                  {error}
                </p>
                {showExistingAccountOptions && (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-gray-300">
                      It looks like you already have an account with this email address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link 
                        href={`/login?email=${encodeURIComponent(email)}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-orange-500 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-900 transition-colors"
                      >
                        Sign in instead
                      </Link>
                      <Link 
                        href="/forgot-password"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-orange-400 hover:text-orange-300 focus:outline-none focus:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link href="#" className="text-orange-600 hover:text-orange-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-orange-600 hover:text-orange-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-firecrawl-orange w-full inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 h-10 px-4"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}