<!-- components/TagsPage.vue -->
<!-- <template>
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
                        <span v-for="tag in post.targs " :key="tag" @click="filterByTag(tag)"
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
import { data as postsData } from '../untils/notes.data';

const selectedTag = ref(null);

onMounted(() => {
    const queryTag = new URLSearchParams(window.location.search);

    if (queryTag.get('tag')) {
        selectedTag.value = queryTag.get('tag');
    }
});

const uniqueTags = computed(() => {
    console.log("uniqueTags start")
    const tags = postsData.flatMap(post => post.targs);
    console.log(tags)
    return [...new Set(tags)];
});

const filteredPosts = computed(() => {
    console.log("filteredPosts start")
    console.log(selectedTag)
    if (!selectedTag.value) {
        return postsData;
    }
    return postsData.filter(post => post.targs.includes(selectedTag.value));
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
</style> -->

<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-4xl font-bold mb-8 text-center dark:text-white">标签</h1>
        <div class="flex flex-wrap justify-center space-y-1">
            <span v-for="(tag, index) in tagCounts" :key="index" @click="filterByTag(tag.name)"
                class="flex-initial tag hover:bg-[#ffbe76] rounded-md border mx-1 dark:border-gray-600 dark:text-white">
                {{ tag.name }}[{{ tag.count }}]
            </span>
        </div>
        <div class="posts mt-3">
            <ul class="space-y-8">
                <li v-for="post in filteredPosts" :key="post.url"
                    class="bg-white p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-700 dark:border-gray-600">
                    <a :href="post.url"
                        class="block text-2xl font-semibold text-blue-600 hover:underline mb-2 dark:text-blue-400">{{ post.title }}</a>
                    <p class="text-gray-700 mb-4 dark:text-gray-300">{{ post.description }}</p>
                    <div class="text-sm text-gray-500 flex justify-between mb-4 dark:text-gray-400">
                        <span>更新于: {{ post.updated.string }}</span>
                        <span>发布于: {{ post.created.string }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in post.targs" :key="tag" @click="filterByTag(tag)"
                            class="flex bg-blue-100 text-blue-600 tag hover:bg-[#ffbe76] rounded-full text-sm font-medium m-2 dark:bg-blue-300 dark:text-blue-800">
                            {{ tag }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vitepress';
import { data as postsData } from '../untils/notes.data';

const selectedTag = ref(null);
const route = useRoute();

onMounted(() => {
    const queryTag = new URLSearchParams(window.location.search);

    if (queryTag.get('tag')) {
        selectedTag.value = queryTag.get('tag');
    }
});

// 计算每个标签及其对应的数量
const tagCounts = computed(() => {
    const tagsMap = {};
    postsData.forEach(post => {
        if (Array.isArray(post.targs)) { // 确保 post.targs 是一个数组
            post.targs.forEach(tag => {
                if (!tagsMap[tag]) {
                    tagsMap[tag] = 0;
                }
                tagsMap[tag]++;
            });
        }
    });

    return Object.keys(tagsMap).map(tag => ({
        name: tag,
        count: tagsMap[tag]
    }));
});

const uniqueTags = computed(() => tagCounts.value.map(tag => tag.name));

const filteredPosts = computed(() => {
    if (!selectedTag.value) {
        return postsData;
    }
    return postsData.filter(post => {
        if (Array.isArray(post.targs)) { // 确保 post.targs 是一个数组
            return post.targs.includes(selectedTag.value);
        }
        return false;
    });
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


<!-- 
<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-4xl font-bold mb-8 text-center dark:text-white">标签</h1>
        <div class="flex flex-wrap justify-center space-y-1">
            <span v-for="(tag, index) in tagCounts" :key="index" @click="filterByTag(tag.name)"
                class="flex-initial tag hover:bg-[#ffbe76] rounded-md border mx-1 dark:border-gray-600 dark:text-white">
                {{ tag.name }}[{{ tag.count }}]
            </span>
        </div>
        <div class="posts mt-3">
            <ul class="space-y-8">
                <li v-for="post in filteredPosts" :key="post.url"
                    class="bg-white p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-700 dark:border-gray-600">
                    <a :href="post.url"
                        class="block text-2xl font-semibold text-blue-600 hover:underline mb-2 dark:text-blue-400">{{ post.title }}</a>
                    <p class="text-gray-700 mb-4 dark:text-gray-300">{{ post.description }}</p>
                    <div class="text-sm text-gray-500 flex justify-between mb-4 dark:text-gray-400">
                        <span>更新于: {{ post.updated.string }}</span>
                        <span>发布于: {{ post.created.string }}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in post.tagsArray" :key="tag" @click="filterByTag(tag)"
                            class="flex bg-blue-100 text-blue-600 tag hover:bg-[#ffbe76] rounded-full text-sm font-medium m-2 dark:bg-blue-300 dark:text-blue-800">
                            {{ tag }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vitepress';
import { data as postsData } from '../untils/notes.data';
const route = useRoute();

const selectedTag = ref(null);

onMounted(() => {
    const queryTag = new URLSearchParams(window.location.search);

    if (queryTag.get('tag')) {
        selectedTag.value = queryTag.get('tag');
    }
});

// const uniqueTags = computed(() => {
//     console.log("uniqueTags start")
//     const tags = postsData.flatMap(post => post.targs);
//     console.log(tags)
//     return [...new Set(tags)];
// });


// 将 targs 字符串转换为标签数组
const getTagsArray = (targsString) => {
    if (typeof targsString === 'string') {
        return targsString.split(/\s+/).filter(tag => tag.trim() !== '');
    }
    return [];
};

// 计算每个标签及其对应的数量
const tagCounts = computed(() => {
    const tagsMap = {};
    postsData.forEach(post => {
        const tags = getTagsArray(post.targs);
        tags.forEach(tag => {
            if (!tagsMap[tag]) {
                tagsMap[tag] = 0;
            }
            tagsMap[tag]++;
        });
    });

    return Object.keys(tagsMap).map(tag => ({
        name: tag,
        count: tagsMap[tag]
    }));
});

const uniqueTags = computed(() => tagCounts.value.map(tag => tag.name));

const filteredPosts = computed(() => {
    console.log("filteredPosts start")
    console.log(selectedTag)
    if (!selectedTag.value) {
        return postsData;
    }
    return postsData.filter(post => post.targs.includes(selectedTag.value));
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
</style> -->
