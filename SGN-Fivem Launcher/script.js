function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'config.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

    
function init() {
    loadJSON(function(response) {
        var j = JSON.parse(response);
        var url = "http://"+j.serverIP+'/players.json';
        axios.get(url)
            .then(function(res) {
                document.getElementById('sOffline').classList.add('hidden')
                document.getElementById('players').style.color = 'green';
                document.getElementById('players').innerText = res.data.length;
                document.getElementById('joinServer').classList.remove('hidden')
                document.getElementById('pOnline').classList.remove('hidden')
            })
            .catch(function (error) {
                // handle error
                document.getElementById('pOnline').classList.add('hidden')
                document.getElementById('sOffline').classList.remove('hidden')
                document.getElementById('joinServer').classList.add('hidden')
              })

        document.getElementById('playerLog').innerHTML = '';
        axios.get('http://'+j.serverIP+'/players.json')
        .then(function(res) {
            res.data.forEach(player => {
                var staff = player.identifiers.some((val) => staffDiscord.indexOf(val) !== -1);  
                var newElement = document.createElement('div');
                newElement.className = "playerBox col-lg-3";
                if(staff === true) {
                    newElement.innerHTML = "<p style='color:red;'>"+player.name+"</p>";
                } else {
                    newElement.innerHTML = "<p>"+player.name+"</p>";
                }
                document.getElementById('playerLog').appendChild(newElement)
            });
        })
    });
}

setInterval(() => {
    loadJSON(function(response) {
        var j = JSON.parse(response);
        var url = "http://srv1.revivalrp.com:30181/players.json";
        axios.get(url)
            .then(function(res) {
                document.getElementById('sOffline').classList.add('hidden')
                document.getElementById('players').style.color = 'green';
                document.getElementById('players').innerText = res.data.length;
                document.getElementById('joinServer').classList.remove('hidden')
                document.getElementById('pOnline').classList.remove('hidden')
            })
            .catch(function (error) {
                // handle error
                document.getElementById('pOnline').classList.add('hidden')
                document.getElementById('sOffline').classList.remove('hidden')
                document.getElementById('joinServer').classList.add('hidden')
              })

        document.getElementById('playerLog').innerHTML = '';
        axios.get('http://'+j.serverIP+'/players.json')
        .then(function(res) {
            res.data.forEach(player => {
                var staff = player.identifiers.some((val) => staffDiscord.indexOf(val) !== -1);  
                var newElement = document.createElement('div');
                newElement.className = "playerBox col-lg-3";
                if(staff === true) {
                    newElement.innerHTML = "<p style='color:red;'>"+player.name+"</p>";
                } else {
                    newElement.innerHTML = "<p>"+player.name+"</p>";
                }
                document.getElementById('playerLog').appendChild(newElement)
            });
        })
    });
}, 300000);

