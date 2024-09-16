import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTradingViewScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initTradingViewWidget = () => {
      if (widgetRef.current && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: '5',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: widgetRef.current.id,
          studies: ["MACD@tv-basicstudies"],
          watchlist: ['FWcHkPDRbymcZQBzBHiY4mbTPcuSbwgB8dmLFEgepump'],
        });
      }
    };

    if (!window.TradingView) {
      loadTradingViewScript().then(initTradingViewWidget).catch(error => {
        console.error('Failed to load TradingView script:', error);
      });
    } else {
      initTradingViewWidget();
    }
  }, [symbol]);

  return <div ref={widgetRef} id="tradingview-widget" style={{ width: '100%', height: '100%' }} />;
};

export default TradingViewWidget;
