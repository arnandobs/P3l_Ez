<template>
  <v-data-table
    :headers="headers"
    :items="produk"
    :search="search"
    sort-by="nama"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Data Layanan</v-toolbar-title>
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
            <v-btn color="primary" dark class="mb-2" v-on="on">Tambah Layanan</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container id="dropdown_example">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nama" label="Nama Produk"></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Jumlah" label="Harga"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.diskon" label="Jumlah"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.minimum" label="Diskon"></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
  import { drinksRef } from'../firebase';
  export default {
    data: () => ({
      items: ['Kasir', 'CS'],
      cek : -1,
      dialog: false,
      search:'',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'ID',
        },
        { text: 'Nama Produk', value: 'Nama Produk' },
        { text: 'Harga', value: 'Harga' },
        { text: 'Jumlah', value: 'Jumlah' },
        { text: 'Diskon', value: 'Diskon' },

        { text: 'Actions', value: 'action', sortable: false },
      ],
      drinks: [],
      editedIndex: -1,
      editedItem: {
        nama: '',
        Harga: '',
        Jumlah: '',
        diskon: 0,

      },
      defaultItem: {
        nama: '',
        Harga: '',
        Jumlah: '',
        diskon: 0,

      },
    }),
    firebase:{
      //drinks : drinksRef
    },
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
    methods: {
      editItem (item) {
        this.editedIndex = item['.key']
        this.cek = 0
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') && drinksRef.child((item['.key'])).remove()
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.cek > -1) {
          drinksRef.child(this.editedIndex).set({
            nama: this.editedItem.nama,
            Harga: this.editedItem.Harga,
            Jumlah: this.editedItem.Jumlah,
            diskon: this.editedItem.diskon,
            })
        this.clear()
        } else {
          drinksRef.push(this.editedIndex).set({
            nama: this.editedItem.nama,
            Harga: this.editedItem.Harga,
            Jumlah: this.editedItem.Jumlah,
            diskon: this.editedItem.diskon,
            })
        this.clear()
        }
        this.close()
      },
      clear(){
        this.editedItem={}
        this.editedItem.nama=''
        this.editedItem.Harga=''
        this.editedItem.Jumlah=''
        this.editedItem.diskon=''

        this.cek=-1
      },
    },
  }
</script>




