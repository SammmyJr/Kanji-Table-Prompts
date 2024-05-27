const table = document.getElementById("kanjitable");

document.body.classList.add("light");

document.getElementById("makeTableButton").addEventListener("click", createKanjiTable);
document.getElementById("clear").addEventListener("click", clearTable);

document.getElementById("showButton").addEventListener("click", function() {
    table.classList.add("showAll");
    table.classList.remove("hideAll");
});

document.getElementById("hideButton").addEventListener("click", function() {
    table.classList.remove("showAll");
    table.classList.add("hideAll");
});

document.getElementById("print").addEventListener("click", function() {
    table.classList.remove("showAll");
    table.classList.add("hideAll");
    print();
    table.classList.add("showAll");
    table.classList.remove("hideAll");
});


clearTable();

class Prompt {
    constructor(kanji, hiragana, english) {
        this.kanji = kanji;
        this.hiragana = hiragana;
        this.english = english;
    };
};

prompts = []
fetchJSONData();

function fetchJSONData() {
    fetch("./genki.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            prompts = data;
            document.getElementById("loadText").innerHTML = `Loaded ${prompts.length} prompts!`;
        })
        .catch((error) => 
            console.error("Unable to fetch data:", error));
}

function clearTable() {
    table.innerHTML = "";
    document.getElementById("buttons").style.display = "none";
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createKanjiTable() {
    clearTable();
    table.classList.remove("showAll");
    table.classList.add("hideAll");
    document.getElementById("buttons").style.display = "flex";
    shuffleArray(prompts);

    let tableHeader = document.createElement("tr");

    let kanjiHeader = document.createElement("th");
    let hiraganaHeader = document.createElement("th");
    let englishHeader = document.createElement("th");

    kanjiHeader.innerHTML = "Kanji";
    hiraganaHeader.innerHTML = "Hiragana";
    englishHeader.innerHTML = "English";

    tableHeader.appendChild(kanjiHeader);
    tableHeader.appendChild(hiraganaHeader);
    tableHeader.appendChild(englishHeader);

    table.appendChild(tableHeader);

    i = 0
    amount = document.getElementById("amount").value;

    prompts.forEach(prompt => {
        if (i < amount) {
            let row = document.createElement("tr");

            let kanji = document.createElement("td");
            let hiragana = document.createElement("td");
            let english = document.createElement("td");

            kanji.innerHTML = prompt.kanji;
            hiragana.innerHTML = prompt.hiragana;
            english.innerHTML = prompt.english;

            kanji.classList.add("japanese");
            hiragana.classList.add("japanese");
            
            switch(Math.floor(Math.random() * 3)) {
                case 0:
                    kanji.classList.add("show");
                    break;
                case 1:
                    hiragana.classList.add("show");
                    break;
                case 2:
                    english.classList.add("show");
                    break;
            }

            row.appendChild(kanji);
            row.appendChild(hiragana);
            row.appendChild(english);

            table.appendChild(row);
        }
        i++;
    });
};