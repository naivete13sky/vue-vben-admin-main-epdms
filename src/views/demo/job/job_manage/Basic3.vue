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

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
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
          this.items = response.data.results;
          this.totalPages = Math.ceil(response.data.count / this.pageSize);
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
};
</script>
