<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Pegawai</h2> 
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "orange accent-2"
                        @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> 
                            Tambah Pegawai
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field
                            v-model="keyword" 
                            append-icon="mdi-search" 
                            label="Search" 
                            hide-details
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="headers"
                    :items="pegawais"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_pegawai"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.id_pegawai }}</td>
                            <td>{{ item.no_pegawai}}</td>
                            <td>{{ item.nama_pegawai}}</td>
                            <td>{{ item.role_pegawai}}</td>
                            <td>{{ item.alamat_pegawai }}</td>
                            <td>{{ item.birthday_pegawai}}</td>
                            <td>{{ item.telp_pegawai }}</td>
                            <td>{{ item.username_pegawai }}</td>

                            <td>{{ item.created_by}}</td>
                            <td>{{ item.updated_by}}</td>
                            <td>{{ item.deleted_by}}</td>

                            <td>{{ item.created_at}}</td>
                            <td>{{ item.updated_at}}</td>
                            <td>{{ item.deleted_at}}</td>
                            <td class="text-center">
                                <v-btn 
                                icon 
                                color="blue" 
                                light
                                @click="editHandler(item)"
                                >
                                <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn 
                                icon 
                                color="error" 
                                light
                                @click="deleteData(item.id_pegawai)"
                                >
                                <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
        </v-container>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="600px"> <v-card>
        <v-card-title>
            <span class="headline">Edit Data pegawai</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama pegawai*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                    <v-overflow-btn v-model="editedItem.role" :items="contoh" label="Role" target="#dropdown-example"></v-overflow-btn>
                    </v-col> -->
                    <v-col cols="12">
                        <v-text-field label="Role*" v-model="form.role" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Alamat pegawai*" v-model="form.alamat" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Tanggal Lahir*" v-model="form.birthday" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Nomor Telepon*" v-model="form.telpon" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Username*" v-model="form.username" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Password*" v-model="form.password" required></v-text-field>
                    </v-col>

                    
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn> 
        </v-card-actions>
        </v-card>
        </v-dialog>

<v-snackbar
    v-model="snackbar"
    :color="color"
    :multi-line="true"
    :timeout="3000"
>

    {{ text }} 
    <v-btn
        dark text @click="snackbar = false">Close 
    </v-btn>
</v-snackbar>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            dialog: false,
            keyword: '',
            headers: [
                    {
                    text: 'No',
                    value: 'no',
                    },
                    {
                    text: 'ID pegawai',
                    value: 'id_pegawai'
                    },
                    {
                    text: 'No pegawai',
                    value: 'no_pegawai'
                    },
                    {
                    text: 'Nama pegawai',
                    value: 'nama_pegawai'
                    },
                    {
                    text: 'Role pegawai',
                    value: 'role_pegawai'
                    },
                    {
                    text: 'Alamat pegawai',
                    value: 'alamat_pegawai'
                    },
                    {
                    text: 'Tanggal Lahir',
                    value: 'birthday_pegawai'
                    },
                    {
                    text: 'Nomor Telpon',
                    value: 'telp_pegawai'
                    },
                    {
                    text: 'Username',
                    value: 'username_pegawai'
                    },

                    {
                    text: 'Created By',
                    value: 'created_by',
                    },
                    {
                    text: 'Updated By',
                    value: 'updated_by',
                    },
                    {
                    text: 'Deleted By',
                    value: 'deleted_by'
                    },

                    {
                    text: 'Created At',
                    value: 'created_at',
                    },
                    {
                    text: 'Updated At',
                    value: 'updated_at',
                    },
                    {
                    text: 'Deleted At',
                    value: 'deleted_at'
                    },   
            ],
            pegawais: [],
            contoh:['CS','Kasir'],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                no: 0,
                nama : '',
                alamat : '',
                birthday : 0,
                telpon : 0,
                username:'',
            },
            pegawai : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData() {
        var uri = this.$apiUrl + '/pegawai'
        this.$http.get(uri).then(response => {
          this.pegawais  = response.data.result;
          console.log(response.data)
        })
      },

        sendData(){
          //this.pegawai.append('no_pegawai',this.form.no);
          this.pegawai.append('nama_pegawai',this.form.nama);
          this.pegawai.append('role_pegawai',this.form.role);
          this.pegawai.append('alamat_pegawai',this.form.alamat);
          this.pegawai.append('birthday_pegawai',this.form.birthday);
          this.pegawai.append('telp_pegawai',this.form.telpon);
          this.pegawai.append('username_pegawai',this.form.username);
          this.pegawai.append('password_pegawai',this.form.password);


          var uri = this.$apiUrl + '/pegawai/create'
          this.$http.post(uri,this.pegawai).then(response =>{
            this.snackbar = true; 
            this.text = 'Berhasil'; 
            this.color = 'green';
        }).catch(error =>{ 
            this.errors = error; 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red';
        })
        },

        updateData(){
            // this.pegawai.append('no_pegawai',this.form.no);
            this.pegawai.append('nama_pegawai',this.form.nama);
            this.pegawai.append('role_pegawai',this.form.role);
            this.pegawai.append('alamat_pegawai',this.form.alamat);
            this.pegawai.append('birthday_pegawai',this.form.birthday);
            this.pegawai.append('telp_pegawai',this.form.telpon);
            this.pegawai.append('username_pegawai',this.form.username);
            var uri = this.$apiUrl + '/pegawai/update/' + this.updatedId;
            this.load = true
            this.$http.post(uri,this.pegawai).then(response =>{
                this.snackbar = true; //mengaktifkan snackbar this.color = 'green'; //memberi warna snackbar
                this.text = 'Berhasil'; 
                this.load = false;
                this.dialog = false;
                this.getData(); 
                this.resetForm();
                this.typeInput = 'new';
            }).catch(error =>{
            this.errors = error
            this.snackbar = true;
            this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
        })
    },

        editHandler(item){
            this.typeInput = 'edit';
            this.form.no = item.no_pegawai;
            this.form.nama = item.nama_pegawai;
            this.form.alamat = item.alamat_pegawai;
            this.form.birthday = item.birthday_pegawai;
            this.form.telpon = item.telp_pegawai;
            this.form.username = item.username_pegawai;
            this.updatedId = item.id_pegawai;
            this.dialog = true;
    },

        deleteData(deleteId){
            var uri=this.$apiUrl + '/pegawai/delete/'+deleteId;
            this.$http.post(uri).then(response =>{
                this.snackbar=true;
                this.text="Berhasil";
                this.color='green'
                this.deleteDialog=false;
                this.getData();
                }).catch(error=>{
                    this.errors=error 
                    this.snackbar=true;
                    this.text='Try Again';
                    this.color='red';
                })
        },
    
        setForm(){
            if (this.typeInput === 'new') {
                this.sendData()
            } else { console.log("dddd")
                this.updateData()
            }
    },

        resetForm(){
            this.form = {
                no: 0,
                nama : '',
                alamat : '',
                birthday : 0,
                telpon : 0,
                username:'',            
            }
        }
    },

        mounted(){
            this.getData();
        },
    }
</script>