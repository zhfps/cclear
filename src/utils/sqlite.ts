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
  const db = await Sqlite.load(`sqlite:${ dbPath }`)
  // console.log(db)
  return db

}

/**
 * initSqlite
 */
export async function initSqlite() {
  try{
    initSQL()
  }catch(e) {
    console.log(e)
  }

}

/**
 * 执行 sql 语句
 * @param sql sql 语句
 */
export const executeSQL = async (sql: string, hideError = false) => {
  const sliceSQL = sql.slice(0, 6)
  const db = await loadDb()
  try {
    if (sliceSQL === 'SELECT') {
      return await db.select(sql)
    } else {
      await db.execute(sql)
    }
  } catch (error) {
    if (hideError) return

    let action

    switch (sliceSQL) {
      case 'SELECT':
        action = '获取'
        break

      case 'INSERT':
        action = '添加'
        break

      case 'UPDATE':
        action = '更新'
        break

      case 'DELETE':
        action = '删除'
        break

      default:
        action = '创建'
        break
    }
  }
}

/**
 * 初始化 sql 配置
 */
export const initSQL = async () => {
  await executeSQL(
    `
    CREATE TABLE IF NOT EXISTS session (id TEXT, title TEXT, role_id INTEGER, type TEXT, update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS session_data (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, message TEXT, is_ask INTEGER, is_memory INTEGER, message_type TEXT, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS role (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, is_default INTEGER DEFAULT false);
    CREATE TABLE IF NOT EXISTS credit (id INTEGER PRIMARY KEY AUTOINCREMENT, history_id INTEGER, token_cost INTEGER, api_key TEXT);
    `
  )

  // 发版之后的表更新操作，只能对已存在的表进行增加列，不能删除列
  // 1. 2023-03-22 在 session 表中添加 update_time 列，记录对话的最后一次更新时间
  await executeSQL(
    `ALTER TABLE session ADD COLUMN update_time TIMESTAMP DEFAULT ${ Date.now() };`,
    true
  )
  // 2. 2023-03-27 在 session 表中添加 type 列，记录对话的类型
  await executeSQL(
    `ALTER TABLE session ADD COLUMN type TEXT DEFAULT 'text';`,
    true
  )
  // 3. 2023-05-21 在 session_data 表中添加 model 列，记录对话的模型
  await executeSQL(
    `ALTER TABLE session_data ADD COLUMN model TEXT DEFAULT 'gpt-3.5-turbo';`,
    true
  )
}

