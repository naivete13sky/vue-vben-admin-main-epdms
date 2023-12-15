<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="data"
      :canResize="canResize"
      :loading="loading"
      :striped="striped"
      :bordered="border"
      showTableSetting
      :pagination="pagination"
      @columns-change="handleColumnChange"
    >
      <template #toolbar>
        <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自适应高度' : '取消自适应' }}
        </a-button>
        <a-button type="primary" @click="toggleBorder">
          {{ !border ? '显示边框' : '隐藏边框' }}
        </a-button>
        <a-button type="primary" @click="toggleLoading"> 开启loading </a-button>
        <a-button type="primary" @click="toggleStriped">
          {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
        </a-button>
      </template>
    </BasicTable>
    <!-- 分页导航 -->
    <div class="pagination">
      <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">末页</button>
      <input v-model.trim="inputPage" @input="handleInput" @keydown.enter="jumpToPage" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted} from 'vue';
  import { BasicTable, ColumnChangeParam } from '/@/components/Table';
  import { getBasicColumnscc, getBasicData,getBasicDatacc,getBasicDatacc3 } from './tableData';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const striped = ref(true);
      const border = ref(true);
      const pagination = ref<any>(false);
      function toggleCanResize() {
        canResize.value = !canResize.value;
      }
      function toggleStriped() {
        striped.value = !striped.value;
      }
      function toggleLoading() {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          pagination.value = { pageSize: 20 };
        }, 3000);
      }
      function toggleBorder() {
        border.value = !border.value;
      }

      function handleColumnChange(data: ColumnChangeParam[]) {
        console.log('ColumnChanged', data);
      }

      // const datacc = ref([]); // 初始化为一个空数组
      const record_count = ref(0);
      const totalPages = ref(0);
      let currentPage = ref(1);
      const pageSize = 10;

      const datacc: Ref<any[]> = ref([]); // 初始化为一个空数组
      onMounted(async () => {
        // 在组件挂载后进行异步操作
        const result = await getBasicDatacc3(currentPage.value,pageSize);
        datacc.value = result.arr; // 更新数据
        record_count.value = result.record_count;
        // alert(record_count.value);
        totalPages.value = Math.ceil(record_count.value / 10);

      });
      async function goToPage(page) {
        if (page >= 1 && page <= totalPages.value && page !== currentPage) {
          currentPage.value = page;
          const result = await getBasicDatacc3(page, pageSize);
          datacc.value = result.arr;
        }
      };
      // 新增方法，处理输入框输入变化
      async function handleInput() {
        // 在这里你可以添加一些逻辑，比如限制只能输入数字等
        // 例如：this.inputPage = this.inputPage.replace(/[^\d]/g, "");
      };

      // 新增方法，处理输入框回车事件
      async function jumpToPage() {
        const targetPage = parseInt(this.inputPage);
        if (targetPage >= 1 && targetPage <= this.totalPages && targetPage !== this.currentPage) {
          this.currentPage = targetPage;
          const result = await getBasicDatacc3(targetPage, pageSize);
          datacc.value = result.arr;
        }
      };

      return {
        columns: getBasicColumnscc(),
        data: datacc,
        canResize,
        loading,
        striped,
        border,
        toggleStriped,
        toggleCanResize,
        toggleLoading,
        toggleBorder,
        pagination,
        handleColumnChange,
        currentPage: 1,
        totalPages: totalPages,
        pageSize: 10,
        inputPage: "", // 新增的输入框绑定的数据
        goToPage,
        jumpToPage,
      };
    },

  });
</script>


<!--setup函数中的return不能包含异步获取的数据，主要是因为setup函数的执行时机和异步操作的执行时机不同。-->

<!--在Vue 3中，setup函数是在组件实例创建之前同步执行的，而不是在组件实例创建之后。这样做是为了确保在组件实例创建之前就能够访问到setup函数返回的响应式对象，以便在模板中使用。-->

<!--如果在setup中包含异步操作，例如异步获取数据，由于setup函数是同步执行的，它不能等待异步操作完成再返回数据。这可能导致在模板中使用的数据尚未准备好，从而引发错误或不一致的行为。-->

<!--为了解决这个问题，你可以在setup函数中使用ref、reactive等创建响应式对象，并在异步操作完成后更新这些对象的值。例如，你可以在setup中初始化一个空数组或对象，然后在异步操作完成后将其填充。-->
