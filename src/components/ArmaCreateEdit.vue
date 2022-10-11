<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            v-model="editedItem.propietario"
                            label="Nombre del propietario"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        formTitle: String,
        editedItem: Object,
    },
};
</script>

<style></style>
