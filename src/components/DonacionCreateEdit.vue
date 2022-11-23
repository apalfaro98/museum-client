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
                            v-model="editedItem.municipio"
                            label="MUNICIPIO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.museo"
                            label="MUSEO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.donante"
                            label="DONANTE"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="editedItem.direccion"
                            label="DIRECCIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.recibe"
                            label="PERSONA DEL MUSEO QUE RECIBE"
                            outlined
                        ></v-text-field>
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
            if (this.editedItem.municipio === '') {
                this.error = 'El municipio es obligatorio.';
                return;
            }
            if (this.editedItem.donante === '') {
                this.error = 'El nombre de la persona que dona es obligatorio.';
                return;
            }
            if (this.editedItem.direccion === '') {
                this.error =
                    'La dirección de la persona que dona es obligatoria.';
                return;
            }
            if (this.editedItem.recibe === '') {
                this.error = 'La persona recibe en el museo es obligatoria.';
                return;
            }

            requests
                .createDonacion(this.editedItem)
                .then(() => {
                    this.$emit('reload');
                })
                .catch(this.showErrors);
        },
    },
    created() {
        console.log(this.editedItem.elementId);
    },
};
</script>

<style></style>
