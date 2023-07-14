<script setup lang="ts"></script>

<template>
  <rify-card>
    功能待开发
    <div>
      <table>
        <tr>
          <td
            ><div><span>sss哈哈哈哈哈哈哈哈哈啊哈哈哈接口</span></div></td
          >
          <td
            ><div><span>sss哈哈哈哈哈哈哈哈哈啊哈哈哈接口</span></div></td
          >
          <td
            ><div><span>sss哈哈哈哈哈哈哈哈哈啊哈哈哈接口</span></div></td
          >
          <td
            ><div><span>sss哈哈哈哈哈哈哈哈哈啊哈哈哈接口</span></div></td
          >
          <td
            ><div><span>sss哈哈哈哈哈哈哈哈哈啊哈哈哈接口</span></div></td
          >
          <td
            ><div><span>sss哈哈哈哈哈哈哈哈哈啊哈哈哈接口</span></div></td
          >
          <td
            ><div><span>我是尾巴</span></div></td
          >
        </tr>
      </table>
    </div>
  </rify-card>
</template>

<style scoped lang="scss">
table {
  border-collapse: collapse;
}

td {
  border-width: 1px;
  padding: 0;
  border-color: rgb(209 213 219 / 1);
}

td:hover {
  border-width: 0;
}

td div {
  margin: 0;
  padding: 0;
  position: relative;
  width: 6rem;
  height: 1.5rem;
  display: flex;
}

td div span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

td div span:hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: block;
  border: 1px solid #d1d5db;
}
</style>
