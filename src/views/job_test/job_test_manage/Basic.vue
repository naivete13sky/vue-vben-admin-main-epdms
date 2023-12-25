<template>
  <div class="p-4">
    <!-- 筛选 -->
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
  import { defineComponent, ref, onMounted, toRaw } from 'vue';
  import { BasicTable, ColumnChangeParam } from '/@/components/Table';
  import { getBasicColumns, getBasicDataByKeyword,getBasicDataOptions } from './tableData';
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
      const { createMessage } = useMessage();  // vue 消息系统
      const keyword = ref<string>('');
      // const searchParams = computed<Recordable>(() => {
      //   return { keyword: unref(keyword) };
      // });

      const searchParams = ref({
        keyword: '',
        file_type: '',  // 添加file_type字段
        status: '',  // 添加status字段
        author: '',  // 添加author字段
      });


      function onSearch(value: string) {
        // keyword.value = value;
        searchParams.value.keyword = value;

      }

      const inputSearchValue = ref('');  // 存储搜索输入框的值
      const options_file_type = ref([]);  // 存储文件类型下拉列表框的值
      const options_status = ref([]);  // 存储状态下拉列表框的值


      // 搜索表单中的控件
      const schemas: FormSchema[] = [
        {
          field: 'file_type',  // 下拉列表框，文件类型
          component: 'Select',
          label: '',
          colProps: {
            span: 2,  // 宽度
          },
          componentProps: {
            options: options_file_type.value,
            placeholder: '文件类型',
            onChange: (value) => {
              searchParams.value.file_type = value;
            },
          },
        },
        {
          field: 'status',  // 下拉列表框，料号状态
          component: 'Select',
          label: '',
          defaultValue: '',
          colProps: {
            span: 2,  // 宽度
          },
          componentProps: {
            options: options_status.value,
            placeholder: '状态',
            onChange: (value) => {
              searchParams.value.status = value;
            },
          },
        },
        {
          field: 'author',
          component: 'Input',
          label: '',
          defaultValue: '',
          colProps: {
            span: 2,
          },
          componentProps: {
            // onChange: (e: any) => {
            //   console.log(e);
            //   inputSearchValue.value = e;
            // },
            onChange: (value) => {
              inputSearchValue.value = value;
              searchParams.value.author = value;
            },
            value: inputSearchValue,
            // 添加事件监听
            onKeydown: function(e) {
              if (e.key === 'Enter') {
                handleEnterSearch(e);
              }
            },
            placeholder: '负责人',
          },
          suffix: '',
        },
        {
          field: 'search',
          component: 'Input',
          label: '',
          defaultValue: '',
          colProps: {
            span: 3,
          },
          componentProps: {
            onChange: (e: any) => {
              console.log(e);
              inputSearchValue.value = e;
            },
            value: inputSearchValue,
            // 添加事件监听
            onKeydown: function(e) {
              if (e.key === 'Enter') {
                // handleEnterSearch(e);
                // 将所有表单的值传递到 handleEnterSearch 中
                // handleEnterSearch({
                //   file_type: searchParams.value.file_type,
                //   status: searchParams.value.status,
                //   author: searchParams.value.author,
                //   search: inputSearchValue.value,
                // });
                handleEnterSearch(searchParams.value);
              }
            },
            placeholder: '料号ID、料号名称、标签',
          },
          suffix: '',
        },
      ];

      // 处理输入框回车事件
      // async function handleEnterSearch(event) {
      //   await handleSubmit({ search: event.target.value });
      // };

      async function handleEnterSearch(values: any) {
        console.log("values.file_type:",values.file_type)
        await handleSubmit({file_type:values.file_type, search: event.target.value });
      };







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

      // 获取Django drf框架中接口的options信息
      const data_options = ref([]);
      const data_options_file_type = ref([]);
      const data_options_status = ref([]);


      // 挂载，在组件挂载后进行异步操作
      onMounted(async () => {
        // 在组件挂载后进行异步操作
        const result_options = await getBasicDataOptions();
        data_options.value = result_options.data; // 更新数据
        console.log("data_options:", data_options.value);
        data_options_file_type.value = data_options.value.actions.POST.file_type.choices
        // console.log("data_options_file_type:", data_options_file_type.value);
        data_options_status.value = data_options.value.actions.POST.status.choices

        setOptions(data_options_file_type,options_file_type);
        setOptions(data_options_status,options_status);

        // console.log("options_status:",options_status)


        // const result = await getBasicData(currentPage.value,pageSize);
        const result = await getBasicDataByKeyword('','','','', currentPage.value, pageSize);
        datacc.value = result.arr; // 更新数据
        record_count.value = result.record_count;
        totalPages.value = Math.ceil(record_count.value / pageSize);



      });

      async function setOptions(data_options_ref,options) {
        for (const key in data_options_ref.value) {
          if (data_options_ref.value.hasOwnProperty(key)) {
            const option = data_options_ref.value[key];
            options.value.push({
              label: option.display_name,
              value: option.value,
              key: key, // 添加key属性
            });
          }
        }

      };

      // 跳转到某页
      async function goToPage(page) {
        if (page >= 1 && page <= totalPages.value && page !== currentPage) {
          this.currentPage = page;
          const result = await getBasicDataByKeyword(
            searchParams.value.file_type,
            searchParams.value.status,
            searchParams.value.author,
            searchParams.value.search,
            currentPage.value,
            pageSize);
          datacc.value = result.arr;
        }
      };

      // 处理输入框回车事件
      async function jumpToPage() {
        const targetPage = parseInt(this.inputPage);
        if (targetPage >= 1 && targetPage <= this.totalPages && targetPage !== this.currentPage) {
          this.currentPage = targetPage;
          const result = await getBasicDataByKeyword(
            searchParams.value.file_type,
            searchParams.value.status,
            searchParams.value.author,
            searchParams.value.search,
            currentPage.value,
            pageSize);
          datacc.value = result.arr;
        }
      };

      // 新增方法，处理输入框输入变化
      async function handleInput() {
        // 在这里你可以添加一些逻辑，比如限制只能输入数字等
        // 例如：this.inputPage = this.inputPage.replace(/[^\d]/g, "");
      };

      // 查询操作
      async function handleSubmit(values: any) {
        // console.log('values', values);
        createMessage.success('click search,values:' + JSON.stringify(values));
        try {
          // 在这里你可以调用后端接口进行搜索
          const result = await getBasicDataByKeyword(values.file_type,values.status,values.author,values.search, currentPage.value, pageSize);
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
        options_file_type,  // 文件类型
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
