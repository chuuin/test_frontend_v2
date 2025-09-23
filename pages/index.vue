<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
    <!-- 表單區 -->
    <section class="w-full max-w-xl bg-gray-800 border border-gray-600 rounded-2xl p-6 mb-8">
      <h2 class="text-center text-xl font-bold mb-4">操作</h2>

      <div class="space-y-4">
        <!-- 名字 -->
        <div>
          <label class="block mb-1">名字</label>
          <ETextField v-model:value="form.name" placeholder="輸入名字" />
        </div>

        <!-- 年齡 -->
        <div>
          <label class="block mb-1">年齡</label>
          <ETextField v-model:value="form.age" type="number" placeholder="輸入年齡" />
        </div>
      </div>

      <!-- 按鈕 -->
      <div class="flex justify-end gap-4 mt-6">
        <EBtn color="primary" @click="onUpdate">修改</EBtn>
        <EBtn color="warning" @click="onCreate">新增</EBtn>
      </div>
    </section>

    <!-- 資料表 -->
    <section class="w-full max-w-3xl bg-gray-800 border border-gray-600 rounded-2xl p-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-600 text-left">
            <th class="p-2">#</th>
            <th class="p-2">名字</th>
            <th class="p-2">年齡</th>
            <th class="p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b border-gray-700"
          >
            <td class="p-2">{{ user.id }}</td>
            <td class="p-2">{{ user.name }}</td>
            <td class="p-2">{{ user.age }}</td>
            <td class="p-2 flex gap-2">
              <EBtn color="primary" @click="onEdit(user)">修改</EBtn>
              <EBtn color="danger" @click="onDelete(user.id)">刪除</EBtn>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
const baseUrl = ' https://31916.wu.elitepro.ltd/swagger/index.html' // 後端網址 將由面試官提供

import { ref } from "vue";

const form = ref({
  name: "",
  age: "",
});

const users = ref([
  { id: 1, name: "林建智", age: 16 },
  { id: 2, name: "吳政真", age: 19 },
  { id: 3, name: "楊怡玄", age: 18 },
  { id: 4, name: "李建宇", age: 20 },
  { id: 5, name: "蘇名正", age: 15 },
]);

function onCreate() {
  console.log("新增", form.value);
}
function onUpdate() {
  console.log("修改", form.value);
}
function onEdit(user: { id: number; name: string; age: number }) {
  form.value = { ...user };
}
function onDelete(id: number) {
  console.log("刪除", id);
}
</script>

<style scoped lang="scss"></style>
