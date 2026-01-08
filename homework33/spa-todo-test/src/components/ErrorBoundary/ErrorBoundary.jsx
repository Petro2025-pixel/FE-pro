import { Component } from 'react';
import { ThemeContext } from '../../themeContext';

class ErrorBoundary extends Component {
  static contextType = ThemeContext; 

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { theme } = this.context;
    
    if (this.state.hasError) {
      return <a href="/" style={{ color: theme.color }}>Go to main</a>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;