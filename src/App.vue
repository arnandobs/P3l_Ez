<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span> Kouvee </span>
        <span class="font-weight-light">Pet Shop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text router to="/"> Home </v-btn>
        <v-btn text router to="/customer"> Customer </v-btn>
        <v-btn text router to="/pegawai"> Pegawai </v-btn>
        <v-btn text router to="/suplier"> Suplier </v-btn>
        <v-btn text router to="/produk"> Produk </v-btn>
        <v-btn text router to="/layanan"> Layanan </v-btn>
        <v-btn text router to="/hewan"> Hewan </v-btn>
        <v-btn text router to="/loginPage"> login </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
  
</template>


