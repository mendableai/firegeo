'use client';

import { BrandMonitor } from '@/components/brand-monitor/brand-monitor';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Menu, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { useCustomer, useRefreshCustomer } from '@/hooks/useAutumnCustomer';
import { useBrandAnalyses, useBrandAnalysis, useDeleteBrandAnalysis } from '@/hooks/useBrandAnalyses';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useSession } from '@/lib/auth-client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

// Separate component that uses Autumn hooks
function BrandMonitorContent({ session }: { session: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { customer, isLoading, error } = useCustomer();
  const refreshCustomer = useRefreshCustomer();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);
  
  // Queries and mutations
  const { data: analyses, isLoading: analysesLoading } = useBrandAnalyses();
  const { data: currentAnalysis } = useBrandAnalysis(selectedAnalysisId);
  const deleteAnalysis = useDeleteBrandAnalysis();
  
  // Get credits from customer data
  const messageUsage = customer?.features?.messages;
  const credits = messageUsage ? (messageUsage.balance || 0) : 0;

  useEffect(() => {
    // If there's an auth error, redirect to login
    if (error?.code === 'UNAUTHORIZED' || error?.code === 'AUTH_ERROR') {
      router.push('/login');
    }
  }, [error, router]);

  const handleCreditsUpdate = async () => {
    // Use the global refresh to update customer data everywhere
    await refreshCustomer();
  };
  
  const handleDeleteAnalysis = async (analysisId: string) => {
    setAnalysisToDelete(analysisId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (analysisToDelete) {
      await deleteAnalysis.mutateAsync(analysisToDelete);
      if (selectedAnalysisId === analysisToDelete) {
        setSelectedAnalysisId(null);
      }
      setAnalysisToDelete(null);
    }
  };
  
  const handleNewAnalysis = () => {
    setSelectedAnalysisId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2 animate-fade-in-up">
                  <span className="block text-zinc-900">SPID3R</span>
                  <span className="block bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    AI Brand Visibility Platform
                  </span>
                </h1>
                <p className="text-lg text-zinc-600 animate-fade-in-up animation-delay-200">
                  Track how AI models rank your brand against competitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-12rem)] relative">
        {/* Sidebar Toggle Button - Always visible */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-2 z-10 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 ${
            sidebarOpen ? 'left-[324px]' : 'left-4'
          }`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r overflow-hidden flex flex-col transition-all duration-200`}>
          <div className="p-4 border-b">
            <Button
              onClick={handleNewAnalysis}
              className="w-full btn-firecrawl-orange"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {analysesLoading ? (
              <div className="p-4 text-center text-gray-500">Loading analyses...</div>
            ) : analyses?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No analyses yet</div>
            ) : (
              <div className="space-y-1 p-2">
                {analyses?.map((analysis) => (
                  <div
                    key={analysis.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                      selectedAnalysisId === analysis.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setSelectedAnalysisId(analysis.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {analysis.companyName || 'Untitled Analysis'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {analysis.url}
                        </p>
                        <p className="text-xs text-gray-400">
                          {analysis.createdAt && format(new Date(analysis.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAnalysis(analysis.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 sm:px-8 lg:px-12 py-8">
            <BrandMonitor 
              creditsAvailable={credits} 
              onCreditsUpdate={handleCreditsUpdate}
              selectedAnalysis={selectedAnalysisId ? currentAnalysis : null}
              initialDomain={searchParams.get('domain') || undefined}
              onSaveAnalysis={(analysis) => {
                // This will be called when analysis completes
                // We'll implement this in the next step
              }}
            />
          </div>
        </div>
      </div>
      
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Analysis"
        description="Are you sure you want to delete this analysis? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        isLoading={deleteAnalysis.isPending}
      />
    </div>
  );
}

export default function BrandMonitorPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access the brand monitor</p>
        </div>
      </div>
    );
  }

  return <BrandMonitorContent session={session} />;
}