<!-- components/Archive.vue
<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-4xl font-bold mb-8 text-center">文章归档</h1>
        <div v-for="(posts, month) in paginatedArchivedPosts" :key="month" class="mb-8">
            <h2 class="text-3xl font-semibold mb-4">{{ month }}</h2>
            <ul class="space-y-8">
                <li v-for="post in posts" :key="post.url"
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
                        <span v-for="tag in post.targs" :key="tag" @click="goToTagPage(tag)"
                            class="bg-blue-100 tag text-blue-600 px-2 py-1 rounded-full text-sm font-medium">{{ tag
                            }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex justify-between items-center mt-6">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
                上一页
            </button>
            <div class="flex items-center space-x-2">
                <button v-if="shouldShowPage(1)" @click="goToPage(1)"
                    :class="['px-4 py-2 rounded', { 'bg-blue-500 text-white': currentPage === 1, 'bg-gray-200': currentPage !== 1 }]">
                    1
                </button>
                <span v-if="shouldShowEllipsis(1)">...</span>
                <button v-for="page in pageNumbers" :key="page" @click="goToPakkge(page)"
                    :class="['px-4 py-2 rounded', { 'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage }]">
                    {{ page }}
                </button>
                <span v-if="shouldShowEllipsis(totalPages)">...</span>
                <button v-if="shouldShowPage(totalPages)" @click="goToPage(totalPages)"
                    :class="['px-4 py-2 rounded', { 'bg-blue-500 text-white': currentPage === totalPages, 'bg-gray-200': currentPage !== totalPages }]">
                    {{ totalPages }}
                </button>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
                下一页
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vitepress';
import { data as postsData } from '../untils/notes.data.ts';

const posts = ref([]);
const archivedPosts = ref({});
const currentPage = ref(1);
const postsPerPage = ref(10); // 每页显示的文章数量
const router = useRouter();

const parseDateString = (dateString) => {
    try {
        const parts = dateString.split(/[\s年月日:]+/).filter(Boolean).map(part => parseInt(part, 10));
        const [year, month, day, hour = 0, minute = 0, second = 0] = parts;
        return new Date(year, month - 1, day, hour, minute, second);
    } catch (error) {
        console.error(`Error parsing date: ${dateString}`, error);
        return new Date();
    }
};

const formatDate = (dateString) => {
    const date = parseDateString(dateString);
    if (isNaN(date.getTime())) {
        console.error(`Invalid date: ${dateString}`);
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    return `${year}-${month}`;
};

const archivePostsByMonth = (posts) => {
    const archive = {};
    posts.forEach(post => {
        const month = formatDate(post.updated.string);
        if (!archive[month]) {
            archive[month] = [];
        }
        archive[month].push(post);
    });
    return archive;
};

const paginatedArchivedPosts = computed(() => {
    const allPosts = [];
    for (const [month, posts] of Object.entries(archivedPosts.value)) {
        posts.forEach(post => allPosts.push({ month, post }));
    }

    const start = (currentPage.value - 1) * postsPerPage.value;
    const end = start + postsPerPage.value;
    const paginatedPosts = allPosts.slice(start, end);

    return paginatedPosts.reduce((acc, { month, post }) => {
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(post);
        return acc;
    }, {});
});

const totalPages = computed(() => {
    const totalPosts = Object.values(archivedPosts.value).reduce((acc, posts) => acc + posts.length, 0);
    return Math.ceil(totalPosts / postsPerPage.value);
});

const pageNumbers = computed(() => {
    const current = currentPage.value;
    const total = totalPages.value;
    let pages = [];

    if (current > 3) pages.push(current - 2);
    if (current > 2) pages.push(current - 1);
    pages.push(current);
    if (current < total - 1) pages.push(current + 1);
    if (current < total - 2) pages.push(current + 2);

    return pages;
});

const shouldShowPage = (page) => {
    return page === 1 || page === totalPages.value;
};

const shouldShowEllipsis = (page) => {
    const current = currentPage.value;
    const total = totalPages.value;

    return (page === 1 && current > 4) || (page === total && current < total - 3);
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

function goToTagPage(tag) {
    router.go(`/tags?tag=${tag}`);
}

onMounted(() => {
    posts.value = postsData;
    archivedPosts.value = archivePostsByMonth(posts.value);
});
</script>

<style scoped>
.tag {
    color: var(--vp-c-brand);
    padding: 1px 5px;
    margin: 1px;
    cursor: pointer;
}

/* 暗黑模式下的样式 */
.dark .tag {
    color: #ffffff;
    background: #4a4a4a;
}
</style> -->

<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:border-gray-700">
        <h1 class="text-4xl font-bold mb-8 text-center">文章归档</h1>

        <!-- 按月显示文章 -->
        <div v-for="(posts, month) in paginatedArchivedPosts" :key="month" class="mb-8">
            <h2 class="text-3xl font-semibold mb-4">{{ month }}</h2>
            <ul class="space-y-8">
                <li v-for="post in posts" :key="post.url"
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
                        <span v-for="tag in post.targs" :key="tag" @click="goToTagPage(tag)"
                            class="bg-blue-100 tag text-blue-600 px-2 py-1 rounded-full text-sm font-medium">{{ tag
                            }}</span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 分页导航栏 -->
        <div class="flex justify-between items-center mt-6">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
                上一页
            </button>
            <div class="flex items-center space-x-2">
                <template v-for="(page, index) in pageNumbers" :key="index">
                    <span v-if="shouldShowEllipsis(index)" class="text-gray-400">...</span>
                    <button v-else @click="goToPage(page)"
                        :class="['px-4 py-2 rounded', { 'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage }]">
                        {{ page }}
                    </button>
                </template>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
                下一页
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vitepress';
import { data as postsData } from '../untils/notes.data.ts';

// 初始化引用的数据
const posts = ref([]);
const archivedPosts = ref({});
const currentPage = ref(1);
const postsPerPage = ref(8); // 每页显示的文章数量
const router = useRouter();

// 解析日期字符串为 Date 对象
const parseDateString = (dateString) => {
    try {
        const parts = dateString.split(/[\s年月日:]+/).filter(Boolean).map(part => parseInt(part, 10));
        const [year, month, day, hour = 0, minute = 0, second = 0] = parts;
        return new Date(year, month - 1, day, hour, minute, second);
    } catch (error) {
        console.error(`Error parsing date: ${dateString}`, error);
        return new Date();
    }
};

// 格式化日期为 YYYY-MM 格式
const formatDate = (dateString) => {
    const date = parseDateString(dateString);
    if (isNaN(date.getTime())) {
        console.error(`Invalid date: ${dateString}`);
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    return `${year}-${month}`;
};

// 将文章按月份归档
const archivePostsByMonth = (posts) => {
    const archive = {};
    posts.forEach(post => {
        const month = formatDate(post.updated.string);
        if (!archive[month]) {
            archive[month] = [];
        }
        archive[month].push(post);
    });
    return archive;
};

// 计算分页后的归档文章
const paginatedArchivedPosts = computed(() => {
    const allPosts = [];
    for (const [month, posts] of Object.entries(archivedPosts.value)) {
        posts.forEach(post => allPosts.push({ month, post }));
    }

    const start = (currentPage.value - 1) * postsPerPage.value;
    const end = start + postsPerPage.value;
    const paginatedPosts = allPosts.slice(start, end);

    return paginatedPosts.reduce((acc, { month, post }) => {
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(post);
        return acc;
    }, {});
});

// 计算总页数
const totalPages = computed(() => {
    const totalPosts = Object.values(archivedPosts.value).reduce((acc, posts) => acc + posts.length, 0);
    return Math.ceil(totalPosts / postsPerPage.value);
});

// 生成显示的页码列表
const pageNumbers = computed(() => {
    const total = totalPages.value;

    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const current = currentPage.value;
    let pages = [];

    // Always show the first and last page numbers
    pages.push(1);
    if (total > 1) pages.push(total);

    // Show ellipsis or pages around the current page
    const rangeSize = 2; // Number of pages to show before and after the current page
    const startPage = Math.max(2, current - rangeSize);
    const endPage = Math.min(total - 1, current + rangeSize);

    for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
    }

    // Add ellipses where necessary
    if (startPage > 2) pages.splice(1, 0, '...');
    if (endPage < total - 1) pages.splice(-1, 0, '...');

    return [...new Set(pages)]; // Remove duplicates
});

// 判断是否需要显示省略号
const shouldShowEllipsis = (index) => {
    const pages = pageNumbers.value;
    return pages[index] === '...';
};

// 上一页按钮点击事件
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

// 下一页按钮点击事件
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};

// 跳转到指定页码
const goToPage = (page) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

// 点击标签跳转到标签页面
function goToTagPage(tag) {
    router.go(`/tags?tag=${tag}`);
}

// 组件挂载时初始化数据
onMounted(() => {
    posts.value = postsData;
    archivedPosts.value = archivePostsByMonth(posts.value);
});
</script>

<style scoped>
.tag {
    color: var(--vp-c-brand);
    padding: 1px 5px;
    margin: 1px;
    cursor: pointer;
}

/* 暗黑模式下的样式 */
.dark .tag {
    color: #ffffff;
    background: #4a4a4a;
}
</style>