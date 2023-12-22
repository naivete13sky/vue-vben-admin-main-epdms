<template>
  <div class="p-4">
    <!-- 筛选 -->
    <select v-model="selectedOption" style="width: 100px;">
      <option v-for="option in options" :key="option.value" :value="option.value" :label="option.label">
        {{ option.label }}
      </option>
    </select>

    |


    <BasicForm
        autoFocusFirstItem
        :labelWidth="200"
        :schemas="schemas"
        :actionColOptions="{ span: 3 }"
        @submit="handleSubmit"
        @reset="handleReset"
      >

    </BasicForm>




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
  import { getBasicColumns, getBasicData, getBasicDataByKeyword,getBasicDataOptions } from './tableData';

  import { computed, unref } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDebounceFn } from '@vueuse/core';




  export default defineComponent({
    components: {
      BasicTable,
      BasicForm,
    },
    setup() {

      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }


      const inputValue = ref('');  // 存储输入框的值
      const schemas: FormSchema[] = [
        {
          field: 'field2',
          component: 'Input',
          label: '',
          defaultValue: '',
          colProps: {
            span: 3,
          },
          componentProps: {
            onChange: (e: any) => {
              console.log(e);
              inputValue.value = e;
            },
            value: inputValue,
            // 添加事件监听
            onKeydown: function(e) {
              if (e.key === 'Enter') {
                handleEnterSearch(e);
              }
            },
          },
          suffix: '',
        },
      ];

      async function handleEnterSearch(event) {
        await handleSubmit({ field2: event.target.value });
      }


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
      const data_options = ref([]);
      const data_options_file_type = ref([]);
      const selectedOption = ref(null);
      const options = ref([]);


      // 挂载，在组件挂载后进行异步操作
      onMounted(async () => {
        // 在组件挂载后进行异步操作
        const result = await getBasicData(currentPage.value,pageSize);
        datacc.value = result.arr; // 更新数据
        record_count.value = result.record_count;
        totalPages.value = Math.ceil(record_count.value / pageSize);

        const result_options = await getBasicDataOptions();
        data_options.vlaue = result_options.data; // 更新数据
        // console.log("data_options:", data_options.vlaue);
        // alert(data_options.vlaue.actions.POST.file_type.choices);
        data_options_file_type.value = data_options.vlaue.actions.POST.file_type.choices
        // console.log("data_options_file_type:", data_options_file_type.value);

        // 将选项添加到 this.options
        // console.log("data_options_file_type2:", data_options_file_type.value);
        for (const key in data_options_file_type.value) {
          if (data_options_file_type.value.hasOwnProperty(key)) {
            const option = data_options_file_type.value[key];
            options.value.push({ label: option.display_name, value: option.value });
          }
        }
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







      async function handleSubmit(values: any) {
        // console.log('values', values);
        createMessage.success('click search,values:' + JSON.stringify(values));
        try {
          // 在这里你可以调用后端接口进行搜索
          const result = await getBasicDataByKeyword(values.field2, currentPage.value, pageSize);
          datacc.value = result.arr;
          record_count.value = result.record_count;
          totalPages.value = Math.ceil(record_count.value / pageSize);
        } catch (error) {
          console.error('Error handling search:', error);
          // 处理错误，例如返回默认值或抛出自定义错误
        }
      };


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
        handleInput,
        data_options_file_type,
        selectedOption,
        options,
        schemas,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit,

      };
    },



  });



</script>
