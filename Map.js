function lon2tile(lon,zoom) { 
                return (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
            }
            function lat2tile(lat,zoom)  { 
                return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); 
            }
            function tile2long(x,z) {
                return (x/Math.pow(2,z)*360-180);
            }
            function tile2lat(y,z) {
                var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
                return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
            }
            function tiletoUrl(x, y, z){
                return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`
            }

            function createImage(src){
                const img = document.createElement('IMG');
                img.src = src;
                return img;
            }
            var zoom = 4 ;
            var lat = 0;
            var long = 0;
            var x = lon2tile(long, zoom);
            var y = lat2tile(lat ,zoom);

            function increaseZoom(){
                if(zoom <18){
                    zoom = zoom +1;
                    x = lon2tile(long, zoom);
                    y = lat2tile(lat ,zoom);
                    console.log("Zoom Clicked");

                showTiles(x, y, zoom);
                console.log(`Show tiles after line zoom = ${zoom}`);
                } 
                else{
                    console.log("Zoom increase limit reached");
                }
                
            }
            function decreaseZoom(){
                if(zoom >4){
                    zoom = zoom -1;
                    x = lon2tile(long, zoom);
                    y = lat2tile(lat ,zoom);
                    console.log("Zoom Clicked");
                    showTiles(x, y, zoom);
                    console.log(`Show tiles after line zoom = ${zoom}`);
                }  
                else{
                    console.log("Zoom decreasse limit reached");
                }           
                
            }

            const main = document.getElementById('main');

            function showTiles(x, y, zoom){
                while (main.firstChild) {
                        main.removeChild(main.firstChild);
                    }
                const imageRows = window.innerHeight / 256;
                const imageCols = window.innerWidth / 256;
                for(let i = 0; i< imageRows; i++){
                    const div = document.createElement('DIV');
                    div.classList.add('tiles');
                    main.appendChild(div);
                    for(let j = 0; j<imageCols; j++){
                        const img = createImage(tiletoUrl(x + j, y + i, zoom));
                        img.onerror = function(){
                            img.src = "grey.png";
                        }
                        div.appendChild(img);
                    }
                }
            }
            showTiles(x, y, zoom);
            window.addEventListener('wheel', event =>{
                if (event.deltaY > 0) {
                    increaseZoom();
                    console.log("Increased zoomm");
                }
                else{
                    decreaseZoom();
                    console.log("Decreased zoom");
                }
            } );
            function updatelatlong(){
                lat = tile2lat(y,zoom);
                long = tile2long(x, zoom);
            }
            window.addEventListener('keydown', function(e) {
                switch (e.keyCode) {
                    case 37:
                        console.log("left");
                        x -= 1;
                        updatelatlong();
                        showTiles(x,y,zoom);
                        break;
                    case 38:
                        console.log("up");
                        y -= 1;
                        updatelatlong();
                        showTiles(x,y,zoom);
                        break;
                    case 39:
                        console.log("right");
                        x += 1;
                        updatelatlong();
                        showTiles(x,y,zoom);
                        break;
                    case 40:
                        console.log("down");
                        y += 1;
                        updatelatlong();
                        showTiles(x,y,zoom);
                        break;
                    case 107:
                        console.log("Pressed + key");
                        increaseZoom();
                        break;
                    case 109:
                        console.log("Pressed - key");
                        decreaseZoom();
                        break;
                }
            });