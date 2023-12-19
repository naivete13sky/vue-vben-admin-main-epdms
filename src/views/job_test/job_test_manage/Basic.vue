<template>
  <div class="p-4">

    <!--    使用 v-model 的原生事件： 尝试使用@update:modelValue事件替代@input事件。有时候，Vue 3的模板会更喜欢使用@update:modelValue。-->
    <input v-model.trim="searchKeyword" @update:modelValue="handleInput" @keydown.enter="handleSearch" />
    <a-button type="primary" @click="handleSearch">搜索</a-button>


    <!-- 添加在搜索框下方 -->
    <select v-model="selectedOption" style="width: 100px;">
      <option v-for="option in options" :key="option.value" :value="option.value" :label="option.label">
        {{ option.label }}
      </option>
    </select>




    <!-- BasicTable -->
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
  import { getBasicColumns, getBasicData, getBasicDataByKeyword } from './tableData';


  export default defineComponent({
    components: {
      BasicTable
    },
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

      const datacc = ref([]); // 初始化为一个空数组
      // const datacc: Ref<any[]> = ref([]); // 初始化为一个空数组
      const record_count = ref(0);
      const totalPages = ref(0);
      let currentPage = ref(1);
      const pageSize = 10;

      // 挂载，在组件挂载后进行异步操作
      onMounted(async () => {
        // 在组件挂载后进行异步操作
        const result = await getBasicData(currentPage.value,pageSize);
        datacc.value = result.arr; // 更新数据
        record_count.value = result.record_count;
        totalPages.value = Math.ceil(record_count.value / pageSize);
      });

      // 跳转到某页
      async function goToPage(page) {
        if (page >= 1 && page <= totalPages.value && page !== currentPage) {
          this.currentPage = page;
          const result = await getBasicData(page, pageSize);
          datacc.value = result.arr;
        }
      };

      // 处理输入框回车事件
      async function jumpToPage() {
        const targetPage = parseInt(this.inputPage);
        if (targetPage >= 1 && targetPage <= this.totalPages && targetPage !== this.currentPage) {
          this.currentPage = targetPage;
          const result = await getBasicData(targetPage, pageSize);
          datacc.value = result.arr;
        }
      };


      // 新增方法，处理输入框输入变化
      async function handleInput() {
        // 在这里你可以添加一些逻辑，比如限制只能输入数字等
        // 例如：this.inputPage = this.inputPage.replace(/[^\d]/g, "");
      };



      const searchKeyword = ref(""); // 用于存储搜索关键字

      async function handleSearch() {
        try {

          // console.log("Search Keyword:", searchKeyword.value); // 添加这行进行调试

          // 在这里你可以调用后端接口进行搜索
          const result = await getBasicDataByKeyword(searchKeyword.value, currentPage.value, pageSize);
          datacc.value = result.arr;
          record_count.value = result.record_count;
          totalPages.value = Math.ceil(record_count.value / pageSize);
        } catch (error) {
          console.error('Error handling search:', error);
          // 处理错误，例如返回默认值或抛出自定义错误
        }
      }



      return {
        columns: getBasicColumns(),
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
        currentPage: currentPage,
        totalPages: totalPages,
        pageSize: pageSize,
        inputPage: "", // 新增的输入框绑定的数据
        goToPage,
        jumpToPage,
        searchKeyword,
        handleSearch,
        handleInput,
      };
    },
    data() {
      return {
        selectedOption: null,
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
          { label: '选项3', value: 'option3' },
        ],
      };
    },

  });



</script>
