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
        <EBtn color="success" @click="onUpdate">修改</EBtn>
        <EBtn color="warn" @click="onCreate">新增</EBtn>
      </div>
    </section>

    <!-- 資料表 -->
    <section class="w-full max-w-3xl bg-gray-800 border border-gray-600 rounded-2xl p-6 overflow-x-auto">
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
              <EBtn color="success" @click="onEdit(user)">修改</EBtn>
              <EBtn color="error" @click="onDelete(user.id)">刪除</EBtn>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Dialog -->
    <dialog ref="dialog">
      <p>{{ dialogMsg }}</p>
      <div class="flex justify-end gap-4 mt-4">
        <button @click="confirmAction" class="px-4 py-2 bg-green-500 rounded">{{ $t('confirm') || '確認' }}</button>
        <button @click="cancelAction" class="px-4 py-2 bg-red-500 rounded">{{ $t('cancel') || '取消' }}</button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import EBtn from '@/components/EBtn.vue';
import ETextField from '@/components/ETextField.vue';
import { useUserStore } from '@/store/user';
import { getUsers, createUser, updateUser, deleteUser } from '@/server/userApi';
import type { User } from '@/types';

// Form 狀態
const form = reactive<{ id?: number; name: string; age: string }>({
  name: '',
  age: '',
});

// Pinia store
const userStore = useUserStore();
const users = computed(() => userStore.users);

// Dialog 狀態
const dialog = ref<HTMLDialogElement>();
const dialogMsg = ref('');
let pendingAction: (() => Promise<void>) | null = null;

// 取得用戶
const fetchUsers = async () => {
  try {
    const data = await getUsers();
    userStore.setUsers(data);
  } catch (err) {
    alert('取得用戶失敗');
    console.error(err);
  }
};

onMounted(() => {
  fetchUsers();
});

// 前端驗證
const validateForm = () => {
  if (!form.name || !form.age) {
    alert('請填寫完整資料');
    return false;
  }
  if (isNaN(Number(form.age)) || Number(form.age) <= 0) {
    alert('年齡格式不正確');
    return false;
  }
  return true;
};

// 新增
function onCreate() {
  if (!validateForm()) return;
  dialogMsg.value = `確定新增 ${form.name} 嗎？`;
  pendingAction = async () => {
    const newUser = await createUser({ name: form.name, age: Number(form.age) });
    userStore.addUser(newUser);
    form.name = '';
    form.age = '';
  };
  dialog.value?.showModal();
}

// 修改
function onUpdate() {
  if (!validateForm() || !form.id) return alert('請先選擇要修改的用戶');
  dialogMsg.value = `確定修改 ${form.name} 嗎？`;
  pendingAction = async () => {
    const updated = await updateUser(form.id!, { name: form.name, age: Number(form.age) });
    userStore.updateUser(updated);
    form.id = undefined;
    form.name = '';
    form.age = '';
  };
  dialog.value?.showModal();
}

// 點選編輯
function onEdit(user: User) {
  form.id = user.id;
  form.name = user.name;
  form.age = user.age.toString();
}

// 刪除
function onDelete(id: number) {
  dialogMsg.value = '確定刪除嗎？';
  pendingAction = async () => {
    await deleteUser(id);
    userStore.removeUser(id);
  };
  dialog.value?.showModal();
}

// dialog 操作
const confirmAction = async () => {
  if (pendingAction) await pendingAction();
  pendingAction = null;
  dialog.value?.close();
};
const cancelAction = () => {
  pendingAction = null;
  dialog.value?.close();
};
</script>

<style scoped lang="scss"></style>
