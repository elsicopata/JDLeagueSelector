import { IpcHandler } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler,
    electronAPI: {
      selectPesFolder: () => Promise<{
        error?: string;
        fileExists?: boolean;
        selected?: string;
        selectedPath?: string; // <-- agrega esta línea
      }>;
      setSelectedLeague?: (leagueName: string) => Promise<{ error?: string }>;
      setSelectedCup?: (cupName: string) => Promise<{ error?: string }>;
      removeFile?: (filePath: string) => Promise<{ success: boolean; error?: string }>;
      copyFile?: (source: string, destination: string) => Promise<{ success: boolean; error?: string }>;
      findPreviewImage?: (basePath: string) => Promise<{ base64: string, mime: string } | null>;
      replaceEntradaFiles?: (sourceDir: string, targetDir: string, files: string[]) => Promise<{ success?: boolean; error?: string }>;
    };
  }
}

export { }