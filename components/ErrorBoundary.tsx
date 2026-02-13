import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] px-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Oups, une erreur est survenue
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
            Un probleme inattendu s'est produit. Essayez de recharger.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:scale-95 transition-all"
          >
            <RefreshCw size={16} />
            Reessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
