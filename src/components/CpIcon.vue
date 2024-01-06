<template>
   <svg aria-hidden="true" style="width: 1em;height: 1em;">
      <use :href="`#icon-${name}`" />
    </svg>
</template>

<script setup lang="ts">
defineProps<{
  name:string
}>()

</script>