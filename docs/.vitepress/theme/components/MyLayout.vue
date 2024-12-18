<!-- components/MyLayout.vue.vue -->
<template>
    <div class="container mx-auto border rounded-2xl shadow-inner text-center dark:bg-gray-800 dark:text-white">
        <div class="mb-4">
            <span id="busuanzi_container_site_pv" class="text-center">
                本站总访问量
                <span id="busuanzi_value_site_pv" class="busuanzi_value_site_pv"></span> 次
            </span>
        </div>
        <div class="mb-4">
            <span id="busuanzi_container_site_uv" class="text-center">
                本站访客数
                <span id="busuanzi_value_site_uv" class="busuanzi_value_site_uv"></span> 人次
            </span>
        </div>
        <span>
            标签
        </span>
        <div class="tags flex flex-wrap justify-center space-y-1">
            <span v-for="tag in uniqueTags" :key="tag" @click="goToTagPage(tag)"
                class="flex-initial tag hover:bg-[#ffbe76] rounded-md border mx-1 dark:border-gray-700 dark:hover:bg-gray-600">
                {{ tag }}
            </span>
        </div>
        <!-- Custom content for aside -->
        <!-- <p class="text-center">站点信息</p> -->
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vitepress';
import { data as postsData } from '../untils/notes.data';

const uniqueTags = computed(() => {
    const tags = postsData.flatMap(post => post.targs);

    return [...new Set(tags)];
});

const router = useRouter();

function goToTagPage(tag) {
    router.go(`/tags?tag=${tag}`);
}
</script>

<style scoped>
.busuanzi_value_site_pv,
.busuanzi_value_site_uv {
    color: var(--vp-c-brand);
}

.container {
    padding: 10px;
    background: #ffffff;
}

.tag {
    color: var(--vp-c-brand);
    padding: 1px 2px;
    margin: 1px;
    cursor: pointer;
}

/* 暗黑模式下的样式 */
.dark .container {
    background: #2d2d2d;
}

.dark .tag {
    color: #21c4b6;
    background: #4a4a4a;
}
</style>