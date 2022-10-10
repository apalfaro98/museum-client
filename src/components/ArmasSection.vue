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
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-img
                                    :src="`http://localhost:3000/images/${editedItem.imageUrl}`"
                                ></v-img>
                            </v-col>
                            <v-col cols="12" md="6">
                                <property-element
                                    :items="[
                                        {
                                            title: 'INST/PROPIETARIO',
                                            value: editedItem.propietario,
                                        },
                                        {
                                            title: 'CODIGO',
                                            value: editedItem.codigo,
                                        },
                                        {
                                            title: 'NO.INVENTARIO',
                                            value: editedItem.noInventario,
                                        },
                                    ]"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <property-element
                                    :items="[
                                        {
                                            title: 'CANTIDAD',
                                            value: editedItem.cantidad,
                                        },
                                        {
                                            title: 'REGISTRO DE ENTRADA',
                                            value: editedItem.registroEntrada,
                                        },
                                        {
                                            title: 'DENOMINACIÓN',
                                            value: editedItem.denominacion,
                                        },
                                        {
                                            title: 'FÁBRICA',
                                            value: editedItem.fabrica,
                                        },
                                        {
                                            title: 'NO. DE SERIE',
                                            value: editedItem.noSerie,
                                        },
                                        {
                                            title: 'CIUDAD Y PAÍS',
                                            value: editedItem.ciudadPais,
                                        },
                                        {
                                            title: 'AÑO',
                                            value: editedItem.anio,
                                        },
                                        {
                                            title: 'ÉPOCA',
                                            value: editedItem.epoca,
                                        },
                                        {
                                            title: 'ALTO',
                                            value: editedItem.alto,
                                        },
                                        {
                                            title: 'ANCHO',
                                            value: editedItem.ancho,
                                        },
                                        {
                                            title: 'PROFUNDIDAD',
                                            value: editedItem.profundidad,
                                        },
                                        {
                                            title: 'CALIBRE',
                                            value: editedItem.calibre,
                                        },
                                        {
                                            title: 'MATERIALES',
                                            value: editedItem.materiales,
                                        },
                                    ]"
                                />
                                <list-element
                                    :title="'DESCRIPTORES'"
                                    :list="[
                                        {
                                            title: '1. (MAR/MOD)',
                                            value: editedItem.mar,
                                        },
                                        {
                                            title: '2. (ANX)',
                                            value: editedItem.anx,
                                        },
                                        {
                                            title: '3. (SIS)',
                                            value: editedItem.sis,
                                        },
                                        {
                                            title: '4. (DEC)',
                                            value: editedItem.dec,
                                        },
                                    ]"
                                />
                            </v-col>
                            <v-col cols="12" md="6">
                                <property-element
                                    :items="[
                                        {
                                            title: 'UBICACIÓN',
                                            value: editedItem.ubicacion,
                                        },
                                    ]"
                                />
                                <list-element
                                    :title="'TIPO DE REPRODUCCIÓN'"
                                    :list="[
                                        {
                                            title: 'ESTADO',
                                            value: editedItem.estado,
                                        },
                                        {
                                            title: 'VALOR',
                                            value: editedItem.valor,
                                        },
                                        {
                                            title: 'GRADO DE VALOR',
                                            value: editedItem.gradoDeValor,
                                        },
                                        {
                                            title: 'ORIGEN',
                                            value: editedItem.origen,
                                        },
                                    ]"
                                />
                                <list-element
                                    :title="'RELACIONADO CON'"
                                    :list="[
                                        {
                                            title: 'PERSONALIDAD',
                                            value: editedItem.personalidad,
                                        },
                                        {
                                            title: 'ACONTECIMIENTO',
                                            value: editedItem.acontecimiento,
                                        },
                                        {
                                            title: 'TASACIÓN',
                                            value: editedItem.tasacion,
                                        },
                                        {
                                            title: 'EXPEDIENTE CIENTÍFICO',
                                            value: editedItem.expediente,
                                        },
                                    ]"
                                />
                                <property-element
                                    :items="[
                                        {
                                            title: 'NOTAS',
                                            value: editedItem.notas,
                                        },
                                    ]"
                                />
                            </v-col>
                        </v-row>
                    </v-container>

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
import PropertyElement from '@/components/PropertyElement.vue';
import ListElement from '@/components/ListElement.vue';
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
    components: { PropertyElement, ListElement },
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
