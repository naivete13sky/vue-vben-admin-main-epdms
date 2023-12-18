<template>
  <div class="p-4">
    <BasicTable :dataSource="tableData" @register="registerTable">
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '料号名称',
      dataIndex: 'job_name',
      width: 150,
    },
    {
      title: '附件',
      dataIndex: 'file_compressed',
      width: 150,
    },
    {
      title: '文件类型',
      dataIndex: 'has_file_type',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,
      filters: [
        { text: 'published', value: 'published' },
        { text: 'draft', value: 'draft' },
      ],
    },
    {
      title: 'publish',
      width: 150,
      sorter: true,
      dataIndex: 'publish',
    },
    {
      title: '备注',
      width: 150,
      sorter: true,
      dataIndex: 'remark',
    },
  ];

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const tableData = ref([]);
      const [registerTable] = useTable({
        title: '自定义列内容',
        titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
        columns: columns,
        bordered: true,
        showTableSetting: true,
        dataSource: tableData,
      });

      // 使用接口获取数据
      onMounted(async () => {
        try {
          const response = await fetch('http://10.97.80.119:8000/job/api/notes/');
          if (response.ok) {
            const data = await response.json();
            tableData.value = data;
          } else {
            console.error('Failed to fetch data from the API');
          }
        } catch (error) {
          console.error('Error while fetching data:', error);
        }
      });

      return {
        registerTable,
        tableData,
      };
    },
  });
</script>

<style scoped>
  /* 你的样式可以放在这里 */
</style>
