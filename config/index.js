import {
	env
} from "./env";

let path = env === "production" ? "" : `${env}.`;

export default {
	api: "http://api.kquanr.com", // 自定义测试环境开关
	mepai: "https://api.mepai.me",
	_500px: "https://500px.me"
};
