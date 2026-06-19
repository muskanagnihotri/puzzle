document.addEventListener('DOMContentLoaded',()=>{
  const finalScoreEl = document.getElementById('final-score');
  const count100El = document.getElementById('count-100');
  const sum100El = document.getElementById('sum-100');
  const totalSumEl = document.getElementById('total-sum');

  const finalScore = sessionStorage.getItem('finalScore') || '0';
  const count100 = sessionStorage.getItem('count100') || '0';
  const sum100 = sessionStorage.getItem('sum100') || '0';
  const totalSumAll = sessionStorage.getItem('totalSumAll') || '0';

  finalScoreEl.textContent = finalScore;
  count100El.textContent = count100;
  sum100El.textContent = sum100;
  totalSumEl.textContent = totalSumAll;
});
