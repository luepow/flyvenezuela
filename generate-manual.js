const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle
} = require('docx');

// Configuración
const BASE_URL = 'http://localhost:3006/es';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots-temp');
const OUTPUT_FILE = path.join(__dirname, 'Manual_Usuario_Sistema.docx');

// Credenciales de prueba
const USERS = {
  admin: {
    email: 'admin@flyvenezuela.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  client: {
    email: 'cliente@demo.com',
    password: 'cliente123',
    name: 'Cliente',
    role: 'client'
  },
  provider: {
    email: 'proveedor@demo.com',
    password: 'proveedor123',
    name: 'Proveedor',
    role: 'provider'
  }
};

// Rutas a documentar
const ROUTES = [
  {
    path: '/',
    title: 'Página Principal del Sistema',
    description: 'La página principal constituye la puerta de entrada al sistema FlyVenezuela, diseñada como una plataforma integral para la gestión de servicios aeroportuarios. Esta interfaz presenta de manera estructurada los servicios disponibles, facilitando el acceso a la información y proporcionando múltiples puntos de contacto para los usuarios potenciales.',
    requiresAuth: false,
    sections: [
      'Barra de navegación principal con selector de idioma',
      'Sección principal (Hero) con presentación institucional',
      'Módulo de características distintivas del servicio',
      'Catálogo de servicios aeroportuarios disponibles',
      'Formulario de solicitud de cotización rápida',
      'Módulo de información de contacto institucional',
      'Pie de página con enlaces y redes sociales'
    ]
  },
  {
    path: '/auth/login',
    title: 'Módulo de Autenticación',
    description: 'El módulo de autenticación representa el punto de acceso seguro al sistema. Implementa un mecanismo de validación de identidad que permite a los usuarios autorizados (Administradores, Clientes y Proveedores) acceder a sus respectivos paneles de control. El sistema incorpora medidas de seguridad estándar y opciones de acceso facilitado para entornos de demostración.',
    requiresAuth: false,
    sections: [
      'Formulario de autenticación con validación de credenciales',
      'Opciones de acceso rápido para usuarios de demostración',
      'Funcionalidad de persistencia de sesión',
      'Enlace de redirección al módulo de registro'
    ]
  },
  {
    path: '/auth/register',
    title: 'Módulo de Registro de Nuevos Usuarios',
    description: 'El módulo de registro permite la incorporación de nuevos usuarios al sistema mediante un proceso estructurado de captura de información. Este formulario implementa validaciones en tiempo real para garantizar la integridad de los datos ingresados y facilita la clasificación de usuarios según su rol en el ecosistema de la plataforma.',
    requiresAuth: false,
    sections: [
      'Formulario de captura de información personal y empresarial',
      'Selector de tipo de perfil (Cliente o Proveedor de Servicios)',
      'Sistema de validación de datos en tiempo real',
      'Aceptación de términos y condiciones de uso'
    ]
  },
  {
    path: '/cotizacion',
    title: 'Módulo de Cotización de Acceso Público',
    description: 'Este módulo representa un canal de comunicación directo con usuarios potenciales, permitiendo la solicitud de cotizaciones sin requerir autenticación previa. El sistema está diseñado para capturar de manera eficiente los requerimientos del cliente, facilitando una respuesta ágil por parte del equipo comercial.',
    requiresAuth: false,
    sections: [
      'Formulario de especificación de detalles del vuelo',
      'Campos de selección de aeropuertos de origen y destino',
      'Módulo de programación temporal (fecha y hora)',
      'Especificación de capacidad de pasajeros',
      'Selector de servicios complementarios requeridos'
    ]
  },
  {
    path: '/dashboard',
    title: 'Panel de Control - Perfil Administrador',
    description: 'El panel de control administrativo constituye el centro neurálgico de gestión del sistema FlyVenezuela. Diseñado específicamente para usuarios con privilegios de administración, este módulo proporciona una visión integral de todas las operaciones del sistema, permitiendo la supervisión, control y toma de decisiones basadas en información consolidada en tiempo real.',
    requiresAuth: true,
    user: 'admin',
    sections: [
      'Dashboard ejecutivo con métricas clave del sistema',
      'Módulo de administración de usuarios y perfiles',
      'Centro de gestión de solicitudes y aprobaciones',
      'Panel de configuración y parametrización del sistema',
      'Generador de reportes estadísticos y análisis de datos'
    ]
  },
  {
    path: '/dashboard',
    title: 'Panel de Control - Perfil Cliente',
    description: 'El panel de control para clientes ha sido diseñado como una herramienta integral de gestión de servicios aeroportuarios. Esta interfaz permite a pilotos y empresas de aviación ejecutiva administrar de manera eficiente sus solicitudes de cotización, realizar seguimiento de servicios contratados y mantener un historial completo de sus operaciones.',
    requiresAuth: true,
    user: 'client',
    sections: [
      'Vista consolidada de operaciones de vuelo programadas',
      'Módulo de generación de nuevas solicitudes de cotización',
      'Registro histórico de vuelos y servicios utilizados',
      'Gestión de planes de vuelo en estado activo',
      'Centro de mensajería y notificaciones del sistema'
    ]
  },
  {
    path: '/dashboard',
    title: 'Panel de Control - Perfil Proveedor',
    description: 'El panel de control para proveedores constituye una plataforma especializada para la gestión de servicios aeroportuarios ofrecidos. Este módulo permite a las empresas proveedoras administrar su catálogo de servicios, gestionar solicitudes entrantes, y mantener un control detallado de sus operaciones comerciales dentro del ecosistema FlyVenezuela.',
    requiresAuth: true,
    user: 'provider',
    sections: [
      'Bandeja de entrada de solicitudes de servicios',
      'Catálogo de servicios disponibles y tarifario',
      'Sistema de gestión de inventario y disponibilidad',
      'Panel de estadísticas comerciales y ventas',
      'Programación y calendario de prestación de servicios'
    ]
  },
  {
    path: '/dashboard/quote',
    title: 'Módulo de Generación de Cotizaciones',
    description: 'El módulo de generación de cotizaciones representa una herramienta avanzada para la solicitud detallada de servicios aeroportuarios. Accesible exclusivamente para usuarios autenticados, este formulario integral permite especificar con precisión todos los requerimientos del vuelo, facilitando una cotización precisa y ajustada a las necesidades particulares de cada operación.',
    requiresAuth: true,
    user: 'client',
    sections: [
      'Formulario estructurado de captura de requerimientos',
      'Módulo de selección y configuración de servicios',
      'Panel de especificación de preferencias operativas',
      'Vista de resumen y validación de solicitud'
    ]
  }
];

// Crear directorio para screenshots
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Función para esperar
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para hacer login
async function login(page, userType) {
  const user = USERS[userType];
  console.log(`  → Iniciando sesión como ${user.name}...`);

  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle0' });
  await wait(1000);

  // Llenar formulario de login
  await page.type('input[type="email"]', user.email);
  await page.type('input[type="password"]', user.password);

  // Click en botón de login
  await page.click('button[type="submit"]');
  await wait(3000);

  console.log(`  ✓ Sesión iniciada correctamente`);
}

// Función para capturar screenshot
async function captureScreenshot(page, route, index) {
  const fileName = `screenshot-${index.toString().padStart(2, '0')}.png`;
  const filePath = path.join(SCREENSHOTS_DIR, fileName);

  console.log(`  → Capturando screenshot de: ${route.title}`);

  try {
    // Navegar a la ruta si requiere auth
    if (route.requiresAuth) {
      await login(page, route.user);
      await wait(2000);
    }

    // Navegar a la ruta
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle0' });
    await wait(2000);

    // Scroll para cargar contenido lazy
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            setTimeout(resolve, 500);
          }
        }, 100);
      });
    });

    // Capturar screenshot de página completa
    await page.screenshot({
      path: filePath,
      fullPage: true,
      type: 'png'
    });

    console.log(`  ✓ Screenshot guardado: ${fileName}`);

    // Si es una ruta con auth, hacer logout
    if (route.requiresAuth) {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    }

    return filePath;
  } catch (error) {
    console.error(`  ✗ Error capturando ${route.title}:`, error.message);
    return null;
  }
}

// Función para crear el documento Word
async function createWordDocument(screenshots) {
  console.log('\n📄 Generando documento Word...');

  const sections = [];

  // Portada
  sections.push({
    children: [
      new Paragraph({
        text: '',
        spacing: { before: 4000 }
      }),
      new Paragraph({
        text: 'MANUAL DE USUARIO',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { before: 2000, after: 400 }
      }),
      new Paragraph({
        text: 'Sistema FlyVenezuela',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        text: 'Plataforma Integral de Gestión de Servicios Aeroportuarios',
        alignment: AlignmentType.CENTER,
        spacing: { after: 2000 }
      }),
      new Paragraph({
        text: '',
        spacing: { after: 2000 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Versión del Sistema: 1.0`,
            bold: true
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Fecha de Publicación: ${new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}`,
            bold: true
          })
        ],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({
        text: '',
        pageBreakBefore: true
      })
    ]
  });

  // Introducción del Sistema
  sections.push({
    children: [
      new Paragraph({
        text: 'INTRODUCCIÓN',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 400 }
      }),
      new Paragraph({
        text: '1.1 Contexto y Propósito del Sistema',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      }),
      new Paragraph({
        text: 'FlyVenezuela constituye una plataforma tecnológica integral diseñada para optimizar la gestión de servicios aeroportuarios en el ámbito de la aviación ejecutiva. El sistema representa una solución innovadora que articula las necesidades de tres actores fundamentales del ecosistema aeronáutico: clientes operadores de aviación, proveedores de servicios especializados y administradores del sistema.',
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        text: 'La plataforma ha sido concebida bajo los principios de eficiencia operativa, transparencia en las transacciones y facilidad de uso, permitiendo la digitalización completa del proceso de solicitud, cotización y gestión de servicios aeroportuarios. Su arquitectura tecnológica se fundamenta en tecnologías web modernas que garantizan escalabilidad, seguridad y accesibilidad desde cualquier dispositivo con conexión a internet.',
        spacing: { after: 300 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        text: '1.2 Objetivos del Sistema',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      }),
      new Paragraph({
        text: 'El sistema FlyVenezuela persigue los siguientes objetivos estratégicos:',
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: '• Centralizar ',
            bold: true
          }),
          new TextRun({
            text: 'la gestión de servicios aeroportuarios en una plataforma única, eliminando la fragmentación de procesos y la dependencia de múltiples canales de comunicación.'
          })
        ],
        spacing: { after: 100 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: '• Optimizar ',
            bold: true
          }),
          new TextRun({
            text: 'los tiempos de respuesta en la generación de cotizaciones, permitiendo que clientes obtengan información de precios de manera inmediata y transparente.'
          })
        ],
        spacing: { after: 100 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: '• Facilitar ',
            bold: true
          }),
          new TextRun({
            text: 'la interacción entre proveedores de servicios y clientes, creando un marketplace digital que promueva la competitividad y la calidad del servicio.'
          })
        ],
        spacing: { after: 100 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: '• Proporcionar ',
            bold: true
          }),
          new TextRun({
            text: 'herramientas de administración y control que permitan una gestión eficiente de usuarios, servicios y transacciones dentro del ecosistema.'
          })
        ],
        spacing: { after: 100 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: '• Garantizar ',
            bold: true
          }),
          new TextRun({
            text: 'la trazabilidad completa de todas las operaciones, desde la solicitud inicial hasta la prestación efectiva del servicio.'
          })
        ],
        spacing: { after: 300 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        text: '1.3 Alcance del Manual',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      }),
      new Paragraph({
        text: 'Este manual ha sido elaborado con el propósito de proporcionar una guía completa y detallada para todos los usuarios del sistema FlyVenezuela, independientemente de su rol o nivel de experiencia técnica. El documento está estructurado de manera que cada funcionalidad del sistema sea presentada de forma secuencial y pedagógica, permitiendo al usuario comprender no solo el "cómo" sino también el "por qué" de cada operación.',
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        text: 'El contenido del manual abarca desde las funcionalidades públicas de acceso general hasta las capacidades avanzadas reservadas para usuarios autenticados, proporcionando capturas de pantalla actualizadas y procedimientos paso a paso que facilitan el aprendizaje autónomo y la consulta rápida.',
        spacing: { after: 300 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        text: '1.4 Perfiles de Usuario',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      }),
      new Paragraph({
        text: 'El sistema FlyVenezuela ha sido diseñado considerando tres perfiles de usuario diferenciados, cada uno con funcionalidades y privilegios específicos:',
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Perfil Administrador: ',
            bold: true
          }),
          new TextRun({
            text: 'Usuario con privilegios totales sobre el sistema, responsable de la supervisión general, aprobación de cotizaciones, gestión de usuarios y configuración de parámetros operativos. Este perfil tiene acceso a información consolidada y herramientas de administración avanzadas.'
          })
        ],
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Perfil Cliente: ',
            bold: true
          }),
          new TextRun({
            text: 'Usuario representante de empresas de aviación ejecutiva, pilotos o operadores que requieren servicios aeroportuarios. Este perfil puede generar solicitudes de cotización, realizar seguimiento de servicios contratados y mantener un historial completo de sus operaciones.'
          })
        ],
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Perfil Proveedor: ',
            bold: true
          }),
          new TextRun({
            text: 'Usuario representante de empresas que ofrecen servicios aeroportuarios especializados (combustible, catering, handling, entre otros). Este perfil puede gestionar su catálogo de servicios, establecer tarifas, recibir solicitudes y administrar su actividad comercial.'
          })
        ],
        spacing: { after: 400 },
        alignment: AlignmentType.JUSTIFIED
      }),
      new Paragraph({
        text: '',
        pageBreakBefore: true
      })
    ]
  });

  // Índice de contenidos
  const indexParagraphs = [
    new Paragraph({
      text: 'ÍNDICE DE CONTENIDOS',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 400 }
    }),
    new Paragraph({ text: '' })
  ];

  ROUTES.forEach((route, index) => {
    indexParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. ${route.title}`,
            bold: true
          }),
          new TextRun({
            text: ` ................................ ${index + 3}`,
          })
        ],
        spacing: { after: 200 }
      })
    );
  });

  indexParagraphs.push(
    new Paragraph({
      text: '',
      pageBreakBefore: true
    })
  );

  sections.push({ children: indexParagraphs });

  // Secciones con screenshots
  for (let i = 0; i < ROUTES.length; i++) {
    const route = ROUTES[i];
    const screenshotPath = screenshots[i];

    const sectionParagraphs = [
      new Paragraph({
        text: `${i + 1}. ${route.title}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 300 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Descripción: ',
            bold: true
          }),
          new TextRun({
            text: route.description
          })
        ],
        spacing: { after: 300 }
      })
    ];

    // Agregar información de autenticación si es requerida
    if (route.requiresAuth) {
      sectionParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '🔒 Acceso: ',
              bold: true
            }),
            new TextRun({
              text: `Requiere autenticación como ${USERS[route.user].name}`
            })
          ],
          spacing: { after: 300 }
        })
      );
    }

    // Secciones/características
    if (route.sections && route.sections.length > 0) {
      sectionParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Secciones principales:',
              bold: true
            })
          ],
          spacing: { after: 200 }
        })
      );

      route.sections.forEach(section => {
        sectionParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `  • ${section}`
              })
            ],
            spacing: { after: 100 }
          })
        );
      });

      sectionParagraphs.push(
        new Paragraph({
          text: '',
          spacing: { after: 300 }
        })
      );
    }

    // Agregar screenshot si existe
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      try {
        const imageBuffer = fs.readFileSync(screenshotPath);

        sectionParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'Captura de pantalla:',
                bold: true
              })
            ],
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: 450,
                  height: 300
                }
              })
            ],
            spacing: { after: 400 }
          })
        );
      } catch (error) {
        console.error(`Error agregando imagen ${screenshotPath}:`, error.message);
        sectionParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: '[Error: No se pudo cargar la imagen]',
                italics: true,
                color: 'FF0000'
              })
            ],
            spacing: { after: 400 }
          })
        );
      }
    }

    // Pasos de uso
    sectionParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Pasos para usar esta funcionalidad:',
            bold: true
          })
        ],
        spacing: { after: 200 }
      })
    );

    // Generar pasos según el tipo de ruta
    const steps = generateSteps(route);
    steps.forEach((step, stepIndex) => {
      sectionParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${stepIndex + 1}. ${step}`
            })
          ],
          spacing: { after: 100 }
        })
      );
    });

    // Salto de página excepto en la última sección
    if (i < ROUTES.length - 1) {
      sectionParagraphs.push(
        new Paragraph({
          text: '',
          pageBreakBefore: true
        })
      );
    }

    sections.push({ children: sectionParagraphs });
  }

  // Crear documento
  const doc = new Document({
    sections: sections
  });

  // Guardar documento
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log(`✓ Documento Word generado: ${OUTPUT_FILE}`);
}

// Función para generar pasos según el tipo de ruta
function generateSteps(route) {
  const steps = [];

  switch (route.path) {
    case '/':
      steps.push('Abrir el navegador web de su preferencia (Chrome, Firefox, Safari, Edge).');
      steps.push('Acceder a la dirección del sistema FlyVenezuela proporcionada por su organización.');
      steps.push('Observar la página principal con la presentación institucional en la sección superior (Hero).');
      steps.push('Navegar hacia abajo para explorar las diferentes secciones informativas.');
      steps.push('Revisar el módulo de características distintivas del servicio, donde se destacan los puntos clave de la plataforma.');
      steps.push('Consultar el catálogo de servicios aeroportuarios disponibles.');
      steps.push('Si lo desea, completar el formulario de cotización rápida ubicado en la sección correspondiente.');
      steps.push('Utilizar el selector de idioma en la barra de navegación superior para cambiar entre Español e Inglés según su preferencia.');
      break;

    case '/auth/login':
      steps.push('Desde la página principal, localizar y hacer clic en el botón "Iniciar Sesión" ubicado en la barra de navegación superior.');
      steps.push('El sistema redirigirá automáticamente al módulo de autenticación.');
      steps.push('Identificar el formulario de inicio de sesión con los campos de correo electrónico y contraseña.');
      steps.push('Ingresar la dirección de correo electrónico asociada a su cuenta en el campo correspondiente.');
      steps.push('Introducir la contraseña confidencial en el campo designado (el sistema ocultará los caracteres por seguridad).');
      steps.push('Si desea mantener la sesión activa en el dispositivo, activar la casilla "Recordar sesión".');
      steps.push('Para usuarios en entorno de demostración, observar los botones de acceso rápido que permiten autenticación con un solo clic.');
      steps.push('Hacer clic en el botón "Iniciar Sesión" para proceder a la validación de credenciales.');
      steps.push('El sistema validará la información y redirigirá al panel de control correspondiente según el perfil del usuario.');
      break;

    case '/auth/register':
      steps.push('Desde el módulo de autenticación, localizar y hacer clic en el enlace "Crear nueva cuenta" o "Registrarse".');
      steps.push('El sistema presentará el formulario de registro de nuevos usuarios.');
      steps.push('Completar el campo "Nombre completo" con su nombre y apellidos.');
      steps.push('Ingresar una dirección de correo electrónico válida que servirá como identificador de usuario.');
      steps.push('En el campo "Empresa", indicar el nombre de la organización a la que representa.');
      steps.push('Proporcionar un número de teléfono de contacto en el formato requerido.');
      steps.push('Crear una contraseña segura que cumpla con los requisitos del sistema (mínimo 8 caracteres).');
      steps.push('Confirmar la contraseña ingresándola nuevamente en el campo de verificación.');
      steps.push('Seleccionar el tipo de perfil que corresponda: "Cliente" si requiere servicios aeroportuarios, o "Proveedor" si ofrece servicios.');
      steps.push('Leer detenidamente los términos y condiciones de uso de la plataforma.');
      steps.push('Activar la casilla de aceptación de términos y condiciones.');
      steps.push('Hacer clic en el botón "Registrarse" para enviar la solicitud.');
      steps.push('El sistema procesará la información y, si es válida, creará la cuenta automáticamente.');
      break;

    case '/cotizacion':
      steps.push('Desde la página principal, desplazarse hasta la sección de cotización pública o utilizar el enlace directo en el menú de navegación.');
      steps.push('El sistema presentará el formulario de solicitud de cotización de acceso público.');
      steps.push('En la sección de detalles del vuelo, especificar el código ICAO o nombre del aeropuerto de origen.');
      steps.push('Indicar el aeropuerto de destino utilizando el mismo formato.');
      steps.push('Seleccionar la fecha del vuelo mediante el calendario desplegable.');
      steps.push('Especificar la hora estimada de salida del vuelo.');
      steps.push('Ingresar el número total de pasajeros que viajarán.');
      steps.push('Si aplica, indicar el tipo de aeronave que se utilizará.');
      steps.push('Revisar la lista de servicios complementarios disponibles (combustible, catering, handling, transporte, sala VIP).');
      steps.push('Seleccionar los servicios adicionales requeridos activando las casillas correspondientes.');
      steps.push('Proporcionar información de contacto (nombre, email, teléfono) para recibir la respuesta.');
      steps.push('Opcionalmente, agregar observaciones o requerimientos especiales en el campo de comentarios.');
      steps.push('Verificar que toda la información ingresada sea correcta.');
      steps.push('Hacer clic en el botón "Enviar Solicitud" para procesar la cotización.');
      steps.push('El sistema confirmará la recepción de la solicitud y el equipo comercial se pondrá en contacto a la brevedad.');
      break;

    case '/dashboard':
      if (route.user === 'admin') {
        steps.push('Iniciar sesión en el sistema utilizando credenciales de perfil Administrador.');
        steps.push('El sistema redirigirá automáticamente al panel de control administrativo tras una autenticación exitosa.');
        steps.push('Observar el dashboard ejecutivo con métricas clave presentadas en formato de tarjetas informativas.');
        steps.push('Revisar los indicadores principales: total de cotizaciones activas, usuarios registrados, y servicios disponibles.');
        steps.push('Para gestionar usuarios, localizar y hacer clic en la sección "Administración de Usuarios".');
        steps.push('Utilizar las opciones de filtrado y búsqueda para localizar usuarios específicos.');
        steps.push('Acceder a la bandeja de solicitudes pendientes desde el menú de navegación lateral.');
        steps.push('Revisar cada solicitud de cotización pendiente con sus detalles completos.');
        steps.push('Para aprobar una cotización, seleccionarla y hacer clic en el botón "Aprobar".');
        steps.push('Para rechazar una solicitud, utilizar el botón "Rechazar" y opcionalmente proporcionar un motivo.');
        steps.push('Navegar a la sección de reportes para acceder a análisis estadísticos detallados.');
        steps.push('Utilizar los filtros de fecha y tipo de reporte para generar información específica.');
        steps.push('Acceder a la configuración del sistema desde el icono de engranaje en el menú superior.');
        steps.push('Ajustar parámetros operativos según sea necesario y guardar los cambios realizados.');
      } else if (route.user === 'client') {
        steps.push('Iniciar sesión en el sistema utilizando credenciales de perfil Cliente.');
        steps.push('El sistema presentará el panel de control diseñado específicamente para clientes.');
        steps.push('Observar en la parte superior la vista consolidada de operaciones de vuelo programadas.');
        steps.push('Revisar las tarjetas informativas que muestran resúmenes de vuelos activos, completados y pendientes.');
        steps.push('Para crear una nueva solicitud, localizar y hacer clic en el botón "Nueva Cotización" destacado en el panel.');
        steps.push('Consultar el historial completo de vuelos y servicios utilizados en la sección "Historial".');
        steps.push('Utilizar los filtros de fecha para buscar operaciones específicas en el registro histórico.');
        steps.push('Acceder a los planes de vuelo en estado activo desde la sección correspondiente del menú lateral.');
        steps.push('Revisar el estado de cada plan de vuelo (pendiente, aprobado, en proceso, completado).');
        steps.push('Hacer clic en cualquier vuelo para ver sus detalles completos y servicios asociados.');
        steps.push('Visitar el centro de mensajería para verificar notificaciones y comunicaciones del sistema.');
        steps.push('Configurar preferencias de notificación desde el menú de ajustes de perfil.');
      } else if (route.user === 'provider') {
        steps.push('Iniciar sesión en el sistema utilizando credenciales de perfil Proveedor.');
        steps.push('El sistema mostrará el panel de control especializado para proveedores de servicios.');
        steps.push('Observar la bandeja de entrada con las solicitudes de servicios recibidas.');
        steps.push('Revisar cada solicitud para identificar los servicios requeridos que coincidan con su oferta.');
        steps.push('Hacer clic en una solicitud específica para ver los detalles completos del requerimiento.');
        steps.push('Acceder a la sección "Mis Servicios" para gestionar el catálogo de servicios ofrecidos.');
        steps.push('Agregar nuevos servicios haciendo clic en el botón "Agregar Servicio".');
        steps.push('Para cada servicio, especificar nombre, descripción, tarifa base y unidad de medida.');
        steps.push('Indicar los aeropuertos donde el servicio está disponible.');
        steps.push('Actualizar la disponibilidad y precios de servicios existentes según sea necesario.');
        steps.push('Navegar a la sección de inventario para gestionar la disponibilidad de recursos.');
        steps.push('Consultar el panel de estadísticas comerciales para revisar el desempeño de ventas.');
        steps.push('Utilizar el calendario de servicios para visualizar la programación de prestaciones futuras.');
        steps.push('Configurar alertas para recibir notificaciones de nuevas solicitudes de cotización.');
      }
      break;

    case '/dashboard/quote':
      steps.push('Desde el panel de control de cliente, localizar el botón "Nueva Cotización" prominentemente ubicado.');
      steps.push('Hacer clic en dicho botón para acceder al módulo de generación de cotizaciones.');
      steps.push('El sistema presentará un formulario estructurado en secciones claramente diferenciadas.');
      steps.push('En la sección "Detalles del Vuelo", comenzar especificando el aeropuerto de origen mediante el campo de búsqueda.');
      steps.push('Seleccionar el aeropuerto de destino de manera similar.');
      steps.push('Utilizar el selector de fecha para indicar cuándo se realizará el vuelo.');
      steps.push('Especificar la hora de salida estimada mediante el selector de tiempo.');
      steps.push('Ingresar la matrícula o identificación de la aeronave en el campo correspondiente.');
      steps.push('Seleccionar el tipo de aeronave desde el menú desplegable de opciones disponibles.');
      steps.push('Indicar el número total de pasajeros que viajarán en la aeronave.');
      steps.push('Proceder a la sección de "Servicios Requeridos".');
      steps.push('Revisar la lista completa de servicios aeroportuarios disponibles.');
      steps.push('Para cada servicio requerido, activar la casilla de selección correspondiente.');
      steps.push('Si un servicio requiere especificar cantidad (como galones de combustible), ingresar el valor en el campo numérico.');
      steps.push('En la sección de preferencias operativas, indicar cualquier requerimiento especial o preferencia de horario.');
      steps.push('Especificar preferencias de proveedores si tiene alguna.');
      steps.push('Agregar información adicional relevante en el campo de observaciones.');
      steps.push('Navegar a la sección de resumen para verificar toda la información ingresada.');
      steps.push('Revisar cuidadosamente cada detalle del vuelo y los servicios solicitados.');
      steps.push('Verificar que los datos de contacto sean correctos para recibir la respuesta.');
      steps.push('Si toda la información es correcta, hacer clic en el botón "Enviar Solicitud de Cotización".');
      steps.push('El sistema procesará la solicitud y mostrará un mensaje de confirmación con el número de referencia.');
      steps.push('Guardar el número de referencia para futuras consultas sobre el estado de la cotización.');
      break;
  }

  return steps;
}

// Función principal
async function generateManual() {
  console.log('🚀 Iniciando generación de manual de usuario...\n');

  let browser;
  const screenshots = [];

  try {
    // Iniciar navegador
    console.log('🌐 Iniciando navegador...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('✓ Navegador iniciado\n');

    // Capturar screenshots de cada ruta
    console.log('📸 Capturando screenshots...\n');
    for (let i = 0; i < ROUTES.length; i++) {
      const route = ROUTES[i];
      console.log(`[${i + 1}/${ROUTES.length}] ${route.title}`);
      const screenshotPath = await captureScreenshot(page, route, i);
      screenshots.push(screenshotPath);
      await wait(1000);
    }

    console.log('\n✓ Todos los screenshots capturados\n');

    // Cerrar navegador
    await browser.close();
    console.log('✓ Navegador cerrado\n');

    // Generar documento Word
    await createWordDocument(screenshots);

    // Limpiar screenshots temporales
    console.log('\n🧹 Limpiando archivos temporales...');
    fs.rmSync(SCREENSHOTS_DIR, { recursive: true, force: true });
    console.log('✓ Archivos temporales eliminados\n');

    console.log('✅ ¡Manual generado exitosamente!');
    console.log(`📄 Archivo: ${OUTPUT_FILE}\n`);

  } catch (error) {
    console.error('\n❌ Error generando manual:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

// Ejecutar
generateManual();
