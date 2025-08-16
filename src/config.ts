import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "拾光小阁", // 网站标题
	// title: "Fuwari", // 网站标题，已被注释掉
	subtitle: "qwq",
	lang: "zh_CN", // 语言代码，例如 'en', 'zh_CN', 'ja' 等
	themeColor: {
		hue: 250, // 主题色的默认色相，范围 0 到 360。例如红色: 0，蓝绿色: 200，青色: 250，粉色: 345
		fixed: false, // 隐藏访客的主题色选择器
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // 相对于 /src 目录的路径。如果以 / 开头则相对于 /public 目录
		position: "center", // 等同于 object-position，仅支持 'top'、'center'、'bottom'，默认为 'center'
		credit: {
			enable: false, // 是否显示横幅图片的署名文本
			text: "", // 要显示的署名文本
			url: "", // （可选）原作或艺术家页面的链接
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录显示的最大标题层级，范围 1 到 3
	},
	favicon: [
		// 留空数组以使用默认 favicon
		{
			src: "https://a723572.webp.li/2025/08/16/20250816160056267.png", // favicon 的路径，相对于 /public 目录
			theme: "light", // （可选）'light' 或 'dark'，仅在有不同模式 favicon 时设置
			sizes: "32x32", // （可选）favicon 的尺寸，仅在有不同尺寸时设置
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "开往",
			url: "https://www.travellings.cn/go.html", // 内部链接不需要包含基础路径，会自动添加
			external: true, // 显示外链图标并在新标签页打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // 相对于 /src 目录的路径。如果以 / 开头则相对于 /public 目录
	name: "br",
	bio: "万钟则不辨礼仪而受之，万种于我美滋滋.",
	links: [
		{
			name: "Twitter",
			icon: "fa6-brands:twitter", // 图标代码，参见 https://icones.js.org/
			// 如果未包含对应图标集，需要安装
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://x.com/bear36609893920?",
		},
		{
			name: "Email",
			icon: "mdi-light:email", // 图标代码，参见 https://icones.js.org/
			// 如果未包含对应图标集，需要安装
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "mailto:ljsh666@outlook.com",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://s.team/dogeatname",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/StarGazer114",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：部分样式（如背景色）已被覆盖，详见 astro.config.mjs 文件
	// 请务必选择深色主题，因为本博客主题目前仅支持深色背景
	theme: "github-dark",
};
