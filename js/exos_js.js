const rightBtn = document.getElementById("rb");
const rightBtn10 = document.getElementById("rb10");

const leftBtn = document.getElementById("lb");
const leftBtn10 = document.getElementById("lb10")

const clearBtn = document.querySelector('.clearBtn');

const countBox = document.querySelector(".countBox")
let count = parseInt(countBox.innerText);

countBox.innerText = count;

const increase = () => {
    count = count + 1;
    countBox.innerText = count;
}

const increase10 = () => {
    count = count + 10;
    countBox.innerText = count;
}

const decrease = () => {
    count = count - 1;
    countBox.innerText = count;
}

const decrease10 = () => {
    count = count - 10;
    countBox.innerText = count;
}

const clear = () => {
    count = 0;
    countBox.innerText = count;
}

rightBtn.addEventListener('click', increase);
rightBtn10.addEventListener('click', increase10)

leftBtn.addEventListener('click', decrease);
leftBtn10.addEventListener('click', decrease10)

clearBtn.addEventListener('click', clear);

//exo 2===================================================================================================================================//

const input = document.querySelector('.txtInput');

const showLenght = (e) => {
    const alertBox = document.querySelector(".alert")
    const inputCount = document.querySelector('.inputCount')
    let nb = e.target.value.length;

    inputCount.innerText = nb
    if (nb > 10 && alertBox.innerHTML === "") {
        const alertBox = document.querySelector(".alert")
        const alertTxt = document.createElement('span');
        alertTxt.innerText = 'Too much characters'
        alertTxt.className = 'alertTxt'
        alertBox.appendChild(alertTxt);
    } else {
        if (nb < 10) {
            const alertBox = document.querySelector(".alert")
            alertBox.innerHTML = "";
        }
    }
}

input.addEventListener('input', showLenght);

//exo 3===================================================================================================================================//

const allItemList = [
    {
        'id': 'art0001',
        'name': 'apple',
        'price': '5'
    },
    {
        'id': 'art0002',
        'name': 'lemon',
        'price': '7'
    },
    {
        'id': 'art0003',
        'name': 'carrot',
        'price': '2'
    },
    {
        'id': 'art0004',
        'name': 'hot-pepper',
        'price': '17'
    }
]



const itemBtns = document.getElementsByClassName('itemBtn');

function createCartItem(itemData) {
    const cartItem = document.createElement("li")
    cartItem.className = "cartItem";
    cartItem.dataset.id = itemData.id;
    cartItem.dataset.qty = 1;
    cartItem.dataset.name = itemData.name;
    cartItem.dataset.price = itemData.price;
    cartItem.innerHTML = `${itemData.name}  
        <div class="qtyAndBtns">
        <button class="adjustQtyBtn" onclick="decrementQuantity(this)">-</button>
        <span class="selectedQty"> x ${1}</span>  
        <button class="adjustQtyBtn plus" onclick="incrementQuantity(this)">+</button>
        <span class="subTotal">${itemData.price} $
        </div>`
    return cartItem;
}

function addToCart(e) {
    const cartList = document.querySelector(".cart")
    const existingItem = Array.from(cartList.children).find(item => item.dataset.id === e.currentTarget.id)

    if (existingItem) {
        //calcul et affichage de la qté
        const qty = parseInt(existingItem.dataset.qty) + 1
        existingItem.dataset.qty = qty;
        const selectedQty = existingItem.querySelector('.selectedQty');
        selectedQty.innerText = `x ${qty}`;


        //calcul et affichage du prix
        const itemsPrice = parseInt(existingItem.dataset.price) * qty;
        const subTotal = existingItem.querySelector('.subTotal');
        subTotal.innerText = `${itemsPrice} $`

    } else {
        const itemData = allItemList.find(item => item.id === e.currentTarget.id)
        const cartItem = createCartItem(itemData);
        cartList.appendChild(cartItem);

    }
    updateBill();
}

function updateBill() {
    const cartList = document.querySelector('.cart');
    const nbItems = document.querySelector('.nbItem')
    const cartTotal = document.querySelector('.totalPrice');
    let total = 0;
    let items = 0;


    Array.from(cartList.children).forEach(item => {

        const itemId = item.dataset.id
        const currentQty = item.dataset.qty;



        const itemData = allItemList.find(data => data.id === itemId)
        const itemPrice = itemData.price


        total += itemPrice * currentQty;
        items += parseInt(currentQty);

    });

    nbItems.innerText = items;
    cartTotal.innerText = total;


}

function incrementQuantity(button) {
    const cartItem = button.closest('.cartItem');
    const qtyElement = cartItem.querySelector('.selectedQty');
    const subTotal = cartItem.querySelector('.subTotal')


    const currentQty = parseInt(cartItem.dataset.qty);
    const itemPrice = parseInt(cartItem.dataset.price);
    const currentPrice = (currentQty + 1) * itemPrice;

    // Incrémenter la quantité dans le dataset
    cartItem.dataset.qty = currentQty + 1;

    // Mettre à jour le texte affichant la quantité
    qtyElement.innerText = `x ${currentQty + 1}`;

    //mettre à jour le sous-total de l'article
    subTotal.innerText = `${currentPrice} $`

    // Mettre à jour le panier
    updateBill();
}

function decrementQuantity(button) {
    const cartItem = button.closest('.cartItem');
    const qtyElement = cartItem.querySelector('.selectedQty');
    const currentQty = parseInt(cartItem.dataset.qty);

    const subTotal = cartItem.querySelector('.subTotal')
    const itemPrice = parseInt(cartItem.dataset.price);
    const currentPrice = (currentQty - 1) * itemPrice;



    // Vérifier si la quantité est déjà à 1 pour éviter des quantités négatives
    if (currentQty > 1) {
        // Décrémenter la quantité dans le dataset
        cartItem.dataset.qty = currentQty - 1;

        // Mettre à jour le texte affichant la quantité
        qtyElement.innerText = `x ${currentQty - 1}`;

        //mettre à jour le sous-total de l'article
        subTotal.innerText = `${currentPrice} $`

        // Mettre à jour le panier
        updateBill();
    } else {
        // Si la quantité est déjà à 1, vous pouvez choisir de supprimer l'article du panier
        cartItem.remove();

        // Mettre à jour le panier
        updateBill();
    }
}

for (btn of itemBtns) {
    btn.addEventListener('click', addToCart)
}

const sortBtn = document.getElementById('sortA-Z');

function sortaz() {
    const cartList = document.querySelector('.cart');
    const sortedCart = Array.from(cartList.children).sort((a, b) => {
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Supprimer les éléments existants dans le panier
    cartList.innerHTML = '';

    // Ajouter les éléments triés au panier
    sortedCart.forEach(item => {
        cartList.appendChild(item);
    });


}

if (sortBtn) {
    sortBtn.addEventListener('click', sortaz)
}

const sortLowPriceBtn = document.querySelector('#sortLowPrice');
const sortHighPriceBtn = document.querySelector('#sortHighPrice');

function sortPrice(e) {
    const cartList = document.querySelector('.cart');
    const sortedCart = Array.from(cartList.children).sort((a, b) => {
        const priceA = parseFloat(a.dataset.price) * parseInt(a.dataset.qty);
        const priceB = parseFloat(b.dataset.price) * parseInt(b.dataset.qty);
        if (e.target.id === 'sortLowPrice') {

            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });
    cartList.innerHTML = '';

    sortedCart.forEach(item => {
        cartList.appendChild(item);
    });

}


sortLowPriceBtn.addEventListener('click', sortPrice)
sortHighPriceBtn.addEventListener('click', sortPrice)

const clearAllBtn = document.querySelector('#clearAll')

function clearAll() {
    const cartList = document.querySelector('.cart');
    cartList.innerHTML = '';

    updateBill();
}

clearAllBtn.addEventListener('click', clearAll);

/* Exo 4 ==================================================================================== */
// Sélectionnez les éléments avec la classe "digit"
const digitKeys = document.querySelectorAll('.digit');

// Sélectionnez les éléments avec la classe "symbol"
const symbolKeys = document.querySelectorAll('.symbol');

const enterBtn = document.querySelector('.enter');

let calcComplete = false;

// Sélectionnez le champ texte
const screen = document.getElementById('calculatorScreen');
const selectedOPeratorArea = document.querySelector('.selectedOperator')
const memoryArea = document.querySelector('.savedValue')

// Ajoutez un gestionnaire d'événements pour les touches représentant des chiffres
digitKeys.forEach(digitKey => {
    digitKey.addEventListener('click', function () {
        if (calcComplete) {
            memoryArea.innerText = "";
            selectedOPeratorArea.innerText = "";
            screen.value = this.dataset.value;
            calcComplete = false;
        } else {

            screen.value += this.dataset.value;
        }
    });
});

// Ajoutez un gestionnaire d'événements pour les touches représentant des symboles
symbolKeys.forEach(symbolKey => {
    symbolKey.addEventListener('click', function (e) {

        const currentValue = parseFloat(screen.value);



        if (currentValue !== null) {
            if (memoryArea.innerText === "") {
                selectedOPeratorArea.innerText = `${e.target.innerText}`;
                memoryArea.innerText = currentValue;
                screen.value = "";
            } else {
                const firstValue = parseFloat(memoryArea.innerText);
                const currentOperator = selectedOPeratorArea.innerText;
                const newValue = currentValue;

                let subResult;

                switch (currentOperator) {
                    case '+':
                        subResult = firstValue + newValue;
                        break;

                    case '-':
                        subResult = firstValue - newValue;
                        break;

                    case 'x':
                        subResult = firstValue * newValue;
                        break;

                    case ':':
                        subResult = firstValue / newValue;
                        break;
                    default:
                        console.error("Opérateur non reconnu");
                        return;
                }

                const formattedSubResult = subResult % 1 !== 0 ? result.toFixed(2) : subResult;


                memoryArea.innerText = formattedSubResult;
                selectedOPeratorArea.innerText = `${e.target.innerText}`;
                screen.value = "";
            }

        }

    });
});

enterBtn.addEventListener('click', function () {
    const currentValue = parseFloat(screen.value);

    const memoryArea = document.querySelector('.savedValue')

    const firstValue = parseFloat(memoryArea.innerText);
    const currentOperator = selectedOPeratorArea.innerText;
    const newValue = currentValue;

    let result;

    switch (currentOperator) {
        case '+':
            result = firstValue + newValue;
            break;

        case '-':
            result = firstValue - newValue;
            break;

        case 'x':
            result = firstValue * newValue;
            break;

        case ':':
            result = firstValue / newValue;
            break;
        default:
            console.error("Opérateur non reconnu");
            return;
    }

    const formattedResult = result % 1 !== 0 ? result.toFixed(2) : result;

    memoryArea.innerText = "";
    selectedOPeratorArea.innerText = '=';
    screen.value = formattedResult;
    calcComplete = true;
});

const clearButton = document.querySelector('.clear');

// Ajoutez un écouteur d'événement au bouton "CA"
clearButton.addEventListener('click', function () {
    // Réinitialisez toutes les valeurs à zéro
    memoryArea.innerText = "";
    selectedOPeratorArea.innerText = "";
    screen.value = "";
    calcComplete = false;
});

// Exo Pokedex ============================================================

const hiddenFold = document.querySelector('.rightFold-border')

hiddenFold.style.display = 'none';
const closedFold = document.querySelector('.closedFold');

//variables leds
const smallLeds = document.querySelectorAll('.led');
const mainLed = document.querySelector('.mainLed');

//variables écrans
const mainScreen = document.querySelector('.pokeScreen1');
const altScreen = document.querySelector('.pokeScreen2')
const sideScreen = document.querySelector('.rightScreen');
const greenScreen = document.querySelector('.greenScreen');
const miniScreens = document.querySelectorAll('.miniScreen')

//gestion des types et des résistances
const handleTypesAfinity = function (selectedData) {


    const attributes = selectedData.résistances;

    const weaknesses = [];
    const resistances = [];
    attributes.forEach(attribute => {
        if (attribute.multiplier > 1) {
            weaknesses.push(attribute.name)
        };
        if (attribute.multiplier < 1) {
            resistances.push(attribute.name)
        }
    });

    const resistantScreen = document.querySelector('#rightScreen');
    resistantScreen.innerHTML = "";
    const weakScreen = document.querySelector('#leftScreen');
    weakScreen.innerHTML = "";
    const resist = document.createElement('span');
    resist.className = 'miniScreenTitle';
    resist.innerText = 'resist';
    resistantScreen.appendChild(resist)

    const weak = document.createElement('span');
    weak.className = 'miniScreenTitle';
    weak.innerText = 'weak';
    weakScreen.appendChild(weak);

    resistances.forEach(resistance => {
        const resistanceImg = document.createElement('img');
        resistanceImg.className = 'typesImg';
        resistanceImg.src = `../assets/types_icons/${resistance}.png`;
        resistantScreen.appendChild(resistanceImg);
    });

    weaknesses.forEach(weakness => {
        const weaknessImg = document.createElement('img');
        weaknessImg.className = 'typesImg';
        weaknessImg.src = `../assets/types_icons/${weakness}.png`;
        weakScreen.appendChild(weaknessImg);
    });
}

const handleStats = function (selectedData) {
    //création de la liste
    greenScreen.innerHTML = "";
    const greenScreenTxt = document.createElement('ul')
    greenScreenTxt.innerText = 'STATS :'
    greenScreenTxt.className = 'statsList';
    greenScreen.appendChild(greenScreenTxt);

    //récupération des stats dans une variable
    const datasStats = selectedData.stats;

    function addStatWithDelay(stat, value, delay) {
        setTimeout(() => {
            const newStat = document.createElement('li');
            const statTxt = `${stat} : ${value}`;
            greenScreenTxt.appendChild(newStat);

            // effet de typing dans l'écran vert
            function typingEffect(element, text, index = 0) {
                element.textContent += text[index];

                // point final
                if (index === text.length - 1) {
                    return;
                }
                setTimeout(() => typingEffect(element, text, index + 1), 50);
            }

            typingEffect(newStat, statTxt);
        }, delay);
    }

    // Ajoutez chaque stat avec un délai entre chacune
    let delay = 0;
    Object.keys(datasStats).forEach((stat) => {
        addStatWithDelay(stat, datasStats[stat], delay);
        delay += 500; // Ajoutez un délai de 500 ms entre chaque ligne (ajustez selon vos besoins)
    });

}

//sauvegarde des données
const allPokemonData = [];

//affichage de l'artwork sur l'écran principal et appel les fonctions d'affichage des autres datas
const displayPokeData = function () {
    const selectedId = this.innerText.split(' ')[0];

    const alreadySelected = document.querySelector('.selectedPokeItem');
    if (alreadySelected) {
        alreadySelected.classList.remove('selectedPokeItem');
    }
    this.classList.add('selectedPokeItem')
    const selectedData = allPokemonData.find(pokemon => pokemon.id === selectedId)
    console.log(selectedData);
    if (selectedData) {
        selectedData.isSelected = true;
    }
    mainScreen.innerHTML = "";
    const displayedArtwork = document.createElement('img');
    displayedArtwork.className = 'displayedArtwork';
    displayedArtwork.src = `../assets/artworks/${selectedId}.png`
    mainScreen.appendChild(displayedArtwork);


    handleTypesAfinity(selectedData);
    handleStats(selectedData);
}

//utilisation du fetch pour récupérer les datas des pokémons depuis la BDD
const fetchpokedata = function () {

    const apiUrl = 'https://tyradex.tech/api/v1/pokemon';

    // Utilisation de Fetch pour effectuer une requête GET
    fetch(apiUrl)
        .then(response => {
            // Vérification si la requête a réussi (statut HTTP 200-299)
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            // Conversion de la réponse en JSON
            return response.json();
        })
        .then(data => {
            console.log(data);


            // Utilisation de forEach pour parcourir tous les éléments
            data.forEach((pokemon, index) => {
                // Création d'un objet avec le nom et l'ID attribué
                if (index !== 0 && index <= 151) {

                    const pokemonData = {
                        id: index.toString().padStart(3, '0'), // Format '001', '002', etc.
                        nom: pokemon.name.fr,
                        type: pokemon.types,
                        catégorie: pokemon.category,
                        stats: pokemon.stats,
                        taille: pokemon.height,
                        poids: pokemon.weight,
                        résistances: pokemon.resistances,
                        évolutions: pokemon.evolution,
                        isSelected: false
                    };

                    // Ajout de l'objet à notre tableau
                    allPokemonData.push(pokemonData);
                }
            });

            // traitement des données
            const pokeList = document.createElement('ul');
            pokeList.className = 'pokeList';
            sideScreen.appendChild(pokeList)

            allPokemonData.forEach((pokemonData) => {
                const pokeListItem = document.createElement('li')
                pokeListItem.innerText = `${pokemonData.id} : ${pokemonData.nom}`;
                pokeListItem.className = 'pokeListItem';
                pokeListItem.addEventListener('click', displayPokeData)
                pokeList.appendChild(pokeListItem)
            });
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur de fetch:', error);
        });
}
// Ouvre le pokedex et génère les informations et les animations
const openPokedex = function () {
    hiddenFold.style.display = 'flex';
    closedFold.style.display = 'none';
    smallLeds.forEach((led) => {
        led.style.opacity = '1';
        switch (led.classList[0]) {
            case 'red':
                led.style['box-shadow'] = '1px 1px 15px 4px #D14450';
                break;
            case 'yellow':
                led.style['box-shadow'] = '1px 1px 15px 4px #ECD444';
                break;
            case 'green':
                led.style['box-shadow'] = '1px 1px 15px 4px #5BAF6B';
                break;
            default:

                break;
        }
    });
    mainLed.style.opacity = '1';
    mainLed.style['box-shadow'] = '1px 1px 15px 8px #42BFFF';
    setTimeout(() => {
        mainScreen.classList.add('processingScreen')
        sideScreen.classList.add('processingScreen')
        miniScreens.forEach((miniScreen) => {
            miniScreen.classList.add('processingScreen')
        });
    }, 1000);

    setTimeout(() => {
        mainScreen.classList.remove('processingScreen');
        sideScreen.classList.remove('processingScreen');
        miniScreens.forEach((miniScreen) => {
            miniScreen.classList.remove('processingScreen')
            miniScreen.classList.remove('black')
        });
        mainScreen.classList.add('displayScreen');
        sideScreen.classList.add('displayScreen');
        miniScreens.forEach((miniScreen) => {
            miniScreen.classList.add('displayScreen')
        });
        fetchpokedata();
    }, 2000);
}



// Ajout d'un écouteur d'événements pour la touche "Entrée"
document.addEventListener('keydown', function (event) {
    // Vérifier si la touche appuyée est "Entrée" (code 13)
    if (event.code === 'Enter') {
        openPokedex();
    }
});

closedFold.addEventListener('click', openPokedex)