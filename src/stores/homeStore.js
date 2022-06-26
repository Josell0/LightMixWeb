import { defineStore } from 'pinia';
import domtoimage from 'dom-to-image';


export const useHomeStore = defineStore('homeStore', {
    state: () => ({

        homeLayers: {

            proyect:[
                {
                    proyectName: "",
                    proyectView: null,
                    proyectLayers: [
                        {
                            nameViewLayers: "",
                            mainLayers: [
                                {
                                    name: "",
                                    disable: false,
                                    fondo: ''
                                },

                            ],
                            secondLayers: [
                                {
                                    name: "Luz Principal",
                                    valorOpacity: 50,
                                    valorHue: 0,
                                    disable: false,
                                    valorOpacityInterno: null,
                                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight001.jpg'
                                },
                                {
                                    name: "Luz Secundaria",
                                    valorOpacity: 50,
                                    valorHue: 0,
                                    disable: false,
                                    valorOpacityInterno: null,
                                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight002.jpg'
                                },
                                {
                                    name: "Luz de Relleno",
                                    valorOpacity: 50,
                                    valorHue: 0,
                                    disable: false,
                                    valorOpacityInterno: null,
                                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight004.jpg'
                                }
                            ]
                        },
                        {
                            nameViewLayers: "",
                            mainLayers: [
                                {
                                    name: "",
                                    disable: false,
                                    fondo: ''
                                },

                            ],
                            secondLayers: [
                                {
                                    name: "Luz Principal",
                                    valorOpacity: 50,
                                    valorHue: 0,
                                    disable: false,
                                    valorOpacityInterno: null,
                                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight001.jpg'
                                },
                                {
                                    name: "Luz Secundaria",
                                    valorOpacity: 50,
                                    valorHue: 0,
                                    disable: false,
                                    valorOpacityInterno: null,
                                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight002.jpg'
                                },
                                {
                                    name: "Luz de Relleno",
                                    valorOpacity: 50,
                                    valorHue: 0,
                                    disable: false,
                                    valorOpacityInterno: null,
                                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight004.jpg'
                                }
                            ]
                        },
                    ]
                }
            ],



            

            mainLayers: [
                '../src/assets/img/homeLayers/2bolas-01.VRayLight003.jpg',
            ],
            secondLayers: [
                {
                    name: "Luz Principal",
                    valorOpacity: 50,
                    valorHue: 0,
                    disable: false,
                    valorOpacityInterno: null,
                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight001.jpg'
                },
                {
                    name: "Luz Secundaria",
                    valorOpacity: 50,
                    valorHue: 0,
                    disable: false,
                    valorOpacityInterno: null,
                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight002.jpg'
                },
                {
                    name: "Luz de Relleno",
                    valorOpacity: 50,
                    valorHue: 0,
                    disable: false,
                    valorOpacityInterno: null,
                    fondo: '../src/assets/img/homeLayers/2bolas-01.VRayLight004.jpg'
                }
            ],

        },

        visibilityIcons: ['../src/assets/icons/openEye.svg', '../src/assets/icons/closeEye.svg'],

        profileButtons: {
            valoresOpacity: [],
            valoresHue: []
        },

        disableButtonCreateProfile: false,




    }),

    actions: {

        changeStateOfIcon(index, opacityValor) {



            if (!this.homeLayers.secondLayers[index].disable) {
                this.homeLayers.secondLayers[index].disable = true
                this.homeLayers.secondLayers[index].valorOpacity = 0
                this.homeLayers.secondLayers[index].valorOpacityInterno = parseInt(opacityValor)
            } else {
                this.homeLayers.secondLayers[index].disable = false
                this.homeLayers.secondLayers[index].valorOpacity = this.homeLayers.secondLayers[index].valorOpacityInterno
            }
        },

        createProfile() {

            if (this.profileButtons.valoresOpacity.length < 5) {


                let valoresOpacityArray = [];
                let valoresHueArray = [];
                let valorOpacity = null;
                let valorHue = null;

                valoresOpacityArray.push(false)

                valoresHueArray.push(false)

                for (let i = 0; i < this.homeLayers.secondLayers.length; i++) {

                    valorOpacity = parseInt(this.homeLayers.secondLayers[i].valorOpacity)
                    valorHue = parseInt(this.homeLayers.secondLayers[i].valorHue)

                    valoresOpacityArray.push(valorOpacity)
                    valoresHueArray.push(valorHue)


                }

                



                this.profileButtons.valoresOpacity.push(valoresOpacityArray)
                this.profileButtons.valoresHue.push(valoresHueArray)

                

                this.disableButtonCreateProfile = false


            } else {
                this.disableButtonCreateProfile = true
            }

        },

        changeProfileValue(index) {

            for (let i = 0; i < this.homeLayers.secondLayers.length; i++) {

                this.homeLayers.secondLayers[i].valorOpacity = this.profileButtons.valoresOpacity[index][i+1];
                this.homeLayers.secondLayers[i].valorHue = this.profileButtons.valoresHue[index][i+1];

            }


        },

        openAndCloseButtonDelete(index) {
            this.profileButtons.valoresOpacity[index][0] = !this.profileButtons.valoresOpacity[index][0]
        },


        deleteProfile(index) {
            this.profileButtons.valoresOpacity.splice(index, 1)
            this.profileButtons.valoresHue.splice(index, 1)

            if (this.profileButtons.valoresOpacity.length < 5) {
                this.disableButtonCreateProfile = false
            }
        },

        imageDownload() {

            domtoimage.toJpeg(document.querySelector('#imageDownload'), { quality: 1 })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = 'lighMixWeb.png';
                    link.href = dataUrl;
                    link.click();
                });

        }

    },
})