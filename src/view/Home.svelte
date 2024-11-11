<script lang="ts">
  import Icon from '@iconify/svelte'
  import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
  //@ts-expect-error nothing
  import zhCN from 'date-fns/locale/zh-CN'

  let currentMonth: Date = new Date()
  let tasks: Record<number, number> = generateMockTasks()

  // 生成模拟任务数据
  function generateMockTasks(): Record<number, number> {
    const data: Record<number, number> = {}
    for (let i = 1; i <= 31; i++) {
      data[i] = Math.floor(Math.random() * 9) // 随机生成 0 到 8 的任务数量
    }
    return data
  }

  function previousMonth() {
    currentMonth = subMonths(currentMonth, 1)
  }

  function nextMonth() {
    currentMonth = addMonths(currentMonth, 1)
  }

  function getDaysInMonth() {
    const startDate = startOfWeek(startOfMonth(currentMonth))
    const endDate = endOfWeek(endOfMonth(currentMonth))
    return eachDayOfInterval({ start: startDate, end: endDate })
  }
</script>

<!-- 设置整体高度为屏幕高度，日期网格可以滚动 -->
<div class="h-screen flex flex-col p-4 bg-gray-100 overflow-y-auto">
  <!-- 导航栏 -->
  <div class="flex justify-between items-center mb-2">
    <button on:click={previousMonth} class="p-2 text-gray-500">
      <Icon icon="mingcute:left-fill" />
    </button>
    <span class="text-lg font-semibold">{format(currentMonth, 'yyyy年MM月', { locale: zhCN })}</span>
    <button on:click={nextMonth} class="p-2 text-gray-500">
      <Icon icon="mingcute:right-fill" />
    </button>
  </div>

  <!-- 星期标题 -->
  <div class="grid grid-cols-7 text-center text-gray-600 font-medium mb-2">
    {#each ['日', '一', '二', '三', '四', '五', '六'] as day}
      <div>{day}</div>
    {/each}
  </div>

  <!-- 日期网格，自动填充剩余空间 -->
  <div class="flex-1 grid grid-cols-7 gap-2">
    {#each getDaysInMonth() as day}
      <div class="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm h-full">
        <span class="font-semibold text-lg">{format(day, 'dd', { locale: zhCN })}</span>
        <span class="text-blue-500 text-sm">{tasks[day.getDate()] || 0} 个任务</span>
      </div>
    {/each}
  </div>
</div>
