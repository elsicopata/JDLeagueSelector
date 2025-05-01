import path from 'path'
import fs from 'fs'
import { app, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

const leagueMap = {
  41: 'Liga BetPlay Dimayor (Colombia)',
  45: 'Liga 1 (Perú)',
  42: 'Liga Profesional de Fútbol (Argentina)',
  20: 'Primera División de Chile',
  40: 'Liga MX (México)',
  44: 'Major League Soccer (MLS)',
}

const reverseLeagueMap = Object.fromEntries(
  Object.entries(leagueMap).map(([key, value]) => [value, key])
)

let currentLeaguesMapPath: string | null = null

ipcMain.handle('select-pes-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
    title: 'Seleccionar carpeta de JD PATCH',
  })

  if (result.canceled || result.filePaths.length === 0) {
    return { error: 'No se seleccionó ninguna carpeta.' }
  }

  const selectedPath = result.filePaths[0]
  const leaguesMapPath = path.join(
    selectedPath,
    'Server',
    'Files',
    'leagues',
    'leagues-map.txt'
  )

  if (!fs.existsSync(leaguesMapPath)) {
    return { error: 'El archivo leagues-map.txt no fue encontrado.' }
  }

  currentLeaguesMapPath = leaguesMapPath

  const content = fs.readFileSync(leaguesMapPath, 'utf8')
  const selected = getSelectedLeagueFromFile(content)

  return { fileExists: true, selected }
})

ipcMain.handle('set-selected-league', async (_event, leagueName: string) => {
  if (!currentLeaguesMapPath) return { error: 'Archivo no cargado.' }

  const content = fs.readFileSync(currentLeaguesMapPath, 'utf8')
  const lines = content.split(/\r?\n/)

  const leagueNumber = reverseLeagueMap[leagueName]
  if (!leagueNumber) return { error: 'Liga no válida.' }

  let insideFirstDivision = false
  let foundSelectedLeague = false
  const updatedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Entrar en la sección
    if (line.trim() === '[First division]') {
      insideFirstDivision = true
      updatedLines.push(line)
      continue
    }

    // Salir de la sección
    if (insideFirstDivision && line.trim().startsWith('[')) {
      insideFirstDivision = false
      updatedLines.push(line)
      continue
    }

    if (insideFirstDivision) {
      // Mantener Bundesliga (1 = ...)
      if (line.trim().startsWith('1 =')) {
        updatedLines.push(line)
        continue
      }

      // Si es la liga seleccionada, asignar "2 ="
      if (line.includes(`${leagueNumber},`)) {
        updatedLines.push(line.replace(/^ {2}=/, '2 ='))
        foundSelectedLeague = true
        continue
      }

      // Si es la liga actual seleccionada (tiene "2 ="), eliminar el "2 ="
      if (line.trim().startsWith('2 =')) {
        updatedLines.push(line.replace(/^2 =/, '  ='))
        continue
      }

      // Mantener otras líneas (sin modificar)
      updatedLines.push(line)
      continue
    }

    // Fuera de la sección, mantener el resto
    updatedLines.push(line)
  }

  // Verificar si se encontró la liga seleccionada
  if (!foundSelectedLeague) {
    return { error: `No se pudo encontrar la liga seleccionada (${leagueName}) en el archivo.` }
  }

  fs.writeFileSync(currentLeaguesMapPath, updatedLines.join('\n'), 'utf8')
  return { success: true }
})

function getSelectedLeagueFromFile(content: string): string | null {
  const lines = content.split(/\r?\n/)
  let insideFirstDivision = false

  for (const line of lines) {
    if (line.trim() === '[First division]') {
      insideFirstDivision = true
      continue
    }

    if (insideFirstDivision) {
      if (line.startsWith('[')) break // Salir de la sección
      if (line.trim().startsWith('2 =')) {
        const parts = line.split(',')
        const leagueNumber = parts[0].split('=')[1].trim()
        return leagueMap[leagueNumber] || null
      }
    }
  }

  return null
}