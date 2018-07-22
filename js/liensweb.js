// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [{
        titre: "So Foot",
        url: "http://sofoot.com/",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org/",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://wikipedia.org/",
        auteur: "annie.zette"
    }
];


// On execute la fonction tout de suite pour initialiser les liens
rafraichirLiensHtml();

//Bouton d'affichage du formulaire
let boutonAffichageForm = document.getElementById("ajoutForm");

//Creation Elements du message de confirmation
let adresseDuLien = document.getElementById("adresseDuLien");
let messageLien = document.getElementById("confirmation");

//animation Affichage du formulaire d'ajout lors du click
boutonAffichageForm.addEventListener('click', function() {
    boutonAffichageForm.style.display = "none"; // cache notre bouton
    let formElt = creationFormulaire();
    document.body.insertBefore(formElt, contenu); // Permet de le situer avant le contenue.

    // Animations et validation du formulaire (bouton ajouter)
    formElt.addEventListener('submit', function(event) {
        event.preventDefault();
        let lien = nouveauLien(formElt);
        boutonAffichageForm.style.display = "inline-block";
        formElt.remove();

        adresseDuLien.textContent = lien.url;
        messageLien.style.display = "block";
        // On fait disparaitre le bandeau au bout de 5 secondes
        setTimeout(function() {
            messageLien.style.display = "none";
        }, 5000);
    });

});


// Votre code ici

$('#boutonAjouterLiensExternes').click(function() {
    $.get('https://oc-jswebsrv.herokuapp.com/api/liens', function(data) {
        listLiens.concat(data);
        rafraichirLiensHtml();
    })
});


/////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Fonction de création de liens
 *
 * Vide le contenu entièrement, puis
 * recréé les liens en bouclant sur le tableau
 */
function rafraichirLiensHtml() {
    document.getElementById("contenu").innerHTML = " ";
    listeLiens.forEach(function(listeLiens) {
        var newdiv = document.createElement("div");
        newdiv.className = "lien";
        document.getElementById("contenu").appendChild(newdiv);

        var lien = document.createElement("h4");
        lien.innerHTML = "<a href=" + listeLiens.url + " style='color:#428bca;'>" + listeLiens.titre + "</a>" + " <span>" + listeLiens.url + "<br>" + listeLiens.auteur + "</span>";
        newdiv.appendChild(lien);
    })
};

/**
 * Fonction de création de formulaire
 * Créé une balise form et la retourne
 *
 * @returns HTMLFormElement
 * https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement
 */
function creationFormulaire() {
    //Creation de l'Element Formulaire : formElt
    let formElt = document.createElement("form");

    formElt.className = "formulaire";
    formElt.appendChild(creerInput({
        "type": "text",
        /* type est un attributs et text est clef */
        "name": "auteur",
        "placeholder": "Entrez votre nom",
        "required": "required"
    }));
    formElt.appendChild(creerInput({
        "type": "text",
        "name": "titre",
        "placeholder": "Entrez le titre du lien",
        "size": "30",
        "required": "required"
    }));
    formElt.appendChild(creerInput({
        "type": "text",
        "name": "url",
        "placeholder": "Entrez l'URL du lien",
        "size": "30",
        "required": "required"
    }));
    formElt.appendChild(creerInput({
        "type": "submit",
        "name": "bouton",
        "value": "Ajouter"
    }));

    return formElt;
}

/**
 * Fonction de création d'input
 * Créé une balsie input et la retourne
 *
 * @param attributs
 * @returns {HTMLInputElement}
 */
function creerInput(attributs) {
    // Création d'un élément input
    let element = document.createElement("input");

    // Pour chaque attribut passé en paramètre, on le définit sur l'input
    for (var clef in attributs) {
        element.setAttribute(clef, attributs[clef])
    }

    // On renvoie l'élément
    return element;
}

/**
 * Fonction de création d'un nouvel objet lien
 * Créé un objet lien et le retourne
 *
 * @param formElt
 * @returns {{titre, url, auteur}}
 */
function nouveauLien(formElt) {
    let urlSaisie = formElt.elements.url.value;

    if (!urlSaisie.match(/https?:\/\//)) {
        urlSaisie = 'http://' + urlSaisie;
    }

    let lien = {
        titre: formElt.elements.titre.value,
        url: urlSaisie,
        auteur: formElt.elements.auteur.value,
    }

    listeLiens.unshift(lien); // unshift, ajoute au début d'un tableau

    rafraichirLiensHtml();

    return lien;
}