import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import router from '../router'
import { useDataBaseStore } from './dataBase'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSesion: false,
        iconFolder: '../src/assets/icons/folder.svg'
    }),
    actions: {

        

        async registerUser(email, password) {
            this.loadingUser = true
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                this.userData = { email: user.email, uid: user.uid };
                router.push('/userHome');

                

            } catch (error) {
                console.log(error)
            } finally {
                this.loadingUser = false
            }
        },

        async loginUser(email, password) {
            this.loadingUser = true
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password);
                this.userData = { email: user.email, uid: user.uid };
                router.push('/userHome');

            } catch (error) {
                s
                console.log(error);

            } finally {
                this.loadingUser = false
            }
        },
        async logOutUser() {



            const dataBaseStore = useDataBaseStore()
            dataBaseStore.$reset()

            this.loadingUser = true
            try {
                await signOut(auth);

                this.userData = null;



                router.push('/');
            } catch (error) {

                console.log(error)
            } finally {
                this.loadingUser = false

            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(auth, user => {
                    if (user) {
                        this.userData = { email: user.email, uid: user.uid };
                        console.log(this.userData)  /* muestra los datos del usuario */
                    } else {
                        this.userData = null
                        const dataBaseStore = useDataBaseStore()

                        dataBaseStore.$reset()
                    }
                    resolve(user)
                }, e => reject(e))
                unsuscribe()
            })
        }
    }
})