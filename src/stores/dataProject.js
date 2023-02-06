import { collection, doc, addDoc, getDoc, getDocs, query, updateDoc, where, arrayUnion, runTransaction } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db, storage } from '../firebaseConfig'
import { useUserStore } from '../stores/user'

import 'firebase/firestore'

export const useDataProjectStore = defineStore('dataProject', {
    state: () => ({
        documents: {
            mainLayers: [],
            secondaryLayers: []
        }
    }),

    actions: {
        async getProjectLayers(nameDoc) {
            try {
                const docRef = doc(db, "projects", nameDoc);
                const docSnap = await getDoc(docRef);

                

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data())
                } else {
                    console.log("No document")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})