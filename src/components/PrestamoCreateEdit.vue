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
                            v-model="editedItem.museo"
                            label="MUSEO"
                            outlined
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.persona"
                            label="BENEFICIARIO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.organismo"
                            label="ORGANISMO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.cantidad"
                            label="CANTIDAD"
                            outlined
                            type="number"
                            :disabled="!editedItem.prestado"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="editedItem.entregadoPor"
                            label="PERSONA DEL MUSEO QUE ENTREGA O RECIBE"
                            outlined
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="FECHA DE DEVOLUCIÓN"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                                :min="date"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(date)"
                                >
                                    Aceptar
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-textarea
                            outlined
                            label="OBSERVACIONES"
                            v-model="editedItem.observaciones"
                        ></v-textarea>
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
            show: false,
            menu: false,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
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
            if (this.editedItem.persona === '') {
                this.error =
                    'El nombre de la persona que recibe o realiza el préstamo es obligatorio.';
                return;
            }
            if (this.editedItem.organismo === '') {
                this.error = 'El organismo es obligatorio.';
                return;
            }
            if (this.editedItem.cantidad < 1) {
                this.error = 'La cantidad es obligatoria.';
                return;
            }
            if (this.editedItem.fechaDevolucion === '') {
                this.error = 'La fecha de devolución es obligatoria.';
                return;
            }
            if (this.editedItem.entregadoPor === '') {
                this.error =
                    'La persona que entrega o recibe en el museo es obligatoria.';
                return;
            }
            this.editedItem.fechaDevolucion = this.date;
            if (this.isNew) {
                requests
                    .createPrestamo(this.editedItem)
                    .then(() => {
                        this.$emit('reload');
                    })
                    .catch(this.showErrors);
            } else {
                requests
                    .updatePrestamo(this.editedItem)
                    .then(() => {
                        this.$emit('reload');
                    })
                    .catch(this.showErrors);
            }
        },
    },
    created() {
        console.log(this.editedItem.elementId);
    },
};
</script>

<style></style>
