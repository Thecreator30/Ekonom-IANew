import React from 'react';

/** Reusable skeleton pulse for loading states */
export const SkeletonPulse: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700/50 rounded-lg ${className || ''}`} />
);

/** Full-page skeleton with card placeholders */
export const PageSkeleton: React.FC = () => (
  <div className="px-5 pt-8 pb-24 animate-fade-in space-y-6">
    {/* Header skeleton */}
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <SkeletonPulse className="h-7 w-40" />
        <SkeletonPulse className="h-4 w-24" />
      </div>
      <SkeletonPulse className="h-10 w-10 rounded-full" />
    </div>

    {/* Main card skeleton */}
    <SkeletonPulse className="h-40 w-full rounded-2xl" />

    {/* Smaller cards */}
    <div className="grid grid-cols-2 gap-3">
      <SkeletonPulse className="h-28 rounded-2xl" />
      <SkeletonPulse className="h-28 rounded-2xl" />
    </div>

    {/* List items */}
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonPulse className="h-14 w-14 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-3/4" />
            <SkeletonPulse className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Card-style skeleton for stats/KPI areas */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`glass-panel rounded-2xl p-5 space-y-3 ${className || ''}`}>
    <div className="flex justify-between items-start">
      <SkeletonPulse className="h-5 w-5 rounded" />
      <SkeletonPulse className="h-4 w-12" />
    </div>
    <SkeletonPulse className="h-8 w-20" />
    <SkeletonPulse className="h-3 w-24" />
  </div>
);

/** Inline error state for failed API calls within a page section */
export const InlineError: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'Impossible de charger les donnees',
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-3">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-xs font-bold text-primary hover:text-blue-600 transition"
      >
        Reessayer
      </button>
    )}
  </div>
);
