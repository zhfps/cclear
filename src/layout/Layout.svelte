<script lang="ts">
  import { Router, Route, Link } from "svelte-routing"
  import Home from "../view/Home.svelte"
  import Settings from "../view/Settings.svelte"
  type MenuItem =
    | "Health Check"
    | "自定义清理"
    | "性能优化器"
    | "Driver Updater"
    | "注册表"
    | "工具"
    | "选项";


  let selectedMenu: MenuItem = $state("Health Check")
  function selectMenu(menu: MenuItem) {
    selectedMenu = menu
  }
</script>

<div class="flex h-screen">
  <Router>
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-4 text-lg font-bold">CCleaner Professional</div>
      <nav class="flex-grow">
        <ul>
          <li>
            <Link
              to="/"
              >
              <button
              type="button"
              class={`p-4 w-full text-left cursor-pointer hover:bg-gray-700 ${selectedMenu === "Health Check" ? "bg-blue-600" : ""}`}
              onclick={() => selectMenu("Health Check")}
            >
              Health Check
              </button>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              >
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

    <main class="flex-grow bg-gray-100 p-8">
      <!-- Main content -->
      <Route path="/" component={Home} />
      <Route path="/settings" component={Settings} />
    </main>
  </Router>
</div>
