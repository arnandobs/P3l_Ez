<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Customer</h2> 
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
                            Tambah customer
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
                    :items="customers"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_customer"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.id_customer }}</td>
                            <td>{{ item.nama_customer}}</td>
                            <td>{{ item.alamat_customer }}</td>
                            <td>{{ item.birthday_customer}}</td>
                            <td>{{ item.telp_customer }}</td>
                            
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
                                @click="deleteData(item.id_customer)"
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
            <span class="headline">Edit Data customer</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama customer*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Alamat customer*" v-model="form.alamat" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Tanggal Lahir*" v-model="form.birthday" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Nomor Telepon*" v-model="form.telpon" required></v-text-field>
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
                    text: 'ID customer',
                    value: 'id_customer'
                    },
                    {
                    text: 'Nama customer',
                    value: 'nama_customer'
                    },
                    {
                    text: 'Alamat customer',
                    value: 'alamat_customer'
                    },
                    {
                    text: 'Tanggal Lahir',
                    value: 'birthday_customer'
                    },
                    {
                    text: 'Nomor Telpon',
                    value: 'telp_customer'
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
            customers: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                alamat : '',
                birthday : 0,
                telpon : 0,
            },
            customer : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData() {
        var uri = this.$apiUrl + '/customer'
        this.$http.get(uri).then(response => {
          this.customers  = response.data.result;
          console.log(response.data)
        })
      },

        sendData(){
          this.customer.append('nama_customer',this.form.nama);
          this.customer.append('alamat_customer',this.form.alamat);
          this.customer.append('birthday_customer',this.form.birthday);
          this.customer.append('telp_customer',this.form.telpon);

          var uri = this.$apiUrl + '/customer/create'
          this.$http.post(uri,this.customer).then(response =>{
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
            this.customer.append('nama_customer',this.form.nama);
            this.customer.append('alamat_customer',this.form.alamat);
            this.customer.append('birthday_customer',this.form.birthday);
            this.customer.append('telp_customer',this.form.telpon);
            var uri = this.$apiUrl + '/customer/update/' + this.updatedId;
            this.load = true
            this.$http.post(uri,this.customer).then(response =>{
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
            this.form.nama = item.nama_customer;
            this.form.alamat = item.alamat_customer;
            this.form.birthday = item.birthday_customer;
            this.form.telpon = item.telp_customer;
            this.updatedId = item.id_customer;
            this.dialog = true;
    },

        deleteData(deleteId){
            var uri=this.$apiUrl + '/customer/delete/'+deleteId;
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
                nama : '',
                alamat : 0,
                birthday : 0,
                telpon : 0,            
            }
        }
    },

        mounted(){
            this.getData();
        },
    }
</script>