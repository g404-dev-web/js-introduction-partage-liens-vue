let app = new Vue({
    el: '#contenu',
    data: {
        liens: [{
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
        ],
        nouveauLien: {
            titre: '',
            url: '',
            auteur: ''
        }
    },
    methods: {
        ajouterLien: function(event) {
            this.liens.unshift(this.nouveauLien);
            event.target.reset();
        }
    }
})