const text = document.getElementById('text')
const download = document.getElementById('download')
const pdf = document.getElementById('pdf')
const ruled = document.getElementById('ruled')
let w = new Worker('worker.js')

function makepdf () {
  w.terminate()
  w = new Worker('worker.js')
  w.postMessage([text.value, ruled.checked])
  w.addEventListener('message', (e) => {
    pdf.src = e.data
    download.download = `${pdf.src.slice(4, pdf.src.length)}.pdf`
    download.href = pdf.src
  })
}

let time
const DEBOUNCE_INTERVAL = 800

const onInput = () => {
  clearTimeout(time)
  time = setTimeout(makepdf, DEBOUNCE_INTERVAL)
}

text.addEventListener('input', onInput)
ruled.addEventListener('click', makepdf)
makepdf()
