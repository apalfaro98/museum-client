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
                                            >DENOMINACIÓN:
                                        </span>
                                        {{ editedItem.denominacion }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >FÁBRICA:
                                        </span>
                                        {{
                                            editedItem.fabrica
                                                ? editedItem.fabrica
                                                : ' --- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >NO. DE SERIE:
                                        </span>
                                        {{
                                            editedItem.noSerie
                                                ? editedItem.noSerie
                                                : ' --- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >CIUDAD Y PAÍS:
                                        </span>
                                        {{
                                            editedItem.ciudadPais
                                                ? editedItem.ciudadPais
                                                : ' --- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >AÑO:
                                        </span>
                                        {{
                                            editedItem.anio
                                                ? editedItem.anio
                                                : ' --- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >ÉPOCA:
                                        </span>
                                        {{ editedItem.epoca }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >ALTO:
                                        </span>
                                        {{ editedItem.alto }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >ANCHO:
                                        </span>
                                        {{ editedItem.ancho }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >PROFUNDIDAD:
                                        </span>
                                        {{ editedItem.profundidad }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >CALIBRE:
                                        </span>
                                        {{
                                            editedItem.calibre
                                                ? editedItem.calibre
                                                : ' --- '
                                        }}
                                    </p>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >MATERIALES:
                                        </span>
                                        {{ editedItem.materiales }}
                                    </p>
                                    <v-list
                                        class="text-subtitle-1 grey--text text--darken-1 pt-0"
                                    >
                                        <span class="font-weight-bold"
                                            >DESCRIPTORES:
                                        </span>
                                        <v-list-item
                                            class="grey--text text--darken-1 mr-1"
                                        >
                                            <span class="font-weight-bold"
                                                >1. (MAR/MOD):
                                            </span>
                                            {{
                                                editedItem.mar
                                                    ? editedItem.mar
                                                    : ' --- '
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >2. (ANX):
                                            </span>
                                            {{
                                                editedItem.anx
                                                    ? editedItem.anx
                                                    : ' --- '
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >3. (SIS):
                                            </span>
                                            {{
                                                editedItem.sis
                                                    ? editedItem.sis
                                                    : ' --- '
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >4. (DEC):
                                            </span>
                                            {{
                                                editedItem.dec
                                                    ? editedItem.dec
                                                    : ' --- '
                                            }}
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >UBICACIÓN:
                                        </span>
                                        {{ editedItem.ubicacion }}
                                    </p>
                                    <v-list
                                        class="text-subtitle-1 grey--text text--darken-1 pt-0"
                                    >
                                        <span class="font-weight-bold"
                                            >TIPO DE REPRODUCCIÓN:
                                        </span>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >ESTADO:
                                            </span>
                                            {{ editedItem.estado }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >VALOR:
                                            </span>
                                            {{ editedItem.valor }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1">
                                                GRADO DE VALOR:
                                            </span>
                                            {{ editedItem.gradoDeValor }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold"
                                                >ORIGEN:
                                            </span>
                                            {{ editedItem.origen }}
                                        </v-list-item>
                                    </v-list>
                                    <v-list
                                        class="text-subtitle-1 grey--text text--darken-1 pt-0"
                                    >
                                        <span class="font-weight-bold"
                                            >RELACIONADO CON:
                                        </span>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >PERSONALIDAD:
                                            </span>
                                            {{
                                                editedItem.personalidad
                                                    ? editedItem.personalidad
                                                    : '---'
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >ACONTECIMIENTO:
                                            </span>
                                            {{
                                                editedItem.acontecimiento
                                                    ? editedItem.acontecimiento
                                                    : '---'
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1">
                                                TASACIÓN:
                                            </span>
                                            {{
                                                editedItem.tasacion
                                                    ? editedItem.tasacion
                                                    : '---'
                                            }}
                                        </v-list-item>
                                        <v-list-item
                                            class="grey--text text--darken-1"
                                        >
                                            <span class="font-weight-bold mr-1"
                                                >EXPEDIENTE CIENTÍFICO:
                                            </span>
                                            {{ editedItem.expediente }}
                                        </v-list-item>
                                    </v-list>
                                    <p class="text-subtitle-1">
                                        <span class="font-weight-bold"
                                            >NOTAS:
                                        </span>
                                        {{
                                            editedItem.notas
                                                ? editedItem.notas
                                                : '---'
                                        }}
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
                    console.log(data);
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
