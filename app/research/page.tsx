'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ResearchResult {
  id: string;
  query: string;
  results: any[];
  timestamp: Date;
  status: 'pending' | 'completed' | 'error';
}

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [researchHistory, setResearchHistory] = useState<ResearchResult[]>([]);
  const [currentResults, setCurrentResults] = useState<any[]>([]);

  const handleResearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    const researchId = Date.now().toString();
    
    // Add to history
    const newResearch: ResearchResult = {
      id: researchId,
      query,
      results: [],
      timestamp: new Date(),
      status: 'pending'
    };
    
    setResearchHistory(prev => [newResearch, ...prev]);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Research failed');
      }

      const data = await response.json();
      setCurrentResults(data.results || []);
      
      // Update history
      setResearchHistory(prev => 
        prev.map(item => 
          item.id === researchId 
            ? { ...item, results: data.results || [], status: 'completed' }
            : item
        )
      );
    } catch (error) {
      console.error('Research error:', error);
      setResearchHistory(prev => 
        prev.map(item => 
          item.id === researchId 
            ? { ...item, status: 'error' }
            : item
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Research Assistant</h1>
        <p className="text-muted-foreground">
          Deep research powered by AI. Ask complex questions and get comprehensive answers.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Research Input */}
        <Card>
          <CardHeader>
            <CardTitle>New Research Query</CardTitle>
            <CardDescription>
              Enter your research question. The AI will search multiple sources and provide a comprehensive analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="What are the environmental impacts of electric vehicles vs gasoline vehicles?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleResearch} 
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? 'Researching...' : 'Research'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results and History */}
        <Tabs defaultValue="results" className="w-full">
          <TabsList>
            <TabsTrigger value="results">Current Results</TabsTrigger>
            <TabsTrigger value="history">Research History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results" className="mt-6">
            {currentResults.length > 0 ? (
              <div className="space-y-4">
                {currentResults.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none">
                        <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{result.source}</p>
                        <div className="text-sm leading-relaxed">{result.content}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No research results yet. Start a new research query above.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {researchHistory.map((research) => (
                <Card key={research.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{research.query}</CardTitle>
                      <Badge variant={research.status === 'completed' ? 'default' : research.status === 'error' ? 'destructive' : 'secondary'}>
                        {research.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {research.timestamp.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  {research.status === 'completed' && research.results.length > 0 && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Found {research.results.length} sources
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 