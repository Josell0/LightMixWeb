import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig'

export const useDataBaseStore = defineStore('dataBase', {
    state: () => ({
        documents: {
            mainLayers: [],
            secondaryLayers: []
        },
        loadingLayers: false
    }),
    actions: {
        async getLayers() {

            if(this.documents.mainLayers.length !== 0){
                return
            }

            this.loadingLayers = true
            try {
                const q = query(collection(db, "projects"), where("user", "==", auth.currentUser.uid));
                const querySnapShot = await getDocs(q)
                querySnapShot.forEach(doc => {
                    /* console.log(doc.id) muestra el id del proyecto*/
                    let data = []
                    data.push({
                        ...doc.data()
                    })
                    /* console.log(data)  muestra la colleccion incluido el user.id*/
                    for (let i = 0; i < data[0].main.length; i++) {
                        this.documents.mainLayers.push({
                            name: data[0].main[i].name,
                            valorOpacity: data[0].main[i].valorOpacity,
                            disable: data[0].main[i].disable,
                            valorOpacityInterno: data[0].main[i].valorOpacityInterno,
                            fondo: data[0].main[i].file
                        })
                    }

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
                /* console.log(this.documents.mainLayers) muestra los elementos en el array mainLayers */
            }
        },

        async addLayers(){
            try {
                
            } catch (error) {
                console.log(error)
            } finally {

            }
        }
    }
})