import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = 'https://mrznn2014.us.kg';

export async function createRssFile(config: SiteConfig) {
    console.log("--------------------")
	console.log(config.outDir)
    
    const feed = new Feed({
		title: "MrZnn Blog-🖊",
		description: "坚持深耕技术领域的T型前端程序员, 喜欢Vuejs、Nestjs, 还会点python、nlp、web3、后端",
		id: hostname,
		link: hostname,
		language: "zh-CH",
		image: "/logo.png",
		favicon: `https://oss.justin3go.com/justin3goAvatar.ico`,
		copyright: "Copyright@ 2023-present My Name",
	});

	const posts = await createContentLoader("posts/**/*.md", {
		excerpt: true,
		render: true,
	}).load();

	posts.sort((a, b) => Number(+getDate(b.url) - +getDate(a.url)));

	for (const { url, excerpt, html } of posts) {
    // 排除index.md与2022|2021|2020发布的文章
    if(url.search(/index|201[0-2]/) >= 0) {
      continue;
    }
    // 仅保留最近3篇文章
    if(feed.items.length >= 3) {
      break;
    }
		const lastStr = url.split('/').pop();
		const title = lastStr?.substring(2, lastStr.length - 5) || ''
		feed.addItem({
			title,
			id: `${hostname}${url}`,
			link: `${hostname}${url}`,
			description: excerpt,
			content: html,
			author: [
				{
					name: "MrZnn",
					email: "xxxx@qq.com",
					link: "https://mrznn2014.us.kg",
				},
			],
			date: getDate(url),
		});
	}
    
	writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

export function getDate(url: string) {
	return new Date(url.substring(4, 14));
}
