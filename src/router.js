import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../src/components/Dashboard.vue'
import Customer from '../src/components/Customer.vue'
import Pegawai from '../src/components/Pegawai.vue'
import Suplier from '../src/components/Suplier.vue'
import Produk from '../src/components/Produk.vue'
import Layanan from '../src/components/Layanan.vue'
import Hewan from '../src/components/Hewan.vue'
import loginPage from '../src/components/loginPage.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/customer',
            name: 'customer',
            component: Customer
        },
        {
            path: '/pegawai',
            name: 'pegawai',
            component: Pegawai
        },
        {
            path: '/suplier',
            name: 'suplier',
            component: Suplier
        },
        {
            path: '/produk',
            name: 'produk',
            component: Produk
        },
        {
            path: '/layanan',
            name: 'layanan',
            component: Layanan
        },
        {
            path: '/hewan',
            name: 'hewan',
            component: Hewan
        },
        {
            path: '/loginpage',
            name: 'loginpage',
            component: loginPage
        },


    ]
})