import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('ipc', handler)

contextBridge.exposeInMainWorld('electronAPI', {
  selectPesFolder: () => ipcRenderer.invoke('select-pes-folder'),
  setSelectedLeague: (leagueName: string) => ipcRenderer.invoke('set-selected-league', leagueName),
  findPreviewImage: (basePath: string) => ipcRenderer.invoke('find-preview-image', basePath),
  replaceEntradaFiles: (sourceDir: string, targetDir: string, files: string[]) =>
    ipcRenderer.invoke('replace-entrada-files', sourceDir, targetDir, files),
})

export type IpcHandler = typeof handler
