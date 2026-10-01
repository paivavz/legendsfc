// ======================================
// DADOS DOS JOGADORES
// ======================================

const players = {

    messi: {
        name: "Lionel Messi",
        category: "Ícone",
        position: "Argentina • Atacante",
        description:
            "Um dos maiores jogadores da história do futebol, conhecido por sua técnica, dribles, visão de jogo, passes e capacidade de finalização."
    },

    cristiano: {
        name: "Cristiano Ronaldo",
        category: "Ícone",
        position: "Portugal • Atacante",
        description:
            "Um dos maiores goleadores do futebol, conhecido por sua potência, velocidade, finalização, jogo aéreo e longevidade."
    },

    neymar: {
        name: "Neymar",
        category: "Ícone",
        position: "Brasil • Atacante",
        description:
            "Um dos principais jogadores brasileiros de sua geração, conhecido por seus dribles, criatividade, habilidade individual e capacidade de criar jogadas."
    },

    yamal: {
        name: "Lamine Yamal",
        category: "Nova geração",
        position: "Espanha • Ponta",
        description:
            "Jovem jogador ofensivo conhecido por sua velocidade, criatividade, drible e capacidade de criar oportunidades."
    },

    pedri: {
        name: "Pedri",
        category: "Nova geração",
        position: "Espanha • Meio-campista",
        description:
            "Meio-campista conhecido por controle de bola, inteligência, passes e capacidade de organizar o jogo."
    },

    bellingham: {
        name: "Jude Bellingham",
        category: "Nova geração",
        position: "Inglaterra • Meio-campista",
        description:
            "Meio-campista moderno conhecido por sua força, condução de bola, chegada ao ataque e versatilidade."
    },

    olise: {
        name: "Michael Olise",
        category: "Nova geração",
        position: "França • Atacante",
        description:
            "Jogador ofensivo conhecido por criatividade, dribles, passes e capacidade de criar jogadas."
    }

};


// ======================================
// ELEMENTOS
// ======================================

const modal = document.getElementById("playerModal");

const modalClose =
    document.getElementById("modalClose");

const modalName =
    document.getElementById("modalName");

const modalCategory =
    document.getElementById("modalCategory");

const modalPosition =
    document.getElementById("modalPosition");

const modalDescription =
    document.getElementById("modalDescription");

const profileButtons =
    document.querySelectorAll(".details-button");


// ======================================
// ABRIR PERFIL
// ======================================

profileButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        event.stopPropagation();


        const card =
            button.closest(".player-card");


        if (!card) {
            return;
        }


        const playerId =
            card.getAttribute("data-player");


        const player =
            players[playerId];


        if (!player) {
            console.error(
                "Jogador não encontrado:",
                playerId
            );

            return;
        }


        modalName.textContent =
            player.name;

        modalCategory.textContent =
            player.category;

        modalPosition.textContent =
            player.position;

        modalDescription.textContent =
            player.description;


        modal.classList.add("show");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    });

});


// ======================================
// FECHAR MODAL
// ======================================

function closeModal() {

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


// ======================================
// PESQUISA
// ======================================

const searchInput =
    document.getElementById("searchInput");

const playerCards =
    document.querySelectorAll(".player-card");

const noResults =
    document.getElementById("noResults");

let currentFilter = "todos";


function filterPlayers() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    let visiblePlayers = 0;


    playerCards.forEach(function(card) {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category;


        const matchesSearch =
            name.includes(search);


        const matchesFilter =
            currentFilter === "todos" ||
            category === currentFilter;


        if (
            matchesSearch &&
            matchesFilter
        ) {

            card.style.display = "";

            visiblePlayers++;

        } else {

            card.style.display = "none";

        }

    });


    noResults.style.display =
        visiblePlayers === 0
            ? "block"
            : "none";
}


searchInput.addEventListener(
    "input",
    filterPlayers
);


// ======================================
// FILTROS
// ======================================

const filterButtons =
    document.querySelectorAll(".filter");


filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            filterButtons.forEach(
                function(btn) {
                    btn.classList.remove("active");
                }
            );


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            filterPlayers();

        }
    );

});
