<template>
  <v-data-table
    :search="search"
    sort-by="nama"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Data Suplier</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Tambah Suplier</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container id="dropdown_example">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nama" label="Nama Suplier"></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.alamat" label="Alamat"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nomortelpon" label="Nomor Telpon"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="resetForm()">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon @click="editItem(item)" class="mr-1">mdi-silverware </v-icon>
      <v-icon @click="deleteItem(item)" class="mr-1">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      cek : -1,
      dialog: false,
      search:'',
      suppliers:[],
      supplier: new FormData,
      editedIndex: -1,
      editedItem: {
        nama: '',
        alamat: '',
        nomortelpon: '',
      },
      defaultItem: {
        nama: '',
        alamat: '',
        nomortelpon: '',
      },
    }),
    computed: {
      formTitle () {
        return this.cek === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    mounted() {
      this.getData();
    },
    methods: {
    getData() {
        var uri = this.$apiUrl + '/supplier'
        this.$http.get(uri).then(response => {
          this.suppliers  = response.data;
          console.log(response.data)
        })
      },
       sendData() {
        this.supplier.append('nama_supplier', this.editedItem.nama);
        this.supplier.append('alamat_supplier', this.editedItem.alamat);
        this.supplier.append('telp_supplier', this.editedItem.nomortelpon);
        var uri = this.$apiUrl + '/supplier/create';
        this.load = true
        this.$http.post(uri, this.supplier, {
          'Content-Type': 'multipart/form-data'
        }).then(response => {
          this.snackbar = true; //mengaktifkan snackbar               
          this.color = 'green'; //memberi warna snackbar               
          this.text = response.data.message; //memasukkan pesan ke snackbar               
          this.load = false;
          this.dialog = false
          this.getData(); //mengambil data user               
          this.resetForm();
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        })
      },
       updateData() {
       this.supplier.append('nama_supplier', this.editedItem.nama);
        this.supplier.append('alamat_supplier', this.editedItem.alamat);
        this.supplier.append('telp_supplier', this.editedItem.nomortelpon);
        var uri = this.$apiUrl + '/supplier/updated'
        this.load = true
        this.$http.post(uri, this.supplier, {
          'Content-Type': 'multipart/form-data'
        }).then(response => {
          this.snackbar = true; //mengaktifkan snackbar               
          this.color = 'green'; //memberi warna snackbar               
          this.text = response.data.message; //memasukkan pesan ke snackbar               
          this.load = false;
          this.dialog = false
          this.getData(); //mengambil data user               
          this.resetForm();
          this.typeInput = 'new';
          this.pass = false;
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
          this.typeInput = 'new';
          this.pass = false;
        })
      },
       editHandler(item) {
        this.typeInput = 'edit';
        this.dialog = true;
        this.editedItem.nama = editedItem.nama;
        this.editedItem.alamat = editedItem.alamat;
        this.editedItem.nomortelpon = editedItem.nomortelpon;
        this.supplier.append('id', item.id);
       },
     deleteData(deleteId) {
        confirm('Are you sure you want to delete this Comic?') && 
        this.supplier.append('id', deleteId);
        var uri = this.$apiUrl + 'supplier/delete';
        this.$http.post(uri, this.supplier).then(response => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = 'green'
          this.deleteDialog = false;
          this.dialog2 = false;
          this.getData();
        }).catch(error => {
          this.errors = error
          this.snackbar = true;
          this.text = 'Failed Delete';
          this.color = 'red';
        })
      },
   setForm() {
       this.sendData(); 
      },
      resetForm() {
        this.form = {
          nama: "",
          alamat: "",
          nomortelpon: ""
        }
        this.dialog = false
        this.dialog2 = false
      }
    },
  }
</script>




