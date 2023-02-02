import { collection, doc, getDocs, query, updateDoc, where, arrayUnion} from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db, storage } from '../firebaseConfig'
import { auth } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useUserStore } from '../stores/user';


import 'firebase/firestore';



export const useDataBaseStore = defineStore('dataBase', {
    state: () => ({
        documents: {
            mainLayers: [],
            secondaryLayers: [],

        },
        loadingLayers: false,
        projectId: null

    }),
    actions: {
        async getLayers() {


            if (this.documents.mainLayers.length !== 0) {
                return
            }

            this.loadingLayers = true
            try {
                const q = query(collection(db, "projects"), where("user", "==", auth.currentUser.uid));
                const querySnapShot = await getDocs(q)
                querySnapShot.forEach(doc => {
                    /* console.log(doc.id) muestra el id del proyecto*/
                    this.projectId = doc.id
                    console.log(this.projectId)
                    let data = []
                    data.push({
                        ...doc.data()
                    })
                    console.log(data) /*  muestra la colleccion incluido el user.id */


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
            }
            catch (error) {
                console.log(error)
            }
            finally {
                this.loadingLayers = false
                /* console.log(this.documents.mainLayers) /* muestra los elementos en el array mainLayers */
            }
        },

        async addLayers(mainImagen, mainLayerName) {

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
                        valorOpacity: 1,

                    })
                    
                   
                })



            } catch (error) {
                console.log(error)
            } finally {

            }
        },


    },



})