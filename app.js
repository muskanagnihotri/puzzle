document.addEventListener('DOMContentLoaded',()=>{
  const TOTAL_SLIDERS = 48;
  const COLUMNS = 3;
  const slidersContainer = document.getElementById('sliders-container');
  const scoreEl = document.getElementById('score');
  const timerEl = document.getElementById('timer');
  const DURATION = 60; // seconds (change as needed)
  let timerHandle = null;
  let started = false;

  // create columns
  const cols = [];
  for(let c=0;c<COLUMNS;c++){
    const col = document.createElement('div');
    col.className='column';
    slidersContainer.appendChild(col);
    cols.push(col);
  }

  const sliderEls = [];

  // Distribute sliders roughly evenly among columns
  for(let i=0;i<TOTAL_SLIDERS;i++){
    const col = cols[i % COLUMNS];
    const item = document.createElement('div');
    item.className = 'slider-item';

    // add a little random horizontal offset so sliders are not vertically aligned
    const offset = Math.floor(Math.random()*36) - 18; // -18..+17 px
    item.style.marginLeft = offset + 'px';

    const wrap = document.createElement('div');
    wrap.className='slider-wrap';

    const track = document.createElement('div');
    track.className='slider-track';

    const input = document.createElement('input');
    input.type='range';
    input.min='0';
    input.max='100';
    input.step='1';
    input.value='0';

    const valueLabel = document.createElement('div');
    valueLabel.className='value-label';
    valueLabel.textContent = '0';

    track.appendChild(input);
    wrap.appendChild(track);
    wrap.appendChild(valueLabel);
    item.appendChild(wrap);
    col.appendChild(item);

    sliderEls.push({input, valueLabel});

    // initially disable sliders until start
    input.disabled = true;

    input.addEventListener('input',()=>{
      valueLabel.textContent = input.value;
      updateScore();
    });
  }

  function updateScore(){
    let count=0;
    for(const s of sliderEls){
      if(Number(s.input.value)===50) count++;
    }
    scoreEl.textContent = count;
  }
  // Timer variables
  let remaining = DURATION;
  timerEl.textContent = remaining;

  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', ()=>{
    if(started) return;
    started = true;
    // enable sliders
    for(const s of sliderEls) s.input.disabled = false;
    // start countdown
    remaining = DURATION;
    timerEl.textContent = remaining;
    timerHandle = setInterval(()=>{
      remaining--;
      timerEl.textContent = remaining;
      if(remaining<=0){
        clearInterval(timerHandle);
        endRound();
      }
    },1000);
    // hide start button once started
    startBtn.style.display = 'none';
  });
  function endRound(){
    // disable sliders
    for(const s of sliderEls){
      s.input.disabled = true;
      s.input.classList.add('disabled');
    }
    // final score already shown
    // prepare final stats and navigate to a separate results page
    const finalScore = Number(scoreEl.textContent);
    let count100 = 0;
    let sum100 = 0;
    let totalSumAll = 0;
    for(const s of sliderEls){
      const v = Number(s.input.value);
      totalSumAll += v;
      if(v === 100){
        count100 += 1;
        sum100 += 100;
      }
    }
    // store results in sessionStorage and redirect
    sessionStorage.setItem('finalScore', String(finalScore));
    sessionStorage.setItem('count100', String(count100));
    sessionStorage.setItem('sum100', String(sum100));
    sessionStorage.setItem('totalSumAll', String(totalSumAll));
    window.location.href = 'result.html';
  }

});
