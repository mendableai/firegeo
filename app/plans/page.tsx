'use client';

import PricingTable from '@/components/autumn/pricing-table';
import StaticPricingTable from '@/components/static-pricing-table';
import { useSession } from '@/lib/auth-client';

// Static product details for unauthenticated users
const staticProducts = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out our service",
    price: {
      primaryText: "Free",
      secondaryText: "No credit card required"
    },
    items: [
      { 
        primaryText: "5 brand monitors",
        secondaryText: "Track up to 5 brands"
      },
      {
        primaryText: "Daily monitoring",
        secondaryText: "Check for updates once per day"
      },
      {
        primaryText: "Basic analytics",
        secondaryText: "Essential insights and reports"
      }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced brand monitoring",
    recommendText: "Most Popular",
    price: {
      primaryText: "$10/month",
      secondaryText: "billed monthly"
    },
    items: [
      { 
        primaryText: "Unlimited brand monitors",
        secondaryText: "Track as many brands as you need"
      },
      {
        primaryText: "Real-time monitoring",
        secondaryText: "Instant updates and alerts"
      },
      {
        primaryText: "Advanced analytics",
        secondaryText: "Deep insights and custom reports"
      }
    ]
  }
];

export default function PricingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-[3rem] lg:text-[4.5rem] font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-tr from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </span>
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </p>
          {session && (
            <p className="text-sm text-zinc-500 mt-4">
              Logged in as: {session.user?.email}
            </p>
          )}
        </div>

        <div className="bg-white rounded-[20px] shadow-xl p-8 border border-zinc-200">
          {/* Use static component for unauthenticated users to avoid API calls */}
          {session ? (
            <PricingTable />
          ) : (
            <StaticPricingTable products={staticProducts} />
          )}
        </div>
      </div>
    </div>
  );
}