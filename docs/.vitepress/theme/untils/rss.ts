import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = 'https://mrznn2014.us.kg';

export async function createRssFile(config: SiteConfig) {
    const feed = new Feed({
		title: "MrZnn Blog-🖊",
		description: "feedId:92373593915702272+userId:nI4vckqaPO1zo1gmUuOap",
		id: hostname,
		link: hostname,
		language: "zh-CH",
		image: "/logo.png",
		favicon: `/logo.png`,
		copyright: "Copyright@ 2014-present MrZnn",
	});

	const posts = await createContentLoader("posts/**/*.md", {
		excerpt: true,
		render: true,
	}).load();

	posts.sort((a, b) => Number(+getDate(b.url) - +getDate(a.url)));

	for (const { url, excerpt, html } of posts) {
    // 排除index.md与2022|2021|2020发布的文章
    if(url.search(/index|202[0-2]/) >= 0) {
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
					email: "1242403712@qq.com",
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
