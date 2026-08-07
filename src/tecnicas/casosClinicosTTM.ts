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
    {
      id: 'cocontraccion-protectora',
      caso: 'Paciente consulta por limitación progresiva de la apertura bucal, sin antecedente de exodoncia ni trauma reciente. Refiere que antes podía morder una manzana completa y ahora no puede. Además nota cansancio mandibular al masticar y siente que "muerde más adelante" que antes. No refiere dolor articular importante.',
      pregunta: 'Explique el mecanismo neuromuscular más probable detrás de este cuadro, fundamente por qué NO correspondería indicar toxina botulínica como primera línea, y proponga la conducta terapéutica más adecuada. (8 puntos)',
      duracionSegundos: 600, // 10 min
      pauta: [
        { id: 'p1', texto: 'Identifica el cuadro como co-contracción muscular protectora, no como hiperactividad muscular primaria', puntos: 2 },
        { id: 'p2', texto: 'Explica el mecanismo: un input nociceptivo/articular genera inhibición del músculo agonista y activación del antagonista para limitar el movimiento y proteger la estructura', puntos: 2 },
        { id: 'p3', texto: 'Explica por qué la toxina botulínica es inadecuada aquí: al paralizar el músculo protector, la articulación queda sin restricción y tiende a inflamarse con mayor intensidad', puntos: 2 },
        { id: 'p4', texto: 'Propone un manejo adecuado: buscar y tratar la noxa/causa articular subyacente con enfoque conservador, sin depender de relajante muscular ni toxina como tratamiento de la causa', puntos: 2 },
      ],
    },
    {
      id: 'cluster-oppera',
      caso: 'Dos pacientes con TTM doloroso. Paciente A: alta tolerancia al dolor a la palpación, bajo distress psicológico, poca somatización, pocas comorbilidades dolorosas. Paciente B: alta sensibilidad al dolor experimental, ansiedad, depresión, catastrofización del dolor, múltiples comorbilidades dolorosas y peor función física y mental.',
      pregunta: 'Clasifique a cada paciente según los clusters de pacientes descritos por OPPERA y fundamente qué diferencias esperaría en pronóstico y abordaje terapéutico entre ambos. (8 puntos)',
      duracionSegundos: 600, // 10 min
      pauta: [
        { id: 'k1', texto: 'Clasifica correctamente al Paciente A dentro del cluster "Adaptativos"', puntos: 2 },
        { id: 'k2', texto: 'Clasifica correctamente al Paciente B dentro del cluster "Síntomas globales"', puntos: 2 },
        { id: 'k3', texto: 'Explica que el Paciente B tiene mayor riesgo de cronificación y peor pronóstico funcional', puntos: 2 },
        { id: 'k4', texto: 'Fundamenta que el Paciente B requiere un abordaje biopsicosocial/multidisciplinario y no solo tratamiento local de la articulación o musculatura', puntos: 2 },
      ],
    },
    {
      id: 'diagnostico-articular-ruido',
      caso: 'Paciente refiere un click audible a los 10 mm de apertura que desaparece en el resto del recorrido, sin historia de bloqueo ni dolor articular. En el examen se logra palpar el click, y se estima que se mantiene la relación cóndilo-disco con un desplazamiento leve.',
      pregunta: 'Identifique el diagnóstico articular más probable y justifique según las características descritas, diferenciándolo de un desplazamiento discal con bloqueo intermitente. (8 puntos)',
      duracionSegundos: 600,
      pauta: [
        { id: 'r1', texto: 'Identifica el diagnóstico como desplazamiento discal con reducción (simple)', puntos: 2 },
        { id: 'r2', texto: 'Justifica con las características: click temprano (<30mm), se palpa, se mantiene relación cóndilo-disco con desplazamiento leve', puntos: 2 },
        { id: 'r3', texto: 'Diferencia con bloqueo intermitente: ahí habría pop/click tardío, historia de trabamiento y pérdida de relación cóndilo-disco', puntos: 2 },
        { id: 'r4', texto: 'Menciona que el bloqueo intermitente puede ser factor de riesgo de inflamación, a diferencia del desplazamiento simple', puntos: 2 },
      ],
    },
    {
      id: 'diagnostico-muscular-miofascial',
      caso: 'Paciente con dolor mandibular de 2 meses de evolución. Se palpa una banda tensa en el masetero derecho que, al comprimirla, reproduce dolor local pero también genera dolor referido hacia la región supraorbitaria. El dolor aumenta con la función.',
      pregunta: 'Identifique el diagnóstico muscular más probable, fundamente según el mecanismo fisiopatológico involucrado, y explique por qué NO correspondería a una mialgia local simple. (8 puntos)',
      duracionSegundos: 600,
      pauta: [
        { id: 'm1', texto: 'Identifica el diagnóstico como dolor miofascial', puntos: 2 },
        { id: 'm2', texto: 'Menciona la banda tensa con punto gatillo (PG) como hallazgo clave', puntos: 2 },
        { id: 'm3', texto: 'Explica el mecanismo: convergencia a nivel del SNC que genera dolor referido en un sitio distinto al origen real', puntos: 2 },
        { id: 'm4', texto: 'Diferencia de la mialgia local: en esta el dolor se mantiene localizado en el sitio de palpación, sin dolor referido', puntos: 2 },
      ],
    },
    {
      id: 'oa-bilateral-craneofacial',
      caso: 'Paciente con antecedente de dolor articular bilateral de larga data, actualmente sin dolor pero con crepitación ocasional. Al examen facial: mandíbula retruida, aumento del ángulo goniaco, perfil con nariz aguileña y escotadura antegonial marcada de forma bilateral.',
      pregunta: '¿Qué patología articular sugieren estos hallazgos craneofaciales? Explique el mecanismo de crecimiento facial asociado y qué tan alta es la sospecha diagnóstica según los signos descritos. (8 puntos)',
      duracionSegundos: 600,
      pauta: [
        { id: 'o1', texto: 'Identifica la OA bilateral como principal sospecha diagnóstica', puntos: 2 },
        { id: 'o2', texto: 'Explica el mecanismo: crecimiento rotacional posterior ("cara de portazo") asociado a reabsorción condilar progresiva', puntos: 2 },
        { id: 'o3', texto: 'Relaciona la nariz aguileña marcada con mayor probabilidad de OA', puntos: 2 },
        { id: 'o4', texto: 'Señala que la crepitación refuerza la sospecha pero que su ausencia no la descarta, y que siempre debe confirmarse con imágenes', puntos: 2 },
      ],
    },
    {
      id: 'mialgia-central-vs-periferica',
      caso: 'Paciente con dolor mandibular bilateral difuso de 8 meses de evolución, presente incluso en reposo, con alodinia a la palpación de múltiples músculos masticatorios y cervicales, y un dolor desproporcionado respecto a los hallazgos clínicos objetivos.',
      pregunta: 'Identifique el tipo de dolor muscular más probable y explique por qué un abordaje exclusivamente periférico (ej. bloqueos anestésicos locales) probablemente no sea efectivo, proponiendo el enfoque terapéutico más adecuado. (8 puntos)',
      duracionSegundos: 600,
      pauta: [
        { id: 'c1', texto: 'Identifica el cuadro como mialgia mediada centralmente (dolor muscular persistente)', puntos: 2 },
        { id: 'c2', texto: 'Menciona los hallazgos característicos: dolor difuso, bilateral, presente en reposo, alodinia, desproporción respecto a hallazgos', puntos: 2 },
        { id: 'c3', texto: 'Explica por qué el manejo periférico no basta: el origen es central, y un intento periférico podría incluso exacerbar el dolor', puntos: 2 },
        { id: 'c4', texto: 'Propone un manejo predominantemente farmacológico/centralizado, considerando comorbilidades de dolor crónico', puntos: 2 },
      ],
    },
  ],
}
