<template>
  <article>
    <div class="container">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-right">
          </div>
        </div>
      </div>
      
      <form class="sign-in">
        <span class="headline">LOGIN Kouvee Petshop</span>
          <v-text-field type="username" placeholder="Username Account" v-model="form.username" required></v-text-field>
          <v-text-field type="password" placeholder="Password Account" v-model="form.password" required></v-text-field>
        <v-btn color="orange accent-2" @click="signIn()">Log In</v-btn>
      </form>
    </div>

    <v-snackbar 
      v-model="snackbar"
      :color="color" 
      :multi-line="true" 
      :timeout="6000" 
      :top="y === 'top'"> {{ text }} 
      <v-btn dark text @click="snackbar = false"> Close </v-btn> 
    </v-snackbar> 
  </article>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      role: [],
      pegawais: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      pegawai: new FormData,
      typeInput: 'new',
      errorType: false,
      errors: '',
      updatedId: '',
      x: null,
      y: 'top'
    }
  },

  methods: {
    getData() {
      axios.get("")
      .then(
        response => {this.pegawais = response.data.result},
      )
      .catch(e => {
        this.errors.push(e)
      });
    },

    signIn() {
        var uri = "http://127.0.0.1/api/" 
        this.pegawai = new FormData();
        this.pegawai.append('username',this.form.username);
        this.pegawai.append('password',this.form.password);
        this.$http.post(uri,this.pegawai).then(response =>{
          this.errorType = response.data.error;
          console.log(this.errorType);
          if (this.errorType == true) {
            this.snackbar = true;
            this.text = "Username/Password Salah";
            this.color = 'red';
            this.load = false;
          }
          else 
          {
            this.$session.set('dataPegawai', response.data);
            console.log(response.data);

            if(this.$session.get('dataPegawai').role == "CS")
            {
                this.$router.push({
                path: "/dashboard"
                });
            }
            else if(this.$session.get('dataPegawai').role == "Owner")
            {
                this.$router.push({
                path: "/pegawai"
                });
            }
          }
        }).catch(error =>{ 
            this.errors = error;
            this.snackbar = true;
            this.text = "Username/Password Salah";
            this.color = 'red';
            this.load = false;
      });
    },
  },

  resetForm(){
    this.form = {
    username : '',     
    password : '',        
    }
  },

  mounted() {
    this.getData();
  },
}
</script>

