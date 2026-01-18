async function fetchResults(format='json'){
  const form = document.getElementById('filters');
  const formData = new FormData(form);
  const params = new URLSearchParams();
  for (const [k,v] of formData.entries()){
    if (v && v.trim() !== '') params.append(k, v);
  }
  if (format) params.append('format', format);
  const url = '/api/faculties?' + params.toString();
  const res = await fetch(url);
  if (!res.ok) {
    alert('Error fetching results');
    return null;
  }
  if (format === 'csv'){
    const text = await res.text();
    return text;
  }
  return await res.json();
}

function renderTable(data){
  const tbody = document.querySelector('#table tbody');
  tbody.innerHTML = '';
  if (!data || !data.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 10;
    td.textContent = 'No results';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  data.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${f.id}</td><td>${escapeHtml(f.name)}</td><td>${escapeHtml(f.short_name||'')}</td><td>${escapeHtml(f.established_year||'')}</td><td>${escapeHtml(f.website||'')}</td><td>${escapeHtml(f.address_street||'')}</td><td>${escapeHtml(f.address_city||'')}</td><td>${escapeHtml(f.postal_code||'')}</td><td>${escapeHtml(f.university||'')}</td><td>${(f.Departments||[]).map(d=>escapeHtml(d.dept_name)).join('; ')}</td>`;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s){
  if (s === undefined || s === null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.getElementById('apply').addEventListener('click', async ()=>{
  const data = await fetchResults('json');
  renderTable(data);
});

document.getElementById('reset').addEventListener('click', ()=>{
  document.getElementById('filters').reset();
});

document.getElementById('downloadJson').addEventListener('click', async ()=>{
  const data = await fetchResults('json');
  if (data === null) return;
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'faculties.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('downloadCsv').addEventListener('click', async ()=>{
  const csv = await fetchResults('csv');
  if (csv === null) return;
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'faculties.csv';
  a.click();
  URL.revokeObjectURL(url);
});


(async ()=>{
  const data = await fetchResults('json');
  renderTable(data);
})();
