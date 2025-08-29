
import type { QuizModule } from '../types';

export const quizModules: QuizModule[] = [
  {
    id: 'estado',
    title: 'El Estado y sus Componentes',
    description: 'Comprende qué es el Estado, sus componentes y cómo se organiza.',
    questions: [
      {
        question: '¿Qué definición corresponde a "Nación"?',
        options: [
          'Un tipo de votación de tipo censitaria.',
          'Conjunto de personas unidas por vínculos comunes como cultura, lengua o etnia.',
          'El territorio geográfico de un país.',
          'La organización política de un país.',
        ],
        correctAnswer: 'Conjunto de personas unidas por vínculos comunes como cultura, lengua o etnia.',
      },
      {
        question: 'Los órganos del Estado actúan válidamente...',
        options: [
          'Cuando lo decide el Presidente.',
          'Previa investidura regular de sus integrantes, dentro de su competencia y en la forma que prescriba la ley.',
          'Bajo cualquier circunstancia extraordinaria.',
          'Solo si tienen apoyo policial.',
        ],
        correctAnswer: 'Previa investidura regular de sus integrantes, dentro de su competencia y en la forma que prescriba la ley.',
      },
      {
        question: '¿Cuáles son los tres poderes del Estado en Chile?',
        options: [
          'Ejecutivo, Legislativo y Judicial.',
          'Presidencial, Parlamentario y Monárquico.',
          'Federal, Estatal y Municipal.',
          'Central, Regional y Comunal.',
        ],
        correctAnswer: 'Ejecutivo, Legislativo y Judicial.',
      },
      {
        question: '¿Qué elemento del Estado se refiere al espacio geográfico donde ejerce su soberanía?',
        options: [
          'Nación.',
          'Gobierno.',
          'Territorio.',
          'Población.',
        ],
        correctAnswer: 'Territorio.',
      },
      {
        question: 'El concepto de "Soberanía" reside esencialmente en:',
        options: [
          'El Presidente de la República.',
          'Las Fuerzas Armadas.',
          'El Congreso Nacional.',
          'La Nación.',
        ],
        correctAnswer: 'La Nación.',
      },
    ],
  },
  {
    id: 'gobierno',
    title: 'Tipos de Gobierno y República',
    description: 'Diferencia entre formas de gobierno como la República y la Monarquía.',
    questions: [
      {
        question: '¿Por qué se puede afirmar que nuestro País es una República?',
        options: [
          'Existen votaciones periódicas para elegir autoridades.',
          'Todos los poderes del Estado están bajo la misma institución.',
          'Los cargos públicos son de carácter vitalicio.',
          'El Estado tiene el monopolio de la violencia.',
        ],
        correctAnswer: 'Existen votaciones periódicas para elegir autoridades.',
      },
       {
        question: '¿Cuál es la importancia de la independencia del poder judicial en un Estado de Derecho?',
        options: [
          'Para que los jueces ganen más dinero.',
          'Para que el Presidente tenga control total.',
          'Garantiza la efectividad del Estado de Derecho y el reconocimiento de las garantías sociales y económicas.',
          'No tiene ninguna importancia real.',
        ],
        correctAnswer: 'Garantiza la efectividad del Estado de Derecho y el reconocimiento de las garantías sociales y económicas.',
      },
      {
        question: 'En una República Democrática, las autoridades son elegidas por:',
        options: [
          'Herencia o linaje.',
          'Designación divina.',
          'Elección popular a través del sufragio.',
          'Un grupo selecto de notables.',
        ],
        correctAnswer: 'Elección popular a través del sufragio.',
      },
      {
        question: '¿Qué significa que en Chile exista un "Estado de Derecho"?',
        options: [
          'Que el Presidente tiene poder absoluto.',
          'Que tanto gobernantes como gobernados deben someterse a la ley.',
          'Que no existen leyes escritas.',
          'Que las decisiones se toman por la fuerza.',
        ],
        correctAnswer: 'Que tanto gobernantes como gobernados deben someterse a la ley.',
      },
      {
        question: 'Una característica fundamental del sistema republicano es:',
        options: [
          'La concentración del poder en una sola persona.',
          'La periodicidad en los cargos públicos.',
          'La inexistencia de una Constitución.',
          'La sucesión del poder por vía hereditaria.',
        ],
        correctAnswer: 'La periodicidad en los cargos públicos.',
      },
    ],
  },
  {
    id: 'democracia',
    title: 'Democracia y Ciudadanía',
    description: 'Explora los conceptos de democracia, ciudadanía y los derechos asociados.',
    questions: [
      {
        question: 'Son ciudadanos los chilenos que hayan cumplido dieciocho años de edad y que no hayan sido condenados a pena aflictiva. La calidad de ciudadano otorga los derechos de:',
        options: [
          'Solo optar a cargos de elección popular.',
          'Solo votar en elecciones.',
          'Solo participar en plebiscitos.',
          'Optar a cargos de elección popular, votar en elecciones y participar en plebiscitos.',
        ],
        correctAnswer: 'Optar a cargos de elección popular, votar en elecciones y participar en plebiscitos.',
      },
      {
        question: '¿Qué es la Ciudadanía?',
        options: [
          'El vínculo jurídico entre un individuo y un Estado.',
          'La condición de participar a plenitud en la vida política de un Estado, ejerciendo deberes y derechos políticos.',
          'El ejercicio de los derechos civiles.',
          'La capacidad de hacerse obedecer de los individuos.',
        ],
        correctAnswer: 'La condición de participar a plenitud en la vida política de un Estado, ejerciendo deberes y derechos políticos.',
      },
      {
        question: '¿Cuál de las siguientes es una característica esencial de la democracia?',
        options: [
          'El gobierno de una sola persona.',
          'La participación ciudadana y el respeto a los derechos humanos.',
          'La prohibición de los partidos políticos.',
          'El control total de la información por parte del Estado.',
        ],
        correctAnswer: 'La participación ciudadana y el respeto a los derechos humanos.',
      },
      {
        question: '¿Qué derecho fundamental está directamente asociado al ejercicio de la ciudadanía?',
        options: [
          'El derecho a la propiedad privada.',
          'El derecho a la vida.',
          'El derecho a sufragio.',
          'El derecho a la educación.',
        ],
        correctAnswer: 'El derecho a sufragio.',
      },
      {
        question: 'La suspensión del derecho a sufragio se produce, entre otras causales, por:',
        options: [
          'Estar de viaje fuera del país.',
          'Hallarse acusado por crimen o simple delito que merezca pena aflictiva.',
          'No estar inscrito en un partido político.',
          'Tener una deuda con el Estado.',
        ],
        correctAnswer: 'Hallarse acusado por crimen o simple delito que merezca pena aflictiva.',
      },
    ],
  },
  {
    id: 'sufragio',
    title: 'Nacionalidad, Sufragio y Plebiscitos',
    description: 'Aprende sobre nacionalidad, el derecho a sufragio y los plebiscitos.',
    questions: [
        {
            question: 'El principio de que "son chilenos todos aquellos nacidos en el territorio de Chile" corresponde a:',
            options: ['Ius Sanguinis', 'Causus Belli', 'Ius Solis', 'Ius Concuesti'],
            correctAnswer: 'Ius Solis',
        },
        {
            question: '¿Qué son los plebiscitos?',
            options: [
                'Un tipo de votación de tipo censitaria.',
                'Un instrumento de consulta directa a los votantes sobre algún asunto de excepcional importancia.',
                'Una votación de carácter vecinal.',
                'Un mecanismo de Democracia Representativa.',
            ],
            correctAnswer: 'Un instrumento de consulta directa a los votantes sobre algún asunto de excepcional importancia.',
        },
        {
            question: '¿Qué principio de adquisición de la nacionalidad se basa en el lazo de sangre o filiación?',
            options: [
              'Ius Solis.',
              'Ius Gentium.',
              'Ius Sanguinis.',
              'Ius Divinum.',
            ],
            correctAnswer: 'Ius Sanguinis.',
        },
        {
            question: '¿Cuál de las siguientes NO es una característica del sufragio en Chile?',
            options: [
              'Es secreto.',
              'Es igualitario.',
              'Es obligatorio.',
              'Es personal.',
            ],
            correctAnswer: 'Es obligatorio.',
        },
        {
            question: 'Los extranjeros avecindados en Chile por más de cinco años pueden ejercer el derecho a sufragio en las condiciones que fije la ley. Esta afirmación es:',
            options: [
              'Verdadera.',
              'Falsa.',
              'Depende del país de origen del extranjero.',
              'Solo si tienen hijos chilenos.',
            ],
            correctAnswer: 'Verdadera.',
        },
    ]
  },
  {
    id: 'constitucion',
    title: 'Derechos Humanos y Constitución',
    description: 'Conoce los derechos fundamentales garantizados en la Constitución y los mecanismos para protegerlos.',
    questions: [
      {
        question: '¿Cuál es la función principal de una Constitución en un Estado?',
        options: [
          'Definir los colores de la bandera nacional.',
          'Establecer la organización del Estado y garantizar los derechos de las personas.',
          'Regular únicamente las elecciones presidenciales.',
          'Crear los equipos de fútbol profesionales.',
        ],
        correctAnswer: 'Establecer la organización del Estado y garantizar los derechos de las personas.',
      },
      {
        question: 'Los Derechos Humanos se caracterizan por ser:',
        options: [
          'Renunciables, transferibles y limitados.',
          'Exclusivos para los ciudadanos de un país.',
          'Universales, inalienables e irrenunciables.',
          'Válidos solo en tiempos de paz.',
        ],
        correctAnswer: 'Universales, inalienables e irrenunciables.',
      },
      {
        question: '¿Qué es un "Recurso de Protección"?',
        options: [
          'Un préstamo que otorga el Estado en caso de emergencia.',
          'Una solicitud para cambiar de nacionalidad.',
          'Una acción judicial rápida para proteger derechos fundamentales vulnerados.',
          'Un permiso para organizar una manifestación pública.',
        ],
        correctAnswer: 'Una acción judicial rápida para proteger derechos fundamentales vulnerados.',
      },
      {
        question: '¿Cuál de los siguientes es un derecho garantizado por la Constitución chilena?',
        options: [
          'El derecho a no pagar impuestos.',
          'El derecho a vivir en un medio ambiente libre de contaminación.',
          'El derecho a tener un vehículo de lujo.',
          'El derecho a ignorar las leyes de tránsito.',
        ],
        correctAnswer: 'El derecho a vivir en un medio ambiente libre de contaminación.',
      },
      {
        question: 'En Chile, el Instituto Nacional de Derechos Humanos (INDH) tiene como misión:',
        options: [
          'Organizar eventos deportivos a nivel nacional.',
          'La promoción y protección de los derechos humanos de todas las personas.',
          'Administrar los fondos de pensiones de los trabajadores.',
          'Regular la actividad de los medios de comunicación.',
        ],
        correctAnswer: 'La promoción y protección de los derechos humanos de todas las personas.',
      },
    ],
  },
  {
    id: 'participacion',
    title: 'Participación Ciudadana',
    description: 'Descubre las distintas formas de participar en la vida cívica más allá del voto.',
    questions: [
      {
        question: 'Además del voto, ¿qué otro mecanismo de participación ciudadana existe en Chile?',
        options: [
          'Los plebiscitos y las consultas ciudadanas.',
          'Ver las noticias por televisión.',
          'Tener una cuenta en redes sociales.',
          'Pagar los impuestos a tiempo.',
        ],
        correctAnswer: 'Los plebiscitos y las consultas ciudadanas.',
      },
      {
        question: '¿Qué son las Juntas de Vecinos?',
        options: [
          'Clubes privados para organizar fiestas.',
          'Empresas dedicadas a la construcción de viviendas.',
          'Organizaciones comunitarias que representan a los habitantes de una unidad vecinal.',
          'Comités políticos para campañas electorales.',
        ],
        correctAnswer: 'Organizaciones comunitarias que representan a los habitantes de una unidad vecinal.',
      },
      {
        question: '¿Cuál es el propósito principal de las Organizaciones No Gubernamentales (ONG)?',
        options: [
          'Generar ganancias para sus dueños.',
          'Reemplazar las funciones del gobierno.',
          'Abordar problemas sociales o ambientales sin fines de lucro.',
          'Organizar la propaganda de los partidos políticos.',
        ],
        correctAnswer: 'Abordar problemas sociales o ambientales sin fines de lucro.',
      },
      {
        question: 'El voluntariado es una forma de participación ciudadana que se caracteriza por:',
        options: [
          'Ser una actividad obligatoria impuesta por la ley.',
          'Realizar un trabajo sin recibir remuneración, por un fin altruista.',
          'Ser un trabajo exclusivo para jóvenes estudiantes.',
          'Recibir un sueldo muy alto por ayudar a la comunidad.',
        ],
        correctAnswer: 'Realizar un trabajo sin recibir remuneración, por un fin altruista.',
      },
      {
        question: 'La participación en una marcha o manifestación pacífica es un ejercicio del derecho a:',
        options: [
          'La propiedad privada.',
          'La libertad de reunión.',
          'La educación gratuita.',
          'La salud pública.',
        ],
        correctAnswer: 'La libertad de reunión.',
      },
    ],
  }
];
