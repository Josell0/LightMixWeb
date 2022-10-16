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

                    fondo: 'assets/img/homeLayersLiving/Living-01.noche.jpg'
                },
                {
                    name: "Day",
                    valorOpacity: 100,
                    disable: false,
                    valorOpacityInterno: null,

                    fondo: 'assets/img/homeLayersLiving/Living-01.dia.jpg'
                },
                {
                    name: "Sunset",
                    valorOpacity: 100,
                    disable: false,
                    valorOpacityInterno: null,

                    fondo: 'assets/img/homeLayersLiving/Living-01.atardecer.jpg'
                },



            ],

            secondLayers: [
                {
                    name: "Rooms Lights",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,

                    fondo: 'assets/img/homeLayersLiving/Living-01.LuzSalon04.jpg'
                },
                {
                    name: "Ceiling",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: 'assets/img/homeLayersLiving/Living-01.LuzCieloRaso06.jpg'
                },
                {
                    name: "Lamps Lights",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,

                    fondo: 'assets/img/homeLayersLiving/Living-01.LuzArtefactos07.jpg'
                },

                {
                    name: "Table Lamp",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: 'assets/img/homeLayersLiving/Living-01.LuzLampMesa13.jpg'
                },
                {
                    name: "Boxes",
                    valorOpacity: 0,
                    valorHue: 0,
                    disable: true,
                    valorOpacityInterno: 100,
                    fondo: 'assets/img/homeLayersLiving/Living-01.LuzRepisas02.jpg'
                },
                

            ],

        },

        visibilityIcons: ['assets/icons/openEye.svg', 'assets/icons/closeEye.svg'],

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