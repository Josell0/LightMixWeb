import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig'

export const useDataBaseStore = defineStore('dataBase', {
    state: () => ({
        documents: {
            mainLayers: [],
            secondaryLayers: []
        }
    }),
    actions: {
        async getLayers() {
            try {
                const q = query(collection(db, "projects"), where("user", "==", auth.currentUser.uid));
                const querySnapShot = await getDocs(q)
                querySnapShot.forEach(doc => {
                    




                    let data = []

                    data.push({


                        ...doc.data()
                    })

                    
                    

                    for (let i = 0; i < data[0].main.length; i++) {

                        this.documents.mainLayers.push({
                            name: data[0].main[i].name,
                            valorOpacity: 100,
                            disable: false,
                            valorOpacityInterno: null,
                            fondo: data[0].main[i].file
                        })

                    }

                    for (let i = 0; i < data[0].secondary.length; i++) {

                        this.documents.secondaryLayers.push({
                            name: data[0].secondary[i].name,
                            valorOpacity: 0,
                            disable: true,
                            valorOpacityInterno: 100,
                            fondo: data[0].secondary[i].file
                        })

                    }

                    
                })



            }


            catch (error) {
                console.log(error)
            }
            finally {
                
                console.log(this.documents)
            }
        }
    }
})