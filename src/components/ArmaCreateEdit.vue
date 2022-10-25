<template>
    <v-card elevation="0">
        <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
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
                            v-model="editedItem.propietario"
                            label="INST/PROPIETARIO"
                            outlined
                            class="mt-5"
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.codigo"
                            label="CODIGO"
                            outlined
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.noInventario"
                            label="NO.INVENTARIO"
                            outlined
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.cantidad"
                            label="CANTIDAD"
                            outlined
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.manifestacion"
                            label="MANIFESTACIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.denominacion"
                            label="DENOMINACIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.fabrica"
                            label="FÁBRICA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.noSerie"
                            label="NO. DE SERIE"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ciudadPais"
                            label="CIUDAD Y PAÍS"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.anio"
                            label="AÑO"
                            outlined
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.epoca"
                            label="ÉPOCA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.alto"
                            label="ALTO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ancho"
                            label="ANCHO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.profundidad"
                            label="PROFUNDIDAD"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.calibre"
                            label="CALIBRE"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.materiales"
                            label="MATERIALES"
                            outlined
                        ></v-text-field>
                        <v-file-input
                            v-model="image"
                            show-size
                            label="IMAGEN"
                            accept="image/png, image/jpeg, image/jpg"
                            outlined
                            prepend-inner-icon="mdi-camera"
                            prepend-icon=""
                            :disabled="!isNew"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>DESCRIPTORES:</span>
                        <v-text-field
                            v-model="editedItem.mar"
                            label="MAR/MOD"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.anx"
                            label="ANX"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.sis"
                            label="SIS"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.dec"
                            label="DEC"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ubicacion"
                            label="UBICACIÓN"
                            outlined
                        ></v-text-field>
                        <span>TIPO DE REPRODUCCIÓN:</span>
                        <v-combobox
                            v-model="editedItem.estado"
                            :items="estados"
                            label="ESTADO"
                            outlined
                            class="mt-1"
                        ></v-combobox>
                        <v-text-field
                            v-model="editedItem.valor"
                            label="VALOR"
                            outlined
                        ></v-text-field>
                        <v-combobox
                            v-model="editedItem.gradoDeValor"
                            :items="grados"
                            label="GRADO DE VALOR"
                            outlined
                            class="mt-1"
                        ></v-combobox>
                        <v-text-field
                            v-model="editedItem.origen"
                            label="ORIGEN"
                            outlined
                        ></v-text-field>
                        <span>RELACIONADO CON:</span>
                        <v-text-field
                            v-model="editedItem.personalidad"
                            label="PERSONALIDAD"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.acontecimiento"
                            label="ACONTECIMIENTO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.tasacion"
                            label="TASACIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.expediente"
                            label="EXPEDIENTE"
                            outlined
                        ></v-text-field>
                        <v-textarea
                            outlined
                            label="NOTAS"
                            v-model="editedItem.notas"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import requests from '@/helpers/requests';
export default {
    data() {
        return {
            image: undefined,
            error: '',
            show: false,
            estados: ['B', 'R', 'M'],
            grados: ['I', 'II', 'III'],
        };
    },
    props: {
        formTitle: String,
        editedItem: Object,
        isNew: Boolean,
    },
    methods: {
        showErrors(err) {
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
            if (this.editedItem.codigo === '') {
                this.error = 'El codigo es obligatorio.';
                return;
            }
            if (this.editedItem.noInventario === '') {
                this.error = 'El numero de Inventario es obligatorio.';
                return;
            }
            if (this.editedItem.cantidad === '') {
                this.error = 'La cantidad es obligatoria.';
                return;
            }
            if (this.editedItem.manifestacion === '') {
                this.error = 'La manifestación es obligatoria.';
                return;
            }
            if (this.editedItem.denominacion === '') {
                this.error = 'La denominación es obligatoria.';
                return;
            }
            if (this.editedItem.epoca === '') {
                this.error = 'La época es obligatoria.';
                return;
            }
            if (this.editedItem.alto === '') {
                this.error = 'El alto es obligatorio.';
                return;
            }
            if (this.editedItem.ancho === '') {
                this.error = 'El ancho es obligatorio.';
                return;
            }
            if (this.editedItem.profundidad === '') {
                this.error = 'La profundidad es obligatoria.';
                return;
            }
            if (this.editedItem.materiales === '') {
                this.error = 'Los materiales son obligatorios.';
                return;
            }
            if (this.editedItem.ubicacion === '') {
                this.error = 'La ubicacion es obligatoria.';
                return;
            }
            if (this.editedItem.estado === '') {
                this.error = 'El estado es obligatorio.';
                return;
            }
            if (this.editedItem.gradoDeValor === '') {
                this.error = 'El Grado de Valor es obligatorio.';
                return;
            }
            if (this.editedItem.origen === '') {
                this.error = 'El Origen es obligatorio.';
                return;
            }
            if (this.editedItem.expediente === '') {
                this.error = 'El Expediente es obligatorio.';
                return;
            }
            if (this.isNew) {
                requests
                    .createArma(this.editedItem, this.image)
                    .then((data) => {
                        this.$emit('reload');
                        this.$emit('getId', data._id);
                    })
                    .catch(this.showErrors);
            } else {
                requests
                    .updateArma(this.editedItem)
                    .then(() => {
                        this.$emit('reload');
                    })
                    .catch(this.showErrors);
            }
        },
    },
};
</script>

<style></style>
