<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="datos"
            :items-per-page="-1"
            class="elevation-1 mt-2"
            hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Bajas</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogInfo" max-width="1000">
                        <v-card class="pa-4">
                            <v-card-text>
                                <arma-dialog
                                    v-if="infoItem.section === 'ARMAS'"
                                    :editedItem="articulo"
                                />
                                <natural-dialog v-else :editedItem="articulo" />
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="red darken-1"
                                    text
                                    @click="closeInfo"
                                >
                                    Cerrar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="detailsItem(item)">
                    mdi-information
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import requests from '@/helpers/requests';
import ArmaDialog from '@/components/ArmaDialog.vue';
import NaturalDialog from '@/components/NaturalDialog.vue';
export default {
    data: () => ({
        datos: [],
        armas: [],
        naturales: [],
        articulo: {},
        dialogInfo: false,
        headers: [
            { text: 'NO. INVENTARIO', value: 'noInventario' },
            { text: 'FECHA ENTRADA', value: 'registroEntrada' },
            { text: 'GRADO DE VALOR', value: 'gradoDeValor' },
            { text: 'ESTADO', value: 'estado' },
            { text: 'SECCION', value: 'section' },
            {
                text: 'ARTICULO TRANSFERIDO',
                value: 'actions',
                sortable: false,
                align: 'center',
            },
        ],
        editedIndex: -1,
        infoItem: {},
    }),
    components: {
        ArmaDialog,
        NaturalDialog,
    },

    mounted() {
        this.requestBajas();
    },

    methods: {
        requestBajas() {
            requests.getBajas().then((data) => {
                this.armas = data.armas.map((e) => {
                    e.section = 'ARMAS';
                    return e;
                });
                this.naturales = data.naturales.map((e) => {
                    e.section = 'CIENCIAS NATURALES';
                    return e;
                });
                this.datos = [...this.armas, ...this.naturales];
                this.datos.forEach((el) => {
                    el.registroEntrada = el.registroEntrada.slice(0, 10);
                });
            });
        },
        requestArticulo(id, section) {
            if (section === 'ARMAS') {
                requests.getOneArma(id).then((data) => {
                    this.articulo = data;
                });
            } else {
                requests.getOneNatural(id).then((data) => {
                    this.articulo = data;
                });
            }
        },

        detailsItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.infoItem = Object.assign({}, item);
            this.requestArticulo(item._id, item.section);
            this.dialogInfo = true;
        },

        closeInfo() {
            this.dialogInfo = false;
            this.$nextTick(() => {
                this.infoItem = {};
                this.editedIndex = -1;
            });
        },
    },
};
</script>

<style scoped></style>
