<template>
    <v-data-table
        :headers="headers"
        :items="datos"
        :items-per-page="-1"
        class="elevation-1 mt-2"
        hide-default-footer
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Préstamos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogInfo" max-width="1000">
                    <v-card class="pa-4">
                        <v-card-text>
                            <arma-dialog
                                v-if="infoItem.seccion === 'armas'"
                                :editedItem="articulo"
                            />
                            <natural-dialog
                                v-else-if="infoItem.seccion === 'naturales'"
                                :editedItem="articulo"
                            />
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeInfo">
                                Cerrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog" max-width="1000px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Nuevo Préstamo
                        </v-btn>
                    </template>
                    <prestamo-stepper @close="close" />
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5"
                            >Are you sure you want to delete this
                            item?</v-card-title
                        >
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeDelete"
                                >Cancel</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="deleteItemConfirm"
                                >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="detailsItem(item)">
                mdi-information
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import requests from '@/helpers/requests';
import ArmaDialog from '@/components/ArmaDialog.vue';
import NaturalDialog from '@/components/NaturalDialog.vue';
import PrestamoStepper from '@/components/PrestamoStepper.vue';
export default {
    data: () => ({
        datos: [],
        articulo: {},
        dialog: false,
        dialogInfo: false,
        dialogDelete: false,
        headers: [
            { text: 'MUSEO', value: 'museo' },
            { text: 'CANTIDAD', value: 'cantidad' },
            { text: 'FECHA ENTREGA', value: 'fechaPrestamo' },
            { text: 'FECHA DEVOLUCIÓN', value: 'fechaDevolucion' },
            { text: 'RECIBIDO POR', value: 'persona' },
            { text: 'ORGANISMO', value: 'organismo' },
            { text: 'ENTREGADO POR', value: 'entregadoPor' },
            {
                text: 'ARTICULO PRESTADO',
                value: 'actions',
                sortable: false,
                align: 'center',
            },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        infoItem: {},
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),
    components: { ArmaDialog, NaturalDialog, PrestamoStepper },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.initialize();
    },
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
        initialize() {
            this.desserts = [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                },
            ];
        },

        detailsItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.infoItem = Object.assign({}, item);
            this.requestArticulo(item._id);
            this.dialogInfo = true;
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeInfo() {
            this.dialogInfo = false;
            this.$nextTick(() => {
                this.infoItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>

<style></style>
