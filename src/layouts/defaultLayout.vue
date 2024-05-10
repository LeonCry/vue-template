<template>
  <main class="flex h-svh w-svw overflow-auto">
    <aside>AsideBar</aside>
    <section class="relative flex min-w-[900px] flex-1 flex-col">
      <header>Header</header>
      <RouterView class="flex-1 overflow-auto" />
    </section>
  </main>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss"></style>
