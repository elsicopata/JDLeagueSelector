import { IpcHandler } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler,
    electronAPI: {
      selectPesFolder: () => Promise<{ error?: string; fileExists?: boolean; selected?: string }>;
      setSelectedLeague?: (leagueName: string) => Promise<{ error?: string }>;
    };
  }
}

export { }