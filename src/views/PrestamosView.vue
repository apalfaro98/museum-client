<template>
    <v-data-table
        :headers="headers"
        :items="datos"
        :items-per-page="-1"
        hide-default-footer
        class="elevation-1 mt-10"
    ></v-data-table>
</template>

<script>
import requests from '@/helpers/requests';
export default {
    data() {
        return {
            datos: [],
            headers: [{ title: 'Museo' }],
        };
    },
    mounted() {
        this.requestPrestamos();
    },
    methods: {
        requestPrestamos() {
            requests.getPrestamos().then((data) => {
                this.datos = data;
                console.log(data);
            });
        },
    },
};
</script>

<style></style>
