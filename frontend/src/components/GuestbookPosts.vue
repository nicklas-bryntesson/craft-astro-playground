<script setup>
import { ref, onMounted } from 'vue';
import { craftClient } from '../lib/graphql';
import { GUESTBOOK_POSTS_QUERY } from '../queries/guestbookPosts.mjs';

const posts = ref([]);
const loading = ref(true);
const error = ref('');
const totalPosts = ref(0);
const currentPage = ref(1);
const itemsPerPage = 4;

const fetchPosts = async () => {
  loading.value = true;
  try {
    const postsData = await craftClient.query(GUESTBOOK_POSTS_QUERY, {
      limit: itemsPerPage,
      offset: (currentPage.value - 1) * itemsPerPage
    });
    posts.value = postsData?.guestbookPostsEntries || [];
    totalPosts.value = postsData?.entryCount || 0;
  } catch (err) {
    error.value = `Error fetching posts: ${err.message}`;
    console.error('Error fetching posts:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPosts();
  window.addEventListener('post-submitted', fetchPosts);
});
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-600">{{ error }}</div>
    <div v-if="posts.length > 0">
      <ol class="mb-2 divide-y divide-slate-300">
        <li v-for="post in posts" :key="post.id">
          <article class="text-xl py-6">
            <div v-html="post.textBlock.html"></div>
            <p class="text-sm mt-1">
              <time :datetime="post.postDate">{{ post.postDate }}</time>
            </p>
          </article>
        </li>
      </ol>
    </div>
    <div v-else>
      <p class="text-2xl">No entries yet. Create one using the form.</p>
    </div>
  </div>
</template>
