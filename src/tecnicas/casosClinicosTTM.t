import { SesionCasosClinicos } from '../types'

// Ejemplo cargado con 3 preguntas de tu prueba acumulativa de TTM.
// Para agregar más preguntas: copia el patrón de un objeto dentro de "preguntas"
// y arma su pauta con los puntos clínicos clave que esperarías ver en una buena respuesta.
// Puedes pedirme ayuda para redactar la pauta de cualquier pregunta nueva que tengas.
export const casosClinicosTTM: SesionCasosClinicos = {
  id: 'casos-clinicos-ttm',
  nombre: 'Casos Clínicos TTM',
  objetivo: 'Evaluar hipótesis',
  preguntas: [
    {
      id: 'circulo-vicioso-fibras-hibridas',
      caso: 'La teoría clásica del "círculo vicioso" propone que una contracción muscular sostenida genera isquemia, acumulación de metabolitos y dolor, perpetuando un ciclo continuo de mayor actividad muscular.',
      pregunta: 'Utilizando los conocimientos de anatomía funcional de la musculatura mandibular, analice críticamente esta teoría. Explique la importancia funcional de las fibras híbridas en los músculos elevadores mandibulares y cómo este conocimiento contribuye a interpretar las limitaciones de este modelo para explicar el dolor muscular. (6 ptos)',
      duracionSegundos: 480, // 8 min
      pauta: [
        { id: 'c1', texto: 'Explica correctamente el modelo del círculo vicioso (contracción → isquemia → dolor → más contracción)', puntos: 1 },
        { id: 'c2', texto: 'Define qué son las fibras híbridas (combinación de características tipo I y tipo II) en los músculos elevadores', puntos: 1 },
        { id: 'c3', texto: 'Explica que las fibras híbridas están adaptadas para actividad tónica sostenida, con buena resistencia a la fatiga/isquemia', puntos: 2 },
        { id: 'c4', texto: 'Concluye que esto limita al modelo de círculo vicioso como explicación única/suficiente del dolor muscular masticatorio', puntos: 2 },
      ],
    },
    {
      id: 'oppera-factores-riesgo-asociacion',
      caso: 'En un paciente con TTM doloroso se identifican: (1) disminución del umbral de dolor a la presión, (2) mala calidad de sueño desde hace varios meses, (3) múltiples síntomas orofaciales inespecíficos previos al inicio del dolor.',
      pregunta: 'A partir de la evidencia proveniente de OPPERA, analice el significado clínico de estos tres hallazgos. Diferencie cuáles corresponden principalmente a factores de riesgo, cuáles a factores de asociación, y explique por qué esta distinción es relevante. (10 puntos)',
      duracionSegundos: 900, // 15 min
      pauta: [
        { id: 'o1', texto: 'Identifica el umbral de dolor a presión disminuido como marcador de sensibilización / factor de riesgo', puntos: 2 },
        { id: 'o2', texto: 'Identifica la mala calidad de sueño como factor de riesgo', puntos: 2 },
        { id: 'o3', texto: 'Identifica los síntomas orofaciales inespecíficos previos como factor de riesgo/predictor temprano', puntos: 2 },
        { id: 'o4', texto: 'Explica la diferencia conceptual entre factor de riesgo (precede y predice la aparición) y factor de asociación (coexiste, no necesariamente causal)', puntos: 2 },
        { id: 'o5', texto: 'Explica la relevancia clínica de esta distinción (prevención vs. manejo del cuadro ya instalado)', puntos: 2 },
      ],
    },
    {
      id: 'desplazamiento-discal-cronificacion',
      caso: 'Dos pacientes con el mismo diagnóstico de desplazamiento discal con reducción. El primero: previamente sano, sin dolor persistente. El segundo: insomnio crónico, migraña, cervicalgia, múltiples síntomas somáticos y varios síntomas orofaciales inespecíficos.',
      pregunta: 'Desde el modelo propuesto por OPPERA y ROPA, explique cuál paciente presenta mayor riesgo de persistencia o cronificación del dolor. Fundamente con al menos tres factores de riesgo o de asociación descritos en la evidencia. (8 puntos)',
      duracionSegundos: 720, // 12 min
      pauta: [
        { id: 'd1', texto: 'Identifica correctamente al segundo paciente como el de mayor riesgo de cronificación', puntos: 1 },
        { id: 'd2', texto: 'Menciona el insomnio crónico como factor de riesgo/asociación relevante', puntos: 2 },
        { id: 'd3', texto: 'Menciona migraña y/o cervicalgia como comorbilidades asociadas a sensibilización central', puntos: 2 },
        { id: 'd4', texto: 'Menciona los síntomas somáticos múltiples y orofaciales inespecíficos como marcadores de vulnerabilidad sistémica', puntos: 2 },
        { id: 'd5', texto: 'Fundamenta usando el modelo de vulnerabilidad multisistémica de OPPERA/ROPA', puntos: 1 },
      ],
    },
  ],
}
