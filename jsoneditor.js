
        // create the editor
        // two editor , one for code and another for parse value.
        var container_code = document.getElementById("js-code");
        var container_view = document.getElementById("js-viewer");


        // json editor options
        var options_code = {
             mode: 'code',
            //modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            onError: function (err) {
              alert(err.toString());
            },
            onModeChange: function (newMode, oldMode) {
              console.log('Mode switched from', oldMode, 'to', newMode);
            }
        };

        var options_view = {
             mode: 'view',
            //modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            onError: function (err) {
              alert(err.toString());
            },
            onModeChange: function (newMode, oldMode) {
              console.log('Mode switched from', oldMode, 'to', newMode);
            }
        };
        
        var editor_code = new JSONEditor(container_code, options_code);
        var editor_view = new JSONEditor(container_view, options_view);
        
        /// Read downloaded file
        var xhr = new XMLHttpRequest(); 
        xhr.onreadystatechange = function (e) { 

        if (this.readyState == 4) { 
            var json = this.responseText; 
            editor_code.set(JSON.parse(json));
            editor_view.set(JSON.parse(json));
            } 
        } 
        var filePath = window.location.search.substring(1);
        xhr.open('GET', "file://" + filePath.substr(filePath.indexOf('=')+1)); 
        xhr.overrideMimeType("application/json"); 
        xhr.send();

      
        // editor.set(json);
 
        