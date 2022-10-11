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
                        <arma-dialog :editedItem="editedItem" />
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
export default {
    data() {
        return {
            datos: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {},
            headers: [
                {
                    text: 'INST/PROPIETARIO',
                    value: 'propietario',
                },
                {
                    text: 'CODIGO',
                    value: 'codigo',
                },
                {
                    text: 'NO.INVENTARIO',
                    value: 'noInventario',
                },
                {
                    text: 'REGISTRO DE ENTRADA',
                    value: 'registroEntrada',
                },
                {
                    text: 'DENOMINACIÓN',
                    value: 'denominacion',
                },
                {
                    text: 'MANIFESTACIÓN',
                    value: 'manifestacion',
                },
                {
                    text: 'ESTADO',
                    value: 'estado',
                },
                {
                    text: 'GRADO DE VALOR',
                    align: 'center',
                    value: 'gradoDeValor',
                },
                {
                    text: 'DETALLES',
                    value: 'actions',
                    sortable: false,
                    align: 'center',
                },
            ],
        };
    },
    components: { ArmaDialog },
    mounted() {
        this.requestData(this.section);
    },
    methods: {
        requestData() {
            requests
                .getArmas()
                .then((data) => {
                    this.datos = data;
                    this.datos.forEach((el) => {
                        el.registroEntrada = el.registroEntrada.slice(0, 10);
                    });
                })
                .catch((err) => console.log);
        },
        editItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.editedItem = Object.assign({}, item);
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
