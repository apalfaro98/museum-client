<template>
    <v-data-table
        :headers="headers"
        :items="datos"
        :items-per-page="-1"
        hide-default-footer
        class="elevation-1 mt-10"
    >
        <template v-slot:top>
            <v-dialog v-model="dialog" max-width="1000">
                <v-card class="pa-4">
                    <v-card-text>
                        <arma-dialog
                            v-if="editedItem.seccion === 'armas'"
                            :editedItem="articulo"
                        />
                        <natural-dialog
                            v-else-if="editedItem.seccion === 'naturales'"
                            :editedItem="articulo"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="close">
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon color="blue lighten-3" class="mr-2" @click="editItem(item)">
                mdi-information
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import requests from '@/helpers/requests';
import ArmaDialog from '@/components/ArmaDialog.vue';
import NaturalDialog from '@/components/NaturalDialog.vue';
export default {
    data() {
        return {
            datos: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {},
            articulo: {},
            headers: [
                { text: 'MÚSEO', value: 'museo' },
                { text: 'CANTIDAD', value: 'cantidad' },
                { text: 'FECHA ENTREGA', value: 'fechaPrestamo' },
                { text: 'FECHA DEVOLUCIÓN', value: 'fechaDevolucion' },
                { text: 'RECIBIDO POR', value: 'persona' },
                { text: 'ORGANISMO', value: 'organismo' },
                { text: 'ENTREGADO POR', value: 'entregadoPor' },
                {
                    text: 'ARTÍCULO PRESTADO',
                    value: 'actions',
                    sortable: false,
                    align: 'center',
                },
            ],
        };
    },
    components: { ArmaDialog, NaturalDialog },
    mounted() {
        this.requestPrestamos();
    },
    methods: {
        requestPrestamos() {
            requests.getPrestamos().then((data) => {
                this.datos = data;
                this.datos.forEach((el) => {
                    el.fechaPrestamo = el.fechaPrestamo.slice(0, 10);
                    el.fechaDevolucion = el.fechaDevolucion.slice(0, 10);
                });
            });
        },
        requestArticulo(id) {
            requests.getOnePrestamo(id).then((data) => {
                this.articulo = data.articulo;
                this.articulo.registroEntrada =
                    this.articulo.registroEntrada.slice(0, 10);
                console.log(data);
            });
        },
        editItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.requestArticulo(item._id);
            this.dialog = true;
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = {};
                this.editedIndex = -1;
            });
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
    },
};
</script>

<style></style>
