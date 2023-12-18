// MyComponent.vue
<template>

  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>料号名</th>
          <th>file_compressed</th>
          <th>has_file_type</th>
          <th>status</th>
          <th>publish</th>
          <th>remark</th>
          <th>author</th>
          <!-- 添加更多表头字段 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.job_name }}</td>
          <td>{{ item.file_compressed }}</td>
          <td>{{ item.has_file_type }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.publish }}</td>
          <td>{{ item.remark }}</td>
          <td>{{ item.author }}</td>
          <!-- 添加更多字段 -->
        </tr>
      </tbody>

      <!-- 分页导航 -->
      <div class="pagination">
        <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页 / 共 {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">末页</button>
      </div>
    </table>
  </div>
  <!-- 显示列表内容 -->
  <div v-for="item in items" :key="item.id">{{ item }}</div>
  
  <!-- 分页控制器 -->
  <button @click="prevPage">上一页</button>
  <span>当前第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
  <button @click="nextPage">下一页</button>


</template>
 
<script>
import axios from 'axios';
 
export default {
  data() {
    return {
      items: [],          // 存放获取到的数据项
      pageSize: 10,       // 每页显示的条目数量
      currentPage: 1,     // 当前页码
      totalItems: null,   // 总记录数
      totalPages: null,   // 总页数
    };
  },
 
  methods: {
    fetchData(page) {
      const url = `http://10.97.80.119:8000/job/api/jobs/?limit=${this.pageSize}&offset=${(page - 1) * this.pageSize}`;
      axios.get(url).then((response) => {
        this.items = response.data['results'];
        this.totalItems = response.data['count'];
        this.calculateTotalPages();
      });
    },
    
    calculateTotalPages() {
      if (this.totalItems % this.pageSize === 0) {
        this.totalPages = Math.floor(this.totalItems / this.pageSize);
      } else {
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchData(--this.currentPage);
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchData(++this.currentPage);
      }
    },
  },
 
  mounted() {
    this.fetchData(this.currentPage);
  },
};





</script>
