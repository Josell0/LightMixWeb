import { collection, doc, addDoc, getDoc, getDocs, query, updateDoc, where, arrayUnion, runTransaction } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db, storage } from '../firebaseConfig'
import { useUserStore } from '../stores/user'
import domtoimage from 'dom-to-image';

import 'firebase/firestore'

export const useDataProjectStore = defineStore('dataProject', {
    state: () => ({
        documents:  {
            mainLayers: [],
            secondaryLayers: [],
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



            for (let i = 0; i < this.documents.mainLayers.length; i++) {


                this.documents.mainLayers[i].valorOpacity = 0
            }


            this.documents.mainLayers[index].valorOpacity = 100

        },

        changeStateOfIconSecondary(index, opacityValor) {




            if (this.documents.secondaryLayers[index].disable) {



                this.documents.secondaryLayers[index].disable = false
                this.documents.secondaryLayers[index].valorOpacity = this.documents.secondaryLayers[index].valorOpacityInterno


            } else {




                this.documents.secondaryLayers[index].disable = true
                this.documents.secondaryLayers[index].valorOpacityInterno = parseInt(opacityValor)
                this.documents.secondaryLayers[index].valorOpacity = 0
            }
        },

        createProfile() {

            if (this.profileButtons.valoresSecondaryOpacity.length <= 4) {


                let valoresSecondaryOpacityArray = [];

                let valorSecondaryOpacity = null;


                valoresSecondaryOpacityArray.push(false)



                for (let i = 0; i < this.documents.secondaryLayers.length; i++) {

                    valorSecondaryOpacity = parseInt(this.documents.secondaryLayers[i].valorOpacity)


                    valoresSecondaryOpacityArray.push(valorSecondaryOpacity)



                }

                this.profileButtons.valoresSecondaryOpacity.push(valoresSecondaryOpacityArray)



                let valoresMainOpacityArray = [];

                let valorMainOpacity = null;


                valoresMainOpacityArray.push(false)



                for (let i = 0; i < this.documents.mainLayers.length; i++) {

                    valorMainOpacity = parseInt(this.documents.mainLayers[i].valorOpacity)


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

            for (let i = 0; i < this.documents.secondaryLayers.length; i++) {

                this.documents.secondaryLayers[i].valorOpacity = this.profileButtons.valoresSecondaryOpacity[index][i + 1];
                

            }

            for (let i = 0; i < this.documents.mainLayers.length; i++) {

                this.documents.mainLayers[i].valorOpacity = this.profileButtons.valoresMainOpacity[index][i + 1];
                

            }



        },

        async getProjectLayers(nameDoc) {
            try {
                const docRef = doc(db, "projects", nameDoc);
                const docSnap = await getDoc(docRef);

                

               

                if (!docSnap.exists()) {
                    console.log('no hay documentos')
                    return
                }


                let data = []
                data.push({
                    ...docSnap.data()
                })

                
                
                let dataMainLayers = data[0].main
                let dataSecondaryLayers = data[0].secondary


                
                
                
                for (let i = 0; i < dataMainLayers.length; i++) {
                    
                    this.documents.mainLayers.push({
                    
                    name: dataMainLayers[i].name,
                    valorOpacity: dataMainLayers[i].valorOpacity,
                    disable: dataMainLayers[i].disable,
                    valorOpacityInterno: dataMainLayers[i].valorOpacityInterno,
                    fondo: dataMainLayers[i].fondo
                      
                    })     
                }
                
                for (let i = 0; i < dataSecondaryLayers.length; i++) {
                    
                    this.documents.secondaryLayers.push({
                    
                    name: dataSecondaryLayers[i].name,
                    valorOpacity: dataSecondaryLayers[i].valorOpacity,
                    disable: dataSecondaryLayers[i].disable,
                    valorOpacityInterno: dataSecondaryLayers[i].valorOpacityInterno,
                    fondo: dataSecondaryLayers[i].fondo
                      
                    })     
                }
                
                /* console.log(this.documents) */
 

            } catch (error) {   
                console.log(error)
            } finally {

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
    }
})