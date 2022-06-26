<template>
    <div class="cMainHome">

        <div class="cLayers" id="imageDownload">
            <div class="clogoDonwload" id="logoDownload"></div>
            <div class="cMainLayers">
                <div class="cMainLayer" v-for="(item, index) in homeStore.homeLayers.mainLayers" key="index"
                    :style="{ 'background-image': `url(${item})` }"></div>

            </div>

            <div class="cSecondLayers" v-for="(item, index) in homeStore.homeLayers.secondLayers" key="index">

                <div class="cSecondLayer"
                    :style="{ 'background-image': `url(${item.fondo})`, 'opacity': `${item.valorOpacity / 100}`, 'filter': `hue-rotate(${item.valorHue + 'deg'}) hue-rotate(${item.valorHue + 'deg'})` }">
                </div>

                <div class="cSecondLayer"
                    :style="{ 'background-image': `url(${item.fondo})`, 'opacity': `${item.valorOpacity / 100}`, 'filter': `hue-rotate(${item.valorHue + 'deg'}) hue-rotate(${item.valorHue + 'deg'})` }">
                </div>

            </div>

        </div>

        <div class="cButtons">

            <div class="cMainButtons">

                <div class="cBoxButton" v-for="(item, index) in homeStore.homeLayers.secondLayers" key="index">

                    <div class="cBoxButtonContainer">

                        <div class="cButtonVisibility">
                            <button @click="homeStore.changeStateOfIcon(index, item.valorOpacity)">
                                <img v-if="item.disable" :src="homeStore.visibilityIcons[1]" alt="">
                                <img v-else :src="homeStore.visibilityIcons[0]" alt="">

                            </button>
                        </div>

                        <div class="cButtonControlers">
                            <p class="cButtonName">{{ item.name }}</p>
                            <div class="cRangeOpacity">
                                <input type="range" v-model="item.valorOpacity" :disabled="item.disable" min="0"
                                    max="100">
                                <span class="cRangeOpacityValue">{{ item.valorOpacity * 2 }}</span>
                            </div>
                            <div class="cRangeHue">
                                <input type="range" v-model="item.valorHue" :disabled="item.disable" min="0" max="360">
                                <span class="cRangeHueValue">{{ item.valorHue }}</span>
                            </div>
                        </div>

                    </div>


                </div>

                <hr>

                <div class="cBoxDownloadButton">
                    <button class="cDownloadButton" @click="homeStore.imageDownload()">Download</button>



                </div>



            </div>

            <div class="cPerfilButtons">
                <div class="cBoxPerfilCreated" v-for="(item, index) in homeStore.profileButtons.valoresOpacity"
                    key="index">
                    <button class="cButtonDeleteProfile"
                        :class="[homeStore.profileButtons.valoresOpacity[index][0] ? 'cDisplayOn' : 'cDisplayOff']"
                        @click="homeStore.deleteProfile(index)">Delete
                    </button>

                    <button class="cButtonDeleteMenuProfile"
                        @click="homeStore.openAndCloseButtonDelete(index)">˅</button>

                    <button class="cButtonNumberProfile" @click="homeStore.changeProfileValue(index)">{{ index + 1
                    }}</button>
                </div>
                <div class="cBoxPerfilButton">
                    <button class="cbuttonAdd" @click="homeStore.createProfile()"
                        :disabled="homeStore.disableButtonCreateProfile">+</button>

                </div>
            </div>

        </div>





    </div>



</template>

<script setup>




import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()

const proyectLayers = homeStore.homeLayers.proyect[0].proyectLayers;

console.log(proyectLayers);



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

.clogoDonwload,
.clogoDonwload h2 {
    position: absolute;
    color: rgb(250, 250, 250);
    letter-spacing: 2px;
    text-shadow: 2px 2px 2px rgb(32, 32, 32), -2px -2px 2px rgb(32, 32, 32);
    opacity: 50%;
}

.cMainHome {
    width: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    z-index: -10;

}

.cMainLayer,
.cSecondLayer {
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

}

.cSecondLayer {
    mix-blend-mode: screen;


    width: 100%;
    height: 100hv;
    position: absolute;
    top: 0;

}


.cButtons {
    display: flex;

    position: absolute;
    bottom: 3%;
    right: 1%;
    flex-flow: row wrap;
    align-items: flex-end;
}



.cMainButtons {
    bottom: 0%;
}


.cBoxButton {
    padding: .3rem;
    border: 2px solid black;
    margin: .2rem;
    border-radius: 5px;

}


.cBoxButtonContainer {

    width: 12.5rem;
    display: flex;


}

.cButtonControlers {
    margin: 0.2rem;
}

.cButtonName {
    width: 8.5rem;
}

.cButtonVisibility {
    width: 2.5rem;
    height: 2.5rem;

}

.cButtonVisibility button {
    background-color: rgba(1, 1, 1, .05);
    cursor: pointer;
}

.cButtonVisibility img {
    width: 2rem;
    height: 2rem;


}


.cRangeOpacity,
.cRangeHue {
    display: flex;
    align-items: center;
}

.cRangeOpacityValue,
.cRangeHueValue {
    width: .3rem;
    padding-left: .2rem;
    align-items: center;
}

.cBoxDownloadButton {
    display: flex;
    align-items: center;
}

.cDownloadButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13.3rem;
    height: 3rem;
    font-size: 1.2rem;
    text-decoration: none;
    border-color: green;
    border-radius: 5px;
    margin: .2rem;
    margin-bottom: 0;
    background-color: rgb(26, 182, 33);

}

.cPerfilButtons {
    padding-left: .5rem;
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
    background-color: rgba(1, 1, 1, .05);
    cursor: pointer;
}



.cPerfilButtons button:hover {
    background-color: rgba(47, 134, 248, 0.5);
}



.cbuttonAdd,
.cPerfilButtons button {
    margin-top: .5rem;
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
</style>

