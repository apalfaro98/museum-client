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
                >Préstamo realizado exitosamente.</v-alert
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
                        <prestamo-stepper
                            v-if="isNew"
                            :editedItem="editedItem"
                            formTitle="Realizar préstamo"
                            :isNew="true"
                            @close="close"
                            @reload="reload"
                        />
                        <prestamo-create-edit
                            v-else
                            :editedItem="editedItem"
                            :formTitle="formTitle"
                            :isNew="isNew"
                            @close="close"
                            @reload="reload"
                        />
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="700px">
                        <v-card>
                            <v-card-title class="text-h5"
                                >¿Está seguro que desea eliminar este
                                registro?</v-card-title
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
                <v-icon small class="mr-2" @click="detailsItem(item)">
                    mdi-information
                </v-icon>
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import requests from '@/helpers/requests';
import ArmaDialog from '@/components/ArmaDialog.vue';
import NaturalDialog from '@/components/NaturalDialog.vue';
import PrestamoStepper from '@/components/PrestamoStepper.vue';
import PrestamoCreateEdit from '@/components/PrestamoCreateEdit.vue';
export default {
    data: () => ({
        datos: [],
        articulo: {},
        dialog: false,
        dialogInfo: false,
        dialogDelete: false,
        success: false,
        isNew: true,
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
        editedIndex: -1,
        editedItem: {
            prestado: true,
            museo: '',
            persona: '',
            organismo: '',
            cantidad: 1,
            entregadoPor: '',
            fechaDevolucion: Date.now(),
            seccion: 'armas',
            elementId: '',
            observaciones: '',
        },
        infoItem: {},
        defaultItem: {
            prestado: true,
            museo: '',
            persona: '',
            organismo: '',
            cantidad: 1,
            entregadoPor: '',
            fechaDevolucion: Date.now(),
            seccion: 'armas',
            elementId: '',
            observaciones: '',
        },
    }),
    components: {
        ArmaDialog,
        NaturalDialog,
        PrestamoStepper,
        PrestamoCreateEdit,
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1
                ? 'Registrar Préstamo'
                : 'Editar Préstamo';
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
            });
        },

        reload() {
            this.close();
            this.success = true;
            this.requestPrestamos();
        },

        detailsItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.infoItem = Object.assign({}, item);
            this.requestArticulo(item._id);
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
                .deletePrestamo(this.editedItem._id)
                .then((data) => {
                    this.closeDelete();
                    this.requestPrestamos();
                })
                .catch((err) => {
                    console.log(err.response);
                });
        },

        close() {
            this.isNew = true;
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

<style scoped>
.alert {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 3;
}
</style>
