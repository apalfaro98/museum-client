<template>
    <v-list class="text-subtitle-1 grey--text text--darken-1 pt-0">
        <span class="font-weight-bold">{{ title }}: </span>
        <v-list-item
            class="grey--text text--darken-1 mr-1"
            v-for="(item, i) in list"
            :key="i"
        >
            <span class="font-weight-bold">{{ item.title }}: </span>
            {{ item.value ? item.value : ' --- ' }}
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    props: {
        title: String,
        list: Array,
    },
};
</script>

<style></style>
