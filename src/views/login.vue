<template>
	<div class="login-container flx-center">
		<switch-dark class="dark" />
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/images/login_left0.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
					<h2 class="logo-text">Geeker-Admin</h2>
				</div>
				<el-form size="large" ref="loginFormRef" :model="loginForm" :rules="loginRules">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名：admin/user" prefix-icon="user"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="loginForm.password"
							placeholder="密码：123456"
							prefix-icon="lock"
							type="password"
							show-password
							autocomplete="new-password"
						></el-input>
					</el-form-item>
				</el-form>
				<div class="login-btn">
					<el-button :icon="CircleClose" size="large" round @click="resetForm(loginFormRef)">重置</el-button>
					<el-button :icon="UserFilled" size="large" round type="primary" :loading="loading" @click="login(loginFormRef)"
						>登录</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SwitchDark from "@/components/SwitchDark.vue";
import { ref, reactive, onMounted } from "vue";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { useRouter } from "vue-router";
import { loginApi } from "@/api/modules/login";
import md5 from "js-md5";
import { GlobalStore } from "@/stores";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { TabsStore } from "@/stores/modules/tabs";
import { HOME_URL } from "@/config/config";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils/util";

const router = useRouter();
const tabsStore = TabsStore();
const globalStore = GlobalStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive({ username: "", password: "" });
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			// 1.执行登录接口
			const { data } = await loginApi({ username: loginForm.username, password: md5(loginForm.password) });
			console.log("data:---" + data);
			globalStore.setToken(data.access_token);

			// 2.添加动态路由
			await initDynamicRouter();

			// 3.清除上个账号的 tab 信息
			tabsStore.closeMultipleTab();

			// 4.跳转到首页
			router.push(HOME_URL);
			ElNotification({
				title: getTimeState(),
				message: "欢迎登录 Geeker-Admin",
				type: "success",
				duration: 3000
			});
		} finally {
			loading.value = false;
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

onMounted(() => {
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
.login-container {
	position: relative;
	min-width: 550px;
	height: 100%;
	min-height: 500px;
	background-color: #eeeeee;
	background-image: url("@/assets/images/login_bg.svg");
	background-position: 50%;
	background-size: 100% 100%;
	background-size: cover;
	.dark {
		position: absolute;
		top: 4.5%;
		right: 3.2%;
	}
	.login-box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 96%;
		height: 94%;
		padding: 0 50px;
		background-color: hsl(0deg 0% 100% / 80%);
		border-radius: 10px;
		.login-left {
			width: 800px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.login-form {
			width: 420px;
			padding: 50px 40px 45px;
			border-radius: 10px;
			box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
			.login-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 45px;
				.login-icon {
					width: 60px;
					height: 52px;
				}
				.logo-text {
					padding: 0 0 0 25px;
					margin: 0;
					font-size: 42px;
					font-weight: bold;
					color: #34495e;
					white-space: nowrap;
				}
			}
			.el-form-item {
				margin-bottom: 40px;
			}
			.login-btn {
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-top: 40px;
				white-space: nowrap;
				.el-button {
					width: 185px;
				}
			}
		}
	}
}
</style>
