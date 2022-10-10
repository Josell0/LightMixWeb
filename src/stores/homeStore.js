import { defineStore } from 'pinia';
import domtoimage from 'dom-to-image';


export const useHomeStore = defineStore('homeStore', {
    state: () => ({

        homeLayers: {

            mainLayers: [
                {
                    name: "Night",
                    valorOpacity: 100,
                    disable: false,
                    valorOpacityInterno: null,

                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02.luzNoche02-2.jpg'
                },
                {
                    name: "Day",
                    valorOpacity: 100,
                    disable: false,
                    valorOpacityInterno: null,

                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02.luzDia.jpg'
                },



            ],

            secondLayers: [
                {
                    name: "Table Lights",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,

                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02.luzLampMesa.jpg'
                },
                {
                    name: "BarTube",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02.luzTuboBar00.jpg'
                },
                {
                    name: "Under FootBar",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,

                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayLight005.jpg'
                },

                {
                    name: "Circle Ceiling",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayLight008.jpg'
                },
                {
                    name: "Border Ceiling",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayLight036.jpg'
                },
                {
                    name: "TableDesk Lamp",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02.luzAcentos04.jpg'
                },

                {
                    name: "Wall Lamps",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayLight635.jpg'
                },
                {
                    name: "Sofa Lamps",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayLight639.jpg'
                },
                {
                    name: "Sun Light",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02,Sol.jpg'
                },
                {
                    name: "Domo Light",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-02.Domo.jpg'
                },
                {
                    name: "Reflections",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayReflection.jpg'
                },
                {
                    name: "Refraction",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: '../img/homeLayersRestoBar/BarResto-InteriorGeneral-01.VRayRefraction.jpg'
                },

            ],

        },

        visibilityIcons: ['../assets/icons/openEye.svg', '../icons/closeEye.svg'],

        profileButtons: {
            valoresMainOpacity: [],
            valoresSecondaryOpacity: [],

        },

        disableButtonCreateProfile: false,




    }),



    actions: {

        changeStateOfIconMain(index, opacityValor) {



            for (let i = 0; i < this.homeLayers.mainLayers.length; i++) {


                this.homeLayers.mainLayers[i].valorOpacity = 0
            }


            this.homeLayers.mainLayers[index].valorOpacity = 100

        },

        changeStateOfIconSecondary(index, opacityValor) {




            if (this.homeLayers.secondLayers[index].disable) {



                this.homeLayers.secondLayers[index].disable = false
                this.homeLayers.secondLayers[index].valorOpacity = this.homeLayers.secondLayers[index].valorOpacityInterno


            } else {




                this.homeLayers.secondLayers[index].disable = true
                this.homeLayers.secondLayers[index].valorOpacityInterno = parseInt(opacityValor)
                this.homeLayers.secondLayers[index].valorOpacity = 0
            }
        },

        turnAllLightsOff() {

            let valorOpacity = 0;


            for (let i = 0; i < this.homeLayers.secondLayers.length; i++) {


                this.homeLayers.secondLayers[i].valorOpacity = valorOpacity

            }

        },

        createProfile() {

            if (this.profileButtons.valoresSecondaryOpacity.length <= 4) {


                let valoresSecondaryOpacityArray = [];

                let valorSecondaryOpacity = null;


                valoresSecondaryOpacityArray.push(false)



                for (let i = 0; i < this.homeLayers.secondLayers.length; i++) {

                    valorSecondaryOpacity = parseInt(this.homeLayers.secondLayers[i].valorOpacity)


                    valoresSecondaryOpacityArray.push(valorSecondaryOpacity)



                }

                this.profileButtons.valoresSecondaryOpacity.push(valoresSecondaryOpacityArray)



                let valoresMainOpacityArray = [];

                let valorMainOpacity = null;


                valoresMainOpacityArray.push(false)



                for (let i = 0; i < this.homeLayers.mainLayers.length; i++) {

                    valorMainOpacity = parseInt(this.homeLayers.mainLayers[i].valorOpacity)


                    valoresMainOpacityArray.push(valorMainOpacity)



                }

                this.profileButtons.valoresMainOpacity.push(valoresMainOpacityArray)



                this.disableButtonCreateProfile = false

              


            }  
            
            if(this.profileButtons.valoresSecondaryOpacity.length > 4) {

                this.disableButtonCreateProfile = true
            }



        },

        changeProfileValue(index) {

            for (let i = 0; i < this.homeLayers.secondLayers.length; i++) {

                this.homeLayers.secondLayers[i].valorOpacity = this.profileButtons.valoresSecondaryOpacity[index][i + 1];
                

            }

            for (let i = 0; i < this.homeLayers.mainLayers.length; i++) {

                this.homeLayers.mainLayers[i].valorOpacity = this.profileButtons.valoresMainOpacity[index][i + 1];
                

            }



        },

        openAndCloseButtonDelete(index) {
            this.profileButtons.valoresSecondaryOpacity[index][0] = !this.profileButtons.valoresSecondaryOpacity[index][0]
        },


        deleteProfile(index) {


            
            this.profileButtons.valoresSecondaryOpacity.splice(index, 1)

            if (this.profileButtons.valoresSecondaryOpacity.length < 5) {
                this.disableButtonCreateProfile = false
            }

            if(this.profileButtons.valoresMainOpacity.length > 1){

                this.profileButtons.valoresMainOpacity.splice(index, 1)

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