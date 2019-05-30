function safe_tags(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "\\n");
}

const renderPlayground = content => `
<link rel="stylesheet" href="/assets/element-icons.css" />
<style type="text/css" media="screen">
    #parent {
      width: 50%;
      height: 250px;
      display: inline-flex;
      position: relative;
    }

    #editor {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    #output {
      display: block;
      width: 50%;
      height: 250px;
      border-left: 0.5px solid lightgray;
      padding: 10px;
      overflow: scroll;
    }

    #container {
      width: 100%;
      display: flex;
      height: 250px;
      overflow: hidden;
      margin: 20px 0;
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1),
        0 6px 6px rgba(0, 0, 0, 0.15);
    }
    
    #zoom-btn {
        width: 80px;
    }

    .pressed {
        background-color: grey;
        color: white;
    }

    .btn:focus {
    outline: 0;
}

  </style>
  </head>
  <script
  src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.4/ace.js"
  type="text/javascript"
  charset="utf-8"
  ></script>
  <div>
    <div id="container">
        <div id="parent">
          <div id="editor"></div>
        </div>
        <script>
          function unsafe_tags(str) {
            return str
              .replace(/(&amp;)/g, "&")
              .replace(/(&lt;)/g, "<")
              .replace(/(&gt;)/g, ">")
              .replace(/(\\n)/g, "\\n");
          }

          function debounce(func, wait, immediate) {
            var timeout;

            return function executedFunction() {
              var context = this;
              var args = arguments;
                
              var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
              };

              var callNow = immediate && !timeout;
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
              if (callNow) func.apply(context, args);
            }
          }

          var editor = ace.edit("editor");
          editor.setTheme("ace/theme/chrome");
          editor.setOptions({
            showPrintMargin: false,
            fontSize: 16
          });
          editor.session.setMode("ace/mode/html");
          editor.setAutoScrollEditorIntoView(true);
          editor.session.setUseSoftTabs(true);
          editor.session.insert(editor.getCursorPosition(),"${safe_tags(
            content
          )}");

          editor.session.setValue(unsafe_tags(editor.session.getValue()))

          document.addEventListener("DOMContentLoaded", function(event) {
            let output = document.querySelector("#output");
            
            var config = { attributes: true, childList: true, subtree: true };

            var callback = function(mutationsList, observer) {
              let n = Array.from(mutationsList[0].addedNodes)
              n = n.filter(s => s instanceof HTMLScriptElement)
              n.forEach(s => eval(s.innerText))
            }

            setTimeout(() => {
              Array.from(output.children).forEach(s => s instanceof HTMLScriptElement ? eval(s.innerText) : void(0))
            }, 1000)
            
            var observer = new MutationObserver(debounce(callback, 2000));
            observer.observe(output, config);
            output.innerHTML = "${safe_tags(content) || ""}";
            output.innerHTML = unsafe_tags(output.innerHTML)
            editor.session.on("change", function(delta) {
              output.innerHTML = editor.getValue();
            })
          })

          function reScale(sf, index) {
            document.getElementById('output').style.transform = "scale(" + sf + ")"
            btns = document.getElementById('zoomBtns').children
            for (i = 0; i < btns.length; i++) {
                btns.item(i).classList.remove('pressed');
            }
            btns.item(index).classList.add('pressed');
          }

        </script>
        <div id="output" style="transform: scale(2); transform-origin: 0% 0% 0px;"></div>
    </div>
    <div id='zoomBtns' style="display: flex; justify-content: flex-end;">
      <button id='zoom-btn' onclick="reScale(1, 0)">1x</button>
      <button id='zoom-btn' onclick="reScale(1.5, 1)">1.5x</button>
      <button id='zoom-btn' onclick="reScale(2, 2)" class='pressed'>2x</button>
    </div>
  </div>
`;

exports.defineTags = function(dictionary) {
  dictionary.defineTag("playground", {
    mustHaveValue: true,
    mustNotHaveDescription: true,
    canHaveType: false,
    canHaveName: false,
    onTagged: function(doclet, tag) {
      let componentName = doclet.meta.filename.replace(/(.js)/g, "");
      doclet.authentication = tag.value;
      doclet.description = `
        <script src="/dist/standard-bundle.js"></script>
        <h2> Playground </h2>
        ${renderPlayground(tag.title === "playground" ? tag.value : null)}
      `;
    }
  });
};

exports.handlers = {
  newDoclet: function(e) {}
};
