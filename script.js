const btnBuscar = document.querySelector('#btn-buscar')
const inputCidade = document.querySelector('#cidade')
const climaCard = document.querySelector('#clima-card')
const erro = document.querySelector('#erro')

const chave = 'a7b5cedcc65765dc0435136c4d5dc2f0'

btnBuscar.addEventListener('click', function() {

    const cidade = inputCidade.value
    
    if (cidade === '') {
        erro.textContent = 'Digite o nome de uma cidade.'
        climaCard.classList.remove('visivel')
        return
    }

    buscarClima(cidade)
})

async function buscarClima(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`

    try {
        erro.textContent = ''
        const resposta = await fetch(url)
        const dados = await resposta.json()

        if (dados.cod === '404') {
            erro.textContent = 'Cidade não encontrada!'
            climaCard.classList.remove('visivel')
            return
        }

    document.querySelector('#nome-cidade').textContent = dados.name
    document.querySelector('#descricao').textContent = dados.weather[0].description
    document.querySelector('#temperatura').textContent = `${Math.round(dados.main.temp)}°C `
    document.querySelector('#umidade').textContent = `${dados.main.humidity}%`
    document.querySelector('#vento').textContent = `${dados.wind.speed} m/s`

    climaCard.classList.add('visivel')

    } catch {
        erro.textContent = 'Erro ao buscar os dados.'
    }
}