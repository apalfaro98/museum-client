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
                <v-toolbar-title>
                    <v-icon class="mr-1">mdi-sword-cross</v-icon>
                    Armas
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogInfo" max-width="1000">
                    <v-card class="pa-4">
                        <v-card-text>
                            <arma-dialog :editedItem="infoItem" />
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeInfo">
                                Cerrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Registrar Arma
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Dessert name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.calories"
                                            label="Calories"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.fat"
                                            label="Fat (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.carbs"
                                            label="Carbs (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.protein"
                                            label="Protein (g)"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
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
            <div class="d-flex justify-around">
                <v-icon small class="mr-2" @click="detailsItem(item)">
                    mdi-information
                </v-icon>
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </div>
        </template>
    </v-data-table>
</template>

<script>
import requests from '@/helpers/requests';
import ArmaDialog from '@/components/ArmaDialog.vue';
export default {
    data: () => ({
        datos: [],
        dialog: false,
        dialogInfo: false,
        dialogDelete: false,
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
                text: 'ACCIONES',
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
    components: { ArmaDialog },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Registrar Arma' : 'Editar Arma';
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

    mounted() {
        this.requestData();
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

        detailsItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.infoItem = Object.assign({}, item);
            this.dialogInfo = true;
        },
        editItem(item) {
            this.editedIndex = this.datos.indexOf(item);
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
