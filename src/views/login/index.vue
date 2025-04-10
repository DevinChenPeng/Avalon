<template>
  <div class="login wh100">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="model.password"
          type="password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
        <n-input
          v-model:value="model.reenteredPassword"
          :disabled="!model.password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :disabled="model.age === null"
              round
              type="primary"
              @click="handleValidateButtonClick"
            >
              验证
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script setup>
const model = ref({
  password: null,
  reenteredPassword: null,
})
const handlePasswordInput = () => {}
const handleValidateButtonClick = () => {}
</script>
<style lang="less" scoped></style>
