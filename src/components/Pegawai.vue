<template>
  <v-data-table
    :headers="headers"
    :items="pegawai"
    :search="search"
    sort-by="nama"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Data Pegawai</v-toolbar-title>
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
            <v-btn color="primary" dark class="mb-2" v-on="on">Tambah Pegawai</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container id="dropdown_example">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nama" label="Nama Pegawai"></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.alamat" label="Tanggal Lahir"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nomortelpon" label="Nomor Telpon"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-overflow-btn v-model="editedItem.role" :items="items" label="Role" target="#dropdown-example"></v-overflow-btn>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Alamat"></v-text-field>
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
      <v-icon @click="editItem(item)" class="mr-1">mdi-pencil </v-icon>
      <v-icon @click="deleteItem(item)" class="mr-1">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>

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
        { text: 'Nama Pegawai', value: 'Nama Pegawai' },
        { text: 'Role', value: 'Role' },
        { text: 'Alamat', value: 'Alamat' },
        { text: 'Nomor Telpon', value: 'Nomor Telpon' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      drinks: [],
      editedIndex: -1,
      editedItem: {
        nama: '',
        role: '',
        alamat: '',
        nomortelpon: '',
        protein: '',
      },
      defaultItem: {
        nama: '',
        role: '',
        alamat: '',
        nomortelpon: '',
        protein: '',
      },
    }),
    firebase:{
      
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
            role: this.editedItem.role,
            alamat: this.editedItem.alamat,
            nomortelpon: this.editedItem.nomortelpon,
            protein: this.editedItem.protein})
        this.clear()
        } else {
          drinksRef.push(this.editedIndex).set({
            nama: this.editedItem.nama,
            role: this.editedItem.role,
            alamat: this.editedItem.alamat,
            nomortelpon: this.editedItem.nomortelpon,
            protein: this.editedItem.protein})
        this.clear()
        }
        this.close()
      },
      clear(){
        this.editedItem={}
        this.editedItem.nama=''
        this.editedItem.role=''
        this.editedItem.alamat=''
        this.editedItem.nomortelpon=''
        this.editedItem.protein=''
        this.cek=-1
      },
    },
  }
</script>




