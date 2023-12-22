import { optionsListApi } from '/@/api/demo/select';
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { VxeFormItemProps, VxeGridPropTypes } from '/@/components/VxeTable';
import axios from "axios";

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: '父料号ID',
      dataIndex: 'job_parent',
      width: 100,
    },
    {
      title: '料号名称',
      dataIndex: 'job_name',
      width: 150,
    },
    {
      title: '测试料号',
      dataIndex: 'file',
      width: 150,
      customRender: ({ text }) => {
        // 使用split方法分割链接，并获取最后一个部分作为文件名
        const filename = text.split('/').pop();
        // 截取前20个字符
        const truncatedFilename = filename.length > 15 ? `${filename.slice(0, 15)}...` : filename;
        // 在这里添加超链接逻辑
        return (
          <a href={`${text}`} target="_blank" rel="noopener noreferrer">
            {truncatedFilename}
          </a>
        );
      },
    },
    {
      title: '文件类型',
      dataIndex: 'file_type',
      width: 150,
    },
    {
      title: '模块',
      dataIndex: 'test_usage_for_epcam_module',
      width: 150,
    },
    {
      title: '标准料号',
      dataIndex: 'standard_odb',
      width: 150,
      customRender: ({ text }) => {
        // 使用split方法分割链接，并获取最后一个部分作为文件名
        const filename = text.split('/').pop();
        // 截取前20个字符
        const truncatedFilename = filename.length > 15 ? `${filename.slice(0, 15)}...` : filename;
        // 在这里添加超链接逻辑
        return (
          <a href={`${text}`} target="_blank" rel="noopener noreferrer">
            {truncatedFilename}
          </a>
        );
      },
    },
    {
      title: 'G比图结果',
      dataIndex: 'vs_result_g',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      filters: [
        { text: 'published', value: 'published' },
        { text: 'draft', value: 'draft' },
      ],
    },
    {
      title: '负责人ID',
      dataIndex: 'author',
      width: 150,
    },
    {
      title: '更新时间',
      width: 150,
      sorter: true,
      dataIndex: 'updated',
    },
    {
      title: '备注',
      width: 150,
      sorter: true,
      dataIndex: 'remark',
    },
  ];
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      helpMessage: 'headerHelpMessage方式1',
      width: 200,
    },
    {
      // title: '姓名',
      dataIndex: 'name',
      width: 120,
      // slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      dataIndex: 'address',
      width: 120,
      // slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      dataIndex: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
    },
  ];
}

const cellContent = (_, index) => ({
  colSpan: index === 9 ? 0 : 1,
});

export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customCell: (_, index) => ({
        colSpan: index === 9 ? 6 : 1,
      }),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customCell: cellContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customCell: (_, index) => ({
        rowSpan: index === 2 ? 2 : 1,
        colSpan: index === 3 || index === 9 ? 0 : 1,
      }),
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customCell: cellContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customCell: cellContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customCell: cellContent,
    },
  ];
}
export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export function getBasicDataDemo() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Browncc',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
}

export function getTreeTableData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();
}

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '50',
    align: 'center',
  },
  {
    title: '固定列',
    field: 'name',
    width: 150,
    showOverflow: 'tooltip',
    fixed: 'left',
  },
  {
    title: '自适应列',
    field: 'address',
  },
  {
    title: '自定义列(自定义导出)',
    field: 'no',
    width: 200,
    showOverflow: 'tooltip',
    align: 'center',
    slots: {
      default: ({ row }) => {
        const text = `自定义${row.no}`;
        return [<div class="text-red-500">{text}</div>];
      },
    },
    exportMethod: ({ row }) => {
      return `自定义${row.no}导出`;
    },
  },
  {
    title: '自定义编辑',
    width: 150,
    field: 'name1',
    align: 'center',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    title: '开始时间',
    width: 150,
    field: 'beginTime',
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    title: '结束时间',
    width: 150,
    field: 'endTime',
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'field0',
    title: 'field0',
    itemRender: {
      name: 'AInput',
    },
    span: 6,
  },
  {
    field: 'field1',
    title: 'field1',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: optionsListApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
      },
    },
    span: 6,
  },
  {
    span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];

export async function getBasicData(currentPage,pageSize) {
  try {
    // alert(currentPage);
    const url = 'http://10.97.80.119:8000/eptest/api/jobForTests/';
    const params = {
      page: currentPage,
      per_page: pageSize,
    };

    const response = await axios.get(url, { params });
    const data = response.data.results;
    const record_count = response.data.count;
    const next_url = response.data.next;
    const previous_url = response.data.previous;

    // console.log("data:", data);
    // console.log("data type:", typeof data);

    const arr = data.map((item, index) => ({
      id: `${item.id}`,
      job_parent: `${item.job_parent}`,
      job_name: `${item.job_name}`,
      file: `${item.file}`,
      file_type: `${item.file_type}`,
      test_usage_for_epcam_module:`${item.test_usage_for_epcam_module}`,
      standard_odb:`${item.standard_odb}`,
      vs_result_g:`${item.vs_result_g}`,
      status:`${item.status}`,
      author:`${item.author}`,
      updated: `${item.updated}`,
      remark: `${item.remark}`,
    }));

    console.log("getBasicDatacc3, arr:", arr);
    return {arr,record_count};
  } catch (error) {
    console.error('Error fetching data:', error);
    // 处理错误，例如返回默认值或抛出自定义错误
    return [];
  }
}

export async function getBasicDataByKeyword(file_type,author,search_keyword: string, currentPage: number, pageSize: number) {
  console.log("keyword2:",search_keyword)
  try {
    const url = 'http://10.97.80.119:8000/eptest/api/jobForTests/';
    const params = {
      page: currentPage,
      per_page: pageSize,
      file_type: file_type,  //文件类型
      author: author,  //author id
      search: search_keyword, // 添加搜索关键字参数

    };

    const response = await axios.get(url, { params });
    const data = response.data.results;
    const record_count = response.data.count;

    const arr = data.map((item, index) => ({
      id: `${item.id}`,
      job_parent: `${item.job_parent}`,
      job_name: `${item.job_name}`,
      file: `${item.file}`,
      file_type: `${item.file_type}`,
      test_usage_for_epcam_module: `${item.test_usage_for_epcam_module}`,
      standard_odb: `${item.standard_odb}`,
      vs_result_g: `${item.vs_result_g}`,
      status: `${item.status}`,
      author: `${item.author}`,
      updated: `${item.updated}`,
      remark: `${item.remark}`,
    }));

    return { arr, record_count };
  } catch (error) {
    console.error('Error fetching data:', error);
    // 处理错误，例如返回默认值或抛出自定义错误
    return [];
  }
}

export async function getBasicDataOptions() {
  try {
    // alert(currentPage);
    const url = 'http://10.97.80.119:8000/eptest/api/jobForTests/';

    const response = await axios.options(url);
    const data = response.data;

    // console.log("data:", data);
    // console.log("data type:", typeof data);



    console.log("data, arr:", data);
    return {data};
  } catch (error) {
    console.error('Error fetching data:', error);
    // 处理错误，例如返回默认值或抛出自定义错误
    return [];
  }
}
