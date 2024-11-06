$(document).ready(function() {
    $('#searchButton').on('click', function() {
        const query = $('#searchInput').val().trim();
        console.log("Search button clicked. Query:", query);  

        $.ajax({
            url: 'superheroes.php',
            type: 'GET',
            data: { query: query },
            dataType: 'json',
            success: function(data) {
                console.log("AJAX call successful. Data received:", data);  
                displayResult(data, query);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error fetching data:", textStatus, errorThrown);  
                $('#result').html('<p>Error fetching superheroes list.</p>');
            }
        });
    });
});

function displayResult(data, query) {
    const resultDiv = $('#result');
    resultDiv.empty();
    
    
    resultDiv.append('<h2>Result</h2>');

    if (query && data.length === 1) {
        const superhero = data[0];
        resultDiv.append(`
            <div class="superhero-card">
                <h3>${superhero.alias}</h3>
                <h4>${superhero.name}</h4>
                <p>${superhero.biography}</p>
            </div>
        `);
    } else if (data.length > 0) {
        let listItems = data.map(hero => `<li>${hero}</li>`).join('');
        resultDiv.append(`<ul>${listItems}</ul>`);
    } else {
        resultDiv.append('<p>SUPERHERO NOT FOUND</p>');
    }
}



