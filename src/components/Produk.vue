<template>
    <v-container>   
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Produk</h2> 
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
                            Tambah Produk
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
                    :items="produks"
                    :search="keyword"
                    :loading="load"
                >

                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk"> 
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.id_produk }}</td>
                            <td>{{ item.nama_produk}}</td>
                            <td>{{ item.harga_produk }}</td>
                            <td><img :src="'' + item.gambar" width="100px"></td>
                           
                            <td>{{ item.stok_produk }}</td>
                            <td>{{ item.stok_minimal}}</td>

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
                                @click="deleteData(item.id_produk)"
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
            <span class="headline">Edit Data Produk</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nama Produk*" v-model="form.nama" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Harga Produk*" v-model="form.harga" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Stok Produk*" v-model="form.stok" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Stok Minimal*" v-model="form.minimal" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                            <v-file-input append-icon="mdi-camera-party-mode" name="gambar"
                                    label="Image" v-model="form.gambar"
                                    accept="gambar/png, gambar/jpeg, gambar/bmp, gambar/jpg" height="34" >
                            </v-file-input>
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
                    text: 'ID Produk',
                    value: 'id_produk'
                    },
                    {
                    text: 'Nama Produk',
                    value: 'nama_produk'
                    },
                    {
                    text: 'Harga Produk',
                    value: 'harga_produk'
                    },
                    {
                    text: 'Image',
                    value: 'gambar'
                    },
                    {
                    text: 'Stok',
                    value: 'stok_produk'
                    },
                    {
                    text: 'Minimal',
                    value: 'Stok_minimal'
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
            produks: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama : '',
                harga : 0,
                gambar: '',
                stok : 0,
                minimal : 0,
            },
            produk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:
    {
            getData() {
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then(response => {
            this.produks  = response.data.result;
            console.log(response.data)
            })
        },
        
            sendData(){
            this.produk.append('nama_produk',this.form.nama);
            this.produk.append('harga_produk',this.form.harga);
            this.produk.append('gambar',this.form.gambar);
            this.produk.append('stok_produk',this.form.stok);
            this.produk.append('stok_minimal',this.form.minimal);

            var uri = this.$apiUrl + '/produk/create'
            this.$http.post(uri,this.produk).then(response =>{
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
                this.produk.append('nama_produk',this.form.nama);
                this.produk.append('harga_produk',this.form.harga);
                this.produk.append('gambar',this.form.gambar);
                this.produk.append('stok_produk',this.form.stok);
                this.produk.append('stok_minimal',this.form.minimal);
                var uri = this.$apiUrl + '/produk/update/' + this.updatedId;
                this.load = true
                this.$http.post(uri,this.produk).then(response =>{
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
                this.form.nama = item.nama_produk;
                this.form.harga = item.harga_produk;
                this.form.gambar = item.gambar;
                this.form.stok = item.stok_produk;
                this.form.minimum = item.stok_minimum;
                this.updatedId = item.id_produk;
                this.dialog = true;
        },

            deleteData(deleteId){
                var uri=this.$apiUrl + '/produk/delete/'+deleteId;
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
                    harga : 0,
                    gambar: '',
                    stok : 0,
                    minimal : 0,            
                }
            }
        },
    
        mounted(){
            this.getData();
        },
        
    }
</script>