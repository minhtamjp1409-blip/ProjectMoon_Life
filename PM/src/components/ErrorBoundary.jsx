import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('City Chronicles ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.removeItem('pm_city_chronicles_run_v1');
    } catch (e) {
      // ignore
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#0d0e12',
          color: '#eeede9',
          fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: 420,
            padding: '28px 24px',
            background: '#14161c',
            border: '1px solid #c9a24b',
            borderRadius: 8,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#c9a24b', marginBottom: 8 }}>
              Gián Đoạn Kết Nối Tâm Thức
            </h2>
            <p style={{ fontSize: 14, color: '#9aa0a6', lineHeight: 1.6, marginBottom: 20 }}>
              Một biến cố bất ngờ làm gián đoạn dòng thời gian trong The City. Hãy tải lại trang hoặc khôi phục về trang chủ.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  padding: '8px 18px',
                  background: '#c9a24b',
                  color: '#0d0e12',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                Tải lại trang
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  padding: '8px 18px',
                  background: 'transparent',
                  color: '#eeede9',
                  border: '1px solid #333a4d',
                  borderRadius: 6,
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                Về trang chủ
              </button>
            </div>
            {this.state.error && (
              <pre style={{
                marginTop: 20,
                padding: 10,
                background: '#08090d',
                borderRadius: 4,
                color: '#f56565',
                fontSize: 11,
                textAlign: 'left',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
