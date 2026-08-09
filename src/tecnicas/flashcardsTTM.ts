import { Flashcard } from '../types'

// Mazo de tarjetas de estudio: término al frente, definición al reverso. Para agregar
// más, sigue el mismo patrón — no hace falta tocar el componente Flashcards.tsx.
export const flashcardsTTM: Flashcard[] = [
  { id: 'f1', tema: 'anatomia-funcional', termino: 'Fibrocartílago', definicion: 'Tipo de cartílago de la ATM (a diferencia del hialino de otras articulaciones), más adaptable al roce/deslizamiento.' },
  { id: 'f2', tema: 'anatomia-funcional', termino: 'Rototraslación continua', definicion: 'Movimiento característico de la ATM durante la apertura: rotación al inicio, traslación hacia el final.' },
  { id: 'f3', tema: 'anatomia-funcional', termino: 'Fibras híbridas', definicion: 'Fibras musculares con más de una isoforma de miosina; abundantes en elevadores, dan versatilidad y resistencia a la fatiga.' },
  { id: 'f4', tema: 'control-motor', termino: 'Reflejo miotático', definicion: 'Reflejo monosináptico de estiramiento muscular, mediado por el núcleo mesencefálico (ej. golpe en el mentón).' },
  { id: 'f5', tema: 'control-motor', termino: 'Co-contracción protectora', definicion: 'Activación simultánea de agonistas y antagonistas como respuesta protectora al dolor; se resuelve al eliminar el estímulo nociceptivo.' },
  { id: 'f6', tema: 'control-motor', termino: 'Órgano tendinoso de Golgi', definicion: 'Receptor en la unión músculo-tendinosa que sensa tensión, tanto en contracción activa como en elongación.' },
  { id: 'f7', tema: 'dolor-sensibilizacion', termino: 'Sensibilización central', definicion: 'Ganancia de función en el SNC: descargas espontáneas, expansión de campos receptivos, hiperalgesia y alodinia.' },
  { id: 'f8', tema: 'dolor-sensibilizacion', termino: 'Alodinia', definicion: 'Dolor producido por un estímulo que normalmente no es doloroso.' },
  { id: 'f9', tema: 'dolor-sensibilizacion', termino: 'Catastrofización', definicion: 'Percepción negativa y exagerada del dolor, con tres componentes: magnificación, rumiación y desesperanza.' },
  { id: 'f10', tema: 'dolor-sensibilizacion', termino: 'CPM (modulación condicionada del dolor)', definicion: 'Capacidad del sistema nervioso de inhibir el dolor mediante controles descendentes; su deficiencia se asocia a mayor sensibilización.' },
  { id: 'f11', tema: 'diagnosticos-articulares', termino: 'Desplazamiento discal con reducción', definicion: 'El disco se desplaza pero logra recapturarse durante el movimiento; se manifiesta con click.' },
  { id: 'f12', tema: 'diagnosticos-articulares', termino: 'Desplazamiento discal sin reducción', definicion: 'El disco no logra recapturarse: bloqueo cerrado, sin ruido, con deflexión hacia el lado afectado.' },
  { id: 'f13', tema: 'diagnosticos-articulares', termino: 'Retrodiscitis', definicion: 'Inflamación de la zona retrodiscal, asociada a desplazamiento discal sin reducción; duele al comprimir el cóndilo hacia posterior.' },
  { id: 'f14', tema: 'diagnosticos-musculares', termino: 'Dolor miofascial', definicion: 'Puntos hipersensibles (gatillo) dentro de una banda tensa muscular, con posible dolor referido característico.' },
  { id: 'f15', tema: 'diagnosticos-musculares', termino: 'Mialgia local', definicion: 'Dolor muscular reproducible en el sitio de palpación, sin dolor referido a otra zona.' },
  { id: 'f16', tema: 'cefaleas-neuralgias', termino: 'Neuralgia trigeminal clásica', definicion: 'Dolor eléctrico paroxístico, unilateral, en V2 o V3, desencadenado por estímulos triviales.' },
  { id: 'f17', tema: 'cefaleas-neuralgias', termino: 'SUNCT', definicion: 'Cefalea trigémino-autonómica con ataques de 1-600 segundos, siempre con inyección conjuntival Y lagrimeo juntos.' },
  { id: 'f18', tema: 'cefaleas-neuralgias', termino: 'Bandera roja de cefalea', definicion: 'Signo de alarma (ej. inicio en estallido, edad >50, síntomas neurológicos) que obliga a descartar causa secundaria.' },
  { id: 'f19', tema: 'sueno-bruxismo', termino: 'RMMA', definicion: 'Actividad masticatoria rítmica durante el sueño; más del 70% se asocia a microdespertares — marcador de inestabilidad del sueño.' },
  { id: 'f20', tema: 'sueno-bruxismo', termino: 'Síndrome de piernas inquietas', definicion: 'Molestias en las piernas en reposo, al acostarse, que alivian con el movimiento.' },
  { id: 'f21', tema: 'metodologia-oppera', termino: 'Factor de riesgo', definicion: 'Variable que precede en el tiempo y aumenta la probabilidad de un desenlace (a diferencia de un factor de asociación).' },
  { id: 'f22', tema: 'metodologia-oppera', termino: 'Cluster de síntomas globales (ROPA)', definicion: 'Perfil de paciente con alta sensibilidad al dolor y alto malestar psicológico; mayor riesgo de TTM (~2,8 veces).' },
]
