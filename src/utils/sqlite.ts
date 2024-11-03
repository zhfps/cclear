// import { invoke } from '@tauri-apps/api/core'
import Sqlite from '@tauri-apps/plugin-sql'
import { appConfigDir } from '@tauri-apps/api/path'

/**
 * loadDb
 * @returns { Promise<Sqlite> }
 */
export async function loadDb(): Promise<Sqlite> {
  const dbFile = import.meta.env.DEV ? 'config.dev.db' : 'config.db'
  const config = await appConfigDir()
  const dbPath = `${ config }\\${ dbFile }`
  // console.log(dbPath)
  return Sqlite.load(`sqlite:${ dbPath }`)
}

