<template>
    <v-row>
        <v-col cols="12" md="6">
            <div class="screen d-md-flex align-md-center justify-md-center">
                <v-form
                    class="pa-14 w-form"
                    ref="form"
                    @submit.prevent="authenticate"
                >
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
                    <v-text-field
                        v-model="user"
                        :rules="[rules.required]"
                        label="Usuario"
                        required
                        outlined
                        prepend-inner-icon="mdi-account"
                        placeholder="Tu nombre de usuario"
                        @input="error = ''"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="show ? 'text' : 'password'"
                        prepend-inner-icon="mdi-lock"
                        label="Contraseña"
                        required
                        outlined
                        @click:append="show = !show"
                        @input="error = ''"
                    ></v-text-field>

                    <div class="btn-container text-center mt-2">
                        <v-btn
                            class="px-12 py-5 font-weight-bold submit-button white--text"
                            color="blue darken-3"
                            type="submit"
                        >
                            Entrar
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <v-img src="@/assets/images/logo.jpg"></v-img>
        </v-col>
    </v-row>
</template>

<script>
import requests from '../helpers/requests';
export default {
    data() {
        return {
            error: '',
            show: false,
            user: '',
            password: '',
            rules: {
                required: (value) => !!value || 'Requerido.',
            },
        };
    },
    methods: {
        authenticate() {
            if (!this.user) {
                this.error = 'El nombre de usuario es obligatorio.';
            } else if (!this.password) {
                this.error = 'La contraseña es obligatoria.';
            } else {
                requests
                    .auth(this.user, this.password)
                    .then((user) => {
                        localStorage.setItem('name', user.name);
                        localStorage.setItem('token', user.token);
                        this.$store.commit('login', {
                            name: user.name,
                            token: user.token,
                        });
                        this.$router.push('/admin');
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                            this.error = err.response.data.errors[0].msg;
                        } else if (err.response.status === 401) {
                            this.error = err.response.data.error.msg;
                        } else {
                            this.error =
                                'No se pudo establecer la conexión con el servidor.';
                        }
                    });
            }
        },
    },
};
</script>

<style scoped>
.w-form {
    width: 90vw;
}

@media (min-width: 992px) {
    .w-form {
        width: 400px;
    }
    .screen {
        height: 100vh;
    }
}
</style>
