<!-- components/TagsPage.vue -->
<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-4xl font-bold mb-8 text-center dark:text-white">标签</h1>
        <div class="flex flex-wrap justify-center space-y-1">
            <span v-for="tag in uniqueTags" :key="tag" @click="filterByTag(tag)"
                class="flex-initial tag hover:bg-[#ffbe76] rounded-md border mx-1 dark:border-gray-600 dark:text-white">
                {{ tag }}
            </span>
        </div>
        <div class="posts mt-3">
            <ul class="space-y-8">
                <li v-for="post in filteredPosts" :key="post.url"
                    class="bg-white p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-700 dark:border-gray-600">
                    <a :href="post.url"
                        class="block text-2xl font-semibold text-blue-600 hover:underline mb-2 dark:text-blue-400">{{
                            post.title }}</a>
                    <p class="text-gray-700 mb-4 dark:text-gray-300">{{ post.description }}</p>
                    <div class="text-sm text-gray-500 flex justify-between mb-4 dark:text-gray-400">
                        <span>更新于: {{ post.updated.string }}</span>
                        <span>发布于: {{ post.created.string }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in post.tags " :key="tag" @click="filterByTag(tag)"
                            class="flex bg-blue-100 text-blue-600 tag hover:bg-[#ffbe76] rounded-full text-sm font-medium m-2 dark:bg-blue-300 dark:text-blue-800">
                            {{ tag }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vitepress';
import { data as postsData } from '../untils/notes.data.ts';

const selectedTag = ref(null);
const route = useRoute();

onMounted(() => {
    const queryTag = new URLSearchParams(window.location.search);
    if (queryTag.get('tag')) {
        selectedTag.value = queryTag.get('tag');
    }
});

const uniqueTags = computed(() => {
    const tags = postsData.flatMap(post => post.tags);
    return [...new Set(tags)];
});

const filteredPosts = computed(() => {
    if (!selectedTag.value) {
        return postsData;
    }
    return postsData.filter(post => post.tags.includes(selectedTag.value));
});

function filterByTag(tag) {
    selectedTag.value = tag;
}
</script>

<style scoped>
.tag {
    color: var(--vp-c-brand);
    padding: 1px 5px;
    margin: 1px;
    cursor: pointer;
}

.posts .post {
    margin-bottom: 20px;
}

/* 暗黑模式下的样式 */
.dark .tag {
    color: #ffffff;
    background: #4a4a4a;
}
</style>