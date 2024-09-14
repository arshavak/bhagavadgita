// प्रत्येक अध्याय में श्लोकों की संख्या का विवरण
show();

const chapterVerseCount = {
    1: 47,  // Chapter 1 में 47 श्लोक हैं
    2: 72,  // Chapter 2 में 72 श्लोक हैं
    3: 43,  // Chapter 3 में 43 श्लोक हैं
    4: 42,  // Chapter 4 में 42 श्लोक हैं
    5: 29,  // Chapter 5 में 29 श्लोक हैं
    6: 47,  // Chapter 6 में 47 श्लोक हैं
    7: 30,  // Chapter 7 में 30 श्लोक हैं
    8: 28,  // Chapter 8 में 28 श्लोक हैं
    9: 34,  // Chapter 9 में 34 श्लोक हैं
    10: 42, // Chapter 10 में 42 श्लोक हैं
    11: 55, // Chapter 11 में 55 श्लोक हैं
    12: 20, // Chapter 12 में 20 श्लोक हैं
    13: 35, // Chapter 13 में 35 श्लोक हैं
    14: 27, // Chapter 14 में 27 श्लोक हैं
    15: 20, // Chapter 15 में 20 श्लोक हैं
    16: 24, // Chapter 16 में 24 श्लोक हैं
    17: 28, // Chapter 17 में 28 श्लोक हैं
    18: 78  // Chapter 18 में 78 श्लोक हैं
};

// अध्याय चयन करने पर श्लोकों की संख्या अपडेट करें
document.getElementById('chapter').addEventListener('change', function () {
    const chapter = document.getElementById('chapter').value;
    const verseSelect = document.getElementById('slok');
    const totalVerses = chapterVerseCount[chapter]; // चुने गए अध्याय के श्लोकों की संख्या

    // श्लोक चयनकर्ता को रीसेट करें
    verseSelect.innerHTML = '';

    // श्लोक चयनकर्ता में नए विकल्प जोड़ें
    for (let i = 1; i <= totalVerses; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `श्लोकः -${i}`;
        verseSelect.appendChild(option);
    }
});

document.getElementById('chapter').addEventListener('change', show)
document.getElementById('slok').addEventListener('change', show)
 function show(){
    const chapter = document.getElementById('chapter').value;
    const slok = document.getElementById('slok').value;

    // JSON फ़ाइल के पथ को सही तरीके से सेट करें
    const fileName = `slok/bhagavadgita_chapter_${chapter}_slok_${slok}.json`;

    // JSON फ़ाइल को लोड करने के लिए fetch API का उपयोग करें
    fetch(fileName)
        .then(response => response.json())
        .then(data => {
            displaySlokaData(data); // डेटा को डिस्प्ले करने के लिए
        })
        .catch(error => console.error('Error fetching JSON file:', error)); // त्रुटि की स्थिति में
};

function displaySlokaData(data) {
    const slokasDisplay = document.getElementById('slokasDisplay');

    slokasDisplay.innerHTML = `<div id="head_part">
        <h3>अध्यायः ${data.chapter}, श्लोकः ${data.verse}</h3>
        <p><strong>Slok:</strong> ${data.slok}</p>
        <p><strong>Transliteration:</strong> ${data.transliteration}</p>
        </div>
        
        <h2 style="text-align:center">Commentaries:</h2>
        
        ${Object.values(data).filter(obj => typeof obj === 'object').map((author,index) => `
            <div id="C${index}" class="author-commentary">
                <h3 id="author">${author.author}</h3>
                ${Object.entries(author).map(([key, value]) => key !== 'author' ? `<p><strong>${key}:</strong> ${value}</p>` : '').join('')}
            </div>
        `).join('')}
    `;
}


