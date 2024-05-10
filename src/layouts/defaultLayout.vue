<template>
  <main class="flex h-svh w-svw overflow-hidden">
    <aside>AsideBar</aside>
    <section class="relative flex flex-1 flex-col">
      <header>Header</header>
      <RouterView class="w-full flex-1 overflow-auto" />
    </section>
  </main>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss"></style>
