<script lang="ts">
  import { Router, Route, Link } from "svelte-routing"
  import { getCurrentWindow } from "@tauri-apps/api/window"
  import Home from "../view/Home.svelte"
  import Settings from "../view/Settings.svelte"
  type MenuItem =
    | "Calendar"
    | "自定义清理"
    | "性能优化器"
    | "Driver Updater"
    | "注册表"
    | "工具"
    | "选项";


  // 定义窗口控制函数
  const minimizeWindow = async (): Promise<void> => {
    await getCurrentWindow().minimize()
  }

  const maximizeWindow = async (): Promise<void> => {
    await getCurrentWindow().toggleMaximize()
  }

  const closeWindow = async (): Promise<void> => {
    await getCurrentWindow().close()
  }

  const startDragging = async (): Promise<void> => {
    await getCurrentWindow().startDragging()
  }

  // 处理窗口控制事件

  let selectedMenu: MenuItem = $state("Calendar")
  function selectMenu(menu: MenuItem) {
    selectedMenu = menu
  }
</script>

<div class="flex flex-col h-screen">
  <div
    class="custom-titlebar bg-gray-800"
    role="button"
    aria-label="Drag Window"
    tabindex="0"
    onmousedown={startDragging}
  >
    <h1>My Tauri App</h1>
    <div class="window-controls" role="group" aria-label="Window Controls">
      <button aria-label="Minimize window" onclick={minimizeWindow}>_</button>
      <button aria-label="Maximize window" onclick={maximizeWindow}>[ ]</button>
      <button aria-label="Close window" onclick={closeWindow}>X</button>
    </div>
  </div>
  <div class="flex h-screen-60">
    <Router>
      <aside class="w-64 bg-gray-800 text-white flex flex-col">
        <nav class="flex-grow">
          <ul>
            <li>
              <Link to="/">
                <button
                  type="button"
                  class={`p-4 w-full text-left cursor-pointer hover:bg-gray-700 ${selectedMenu === "Calendar" ? "bg-blue-600" : ""}`}
                  onclick={() => selectMenu("Calendar")}
                >
                  Calendar
                </button>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <button
                  type="button"
                  class={`p-4 w-full text-left cursor-pointer hover:bg-gray-700 ${selectedMenu === "自定义清理" ? "bg-blue-600" : ""}`}
                  onclick={() => selectMenu("自定义清理")}
                >
                  自定义清理
                </button>
              </Link>
            </li>
            <!-- Repeat similar <button> elements for other menu items -->
          </ul>
        </nav>
      </aside>

      <main class="flex-grow bg-gray-100 overflow-y-auto">
        <!-- Main content -->
        <Route path="/" component={Home} />
        <Route path="/settings" component={Settings} />
      </main>
    </Router>
  </div>
</div>

<style>
  .custom-titlebar {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .window-controls button {
    background: transparent;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin: 0 5px;
  }

  .window-controls button:hover {
    color: #e5e5e5;
  }
</style>
