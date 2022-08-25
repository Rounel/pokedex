let allPokemon = [];
let tableauFin = [];

const resultatSpin = document.querySelector('.resultatSpin');
const picSpin = document.createElement('img');
picSpin.classList.add('picSpin');
resultatSpin.appendChild(picSpin);
const chargement = document.querySelector('.loader');

const trtd = document.querySelectorAll('td');



let rndPoke = getRndInteger(0, 201);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}




const types = {
    grass: '#63BC5B',
    ground: '#D97746',
    dragon: '#026DC5',
    fire: '#FF9D53',
    electric: '#F3D23B',
    fairy: '#ED90E7',
    poison: '#AD6AC9',
    bug: '#91C228',
    water: '#4D90D5',
    normal: '#919AA2',
    psychic: '#F97277',
    flying: '#90AADE',
    fighting: '#CE4069',
    rock: '#C8B88C',
    ghost: '#5169AD',
    ice: '#75CFC1',
    dark: '#5A5266',
    steel: '#5A8FA2'
};

const typesIcon = {
    grass: 'assets/type-grass-32px.png',
    ground: 'assets/type-ground-32px.png',
    dragon: 'assets/type-dragon-32px.png',
    fire: 'assets/type-fire-32px.png',
    electric: 'assets/type-electric-32px.png',
    fairy: 'assets/type-fairy-32px.png',
    poison: 'assets/type-poison-32px.png',
    bug: 'assets/type-bug-32px.png',
    water: 'assets/type-water-32px.png',
    normal: 'assets/type-normal-32px.png',
    psychic: 'assets/type-psychic-32px.png',
    flying: 'assets/type-flying-32px.png',
    fighting: 'assets/type-fighting-32px.png',
    rock: 'assets/type-rock-32px.png',
    ghost: 'assets/type-ghost-32px.png',
    ice: 'assets/type-ice-32px.png',
    dark: 'assets/type-dark-32px.png',
    steel: 'assets/type-steel-32px.png'
};

const typesFr = {
    grass: 'Plante',
    ground: 'Sol',
    dragon: 'Dragon',
    fire: 'Feu',
    electric: 'Electrik',
    fairy: 'Fée',
    poison: 'Poison',
    bug: 'Insecte',
    water: 'Eau',
    normal: 'Normal',
    psychic: 'Psy',
    flying: 'Vol',
    fighting: 'Combat',
    rock: 'Roche',
    ghost: 'Spectre',
    ice: 'Glace',
    dark: 'Ténèbres',
    steel: 'Acier'
};

function fetchPokemonBase() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=200&offset=0")
        .then(reponse => reponse.json())
        .then((allPoke) => {

            allPoke.results.forEach((pokemon) => {
                fetchPokemonComplet(pokemon);
            })
        })
}
fetchPokemonBase();

function fetchPokemonComplet(pokemon) {

    let objPokemonFull = {};
    let tabMove = [];
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            objPokemonFull.pic = pokeData.sprites.front_default;
            objPokemonFull.art = pokeData.sprites.other["official-artwork"].front_default;
            if (pokeData.types.length === 2) {
                objPokemonFull.type = pokeData.types[0].type.name;
                objPokemonFull.url1 = pokeData.types[0].type.url;
                objPokemonFull.type2 = pokeData.types[1].type.name;
                objPokemonFull.url2 = pokeData.types[1].type.url;
            } else if (pokeData.types.length === 1) {
                objPokemonFull.type = pokeData.types[0].type.name;
                objPokemonFull.type2 = "";
            }
            objPokemonFull.id = pokeData.id;

            objPokemonFull.cap = pokeData.abilities[0].ability.name;
            objPokemonFull.hp = pokeData.stats[0].base_stat;
            objPokemonFull.att = pokeData.stats[1].base_stat;
            objPokemonFull.def = pokeData.stats[2].base_stat;
            objPokemonFull.speAtt = pokeData.stats[3].base_stat;
            objPokemonFull.speDef = pokeData.stats[4].base_stat;
            objPokemonFull.vit = pokeData.stats[5].base_stat;

            for (k = 0; k < 4; k++) {

                if (pokeData.moves[k] === undefined) {
                    tabMove[k] = "";
                } else {
                    tabMove.push(pokeData.moves[k].move.name);
                }
            }

            let tabMoveFr = [];
            let tabPp = [];
            let tabTypeMoveFr = [];


            if (tabMove[0] === "") {
                tabMoveFr[0] = "";
                tabPp[0] = "";
                tabTypeMoveFr[0] = "";
            } else {
                fetch(`https://pokeapi.co/api/v2/move/${tabMove[0]}`)
                    .then(reponse => reponse.json())
                    .then((pokeData) => {
                        tabMoveFr[0] = pokeData.names[3].name;
                        tabPp[0] = pokeData.pp;
                        tabTypeMoveFr[0] = pokeData.type.name;
                    })
            }

            if (tabMove[1] === "") {
                tabMoveFr[1] = "";
                tabPp[1] = "";
                tabTypeMoveFr[1] = "";
            } else {
                fetch(`https://pokeapi.co/api/v2/move/${tabMove[1]}`)
                    .then(reponse => reponse.json())
                    .then((pokeData) => {
                        tabMoveFr[1] = pokeData.names[3].name;
                        tabPp[1] = pokeData.pp;
                        tabTypeMoveFr[1] = pokeData.type.name;
                    })
            }

            if (tabMove[2] === "") {
                tabMoveFr[2] = "";
                tabPp[2] = "";
                tabTypeMoveFr[2] = "";
            } else {
                fetch(`https://pokeapi.co/api/v2/move/${tabMove[2]}`)
                    .then(reponse => reponse.json())
                    .then((pokeData) => {
                        tabMoveFr[2] = pokeData.names[3].name;
                        tabPp[2] = pokeData.pp;
                        tabTypeMoveFr[2] = pokeData.type.name;
                    })
            }

            if (tabMove[3] === "") {
                tabMoveFr[3] = "";
                tabPp[3] = "";
                tabTypeMoveFr[3] = "";
            } else {
                fetch(`https://pokeapi.co/api/v2/move/${tabMove[3]}`)
                    .then(reponse => reponse.json())
                    .then((pokeData) => {
                        tabMoveFr[3] = pokeData.names[3].name;
                        tabPp[3] = pokeData.pp;
                        tabTypeMoveFr[3] = pokeData.type.name;
                    })
            }

            objPokemonFull.tabMoveFr = tabMoveFr;
            objPokemonFull.pp = tabPp;
            objPokemonFull.tabTypeMoveFr = tabTypeMoveFr;

            fetch(`https://pokeapi.co/api/v2/ability/${objPokemonFull.cap}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    objPokemonFull.capFr = pokeData.names[3].name;
                })

            fetch(`https:pokeapi.co/api/v2/type/${objPokemonFull.type}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    objPokemonFull.typeFr1 = pokeData.names[3].name;
                })

            if (objPokemonFull.type2 !== "") {
                fetch(`https:pokeapi.co/api/v2/type/${objPokemonFull.type2}`)
                    .then(reponse => reponse.json())
                    .then((pokeData) => {
                        objPokemonFull.typeFr2 = pokeData.names[3].name;
                    })
            } else {
                objPokemonFull.typeFr2 = "";
            }




            fetch(`https:pokeapi.co/api/v2/pokemon-species/${objPokemonFull.id}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {

                    if (pokeData.names[4].language.name !== "fr") {
                        objPokemonFull.name = pokeData.names[3].name;
                    } else {
                        objPokemonFull.name = pokeData.names[4].name;
                    }

                    objPokemonFull.leg = pokeData.is_legendary;
                    allPokemon.push(objPokemonFull);

                    if (allPokemon.length === 200) {


                        picSpin.src = allPokemon[rndPoke].art;

                        const leg = document.querySelector('.leg');
                        if (allPokemon[rndPoke].leg === true) {
                            leg.style.right = "170px";
                            leg.innerText = "✨Wow un pokemon legendaire !🤩";
                        } else {
                            leg.innerText = "Pas mal !"
                        }

                        trtd[0].innerText = allPokemon[rndPoke].name;

                        let UC = "Zéroïd Mouscoto Cancrelove Câblifère Bamboiselle Katagami Engloutyran Vémini Mandrillon Ama-Ama Pierroteknik";

                        let result = UC.includes(allPokemon[rndPoke].name);
                        if (result === true) {
                            leg.style.right = "200px";
                            leg.innerText = "Génial ! une Ultra-Chimère";
                        }


                        let couleur = types[allPokemon[rndPoke].type];
                        let srcType = typesIcon[allPokemon[rndPoke].type];
                        const typeContainer = document.createElement('div');
                        typeContainer.classList.add('typeContainer');
                        const divTypeLogo = document.createElement('div');
                        divTypeLogo.classList.add('divTypeLogo');
                        const typeLogo = document.createElement('img');
                        typeLogo.classList.add('typeLogo');
                        const typeName = document.createElement('div');
                        typeName.classList.add('typeName');
                        divTypeLogo.style.background = couleur;
                        typeLogo.src = srcType;

                        divTypeLogo.appendChild(typeLogo);
                        typeContainer.appendChild(divTypeLogo);
                        typeContainer.appendChild(typeName);

                        typeName.innerText = allPokemon[rndPoke].typeFr1;

                        trtd[1].appendChild(typeContainer);

                        if (allPokemon[rndPoke].typeFr2 !== "") {

                            let couleur2 = types[allPokemon[rndPoke].type2];
                            let srcType2 = typesIcon[allPokemon[rndPoke].type2];
                            const typeContainer2 = document.createElement('div');
                            typeContainer2.classList.add('typeContainer');
                            const divTypeLogo2 = document.createElement('div');
                            divTypeLogo2.classList.add('divTypeLogo');
                            const typeLogo2 = document.createElement('img');
                            typeLogo2.classList.add('typeLogo');
                            const typeName2 = document.createElement('div');
                            typeName2.classList.add('typeName');
                            divTypeLogo2.style.background = couleur2;
                            typeLogo2.src = srcType2;

                            divTypeLogo2.appendChild(typeLogo2);
                            typeContainer2.appendChild(divTypeLogo2);
                            typeContainer2.appendChild(typeName2);

                            if (allPokemon[rndPoke].typeFr2 !== undefined) {
                                typeName2.innerText = allPokemon[rndPoke].typeFr2;
                            } else {
                                typeName2.innerText = typesFr[allPokemon[rndPoke].type2]
                            }




                            trtd[1].appendChild(typeContainer2);
                        }

                        trtd[2].innerText = allPokemon[rndPoke].id;
                        trtd[3].innerText = allPokemon[rndPoke].capFr;
                        trtd[4].innerText = allPokemon[rndPoke].hp;
                        trtd[5].innerText = allPokemon[rndPoke].att;
                        trtd[6].innerText = allPokemon[rndPoke].def;
                        trtd[7].innerText = allPokemon[rndPoke].vit;
                        trtd[8].innerText = allPokemon[rndPoke].speDef;
                        trtd[9].innerText = allPokemon[rndPoke].speAtt;

                        for (i = 0; i < 4; i++) {

                            let x = 10;

                            if (allPokemon[rndPoke].tabMoveFr[i] === "") {
                                trtd[x].innerText = "";
                                trtd[x].style.display = "none";
                                x++;

                            } else {

                                const divSpell = document.querySelectorAll('.divSpell');
                                const spellName = document.createElement('span');
                                spellName.classList.add('spellName');
                                spellName.innerText = allPokemon[rndPoke].tabMoveFr[i];

                                divSpell[i].appendChild(spellName);

                                let couleurMove = types[allPokemon[rndPoke].tabTypeMoveFr[i]];
                                let srcTypeMove = typesIcon[allPokemon[rndPoke].tabTypeMoveFr[i]];
                                const typeContainerMove = document.createElement('div');
                                typeContainerMove.classList.add('typeContainer');
                                const divTypeLogoMove = document.createElement('div');
                                divTypeLogoMove.classList.add('divTypeLogo');
                                const typeLogoMove = document.createElement('img');
                                typeLogoMove.classList.add('typeLogo');
                                const typeNameMove = document.createElement('div');
                                typeNameMove.classList.add('typeName');
                                divTypeLogoMove.style.background = couleurMove;
                                typeLogoMove.src = srcTypeMove;

                                divTypeLogoMove.appendChild(typeLogoMove);
                                typeContainerMove.appendChild(divTypeLogoMove);
                                typeContainerMove.appendChild(typeNameMove);
                                typeNameMove.innerText = typesFr[allPokemon[rndPoke].tabTypeMoveFr[i]];

                                divSpell[i].appendChild(typeContainerMove);

                                const ppContainer = document.createElement('div');
                                ppContainer.classList.add('ppContainer');
                                ppContainer.innerText = allPokemon[rndPoke].pp[i] + "/" + allPokemon[rndPoke].pp[i];

                                divSpell[i].appendChild(ppContainer);

                                x++;

                            }

                        }



                        chargement.style.display = 'none';


                    }
                })



        })
}


function actualise() {
    location.reload();
}



const suivant = document.querySelector('.right');
const precedent = document.querySelector('.left');
const imgs = document.querySelectorAll('.icons img');
const tabData = document.querySelectorAll('table');
let index2 = 0;

suivant.addEventListener('click', slideSuivante);

function slideSuivante() {

    if (index2 < 2) {

        tabData[index2].classList.remove('active');
        index2++;
        tabData[index2].classList.add('active');
    } else if (index2 === 2) {

        tabData[index2].classList.remove('active');
        index2 = 0;
        tabData[index2].classList.add('active');
    }

    for (i = 0; i < imgs.length; i++) {

        if (imgs[i].getAttribute('data-clic') - 1 === index2) {
            imgs[i].classList.add('active');
        } else {
            imgs[i].classList.remove('active');
        }
    }
}

precedent.addEventListener('click', slidePrecedente);

function slidePrecedente() {

    if (index2 > 0) {

        tabData[index2].classList.remove('active');
        index2--;
        tabData[index2].classList.add('active');
    } else if (index2 === 0) {

        tabData[index2].classList.remove('active');
        index2 = 2;
        tabData[index2].classList.add('active');
    }

    for (i = 0; i < imgs.length; i++) {

        if (imgs[i].getAttribute('data-clic') - 1 === index2) {
            imgs[i].classList.add('active');
        } else {
            imgs[i].classList.remove('active');
        }
    }
}

document.addEventListener('keydown', keyPressed)

function keyPressed(e) {

    if (e.keyCode === 37) {
        slidePrecedente();
    } else if (e.keyCode === 39) {
        slideSuivante();
    }

}

imgs.forEach(img => {

    img.addEventListener('click', function() {

        for (i = 0; i < imgs.length; i++) {
            imgs[i].classList.remove('active');
        }
        this.classList.add('active');

        tabData[index2].classList.remove('active');
        index2 = this.getAttribute('data-clic') - 1;
        tabData[index2].classList.add('active');
    })
})