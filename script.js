console.log("GitHelp funcionando!");

const comandosGit = {

    "git init":
        "Cria um novo repositório Git no seu projeto.",

    "git add":
        "Adiciona arquivos para serem incluídos no próximo commit.",

    "git commit":
        "Salva as alterações do projeto em uma nova versão.",

    "git push":
        "Envia os commits do computador para o GitHub.",

    "git pull":
        "Baixa as alterações do repositório remoto para o computador.",

    "git clone":
        "Copia um repositório existente para o seu computador.",

    "git status":
        "Mostra o estado atual dos arquivos do projeto."

};


const comandosBtn =
    document.getElementById("comandos-btn");

const listaComandos =
    document.getElementById("lista-comandos");


comandosBtn.addEventListener("click", function () {

    if (listaComandos.innerHTML === "") {

        listaComandos.innerHTML = `

            <p>git init</p>

            <p>git add</p>

            <p>git commit</p>

            <p>git push</p>

            <p>git pull</p>

            <p>git clone</p>

            <p>git status</p>

        `;

        comandosBtn.textContent = "Ocultar comandos";

    } else {

        listaComandos.innerHTML = "";

        comandosBtn.textContent = "Ver comandos";

    }

});

const guiaBtn =
    document.getElementById("guia-btn");

const guia =
    document.getElementById("guia");


guiaBtn.addEventListener("click", function () {

    if (guia.innerHTML === "") {

        guia.innerHTML = `

            <p>1. Instale o Git</p>

            <p>2. Crie uma conta no GitHub</p>

            <p>3. Crie um repositório</p>

            <p>4. Use git add</p>

            <p>5. Use git commit</p>

            <p>6. Use git push</p>

        `;

        guiaBtn.textContent = "Ocultar guia";

    } else {

        guia.innerHTML = "";

        guiaBtn.textContent = "Ver guia";

    }

});


const campoPesquisa =
    document.getElementById("campo-pesquisa");

const botaoPesquisa =
    document.getElementById("botao-pesquisa");

const resultadoPesquisa =
    document.getElementById("resultado-pesquisa");


botaoPesquisa.addEventListener("click", function () {

    const pesquisa =
        campoPesquisa.value.toLowerCase().trim();


    if (pesquisa === "") {

        resultadoPesquisa.textContent =
            "Digite alguma coisa para pesquisar.";

        return;

    }


    /* Procura primeiro entre os comandos */

    if (comandosGit[pesquisa]) {

        resultadoPesquisa.textContent =
            comandosGit[pesquisa];

        return;

    }


    /* Caso não seja comando, procura no GitHub */

    resultadoPesquisa.textContent =
        "Pesquisando no GitHub...";


    buscarNoGitHub(pesquisa);

});


function buscarNoGitHub(pesquisa) {

    const url =
        `https://api.github.com/search/repositories?q=${encodeURIComponent(pesquisa)}`;


    fetch(url)

        .then(function (resposta) {

            if (!resposta.ok) {

                throw new Error("Erro ao acessar o GitHub.");

            }

            return resposta.json();

        })

        .then(function (dados) {

            if (dados.items.length === 0) {

                resultadoPesquisa.textContent =
                    "Nenhum repositório encontrado no GitHub.";

                return;

            }


            const repositorio =
                dados.items[0];


            resultadoPesquisa.innerHTML = `

                <strong>${repositorio.full_name}</strong>

                <br>

                ${repositorio.description || "Sem descrição."}

                <br><br>

                ⭐ ${repositorio.stargazers_count} estrelas

                <br>

                💻 Linguagem:
                ${repositorio.language || "Não informada"}

            `;

        })

        .catch(function (erro) {

            console.error(erro);

            resultadoPesquisa.textContent =
                "Não foi possível buscar informações no GitHub.";

        });

}

const botoesCodigo =
    document.querySelectorAll(".codigo-btn");


botoesCodigo.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const conteudo =
            botao.nextElementSibling;


        if (conteudo.style.display === "block") {

            conteudo.style.display = "none";

        } else {

            conteudo.style.display = "block";

        }

    });

});

const videoBtn =
    document.getElementById("video-btn");


videoBtn.addEventListener("click", function () {

    window.open(
        "https://www.youtube.com/watch?v=-l4Aa8wef8s",
        "_blank"
    );

});