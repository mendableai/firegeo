'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface DomainSearchProps {
  className?: string;
  variant?: 'hero' | 'compact';
}

export default function DomainSearch({ className = '', variant = 'hero' }: DomainSearchProps) {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) return;

    setIsLoading(true);

    try {
      // Check if user is authenticated by trying to access a protected route
      const response = await fetch('/api/auth/session');
      const session = await response.json();

      if (session?.user) {
        // User is authenticated, redirect to brand monitor with domain
        router.push(`/brand-monitor?domain=${encodeURIComponent(domain.trim())}`);
      } else {
        // User is not authenticated, redirect to signup with domain
        router.push(`/register?domain=${encodeURIComponent(domain.trim())}`);
      }
    } catch (error) {
      // If session check fails, redirect to signup
      router.push(`/register?domain=${encodeURIComponent(domain.trim())}`);
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeDomain = (input: string) => {
    // Remove protocol and www if present
    return input.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeDomain(e.target.value);
    setDomain(normalized);
  };

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Input
          type="text"
          placeholder="Enter your domain (e.g., example.com)"
          value={domain}
          onChange={handleDomainChange}
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          onClick={handleSearch}
          disabled={isLoading || !domain.trim()}
          className="btn-firecrawl-orange"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    );
  }

  return (
    <Card className={`max-w-2xl mx-auto ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Check Your Brand Visibility
          </h3>
          <p className="text-muted-foreground">
            See how AI models rank your brand against competitors
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your domain (e.g., example.com)"
              value={domain}
              onChange={handleDomainChange}
              className="flex-1 text-lg"
              disabled={isLoading}
            />
            <Button 
              type="submit"
              disabled={isLoading || !domain.trim()}
              className="btn-firecrawl-orange px-8"
            >
              {isLoading ? 'Searching...' : 'Analyze'}
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Free plan includes 10 brand analyses per month
          </p>
        </form>
      </CardContent>
    </Card>
  );
} 