<template>
    <v-card elevation="0">
        <v-card-title>
            <span class="text-h5">Registrar Transferencia</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-slide-x-transition>
                    <v-alert
                        v-if="error"
                        dense
                        text
                        outlined
                        type="error"
                        class="mb-6"
                    >
                        {{ error }}
                    </v-alert>
                </v-slide-x-transition>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="editedItem.municipio"
                            label="MUNICIPIO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.museoT"
                            label="MUSEO QUE TRANSFIERE"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.responsableT"
                            label="ENTREGADO POR"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.cantidad"
                            label="CANTIDAD"
                            outlined
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="editedItem.responsableR"
                            label="RECIBIDO POR"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.museoR"
                            label="MUSEO QUE RECIBE"
                            outlined
                        ></v-text-field>
                        <h3>Elige la sección:</h3>
                        <v-radio-group
                            v-model="editedItem.section"
                            row
                            class="font-weight-bold"
                        >
                            <v-radio
                                label="Armas"
                                value="armas"
                                :color="
                                    editedItem.section === 'armas'
                                        ? 'success'
                                        : ''
                                "
                                @click="changeSection"
                            ></v-radio>
                            <v-radio
                                label="Ciencias Naturales"
                                value="naturales"
                                :color="
                                    editedItem.section === 'armas'
                                        ? ''
                                        : 'success'
                                "
                                @click="changeSection"
                            ></v-radio>
                        </v-radio-group>
                        <v-select
                            v-model="inventarioSelected"
                            :items="inventario"
                            label="No. de Inventario"
                            outlined
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import requests from '@/helpers/requests';
export default {
    data() {
        return {
            error: '',
            inventarioSelected: '',
            armas: [],
            naturales: [],
            inventario: [],
        };
    },
    props: {
        editedItem: Object,
    },
    mounted() {
        this.requestArticulos();

        console.log('inventario', this.inventario);
    },
    methods: {
        requestArticulos() {
            requests.getArmas().then((data) => {
                this.armas = data;
                this.inventario = this.armas.map((arma) => arma.noInventario);
            });
            requests.getNaturales().then((data) => {
                this.naturales = data;
                console.log('naturales', this.naturales);
            });
        },
        showErrors(err) {
            console.log(err);
            if (err.response.status === 400) {
                this.error = err.response.data.errors[0].msg;
            } else if (err.response.status === 401) {
                this.error = err.response.data.error.msg;
            } else {
                this.error =
                    'No se pudo establecer la conexión con el servidor.';
            }
        },
        save() {
            if (this.editedItem.responsableT === '') {
                this.error =
                    'El nombre de la persona responsable de la transferencia es obligatorio.';
                return;
            }
            if (this.editedItem.responsableR === '') {
                this.error =
                    'El nombre de la persona que recibe la transferencia es obligatorio.';
                return;
            }
            if (this.editedItem.cantidad < 1) {
                this.error = 'La cantidad es obligatoria.';
                return;
            }
            if (this.inventarioSelected === '') {
                this.error = 'El No. de Inventario es obligatorio.';
                return;
            }

            let element = {};

            if (this.editedItem.section === 'armas') {
                element = this.armas.find(
                    (arma) => arma.noInventario === this.inventarioSelected
                );
            } else {
                element = this.naturales.find(
                    (natural) =>
                        natural.noInventario === this.inventarioSelected
                );
            }

            this.editedItem.elementId = element._id;

            requests
                .createTransferencia(this.editedItem)
                .then(() => {
                    this.$emit('reload');
                })
                .catch(this.showErrors);
        },
        changeSection() {
            if (this.editedItem.section === 'armas') {
                this.inventario = this.armas.map((arma) => arma.noInventario);
            } else {
                this.inventario = this.naturales.map(
                    (natural) => natural.noInventario
                );
            }
        },
    },
};
</script>

<style></style>
