import React, { Component } from 'react';

     class ErrorBoundary extends Component {
       state = { hasError: false, error: null };

       static getDerivedStateFromError(error) {
         return { hasError: true, error };
       }

       componentDidCatch(error, errorInfo) {
         console.error('Error caught by boundary:', error, errorInfo);
       }

       render() {
         if (this.state.hasError) {
           return (
             <div className="error-boundary">
               <h2>Something went wrong.</h2>
               <p>{this.state.error.message}</p>
               <button onClick={() => this.setState({ hasError: false, error: null })}>Try Again</button>
             </div>
           );
         }
         return this.props.children;
       }
     }

     export default ErrorBoundary;