import { collection, doc, addDoc, getDocs, query, updateDoc, where, arrayUnion, runTransaction } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db, storage } from '../firebaseConfig'
import { auth } from '../firebaseConfig'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useUserStore } from '../stores/user';


import 'firebase/firestore';






export const useDataBaseStore = defineStore('dataBase', {
    state: () => ({
        documents: {
            mainLayers: [],
            secondaryLayers: [],

        },
        loadingLayers: false,
        emptyLayers: false,
        projectId: null,
        buttonDeleteLayer: false,

    }),
    actions: {
        async getLayers() {


            if (this.documents.mainLayers.length !== 0) {
                return
            }



            this.loadingLayers = true


            try {
                const q = query(collection(db, "projects"), where("user", "==", auth.currentUser.uid))



                const querySnapShot = await getDocs(q)

                if (querySnapShot.size === 0) {
                    this.emptyLayers = true


                    console.log('no hay documentos')

                    const arrayInitial = {
                        main: [],
                        secondary: [],
                        
                        valoresProfiles: [],
                        
                
                        
                        user: auth.currentUser.uid
                    }
                    const docRef = await addDoc(collection(db, "projects"), arrayInitial)

                    this.projectId = docRef.id

                    return
                }

                querySnapShot.forEach(doc => {
                    /* console.log(doc.id) muestra el id del proyecto*/
                    this.projectId = doc.id

                    let data = []
                    data.push({
                        ...doc.data()
                    })
                    /* console.log(data)  muestra la colleccion incluido el user.id */


                    /* Pasa los valores de nuestra base de datos al mainlayers */
                    for (let i = 0; i < data[0].main.length; i++) {
                        this.documents.mainLayers.push({
                            name: data[0].main[i].name,
                            valorOpacity: data[0].main[i].valorOpacity,
                            disable: data[0].main[i].disable,
                            valorOpacityInterno: data[0].main[i].valorOpacityInterno,
                            fondo: data[0].main[i].file
                        })
                    }

                    /* Pasa los valores de nuestra base de datos al secondarylayers */
                    for (let i = 0; i < data[0].secondary.length; i++) {
                        this.documents.secondaryLayers.push({
                            name: data[0].secondary[i].name,
                            valorOpacity: data[0].secondary[i].valorOpacity,
                            disable: data[0].secondary[i].disable,
                            valorOpacityInterno: data[0].secondary[i].valorOpacityInterno,
                            fondo: data[0].secondary[i].file
                        })
                    }
                })

                /* console.log(this.documents.mainLayers) /* muestra los elementos en el array mainLayers */

                if (this.documents.mainLayers.length === 0 && this.documents.secondaryLayers.length === 0) {

                    this.emptyLayers = true

                }
            }
            catch (error) {
                console.log(error)
            }
            finally {
                this.loadingLayers = false
            }
        },

        async addMainLayer(mainImagen, mainLayerName) {

            /* esto captura la imagen y el nombre del layer */

            try {
                const userStore = useUserStore()


                const storageRef = ref(storage, `${userStore.userData.uid}/project/${mainLayerName}`);

                await uploadBytes(storageRef, mainImagen);
                const mainImageUrl = await getDownloadURL(storageRef)

                /* aqui llamamos a una referencia de un documento en nuestra base de datos */



                const docRef = doc(db, 'projects', this.projectId)


                await updateDoc(docRef, {

                    main: arrayUnion({
                        name: mainLayerName,
                        valorOpacity: 100,
                        disable: false,
                        valorOpacityInterno: null,
                        fondo: mainImageUrl

                    })


                })

                this.documents.mainLayers.push({
                    name: mainLayerName,
                    valorOpacity: 100,
                    disable: false,
                    valorOpacityInterno: null,
                    fondo: mainImageUrl
                })

                if (this.documents.mainLayers.length !== 0 || this.documents.secondaryLayers.length !== 0) {

                    this.emptyLayers = false
                }

            } catch (error) {
                console.log(error)
            } finally {



            }
        },

        async addSecondaryLayer(secondaryImagen, secondaryLayerName) {

            /* esto captura la imagen y el nombre del layer */

            try {
                const userStore = useUserStore()


                const storageRef = ref(storage, `${userStore.userData.uid}/project/${secondaryLayerName}`);

                await uploadBytes(storageRef, secondaryImagen);
                const secondaryImageUrl = await getDownloadURL(storageRef)

                /* aqui llamamos a una referencia de un documento en nuestra base de datos */



                const docRef = doc(db, 'projects', this.projectId)


                await updateDoc(docRef, {

                    secondary: arrayUnion({
                        name: secondaryLayerName,
                        valorOpacity: 0,
                        diable: true,
                        valorOpacityInterno: 100,
                        fondo: secondaryImageUrl

                    })


                })

                this.documents.secondaryLayers.push({
                    name: secondaryLayerName,
                    valorOpacity: 0,
                    diable: true,
                    valorOpacityInterno: 100,
                    fondo: secondaryImageUrl
                })

                if (this.documents.mainLayers.length !== 0 || this.documents.secondaryLayers.length !== 0) {

                    this.emptyLayers = false
                }

            } catch (error) {
                console.log(error)
            } finally {

            }
        },

        async deleteMainLayer(name) {
            try {

                this.buttonDeleteLayer = true

                const userStore = useUserStore()


                //Elimina la imagen del storage
                const storageRef = ref(storage, `${userStore.userData.uid}/project/${name}`);
                deleteObject(storageRef).then(() => {
                    
                })

                const docRef = doc(db, 'projects', this.projectId)

                /* Metodo para eliminar en la base de datos firebase */
                await runTransaction(db, async transaction => {
                    const userDoc = await transaction.get(docRef);
                    if (!userDoc.exists) {
                        throw 'El documento no existe';
                    }
                    // Obtener el array main
                    const mainArray = userDoc.get('main');

                    // Encontrar el índice del mapa que se quiere eliminar
                    const mapToDeleteIndex = mainArray.findIndex(map => map.name === name);

                    // Eliminar el mapa
                    mainArray.splice(mapToDeleteIndex, 1);

                    // Actualizar el documento
                    transaction.update(docRef, { main: mainArray });
                });


                /* Metodo para eliminar layer del MainLayer */
                const mainLayersData = this.documents.mainLayers
                const mapDeleteindex = mainLayersData.findIndex(map => map.name === name)

                mainLayersData.splice(mapDeleteindex, 1)

                if (this.documents.mainLayers.length === 0 && this.documents.secondaryLayers.length === 0) {
                    this.emptyLayers = true
                }
            } catch (error) {
                console.log(error)
            } finally {

                this.buttonDeleteLayer = false

            }
        },

        async deleteSecondaryLayer(name) {
            try {

                this.buttonDeleteLayer = true

                const userStore = useUserStore()

                const storageRef = ref(storage, `${userStore.userData.uid}/project/${name}`);
                deleteObject(storageRef).then(() => {
                    
                })


                const docRef = doc(db, 'projects', this.projectId)

                /* Metodo para eliminar en la base de datos firebase */
                await runTransaction(db, async transaction => {
                    const userDoc = await transaction.get(docRef);
                    if (!userDoc.exists) {
                        throw 'El documento no existe';
                    }
                    // Obtener el array main
                    const secondaryArray = userDoc.get('secondary');

                    // Encontrar el índice del mapa que se quiere eliminar
                    const mapToDeleteIndex = secondaryArray.findIndex(map => map.name === name);

                    // Eliminar el mapa
                    secondaryArray.splice(mapToDeleteIndex, 1);

                    // Actualizar el documento
                    transaction.update(docRef, { secondary: secondaryArray });
                });


                /* Metodo para eliminar layer del MainLayer */
                const secondaryLayersData = this.documents.secondaryLayers
                const mapDeleteindex = secondaryLayersData.findIndex(map => map.name === name)

                secondaryLayersData.splice(mapDeleteindex, 1)

                if (this.documents.mainLayers.length === 0 && this.documents.secondaryLayers.length === 0) {
                    this.emptyLayers = true
                }

            } catch (error) {
                console.log(error)
            } finally {
                this.buttonDeleteLayer = false
            }
        },


    },



})