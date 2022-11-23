<template>
    <div>
        <v-autocomplete
            v-model="inventario"
            :items="datos"
            outlined
            label="NO. INVENTARIO"
            class="mt-3"
        ></v-autocomplete>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import requests from '@/helpers/requests';
export default {
    data() {
        return {
            articulos: [],
            datos: [],
            inventario: '',
        };
    },
    props: {
        section: String,
    },
    mounted() {
        if (this.section === 'naturales') {
            requests.getNaturales().then((data) => {
                this.articulos = data;
                this.datos = data.map((d) => d.noInventario);
            });
        } else {
            requests.getArmas().then((data) => {
                this.articulos = data;
                this.datos = data.map((d) => d.noInventario);
            });
        }
    },
    methods: {
        save() {
            const articulo = this.articulos.find(
                (art) => art.noInventario === this.inventario
            );
            this.$emit('getId', articulo._id);
            this.$emit('reload');
            console.log(articulo._id);
        },
    },
};
</script>

<style></style>
