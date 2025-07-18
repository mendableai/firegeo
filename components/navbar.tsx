'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCustomer } from '@/hooks/useAutumnCustomer';

// Separate component that only renders when Autumn is available
function UserCredits() {
  const { customer } = useCustomer();
  const messageUsage = customer?.features?.messages;
  const remainingMessages = messageUsage ? (messageUsage.balance || 0) : 0;
  
  return (
    <div className="flex items-center text-sm font-medium text-gray-700">
      <span>{remainingMessages}</span>
      <span className="ml-1">credits</span>
    </div>
  );
}

export function Navbar() {
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      // Small delay to ensure the session is cleared
      setTimeout(() => {
        router.refresh();
        setIsLoggingOut(false);
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-background shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/spid3r-logo.png"
                alt="SPID3R"
                width={120}
                height={25}
                priority
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session && (
              <>
                <Link
                  href="/chat"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground"
                >
                  Basic Chat
                </Link>
                <Link
                  href="/brand-monitor"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground"
                >
                  Brand Monitor
                </Link>
                <Link
                  href="/research"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground"
                >
                  Research
                </Link>
              </>
            )}
            <Link
              href="/plans"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground"
            >
              Plans
            </Link>
            {session && (
              <UserCredits />
            )}
            {isPending ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="btn-firecrawl-orange inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-8 px-3"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="btn-firecrawl-default inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 h-8 px-3"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="bg-foreground text-background hover:bg-muted inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-8 px-3 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="btn-firecrawl-orange inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-8 px-3"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}