<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="jobs"
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
    </div>
  </div>

</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, ColumnChangeParam } from '/@/components/Table';
  import { getBasicColumnscc, getBasicDatacc } from './tableData';
  import axios from 'axios';

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
      return {
        columns: getBasicColumnscc(),
        // data: getBasicDatacc(),
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
      };
    },

    data() {
        return {
          jobs: [],
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
        };
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        const url = `http://10.97.80.119:8000/job/api/jobs/?page=${this.currentPage}&page_size=${this.pageSize}`;
        axios.get(url)
          .then(response => {
            this.totalPages = Math.ceil(response.data.count / this.pageSize);
            this.jobs = response.data.results;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
          this.currentPage = page;
          this.fetchData();
        }
      },
    },

  });


</script>
