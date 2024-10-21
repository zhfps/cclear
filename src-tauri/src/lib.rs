// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use std::env;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_current_dir() -> Result<String, String> {
    match env::current_exe() {
        Ok(exe_path) => {
            match exe_path.parent() {
                Some(dir) => Ok(dir.to_string_lossy().into_owned()),
                None => Err("Unable to get parent directory".into())
            }
        },
        Err(e) => Err(format!("Error getting current exe path: {}", e))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet,get_current_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
