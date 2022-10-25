<template>
    <div>
        <v-scroll-x-reverse-transition>
            <v-alert
                prominent
                shaped
                type="success"
                max-width="300px"
                dismissible
                v-if="success"
                @click="success = false"
                class="alert"
                >Artículo guardadado exitosamente.</v-alert
            >
        </v-scroll-x-reverse-transition>
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
                        <v-icon class="mr-1">mdi-sprout</v-icon>
                        Naturales
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogInfo" max-width="1000">
                        <v-card class="pa-4">
                            <v-card-text>
                                <natural-dialog :editedItem="infoItem" />
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
                    <v-dialog v-model="dialog" max-width="1000">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                                @click="isNew = true"
                            >
                                Registrar Artículo
                            </v-btn>
                        </template>
                        <natural-create-edit
                            :formTitle="formTitle"
                            :editedItem="editedItem"
                            :isNew="isNew"
                            @close="close"
                            @reload="reload"
                        />
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                            <v-card-title class="text-h5"
                                >¿Está seguro que desea eliminar este
                                artículo?</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancelar</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >Aceptar</v-btn
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
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import requests from '@/helpers/requests';
import NaturalDialog from '@/components/NaturalDialog.vue';
import NaturalCreateEdit from '@/components/NaturalCreateEdit.vue';

export default {
    data: () => ({
        datos: [],
        dialog: false,
        dialogInfo: false,
        dialogDelete: false,
        isNew: true,
        success: false,
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
        editedIndex: -1,
        editedItem: {
            propietario: '',
            codigo: '',
            noInventario: '',
            cantidad: 1,
            manifestacion: '',
            categoria: '',
            comun: '',
            tecnico: '',
            locColecta: '',
            pais: '',
            fechaColecta: '',
            colector: '',
            fecha: '',
            lote: '',
            alto: '',
            ancho: '',
            profundidad: '',
            ubicacion: '',
            estado: '',
            valor: '',
            gradoDeValor: '',
            procedencia: '',
            acontecimiento: '',
            expediente: '',
            prestado: false,
            recibido: false,
        },
        infoItem: {},
        defaultItem: {
            propietario: '',
            codigo: '',
            noInventario: '',
            cantidad: 1,
            manifestacion: '',
            categoria: '',
            comun: '',
            tecnico: '',
            locColecta: '',
            pais: '',
            fechaColecta: '',
            colector: '',
            fecha: '',
            lote: '',
            alto: '',
            ancho: '',
            profundidad: '',
            ubicacion: '',
            estado: '',
            valor: '',
            gradoDeValor: '',
            procedencia: '',
            acontecimiento: '',
            expediente: '',
            donacion: false,
            prestado: false,
            recibido: false,
        },
    }),
    components: { NaturalDialog, NaturalCreateEdit },

    computed: {
        formTitle() {
            return this.editedIndex === -1
                ? 'Registrar Artículo'
                : 'Editar Artículo';
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
                .getNaturales()
                .then((data) => {
                    this.datos = data;
                    this.datos.forEach((el) => {
                        el.registroEntrada = el.registroEntrada.slice(0, 10);
                    });
                })
                .catch((err) => console.log);
        },

        reload() {
            this.close();
            this.success = true;
            this.requestData();
        },

        detailsItem(item) {
            this.success = false;
            this.editedIndex = this.datos.indexOf(item);
            this.infoItem = Object.assign({}, item);
            this.dialogInfo = true;
        },
        editItem(item) {
            this.success = false;
            this.isNew = false;
            this.editedIndex = this.datos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.success = false;
            this.editedIndex = this.datos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            requests
                .deleteNatural(this.editedItem._id)
                .then((data) => {
                    console.log(data);
                    this.closeDelete();
                    this.requestData();
                })
                .catch((err) => {
                    console.log(err.response);
                });
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
    },
};
</script>

<style scoped>
.alert {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 3;
}
</style>
