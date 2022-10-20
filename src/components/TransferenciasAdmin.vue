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
                >Transferencia realizada exitosamente.</v-alert
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
                    <v-toolbar-title>Transferencias</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogInfo" max-width="1000">
                        <v-card class="pa-4">
                            <v-card-text>
                                <arma-dialog
                                    v-if="infoItem.section === 'armas'"
                                    :editedItem="articulo"
                                />
                                <natural-dialog
                                    v-else-if="infoItem.section === 'naturales'"
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
                                Nueva Transferencia
                            </v-btn>
                        </template>
                        <transferencia-create
                            :editedItem="editedItem"
                            @close="close"
                            @reload="reload"
                        />
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
import TransferenciaCreate from '@/components/TransferenciaCreate.vue';
export default {
    data: () => ({
        datos: [],
        articulo: {},
        dialog: false,
        dialogInfo: false,
        success: false,
        headers: [
            { text: 'MUNICIPIO', value: 'municipio' },
            { text: 'MUSEO QUE TRANSFIERE', value: 'museoT' },
            { text: 'CANTIDAD', value: 'cantidad' },
            { text: 'FECHA ENTREGA', value: 'fechaT' },
            { text: 'ENTREGADO POR', value: 'responsableT' },
            { text: 'RECIBIDO POR', value: 'responsableR' },
            { text: 'MUSEO QUE RECIBE', value: 'museoR' },
            {
                text: 'ARTICULO TRANSFERIDO',
                value: 'actions',
                sortable: false,
                align: 'center',
            },
        ],
        editedIndex: -1,
        editedItem: {
            municipio: '',
            museoT: '',
            responsableT: '',
            cantidad: 1,
            responsableR: '',
            museoR: '',
            section: 'armas',
            elementId: '',
        },
        infoItem: {},
        defaultItem: {
            municipio: '',
            museoT: '',
            responsableT: '',
            cantidad: 1,
            responsableR: '',
            museoR: '',
            section: 'armas',
            elementId: '',
        },
    }),
    components: {
        ArmaDialog,
        NaturalDialog,
        TransferenciaCreate,
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    mounted() {
        this.requestTransferencias();
    },

    methods: {
        requestTransferencias() {
            requests.getTransferencias().then((data) => {
                this.datos = data;
                this.datos.forEach((el) => {
                    el.fechaT = el.fechaT.slice(0, 10);
                });
            });
        },
        requestArticulo(id) {
            requests.getOneTransferencia(id).then((data) => {
                this.articulo = data.articulo;
                this.articulo.registroEntrada =
                    this.articulo.registroEntrada.slice(0, 10);
            });
        },

        reload() {
            this.close();
            this.success = true;
            this.requestTransferencias();
        },

        detailsItem(item) {
            this.editedIndex = this.datos.indexOf(item);
            this.infoItem = Object.assign({}, item);
            this.requestArticulo(item._id);
            this.dialogInfo = true;
        },
        editItem(item) {
            this.success = false;
            this.editedIndex = this.datos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
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
