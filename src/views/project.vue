<template>
    <div class="cMainProject">

        <div class="cLayers" id="imageDownload">

            <div class="cMainLayers" v-for="(item, index) in dataBaseProject.documents.mainLayers" key="index">



                <div class="cMainLayer" :style="{
                    'background-image': `url(${item.fondo})`, 'opacity': `${item.valorOpacity / 100}`
                }">
                </div>



            </div>

            <div class="cSecondLayers" v-for="(item, index) in dataBaseProject.documents.secondaryLayers" key="index">

                <div class="cSecondLayer"
                    :style="{ 'background-image': `url(${item.fondo})`, 'opacity': `${item.valorOpacity / 100}` }">
                </div>


            </div>
        </div>


        <div class="cButtons">

            <div class="cMainButtons">

                <div class="cBoxButtonsLayers">

                    <div class="cBoxButtonsSecondary">

                        <div class="cBoxbuttonsSecondaryLayers">

                            <div class="cBoxButton" v-for="(item, index) in dataBaseProject.documents.secondaryLayers"
                                key="index">

                                <p class="cButtonName">{{ item.name }}</p>
                                <div class="cBoxButtonContainer">

                                    <div class="cButtonVisibility">
                                        <button @click="dataBaseProject.changeStateOfIconSecondary(index, item.valorOpacity)">
                                            <img v-if="item.disable" :src="dataBaseProject.visibilityIcons[1]" alt="">
                                            <img v-else :src="dataBaseProject.visibilityIcons[0]" alt="">

                                        </button>
                                    </div>

                                    <div class="cButtonControlers">
                                        <div class="cRangeOpacity">

                                            <input type="range" v-model="item.valorOpacity" :disabled="item.disable"
                                                min="0" max="100">


                                            <span class="cRangeOpacityValue">{{ item.valorOpacity }}</span>
                                        </div>



                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>


                    <hr>

                    <div class="cBoxButtonsMain">

                        <p class="cBoxMaintittle">Main Lights</p>

                        <div class="cBoxbuttonsMainLayers">


                            <div class="cBoxButton" v-for="(item, index) in dataBaseProject.documents.mainLayers"
                                key="index">

                                <p class="cButtonName">{{ item.name }}</p>
                                <div class="cBoxButtonContainer">

                                    <div class="cButtonVisibility">
                                        <button @click="dataBaseProject.changeStateOfIconMain(index, item.valorOpacity)">
                                            <img v-if="item.disable" :src="dataBaseProject.visibilityIcons[1]" alt="">
                                            <img v-else :src="dataBaseProject.visibilityIcons[0]" alt="">

                                        </button>
                                    </div>

                                    <div class="cButtonControlers">
                                        <div class="cRangeOpacity">

                                            <input type="range" v-model="item.valorOpacity" :disabled="item.disable"
                                                min="0" max="100">


                                            <span class="cRangeOpacityValue">{{ item.valorOpacity }}</span>
                                        </div>



                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>


                </div>



                <hr>

                <div class="cBoxDownloadButton">
                    <button class="cDownloadButton" @click="dataBaseProject.imageDownload()">Download Image</button>



                </div>



            </div>

            <div class="cPerfilButtons">
                <div class="cBoxPerfilCreated" v-for="(item, index) in dataBaseProject.profileButtons.valoresSecondaryOpacity"
                    key="index">
                    <button class="cButtonDeleteProfile"
                        :class="[dataBaseProject.profileButtons.valoresSecondaryOpacity[index][0] ? 'cDisplayOn' : 'cDisplayOff']"
                        @click="dataBaseProject.deleteProfile(index)">Delete
                    </button>

                    <button class="cButtonDeleteMenuProfile"
                        @click="dataBaseProject.openAndCloseButtonDelete(index)">˅</button>

                    <button class="cButtonNumberProfile" @click="dataBaseProject.changeProfileValue(index)">{{ index + 1
                    }}</button>
                </div>
                <p class="cTextPerfilButton" v-if="dataBaseProject.profileButtons.valoresSecondaryOpacity < 1">SAVE LIGHT
                    PROFILE >>
                </p>
                <div class="cBoxPerfilButton">
                    <button class="cbuttonAdd" v-if="!dataBaseProject.disableButtonCreateProfile"
                        @click="dataBaseProject.createProfile(route.params.pid)" :disabled="dataBaseProject.disableButtonCreateProfile">+</button>

                </div>
            </div>

        </div>

    </div>
</template>

<script setup>



import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDataProjectStore } from '../stores/dataProject';
import { useHomeStore } from '../stores/homeStore'



import 'firebase/firestore';


const dataBaseProject = useDataProjectStore()
const homeStore = useHomeStore()

const route = useRoute()







onMounted(async () => {

    


    dataBaseProject.getProjectLayers(route.params.pid)


});


</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.opacityCero {
    opacity: 0;
}

.cDisplayOn {
    visibility: visible;
}

.cDisplayOff {
    visibility: hidden;
}

.cMainProject {
    width: 100%;
    top: 0;
}

.cLayers {
    position: relative;
}



.cMainLayers {
    width: 100%;
}

.cMainLayer,
.cSecondLayer {

    height: 100vh;
    background-color: black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;


}

.cMainLayer {
    width: 100%;
    position: absolute;
    top: 0;
}

.cSecondLayer {
    width: 100%;
    mix-blend-mode: lighten;
    position: absolute;
    top: 0;


}

.cButtons {
    display: flex;
    position: absolute;
    right: 0%;
    bottom: 0%;
    height: 95vh;
    padding-bottom: 1rem;

    flex-flow: row wrap;
    align-items: flex-end;




}



.cMainButtons {

    display: inline-block;


    margin-top: 2rem;


}

.cBoxButtonsLayers {

    max-height: 85vh;


}

.cBoxbuttonsSecondaryLayers {
    max-height: 70vh;
    overflow: auto;
}

.cBoxbuttonsMainLayers {
    height: auto;
    display: inline-flex;
    flex-direction: column-reverse;
}

.cBoxButton {
    width: 11.5rem;
    padding: .3rem;
    margin: .5rem;

    border-radius: 0 15px 15px;
    box-shadow: -5px -5px 10px rgb(255, 255, 255, 0.2), 5px 5px 10px rgb(0, 0, 0, 0.12);


}


.cBoxButtonContainer {


    display: flex;


}



.cButtonName {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: .85rem;
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 3px #6dcaca;
    margin-bottom: .2rem;

}

.cButtonVisibility {
    width: 2rem;


}




.cButtonVisibility button {
    background-color: rgba(44, 204, 177, 0.3);
    cursor: pointer;
    border: none;

}

.cButtonVisibility img {
    width: 1.5rem;
    height: 1.5rem;


}


.cRangeOpacity {
    display: flex;
    align-items: center;
}

.cRangeOpacityValue,
.cRangeHueValue {
    width: .3rem;
    padding-left: .1rem;
    align-items: center;
    font-size: .8rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cRangeOpacity input {
    height: .5rem;
}


.cBoxDownloadButton {
    display: flex;
    align-items: center;
    position: relative;
}

.cDownloadButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13rem;
    height: 3rem;
    font-size: 1.2rem;
    text-decoration: none;
    border-color: green;
    border-radius: 5px;
    margin: .2rem;
    margin-bottom: 0;
    background-color: rgba(26, 182, 33, .5);
    cursor: pointer;

}

.cPerfilButtons {
    font-size: 1.5rem;
    padding-left: .5rem;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.cTextPerfilButton {
    font-size: 1.5rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    writing-mode: vertical-lr;
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 3px #6dcaca;


}

.cBoxPerfilButton {
    display: flex;
    flex-direction: column-reverse;

}



.cPerfilButtons .cButtonNumberProfile,
.cPerfilButtons .cbuttonAdd {
    width: 3rem;
    height: 3rem;
    font-size: 2.2rem;
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 3px #6dcaca;
    background-color: rgba(1, 1, 1, .05);
    cursor: pointer;
}



.cPerfilButtons button:hover {
    background-color: rgba(47, 134, 248, 0.5);
}



.cbuttonAdd,
.cPerfilButtons button {
    margin-top: .5rem;
    border: none;
    border-radius: 0 15px 15px;
    box-shadow: -5px -5px 10px rgb(255, 255, 255, 0.2), 5px 5px 10px rgb(0, 0, 0, 0.12);
}

.cBoxPerfilCreated {
    position: relative;
}

.cButtonDeleteMenuProfile {
    position: absolute;
    right: 0;
    width: 1rem;
    height: 1rem;

    background-color: rgba(1, 1, 1, .01);
    border: none;
    font-size: 1rem;
}

.cButtonDeleteProfile {
    position: absolute;

    left: 0;
    top: 10px;


}


@media only screen and (max-height: 450px) and (orientation: landscape) {


.cBoxbuttonsSecondaryLayers {
    height: 30vh;
}

.cBoxButton {
    width: 9rem;
    padding: .1rem;
    margin: .3rem;

    box-shadow: -2px -2px 5px rgb(255, 255, 255, 0.2), 2px 2px 5px rgb(0, 0, 0, 0.12);
}

.cButtonName {
    font-size: .65rem;
}

.cButtonVisibility img {
    width: 1.2rem;
    height: 1.2rem;


}

.cRangeOpacity input {
    width: 5rem;

}

.cBoxMaintittle{
    display: none;
}

.cDownloadButton {
    width: 9rem;
    height: 2rem;
    font-size: .8rem;
}

.cTextPerfilButton{
    font-size: 1rem; 
}

.cPerfilButtons .cButtonNumberProfile,
.cPerfilButtons .cbuttonAdd {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 3px #6dcaca;
    background-color: rgba(1, 1, 1, .05);
    cursor: pointer;
}
}

</style>