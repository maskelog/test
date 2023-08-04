// function setNightMode() {
//     document.querySelector('body').style.backgroundColor = 'black';
//     document.querySelector('body').style.color = 'white';
// }

// function setDayMode() {
//     document.querySelector('body').style.backgroundColor = 'white';
//     document.querySelector('body').style.color = 'black';
// }

function setMode() {
    var target = document.querySelector('body')
    if(this.value === 'night'){
        target.style.backgroundColor = 'black';
        target.style.color = 'white';
        this.value = 'day';
    }
    else
    {
        target.style.backgroundColor = 'white';
        target.style.color = 'black';
        this.value = 'night';
        
    }

}

