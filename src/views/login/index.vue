<template>
    <div class="login wh100">
        <div class="fcc">
            <n-gradient-text type="info" style="font-size: 24px"> Devin个人游戏平台 </n-gradient-text>
        </div>
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="userName" label="用户名">
                <n-input placeholder="请输入" v-model:value="model.userName" />
            </n-form-item>
            <n-form-item path="email" label="邮箱">
                <n-auto-complete placeholder="请输入" v-model:value="model.email" :options="options" />
                &nbsp;&nbsp;
                <n-button :disabled="model.email === ''" round type="info" @click="sendCode"> 发送验证码 </n-button>
            </n-form-item>
            <n-form-item path="code" label="验证码">
                <n-input placeholder="请输入" v-model:value="model.code" />
            </n-form-item>
            <n-form-item path="invitationCode" label="邀请码">
                <n-input placeholder="邀请码" v-model:value="model.invitationCode" />
            </n-form-item>
            <n-row :gutter="[0, 24]">
                <n-col :span="24">
                    <div class="fcc">
                        <n-button style="width: 100%" round type="info" @click="handleValidateButtonClick"> 登录 </n-button>
                    </div>
                </n-col>
            </n-row>
        </n-form>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMessage } from 'naive-ui';
const model = ref({
    email: '',
    code: '',
    invitationCode: ''
});
const message = useMessage();
const formRef = ref(null);
const sendCode = () => {
    if (model.value.email === '') {
        return;
    }
};
const rules = {
    userName: {
        required: true,
        trigger: ['input', 'blur'],
        message: '请输入用户名'
    },
    email: {
        required: true,
        trigger: ['input', 'blur'],
        message: '请输入邮箱'
    },
    code: {
        required: true,
        trigger: ['input', 'blur'],
        message: '请输入验证码'
    },
    invitationCode: {
        required: true,
        trigger: ['input', 'blur'],
        message: '请输入邀请码'
    }
};
const options = computed(() => {
    return ['@gmail.com', '@163.com', '@qq.com'].map(suffix => {
        const prefix = model.value.email.split('@')[0];
        return {
            label: prefix + suffix,
            value: prefix + suffix
        };
    });
});
const handleValidateButtonClick = e => {
    e.preventDefault();
    formRef.value?.validate(errors => {
        if (!errors) {
            message.success('Valid');
        } else {
            console.log(errors);
            message.error('Invalid');
        }
    });
};
</script>
<style lang="less" scoped>
.login {
    padding: var(--padding-xl);
    padding-top: 20%;
}
</style>
