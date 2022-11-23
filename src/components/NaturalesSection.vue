<template>
    <div>
        <div class="d-flex justify-end">
            <v-btn
                color="#217345"
                class="mt-5 mr-5 font-weight-bold"
                dark
                @click="exportTable"
            >
                <v-icon class="mr-1">mdi-file-excel</v-icon>
                Exportar
            </v-btn>
        </div>
        <v-data-table
            :headers="headers"
            :items="datos"
            :items-per-page="-1"
            hide-default-footer
            class="elevation-1 mt-5"
            id="naturales"
        >
            <template v-slot:top>
                <v-dialog v-model="dialog" max-width="1000">
                    <v-card class="pt-4">
                        <v-card-text>
                            <natural-dialog :editedItem="editedItem" />
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
                <v-icon
                    color="blue lighten-3"
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-information
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import requests from '@/helpers/requests';
import NaturalDialog from '@/components/NaturalDialog.vue';
import { utils, writeFile } from 'xlsx';
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
                    text: 'CÓDIGO',
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
                    text: 'NOMBRE COMÚN',
                    value: 'comun',
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
    components: { NaturalDialog },
    mounted() {
        this.requestData();
    },
    methods: {
        requestData() {
            requests
                .getNaturales()
                .then((data) => {
                    this.datos = data;
                    this.datos.forEach((el) => {
                        el.registroEntrada = el.registroEntrada.slice(0, 10);
                    });
                })
                .catch((err) => console.log);
        },
        exportTable() {
            const data = this.datos.map((e) => {
                delete e['_id'];
                delete e['imageUrl'];
                delete e['prestado'];
                delete e['recibido'];
                delete e['eliminado'];
                delete e['__v'];

                return e;
            });
            const ws = utils.json_to_sheet(data);
            utils.sheet_add_aoa(
                ws,
                [
                    [
                        'INST/PROPIETARIO',
                        'CODIGO',
                        'NO.INVENTARIO',
                        'CANTIDAD',
                        'REGISTRO DE ENTRADA',
                        'MANIFESTACIÓN',
                        'CATEGORIA CLASIFICATORIA',
                        'NOMBRE COMUN',
                        'LOC. DE COLECTA',
                        'PAIS',
                        'FECHA DE COLECTA',
                        'ALTO',
                        'ANCHO',
                        'PROFUNDIDAD',
                        'UBICACION',
                        'ESTADO',
                        'VALOR',
                        'GRADO DE VALOR',
                        'PROCEDENCIA',
                        'REL. ACONTECIMIENTO',
                        'EXPEDIENTE',
                        'NOMBRE TECNICO',
                        'COLECTOR',
                        'FECHA',
                        'LOTE',
                    ],
                ],
                {
                    origin: 'A1',
                }
            );
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, 'inventario');

            writeFile(wb, 'Inventario_Ciencias_Naturales.xlsx');
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
