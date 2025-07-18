import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { apiRateLimit } from '@/lib/rate-limit';
import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Rate limiting
    try {
      await apiRateLimit(request, session.user.id);
    } catch (error) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Use Firecrawl for web search (you already have this set up)
    const searchResults = await performWebSearch(query);
    
    // Use Claude to analyze and synthesize the results
    const analysis = await analyzeWithClaude(query, searchResults);

    return NextResponse.json({
      results: analysis,
      sources: searchResults.map(result => result.url),
      query,
      timestamp: new Date().toISOString(),
      status: 'completed'
    });

  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function performWebSearch(query: string) {
  // This would integrate with your existing Firecrawl setup
  // For now, returning mock data - you'll need to implement this
  // using your existing web search utilities
  
  return [
    {
      title: 'Sample Research Result',
      url: 'https://example.com',
      content: 'This is a sample research result. In the actual implementation, this would be real web search results from Firecrawl.',
      source: 'example.com'
    }
  ];
}

async function analyzeWithClaude(query: string, searchResults: any[]) {
  const systemPrompt = `You are a research assistant. Analyze the provided search results and synthesize a comprehensive answer to the user's query. 

Guidelines:
- Provide a well-structured, comprehensive response
- Cite sources when possible
- Be objective and factual
- Organize information logically
- Highlight key findings and insights

Search Results:
${searchResults.map((result, index) => `
Source ${index + 1}: ${result.title}
URL: ${result.url}
Content: ${result.content}
`).join('\n')}

User Query: ${query}

Please provide a comprehensive analysis:`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Please analyze the search results and provide a comprehensive answer to: ${query}`
      }
    ]
  });

  return [
    {
      title: 'AI Analysis',
      content: response.content[0].type === 'text' ? response.content[0].text : 'Analysis completed',
      source: 'Claude AI',
      type: 'analysis'
    },
    ...searchResults
  ];
} 