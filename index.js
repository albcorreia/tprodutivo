const input = document.querySelector('.definir');
const guardar = document.querySelector('.guardar'); 
const minhasAtv = document.querySelector('.minhasatividades'); 
const myContainer = document.querySelector('.container');
const tempo = document.querySelector('.tempo');
const buttonTerminar = document.querySelector('.horafim'); 
const historicos = document.querySelector('.historicos');
const vaiDiz = document.querySelector('.diz');
const exibirAtvInicio = document.querySelector('.tarefainicio'); 
const exibirAtvFim = document.querySelector('.tarefafim');
const mostraOcultaAtv = document.querySelector('.mostramostra');
const tempoContando = document.querySelector('.tempo');

let segundo = 0;
let tempotempo; 
const tempoRelogio = document.querySelector('.temporelogio');

mostraOcultaAtv.addEventListener('click', () => {
    if(historicos.style.display == 'block') {
        historicos.style.display = 'none'
        mostraOcultaAtv.innerText = 'Mostrar atividades';
    } else {
        historicos.style.display = 'block';
        mostraOcultaAtv.innerText = 'Ocultar atividades';
    }
});
buttonTerminar.addEventListener('click', () => {
    historicos.style.display = 'block';
});
guardar.addEventListener('click', () => {
    if(!input.value || input.value === ' ') {
        vaiDiz.innerText = 'Nenhuma atividade definida'
        vaiDiz.style.color = 'red';
    }  else {
        vaiDiz.innerText = 'Atividade definida'
        vaiDiz.style.color = 'green';
        exibirAtvInicio.innerText = input.value;
        exibirAtvFim.innerText = input.value;
    }
    definirAtividade(input.value); 
});
myContainer.addEventListener('click', (e) => {
    const verifica = e.target; 
    if(verifica.classList.contains('limpar')) {
        verifica.parentElement.remove();
        guardarAtividade();
    }
});
function criaAtv () {
    const atv = document.createElement('p'); return atv;
}
function definirAtividade(atividade) {
    const atvAtv = criaAtv();
    const aviso = 'Nenhuma atividade definida';
    if(!atividade || atividade == ' ') {
        atvAtv.innerText = aviso;
    } else {
        atvAtv.innerText = `${atividade}`;
    }
    minhasAtv.appendChild(atvAtv);
    guardarAtividade();
    buttonLimpar(atvAtv);
}
function buttonLimpar(p) {
    p.innerText += ' '; 
    const limpar = document.createElement('button');
    limpar.innerText = 'Limpar'; 
    p.appendChild(limpar);  
    limpar.classList.add('limpar'); 
    limpar.style.background = 'black';
}
function guardarAtividade() {
    const verAtv = minhasAtv.querySelectorAll('p'); 
    const listasAtv = [];

    for (let iterandoAtv of verAtv) { 
       let iteraAtv = iterandoAtv.innerText; 
       iteraAtv = iteraAtv.replace('Limpar', '').trim();

       listasAtv.push(iteraAtv); 
    }
    const atvJson = JSON.stringify(listasAtv); 
    localStorage.setItem('atividades', atvJson);
}
function mostrarAtividade () {
    const mostraATV = localStorage.getItem('atividades'); 
    const listAtv = JSON.parse(mostraATV); 
    
    for(let mmatividade of listAtv)  {
        definirAtividade(mmatividade);
    }
}
function tempoTotalAtv () {
    const contaTempo = () => {
        tempotempo = setInterval ( function() {
            segundo++;
            if(segundo === 1) {
                tempoContando.innerText = 'Tempo contando';
            }
            tempoRelogio.innerText = Criasegundo(segundo);
        }, 1000)
    }
    const Criasegundo = () => {
        const myData = new Date(segundo * 1000);
        return myData.toLocaleTimeString('pt', {
        hour12: false,
        timeZone: 'UTC'
        })
    }
    document.addEventListener('click', (e) => {
    const constata = e.target;
        if(constata.classList.contains('horainicio')) {
        if(input.value) {
            tempoRelogio.style.color = 'black';
            tempoContando.innerText = 'Tempo contando';
            clearInterval(tempotempo);   
            contaTempo();
       } 
    }
    if(constata.classList.contains('guardar')) {
        if (input.value === ' ') {
            clearInterval(tempotempo); 
            tempoRelogio.style.color = 'black'; 
            tempoContando.innerText = 'Tempo';
        }
        if (input.value) {
            clearInterval(tempotempo);
            tempoRelogio.style.color = 'black';
            tempoRelogio.innerText = '00:00:00';
            segundo = 0;
        }
    }
    });
    buttonTerminar.addEventListener('click', () => {
    clearInterval(tempotempo);
    tempoRelogio.style.color = 'red';
    tempoContando.innerText = 'Terminado';
    });
}
tempoTotalAtv();
mostrarAtividade();
class HoraAtividade {
    constructor() {
    this.data = new Date(); 
    this.form = document.querySelector('.definirtarefa'); 
    this.input = document.querySelector('.definir');
    this.container = document.querySelector('.container');

    // Div
    this.painelInicio = document.querySelector('.painelinicio'); 
    this.painelFim = document.querySelector('.painelfim')

    // Botões Começar e Terminar
    this.horaInicio = document.querySelector('.horainicio'); 
    this.horaFim = document.querySelector('.horafim');

    // Hora atual
    this.mostraHora = document.querySelector('.mostrahora');  

    // Dica || Início ou atividade terminada
    this.atividadeInicio = document.querySelector('.atividadeinicio');
    this.atividadeFim = document.querySelector('.atividadefim');

    // Ícone svg
    this.iconSvg = document.querySelector('.iconsvg');

    this.pararEnvio();
    this.mostraHoraInicio(); 
    this.mostraHoraFim();
    this.adicionaZero();
    this.controlContainer();
    }
    controlContainer() {
    this.container.addEventListener('click', (e) => {
    const verifica = e.target; 
        if(verifica.classList.contains('guardar')) {
            if(this.input.value) {
            this.input.value = ' ';
            }
            }
        });
    }
    pararEnvio() {
    this.form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            if(this.input.value) {
            this.painelInicio.style.display = 'block'; 
            this.painelFim.style.display = 'block';
           }
        }); 
    }
    mostraHoraInicio() {
        this.horaInicio.addEventListener('click', () => {
        this.mostraHora.innerText = `${this.data.getHours()}:${this.adicionaZero(this.data.getMinutes())}`
        this.atividadeInicio.innerText = 'Início da atividade';  
        this.iconSvg.style.display = 'block';
        });
    }
    mostraHoraFim() {
        this.horaFim.addEventListener('click', () => {
        this.atividadeFim.innerText = 'Atividade terminada';
    }); 
    }
    adicionaZero(num) {
    return num >= 10 ? num : `0${num}` 
    }
}
const minhaHora = new HoraAtividade(); 