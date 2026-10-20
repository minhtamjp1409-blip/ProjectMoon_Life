import React from 'react';
import { AlertCircle, RotateCcw, House } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('Chronicle rendering error:', error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    let en = false;
    try {
      en = localStorage.getItem('pm-lang-mode') === 'en';
    } catch {
      // The recovery screen must also render when browser storage is unavailable.
    }
    return (
      <div className="app-error" role="alert">
        <AlertCircle size={30} strokeWidth={1.5} aria-hidden="true" />
        <h1>{en ? 'The record could not open' : 'Không thể mở hồ sơ'}</h1>
        <p>
          {en
            ? 'An unexpected error interrupted this page. Reload it, or return to the beginning. Your saved progress is kept.'
            : 'Trang gặp lỗi trong lúc hiển thị. Bạn có thể tải lại hoặc về trang chủ. Tiến trình đã lưu vẫn được giữ.'}
        </p>
        <div>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            <RotateCcw size={16} />
            {en ? 'Reload page' : 'Tải lại trang'}
          </button>
          <button
            className="btn"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <House size={16} />
            {en ? 'Return home' : 'Về trang chủ'}
          </button>
        </div>
        <details>
          <summary>{en ? 'Error details' : 'Chi tiết lỗi'}</summary>
          <pre>{String(this.state.error.message || this.state.error)}</pre>
        </details>
      </div>
    );
  }
}
export default ErrorBoundary;
