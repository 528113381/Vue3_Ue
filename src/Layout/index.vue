<template>
  <div>
    <router-view />
    <!-- <my-tabbar-item>
      <template #icon="{ count, msg }">
        <p>{{ count }}--{{ msg }}</p>
        <span>首页</span>
      </template>
    </my-tabbar-item>
    <my-tabbar-item></my-tabbar-item> -->
    <van-tabbar route >
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon="{ active }">
          <cp-icon :name="active ? 'home-index-active' : 'home-index-default'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/article">
        <span>健康百科</span>
        <template #icon="{ active }">
          <cp-icon :name="active ? 'home-article-active' : 'home-article-default'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/notify">
        <span>消息中心</span>
        <template #icon="{ active }">
          <cp-icon :name="active ? 'home-notice-active' : 'home-notice-default'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/user">
        <span>我的</span>
        <template #icon="{ active }">
          <cp-icon :name="active ? 'home-mine-active' : 'home-mine-default'" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">


</script>