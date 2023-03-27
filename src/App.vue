<script setup lang="ts">
import ItemScheduler from "@/components/scheduler/ItemScheduler.vue";
</script>

<template>
	<div class="container">
		<item-scheduler :rows="[]" :items="[]" />
	</div>
</template>

<style scoped>
.container {
	width: 75vw;
	height: 75vh;
}
</style>
