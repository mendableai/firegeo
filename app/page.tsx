import Link from "next/link";
import UnicornHero from "../components/brand-monitor/UnicornHero";
import UnicornStudioRawEmbed from "../components/UnicornStudioRawEmbed";
import DomainSearch from "../components/domain-search";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-24">
        
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up">
              <span className="block text-foreground">SPID3R</span>
              <span className="block bg-gradient-to-r from-[rgb(0,230,245)] to-[rgb(0,180,220)] bg-clip-text text-transparent">
                Crawl + Sense + Script &gt; The W3B.
              </span>
            </h1>
            <div className="flex justify-center mb-6">
              <UnicornStudioRawEmbed />
            </div>
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in-up animation-delay-600">
              Powered by AI • Real-time Analysis • Competitor Tracking • SEO Insights
            </p>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
              Track how AI models rank your brand against competitors
            </p>
            
            {/* Domain Search */}
            <div className="mb-8 animate-fade-in-up animation-delay-300">
              <DomainSearch />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link
                href="/brand-monitor"
                className="btn-firecrawl-orange inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8"
              >
                Start Brand Analysis
              </Link>
              <Link
                href="/plans"
                className="btn-firecrawl-default inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 bg-card rounded-[20px] p-12 animate-fade-in-scale animation-delay-800">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up animation-delay-1000">
                <div className="text-4xl font-bold text-foreground">ChatGPT</div>
                <div className="text-sm text-muted-foreground mt-1">Claude, Perplexity & More</div>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1000" style={{animationDelay: '1100ms'}}>
                <div className="text-4xl font-bold text-foreground">Real-time</div>
                <div className="text-sm text-muted-foreground mt-1">Analysis</div>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1000" style={{animationDelay: '1200ms'}}>
                <div className="text-4xl font-bold text-foreground">Competitor</div>
                <div className="text-sm text-muted-foreground mt-1">Tracking</div>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1000" style={{animationDelay: '1300ms'}}>
                <div className="text-4xl font-bold text-foreground">Actionable</div>
                <div className="text-sm text-muted-foreground mt-1">Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-[30px] p-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Monitor Your Brand Visibility
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that fits your monitoring needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-card p-8 rounded-[20px] border border-[rgb(0,230,245)] animate-fade-in-up animation-delay-400 hover:scale-105 transition-all duration-200">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Starter</h3>
              <p className="text-muted-foreground mb-6">Perfect for personal brands</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10 brand analyses/month
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic AI providers
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email reports
                </li>
              </ul>
              <Link
                href="/register"
                className="btn-firecrawl-outline w-full inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-10 px-4"
              >
                Start free
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="bg-card p-8 rounded-[20px] border-2 border-[rgb(0,230,245)] relative animate-fade-in-up animation-delay-600 hover:scale-105 transition-all duration-200">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[rgb(0,230,245)] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Pro</h3>
              <p className="text-muted-foreground mb-6">For growing businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$49</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited brand analyses
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All AI providers
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time alerts
                </li>
              </ul>
              <Link
                href="/register"
                className="btn-firecrawl-orange w-full inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-10 px-4"
              >
                Start free trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-card p-8 rounded-[20px] border border-[rgb(0,230,245)] animate-fade-in-up animation-delay-800 hover:scale-105 transition-all duration-200">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For agencies & large brands</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multiple brands
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API access
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  White-label options
                </li>
              </ul>
              <Link
                href="/contact"
                className="btn-firecrawl-outline w-full inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-10 px-4"
              >
                Contact sales
              </Link>
            </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/plans" className="bg-[rgb(0,230,245)] hover:bg-[rgb(0,200,220)] text-white border border-[rgb(0,230,245)] inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-10 px-4">
                View detailed pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section 1 */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[rgb(0,230,245)] to-[rgb(0,180,220)] rounded-[30px] p-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              See How AI Models Rank Your Brand
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Monitor your brand visibility across ChatGPT, Claude, Perplexity and more
            </p>
            <Link
              href="/brand-monitor"
              className="btn-firecrawl-default inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8"
            >
              Start Free Analysis
            </Link>
          </div>
        </div>
      </section>


      {/* FAQs */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Frequently asked questions
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
              Everything you need to know about SPID3R
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-card rounded-[15px] overflow-hidden animate-fade-in-up animation-delay-400">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How does SPID3R Monitor work?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  SPID3R analyzes your brand's visibility across major AI platforms like ChatGPT, Claude, and Perplexity. Simply enter your website URL, and we'll show you how AI models rank your brand against competitors, what prompts trigger your appearance, and provide actionable insights to improve your AI visibility.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-card rounded-[15px] overflow-hidden animate-fade-in-up animation-delay-500">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Which AI providers do you monitor?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We monitor all major AI platforms including OpenAI's ChatGPT, Anthropic's Claude, Perplexity, Google's Gemini, and more. Our system continuously updates as new AI providers emerge, ensuring you always have comprehensive visibility across the AI landscape.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-card rounded-[15px] overflow-hidden animate-fade-in-up animation-delay-600">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How often is the data updated?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our monitoring runs in real-time. When you request an analysis, we query all AI providers simultaneously to get the most current results. You can run new analyses anytime to track changes in your brand visibility and see how your optimization efforts are performing.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-card rounded-[15px] overflow-hidden animate-fade-in-up animation-delay-700">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  What insights will I get?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You'll see your brand's visibility score, competitor rankings, which prompts trigger your appearance, response quality analysis, and specific recommendations to improve your AI presence. The platform also tracks trends over time and alerts you to significant changes.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-card rounded-[15px] overflow-hidden animate-fade-in-up animation-delay-800">
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How many credits do I need?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each brand analysis uses 10 credits (1 credit for initial URL analysis, 9 credits for the full AI provider scan). The free tier includes 100 credits monthly, enough for 10 complete analyses. Pro plans include unlimited analyses for comprehensive monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Start Monitoring Your AI Brand Visibility
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Take control of how AI models present your brand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/brand-monitor"
              className="btn-firecrawl-orange inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8"
            >
              Analyze Your Brand
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8 bg-background text-foreground hover:bg-secondary"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}