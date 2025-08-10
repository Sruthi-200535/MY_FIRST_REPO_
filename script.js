const backgrounds = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80"
];
let currentBgIndex = 0;

function searchWord() {
    const word = document.getElementById("wordInput").value;
    const resultDiv = document.getElementById("result");

    if (!word) {
        resultDiv.innerHTML = `<p class="error">Please enter a word!</p>`;
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.title) {
                resultDiv.innerHTML = `<p class="error">Word not found!</p>`;
                return;
            }

            let meaning = data[0].meanings[0].definitions[0].definition;
            let audio = data[0].phonetics[0]?.audio || "";
            let synonyms = data[0].meanings[0]?.synonyms?.slice(0, 5).join(", ") || "None";

            resultDiv.innerHTML = `
                <h2>${word}</h2>
                <p><strong>Meaning:</strong> ${meaning}</p>
                ${audio ? `<audio controls src="${audio}"></audio>` : ""}
                <p class="synonyms"><strong>Synonyms:</strong> ${synonyms}</p>
            `;
        })
        .catch(() => {
            resultDiv.innerHTML = `<p class="error">Error fetching word details!</p>`;
        });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function changeBackground() {
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    document.body.style.background = `
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url('${backgrounds[currentBgIndex]}') no-repeat center center/cover
    `;
}
