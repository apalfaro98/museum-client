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
                <v-card class="pt-4">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-img
                                        :src="`http://localhost:3000/images/${editedItem.imageUrl}`"
                                    ></v-img>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >INST/PROPIETARIO:
                                        </span>
                                        {{ editedItem.propietario }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >CODIGO:
                                        </span>
                                        {{ editedItem.codigo }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >NO.INVENTARIO:
                                        </span>
                                        {{ editedItem.noInventario }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >CANTIDAD:
                                        </span>
                                        {{ editedItem.cantidad }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >REGISTRO DE ENTRADA:
                                        </span>
                                        {{ editedItem.registroEntrada }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >MANIFESTACIÓN:
                                        </span>
                                        {{ editedItem.manifestacion }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >CATEGORIA CLASIFICATORIA:
                                        </span>
                                        {{
                                            editedItem.categoria
                                                ? editedItem.categoria
                                                : ' ---- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >NOMBRE COMUN:
                                        </span>
                                        {{ editedItem.comun }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >NOMBRE TECNICO:
                                        </span>
                                        {{
                                            editedItem.tecnico
                                                ? editedItem.tecnico
                                                : ' --- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >LOC. DE COLECTA:
                                        </span>
                                        {{ editedItem.locColecta }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >PAIS:
                                        </span>
                                        {{ editedItem.pais }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >FECHA DE COLECTA:
                                        </span>
                                        {{ editedItem.fechaColecta }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >COLECTOR:
                                        </span>
                                        {{
                                            editedItem.colector
                                                ? editedItem.colector
                                                : ' ---- '
                                        }}
                                    </p>
                                    <v-list
                                        class="text-subtitle-1 grey--text text--darken-1 pt-0"
                                    >
                                        <span class="font-weight-bold"
                                            >IDENTIFICADOR TECNICO:
                                        </span>
                                        <v-list-item
                                            class="grey--text text--darken-1 mr-1"
                                        >
                                            <span class="font-weight-bold"
                                                >FECHA:
                                            </span>
                                            {{
                                                editedItem.fecha
                                                    ? editedItem.fecha
                                                    : ' --- '
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >LOTE:
                                            </span>
                                            {{
                                                editedItem.lote
                                                    ? editedItem.lote
                                                    : ' --- '
                                            }}
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-list
                                        class="text-subtitle-1 grey--text text--darken-1 pt-0"
                                    >
                                        <span class="font-weight-bold"
                                            >ORIGINAL:
                                        </span>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >ALTO:
                                            </span>
                                            {{ editedItem.alto }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >ANCHO:
                                            </span>
                                            {{ editedItem.ancho }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1">
                                                PROFUNDIDAD:
                                            </span>
                                            {{ editedItem.profundidad }}
                                        </v-list-item>
                                    </v-list>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >UBICACIÓN:
                                        </span>
                                        {{ editedItem.ubicacion }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >ESTADO:
                                        </span>
                                        {{ editedItem.estado }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >VALOR:
                                        </span>
                                        {{ editedItem.valor }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >GRADO DE VALOR:
                                        </span>
                                        {{ editedItem.gradoDeValor }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >PROCEDENCIA:
                                        </span>
                                        {{ editedItem.procedencia }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >REL. ACONTECIMIENTO:
                                        </span>
                                        {{ editedItem.acontecimiento }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >EXPEDIENTE:
                                        </span>
                                        {{ editedItem.expediente }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-container>
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
                    text: 'NOMBRE COMUN',
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
    mounted() {
        this.requestData(this.section);
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
