var display = document.getElementById('display');
var historyEl = document.getElementById('history');
var lastRecordEl = document.getElementById('last-record');
var page = 10
function appendToScreen(btnVal) {
  display.value += btnVal;
}

function clearScreen() {
  display.value = '';
}

function deleteCharacter() {
  if (display.value) {
    display.value = display.value.slice(0, -1);
  }
}

function getHistory() {
  fetch("http://localhost:8080/calculate/queryAllByPage?page=" + page, {
    method: 'POST'
  }).then(response => {
    response.json().then(data => {
      console.log(data);
      historyEl.innerHTML = ''
      data.forEach(item => {
        let pEl = document.createElement('p')
        pEl.innerText = item.formula + ' = ' + item.result
        historyEl.append(pEl)
      })
    })
  }).catch(error => {
    alert('网络错误')
  })
}

function showLastCalculations() {
  lastRecordEl.innerHTML = '';
  fetch("http://localhost:8080/calculate/getLastRecord", {
    method: 'POST'
  })
    .then(response => {
      if (response.ok) {
        response.json().then(records => {
          console.log(records); // 调试语句
          const lastRecordEl = document.getElementById('last-record');
          lastRecordEl.innerHTML = ''; // 清空容器元素

          records.forEach(record => {
            let pEl = document.createElement('div');
            pEl.innerText = record.formula + ' = ' + record.result;
            lastRecordEl.append(pEl);
          });
        });
      } else {
        throw new Error('无法获取最后一次计算过程');
      }
    })
    .catch(error => {
      alert(error.message);
    });
}

function saveHistory(formula, result) {
  fetch("http://localhost:8080/calculate/save", {
    method: 'POST',
    body: JSON.stringify({ formula: formula, result: result }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    response.text().then(data => {
      console.log(data);
      getHistory(page);
    })
  }).catch(error => {
    alert('网络错误')
  })
}

// 符号按钮点击事件
document.getElementById("buttons").addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var btnVal = e.target.innerText;
    switch (btnVal) {
      case '=':
        try {
          var result = new Function('return ' + display.value)();
          saveHistory(display.value, result.toString())
          display.value = result.toString();
        } catch (err) {
          display.value = "错误";
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '(':
      case ')': // 添加对括号按钮的处理
        appendToScreen(btnVal);
        break;
    }
  }
});

// 控制键点击事件
document.getElementById("control-keys").addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var btnVal = e.target.innerText;
    switch (btnVal) {
      case 'C':
        clearScreen();
        break;
      case 'DEL':
        deleteCharacter();
        break;
        case 'Ans':
        showLastCalculations();
        break;
        case 'history':
        try {
          page = parseInt(display.value)
        } catch(err) {
          page = 10
        }
        getHistory()
        break;
    }
  }
});

// 高级运算按钮点击事件
document.getElementById("advanced-buttons").addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var op = e.target.innerText;
    var curVal = parseFloat(display.value);
    switch (op) {
      case 'e^x':
        display.value = `Math.exp(${curVal})`; // 显示计算过程
        break;
      case 'e':
        display.value = Math.E.toString();
        break;
      case 'ln':
        display.value = `Math.log(${curVal})`; // 显示计算过程
        break;
      case 'x^y':
        display.value = `Math.pow(${curVal}, y)`; // 这里假设y是想要使用的变量
        break;
      case '√':
        display.value = `Math.sqrt(${curVal})`; // 显示计算过程
        break;
      case 'sin':
        var rad = curVal * (Math.PI / 180); // 把角度转换为弧度
        display.value = `Math.sin(${curVal})`; // 显示计算过程
        break;
      case 'cos':
        var rad = curVal * (Math.PI / 180); // 把角度转换为弧度
        display.value = `Math.cos(${curVal})`; // 显示计算过程
        break;
      case 'tan':
        var rad = curVal * (Math.PI / 180); // 把角度转换为弧度
        display.value = `Math.tan(${curVal})`; // 显示计算过程
        break;
      case 'log':
        display.value = `Math.log10(${curVal})`; // 显示计算过程
        break;
      case 'π':
      display.value = Math.PI.toString();
      break;
    }
  }
});