// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
// import MyLayout from '../components/MyLayout.vue'
import './style.css'
// 毛玻璃
/* index.css */
import "./var.css";
import "./blur.css";

// 导航
import { useData } from 'vitepress'
import MNavLinks from './components/MNavLinks.vue'

// 放大镜
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

// 点击量
// 不蒜子
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import bsz from "./components/bsz.vue"
import MyLayout from "./components/MyLayout.vue";

//代码组样式
import 'virtual:group-icons.css';

// 评论
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

// 公告
import notice from "./components/notice.vue"

// 添加tailwind
import "./style/tailwind.css";

// 添加霞鹜文楷字体
import "./style/font.css"

// 引入归档
import Archive from "./components/Archive.vue";

// 标签页
import TagPage from "./components/TagPage.vue";

// 美化
// import "./style/var.css"
// import "./style/verrides.scss"


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    // 导航
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()
    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    // 默认
    return h(DefaultTheme.Layout, null, {
      // 点击量
      'layout-bottom': () => h(bsz), // 不蒜子layout-bottom插槽
      'layout-top': () => h(notice), // 使用layout-top插槽
      "aside-bottom": () => h(MyLayout) // 不蒜子 aside-bottom  侧边插槽
    })

  },

  enhanceApp({ app, router, siteData }) {
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }

    // 注册导航组件
    app.component('MNavLinks' , MNavLinks);
    // 全局注册归档组件
    app.component("Archive", Archive); 
    // 标签页
    app.component("TagPage", TagPage); 
    // ...
  },
  
  // Layout: MyLayout,

  setup() {
    // 放大镜
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom(); 
    }); 
    watch(  
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // 评论
    // Get frontmatter and route
    const { frontmatter } = useData();
        
    // giscus配置
    giscusTalk({
      repo: import.meta.env.VITE_GISCUS_REPO,
      repoId: import.meta.env.VITE_GISCUS_REPO_ID,
      category: import.meta.env.VITE_GISCUS_CATEGORY,
      categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
}


