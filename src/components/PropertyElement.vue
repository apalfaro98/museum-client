<template>
    <div>
        <p
            class="text-subtitle-1 grey--text text--darken-1"
            v-for="(item, i) in items"
            :key="i"
        >
            <span class="font-weight-bold">{{ item.title }}: </span>
            {{ item.value ? item.value : ' ---- ' }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
    },
};
</script>

<style></style>
