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
  </div>

    


</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, ColumnChangeParam } from '/@/components/Table';
  import { getBasicColumnscc, getBasicDatacc } from './tableData';

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
        data: getBasicDatacc(),
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
      job_name: '',
      remark: '',
      jobs: [],
    };
  },
    methods: {
    async addExample() {
      const response = await fetch('http://10.97.80.119:8000/job/api/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.job_name,
          description: this.remark,
        }),
      });

      if (response.ok) {
        const example = await response.json();
        this.jobs.push(example);
        this.job_name = '';
        this.remark = '';
      }
    },
  },
    async mounted() {
    const response = await fetch('http://10.97.80.119:8000/job/api/notes/');
    if (response.ok) {
      this.jobs = await response.json();
    }
  },

  });



</script>
