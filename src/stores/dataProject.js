import { collection, doc, addDoc, getDoc, getDocs, query, updateDoc, arrayUnion, runTransaction } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db, storage } from '../firebaseConfig'
import { useUserStore } from '../stores/user'
import domtoimage from 'dom-to-image';

import 'firebase/firestore'

export const useDataProjectStore = defineStore('dataProject', {
    state: () => ({
        documents: {
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

        async createProfile(pid) {

            try {

                /* esto verifica que existan menos de 5 botenes de Perfiles, asi no deja agregar mas de lo establecido */
                if (this.profileButtons.valoresSecondaryOpacity.length <= 4) {

                    /* almacena un array para luego hacerle un push a la variable valorSecondaryOpacity */
                    let valoresSecondaryOpacityArray = [];

                    /* array para agregar cada valor a valoresSecondaryOpacityArray */
                    let valorSecondaryOpacity = null;


                    valoresSecondaryOpacityArray.push(false)



                    /* almacena los valores de cada valorSecondaryOpacity y los mete a un array */
                    for (let i = 0; i < this.documents.secondaryLayers.length; i++) {

                        valorSecondaryOpacity = parseInt(this.documents.secondaryLayers[i].valorOpacity)


                        valoresSecondaryOpacityArray.push(valorSecondaryOpacity)



                    }

                    let valoresMainOpacityArray = [];

                    let valorMainOpacity = null;


                    valoresMainOpacityArray.push(false)



                    for (let i = 0; i < this.documents.mainLayers.length; i++) {

                        valorMainOpacity = parseInt(this.documents.mainLayers[i].valorOpacity)


                        valoresMainOpacityArray.push(valorMainOpacity)



                    }




                    //Agregar los valores secundarios al array correspondiente

                    let existsSecondary = false;

                    for (let i = 0; i < this.profileButtons.valoresSecondaryOpacity.length; i++) {
                        if (JSON.stringify(this.profileButtons.valoresSecondaryOpacity[i]) === JSON.stringify(valoresSecondaryOpacityArray)) {
                            existsSecondary = true;

                            break;
                        }
                    }

                    //Agregar los valores primarios al array correspondiente

                    let existsMain = false;

                    for (let i = 0; i < this.profileButtons.valoresMainOpacity.length; i++) {
                        if (JSON.stringify(this.profileButtons.valoresMainOpacity[i]) === JSON.stringify(valoresMainOpacityArray)) {
                            existsMain = true;

                            break;
                        }
                    }

                    //Agrega los valores al profileButtons

                    if (!existsMain || !existsSecondary) {
                        this.profileButtons.valoresMainOpacity.push(valoresMainOpacityArray);
                        this.profileButtons.valoresSecondaryOpacity.push(valoresSecondaryOpacityArray);

                    } else {
                        console.log('cambia los valores para agregar un perfil')
                    }




                    //Agregar los valores primarios y secundarios a firebase

                    const docSecondaryRef = doc(db, 'projects', pid)


                    await updateDoc(docSecondaryRef, {

                        valoresProfiles: arrayUnion({
                            main: [...valoresMainOpacityArray],
                            secondary: [...valoresSecondaryOpacityArray]
                        })


                    })



                    this.disableButtonCreateProfile = false




                }

                if (this.profileButtons.valoresSecondaryOpacity.length > 4) {

                    this.disableButtonCreateProfile = true
                }
            } catch (error) {
                console.log(error)
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


                //Reinicia el store
                const dataStore = useDataProjectStore()
                dataStore.$reset()


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

                let dataValoresProfiles = data[0].valoresProfiles




                //lee de data los layers principales y los agrega a documents.mainLayers
                for (let i = 0; i < dataMainLayers.length; i++) {

                    this.documents.mainLayers.push({

                        name: dataMainLayers[i].name,
                        valorOpacity: dataMainLayers[i].valorOpacity,
                        disable: dataMainLayers[i].disable,
                        valorOpacityInterno: dataMainLayers[i].valorOpacityInterno,
                        fondo: dataMainLayers[i].fondo

                    })
                }

                //lee de data los layers secundarios y los agrega a documents.secondaryLayers
                for (let i = 0; i < dataSecondaryLayers.length; i++) {

                    this.documents.secondaryLayers.push({

                        name: dataSecondaryLayers[i].name,
                        valorOpacity: dataSecondaryLayers[i].valorOpacity,
                        disable: dataSecondaryLayers[i].disable,
                        valorOpacityInterno: dataSecondaryLayers[i].valorOpacityInterno,
                        fondo: dataSecondaryLayers[i].fondo

                    })
                }

                if (dataValoresProfiles.length > 0) {

                    for (let i = 0; i < dataValoresProfiles.length; i++) {

                        this.profileButtons.valoresMainOpacity.push(dataValoresProfiles[i].main)
                        this.profileButtons.valoresSecondaryOpacity.push(dataValoresProfiles[i].secondary)
                    }
                }





            } catch (error) {
                console.log(error)
            } finally {

            }
        },



        openAndCloseButtonDelete(index) {
            this.profileButtons.valoresSecondaryOpacity[index][0] = !this.profileButtons.valoresSecondaryOpacity[index][0]
        },


        async deleteProfile(index, pid) {



            this.profileButtons.valoresSecondaryOpacity.splice(index, 1)

            if (this.profileButtons.valoresSecondaryOpacity.length < 5) {
                this.disableButtonCreateProfile = false
            }

            if (this.profileButtons.valoresMainOpacity.length > 1) {

                this.profileButtons.valoresMainOpacity.splice(index, 1)

            }

            try {


                const docRef = doc(db, 'projects', pid)


                await runTransaction(db, async transaction => {
                    const doc = await transaction.get(docRef)
                    const regionArray = doc.get("valoresProfiles")


                    //filtra el array que no queremos y devuelve todos los array que si
                    const updatedRegionsArray = regionArray.filter((value, id) => id !== index);


                    // Inserta todos los array que si quedan en el documento de nuestra coleccion en firebase
                    transaction.update(docRef, {
                        valoresProfiles: updatedRegionsArray
                    })


                })


            } catch (error) {
                console.log(error)
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