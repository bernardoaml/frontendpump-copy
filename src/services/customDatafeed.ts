import { fetchTokenData } from './tradingViewDataFeed';

export function getCustomDataFeed(tokenMint: string) {
  return {
    onReady: (callback: any) => {
      setTimeout(() => callback({ supports_marks: false, supports_timescale_marks: false, supports_time: true }), 0);
    },
    searchSymbols: (userInput: string, exchange: string, symbolType: string, onResultReadyCallback: any) => {},
    resolveSymbol: (symbolName: string, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
      onSymbolResolvedCallback({
        name: tokenMint,
        full_name: tokenMint,
        ticker: tokenMint,
        description: tokenMint,
        type: 'crypto',
        session: '24x7',
        exchange: 'Custom',
        listed_exchange: 'Custom',
        timezone: 'Etc/UTC',
        format: 'price',
        pricescale: 1000000000,
        minmov: 1,
        has_intraday: true,
        supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'],
        volume_precision: 8,
        data_status: 'streaming',
      });
    },
    getBars: async (symbolInfo: any, resolution: string, from: number, to: number, onHistoryCallback: any, onErrorCallback: any, firstDataRequest: boolean) => {
      try {
        const data = await fetchTokenData(tokenMint);
        if (data.length) {
          onHistoryCallback(data, { noData: false });
        } else {
          onHistoryCallback([], { noData: true });
        }
      } catch (error) {
        onErrorCallback(error);
      }
    },
    subscribeBars: (symbolInfo: any, resolution: string, onRealtimeCallback: any, subscriberUID: any, onResetCacheNeededCallback: any) => {},
    unsubscribeBars: (subscriberUID: any) => {},
    calculateHistoryDepth: (resolution: string, resolutionBack: string, intervalBack: number) => {},
    getMarks: (symbolInfo: any, startDate: number, endDate: number, onDataCallback: any, resolution: string) => {},
    getTimeScaleMarks: (symbolInfo: any, startDate: number, endDate: number, onDataCallback: any, resolution: string) => {},
    getServerTime: (callback: any) => {},
  };
}
