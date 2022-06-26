import {defineStore} from 'pinia';

export const useUserStore = defineStore('userStore',{
    state: () => ({
        userData: 'lightMixWEB',
        homeLayers: {
            mainLayers:{
                mainlayer1: '../src/assets/img/homeLayers/2bolas-01.VRayLight003.jpg',
            },
            secondLayers: {
                secondlayer1: '',
                secondlayer2: '',
                secondlayer3: ''
            }
        }
    }),
})