const museumData = {
            totalWorks: 24000,
            totalArtists: 5800,
            topArtists: [
                { name: "Joan Miró", count: 580, desc: "Pintor, escultor y ceramista surrealista. Su gran volumen se debe a importantes donaciones de obra gráfica." },
                { name: "Pablo Picasso", count: 410, desc: "La figura central del museo. Alberga el Guernica y una vasta colección de dibujos preparatorios." },
                { name: "Julio González", count: 390, desc: "Pionero de la escultura en hierro. Gran parte de su legado reside aquí gracias a donaciones familiares." },
                { name: "Salvador Dalí", count: 350, desc: "Icono del surrealismo. El museo posee obras maestras como 'El Gran Masturbador'." },
                { name: "Antoni Tàpies", count: 240, desc: "Maestro del informalismo y la pintura matérica. Fundamental en la colección de posguerra." },
                { name: "Eduardo Chillida", count: 160, desc: "Escultor vasco conocido por sus obras monumentales en acero y hormigón." },
                { name: "Antonio Saura", count: 125, desc: "Fundador del grupo El Paso. Conocido por sus series expresionistas y gestuales." },
                { name: "Juan Gris", count: 85, desc: "El gran maestro del cubismo sintético. Una colección pequeña pero de altísima calidad." },
                { name: "Francis Picabia", count: 65, desc: "Figura clave del dadaísmo y el surrealismo, con una obra ecléctica y cambiante." },
                { name: "Luis Gordillo", count: 60, desc: "P referente de la nueva figuración madrileña y el arte pop en España." }
            ]
        };

        let selectedArtistIndex = -1; // No selection initially
        let mainChartInstance = null;
        let comparisonChartInstance = null;

        let placedMissions = []; 
        let selectedFromTray = null;

        const missions = [
            { id: 1, year: 1920, artist: "José Gutiérrez Solana", title: "La Tertulia de Pombo", 
            loc: "Sabatini, P2, Sala 201", 
            clue: "Hombres trajeados reunidos en una mesa.",
            answer: "José Gutiérrez Solana, La Tertulia del Café de Pombo.", 
            challenge: "¿Cuántos personajes en la mesa miran directamente al espectador?", 
                requiredValue: "4", 
                hint: "Cuenta a los que rompen la 'cuarta pared' con su mirada.",
                context: "La luz de gas y los tonos oscuros reflejan la visión amarga de la España de 1920. Durante el siglo XIX y hasta la Guerra Civil, los cafés se consolidaron como instituciones fundamentales en la vida cultural de Madrid por las tertulias que en ellos se realizaban. El más importante fue el Café de Pombo, un antiguo establecimiento de la calle Carretas frecuentado por la vanguardia española a partir de 1915. En la obra aparece Ramón Gómez de la Serna de pie, rodeado de figuras como Manuel Abril, José Bergamín y el propio pintor Solana. La luz de gas y los tonos oscuros acentúan una atmósfera casi fúnebre, reflejando la visión amarga y profunda de la España de la época. Esta pintura actúa como acta fundacional del Madrid intelectual previo al trauma de la contienda civil.", 
            zone: "Generación de plata" },

            { id: 2, year: 1901, artist: "Pablo Picasso", title: "Mujer en Azul", 
            loc: "Sabatini, P2, Sala 201", 
            clue: "Una mujer imponente, vestida con un azul vibrante.", 
            answer: "Pablo Picasso, 'Mujer en azul'", 
            challenge: "¿Cuántos botones dorados/visibles tiene el traje de la mujer?", 
                requiredValue: "3", 
                hint: "Mira con atención la parte central del corpiño.",
            context: "Pintada durante la breve estancia de Picasso en Madrid en 1901, esta obra es un puente entre su aprendizaje juvenil y su inminente Época Azul. La figura evoca la estructura de las damas de Velázquez, pero con una ejecución técnica que recuerda a la obra de Toulouse-Lautrec en París. El rostro de la mujer, con un maquillaje excesivo y una expresión de melancolía, sugiere la vida nocturna y la decadencia de la 'Belle Époque'. Fue presentada en la Exposición Nacional de Bellas Artes, recibiendo solo una mención honorífica que frustró profundamente al joven artista. Hoy se entiende como una declaración de intenciones: Picasso ya era capaz de dialogar con la tradición española mientras la subvertía con modernidad.",
                zone: "Protovanguardia"},

            { id: 3, year: 1927, artist: "Maruja Mallo", title: "La Verbena de la Libertad", 
            loc: "Sabatini, P2, Sala 203", 
            clue: "Figuras populares y gigantes en una fiesta caótica.", 
            answer: "Maruja Mallo, 'La verbena'",
            challenge: "¿Qué animal aparece repetido tres veces en la noria? (Escribe la palabra)", 
                requiredValue: "GATO", 
                hint: "Es un animal doméstico pequeño.", 
            context: "Maruja Mallo fue una de las figuras más transgresoras de la Generación del 27 y formó parte de las 'Sinsombrero'. En su serie 'La verbena', la artista exponía en la muestra individual que le había organizado Ortega y Gasset en las salas de la Revista de Occidente los 4 óleos dedicados a las fiestas madrileñas. Inventa escenas plenas de barroquismo y carentes de lógica. Se muestran los elementos típicos de las fiestas populares madrileñas (barracha del pim-pam-pum, artefacto para medir la fuerza, gigantón de un solo ojo, freaile en atracciones o pies deformes que piden limosna con la guitarra a la espalda).",
                zone: "Vanguardia Española" },

            { id: 4, year: 1914, artist: "Juan Gris", title: "La Botella de Anís", 
            loc: "Sabatini, P2, Sala 204", 
            clue: "Busca un fragmento de una etiqueta real de 'Anís del Mono'.", 
            answer: "Juan Gris, 'La botella de anís'", 
            challenge: "En la etiqueta del mono, ¿qué nombre de ciudad española aparece junto a París y Madrid?", 
                requiredValue: "BADALONA", 
                hint: "Está en la costa catalana.",
            context: "Juan Gris es considerado el gran maestro del cubismo sintético y esta obra es un ejemplo supremo de su rigor matemático. En ella, Gris rinde homenaje a los líderes del movimiento mencionando ciudades clave como Badalona, Madrid y París. A diferencia de Picasso, Gris utiliza una estructura arquitectónica muy definida donde los objetos no solo se fragmentan, sino que se reconstruyen mediante rimas visuales. La etiqueta del licor español 'Anís del Mono' sirve como ancla de realidad en una composición de gran complejidad geométrica. Es una pieza que demuestra cómo el cubismo podía ser simultáneamente intelectual, preciso y profundamente decorativo.",
                zone: "Cubismo" },

            { id: 5, year: 1925, artist: "Salvador Dalí", title: "Mirando al Mar de Cadaqués", 
            loc: "Sabatini, P2, Sala 205", clue: "Una joven de espaldas, asomada a una ventana.", 
            answer: "Salvador Dalí, 'Muchacha en la ventana'", 
            challenge: "¿Cuántas hojas de la ventana están abiertas?", 
                requiredValue: "1", 
                hint: "Solo una permite ver el mar de Cadaqués.",
            context: "Antes de sumergirse en la locura surrealista, Dalí pasó por una etapa de realismo meticuloso y ordenado influenciado por el movimiento italiano 'Valori Plastici'. La modelo es su hermana Ana María, quien fue su musa principal antes de la llegada de Gala a su vida. La composición utiliza la ventana como un marco dentro del cuadro, creando un juego de perspectivas que invita a la contemplación serena. Los tonos azules y la luz mediterránea capturan la esencia del paisaje de Cadaqués, un lugar sagrado para el artista. Esta obra demuestra la asombrosa capacidad técnica de Dalí para captar la realidad física antes de dedicarse a pintar 'fotografías del subconsciente'.",
                zone: "Realismo" },

            { id: 6, year: 1929, artist: "Ángeles Santos", title: "El Sueño de Ángeles Santos", 
            loc: "Sabatini, P2, Sala 205", 
            clue: "Un cuadro cuadrado inmenso que muestra un planeta habitado por mujeres.", 
            answer: "Ángeles Santos, 'Un mundo'", 
            challenge: "¿Qué forma geométrica tiene el planeta central del cuadro?", 
                requiredValue: "CUBO", 
                hint: "No es como la Tierra real.",
            context: "Ángeles Santos pintó esta obra maestra a los dieciocho años, tras leer una selección de poemas de Juan Ramón Jiménez que despertaron su imaginación cósmica. La pintura rompe con la perspectiva tradicional para mostrar un mundo cúbico donde figuras femeninas tocan instrumentos y encienden estrellas. Su estética mezcla influencias del surrealismo, el expresionismo alemán y el arte de vanguardia que llegaba a cuentagotas a provincias españolas. Fue recibida con asombro en el Salón de Otoño de Madrid, donde intelectuales como García Lorca quedaron fascinados por su audacia. Representa el potencial creativo de las mujeres de la Generación del 27, muchas veces silenciadas por la historia oficial.",
                zone: "Realismo Mágico"},

            { id: 7, year: 1929, artist: "Salvador Dalí", title: "El Paisaje de la Ansiedad", 
            loc: "Sabatini, P2, Sala 205", clue: "Una cabeza gigante que se derrite en la playa con pelo punky y una estatua de una pilila muy pequeña.", 
            answer: "Salvador Dalí, 'El gran masturbador'", 
            challenge: "¿Qué insecto está pegado a la cara de la figura principal?", 
                requiredValue: "SALTAMONTES", 
                hint: "Era una de las grandes fobias de Dalí.",
            context: "Considerada la culminación del surrealismo daliniano, esta obra es un mapa visual de sus obsesiones y temores más profundos. La figura central es un autorretrato basado en una formación rocosa del Cabo de Creus, que aparece con los ojos cerrados, entregado al sueño o la fantasía. Elementos como el saltamontes (fobia infantil de Dalí), las hormigas (símbolo de putrefacción) y el lirio blanco representan una lucha interna entre el deseo y el miedo. La aparición de un busto femenino cerca de la boca de la cabeza alude a la llegada de Gala, quien catalizó su liberación artística y personal. Es una pieza fundamental para comprender cómo el psicoanálisis de Freud fue traducido al lenguaje pictórico.",
                zone: "Surrealismo" },
            
            { id: 8, year: 1937, artist: "Pablo Picasso", title: "El Grito de la Historia", 
            loc: "Sabatini, P2, Sala 205", 
            clue: "Un mural inmenso en blanco y negro.", 
            answer: "Pablo Picasso, 'Guernica'",
            challenge: "¿Qué objeto sostiene la mujer que se asoma por la ventana superior derecha?", 
                requiredValue: "QUINQUÉ", 
                hint: "Es una lámpara de aceite o vela.",
            context: "Encargado por el Gobierno de la República para el Pabellón Español de la Exposición Universal de París de 1937, el 'Guernica' es el mayor icono artístico del siglo XX. Picasso utilizó la noticia del bombardeo de la villa vasca por la aviación nazi para crear una alegoría universal contra la barbarie y el dolor humano. Al eliminar el color, el artista otorgó a la obra un carácter fotográfico y documental, similar a los periódicos de la época. Personajes como la madre con el hijo muerto, el caballo herido y el guerrero caído representan el sufrimiento de la población civil. La obra no regresó a España hasta 1981, cumpliendo el deseo de Picasso de que solo volviera cuando se restaurara la democracia.",
                zone: "Obra Maestra" },

            { id: 9, year: 1932, artist: "Salvador Dalí", title: "El hombre invisible", 
            loc: "Sabatini, P2, Sala 206", 
            clue: "Un demogorgon con dos sirenas mirando desde un paco, un caballo, una columna y todo lo que puedas imaginar.", 
            answer: "Salvador Dalí, 'L'HOMME Invisible'", 
            challenge: "¿Cuántas columnas hay visibles en el cuadro?", 
                requiredValue: "14", 
                hint: "Cuenta con cuidado la mano que emerge de la estructura.",
            context: "Es una de sus primeras obras donde materializa su método paranoico con imágenes dobles. Él mismo describía estas imágenes como la representación de un objeto que, sin modificación anatómica es al mismo tiempo la representación de otro objeto completamente diferente. Se revela la imagen de un hombre sentado con las manos en las rodillas, como un coloso egipcio. Algunas figuras son imágenes dobles, como la mujer tumbada - caballo o el jarrón - cara. ",
                zone: "Abstracción de signos" },

            { id: 10, year: 1933, artist: "Pablo Gargallo", title: "El Profeta en Hierro", 
            loc: "Sabatini, P2, Sala 206", 
            clue: "Escultura metálica de un hombre en los huesos, pero con 1 ala y un barrote en la mano", 
            answer: "Pablo Gargallo, 'Grand Prophete'",
            challenge: "¿Qué material metálico compone esta escultura?", 
                requiredValue: "HIERRO", 
                hint: "Es un metal industrial oscuro.", 
            context: "Pablo Gargallo revolucionó la escultura al introducir el 'vaciado' y el uso del hierro industrial como materiales nobles. En 'El Profeta', el volumen de la figura no se define por la masa, sino por el aire y el espacio vacío que queda entre las láminas de metal. La figura representa a un orador con el brazo levantado y la boca abierta en un grito eterno, simbolizando la fuerza de la palabra y la profecía. Esta técnica de desmaterialización fue clave para el desarrollo de la escultura moderna, influyendo profundamente en artistas posteriores. La obra combina la robustez del material con una ligereza visual asombrosa, convirtiéndose en un hito del cubismo escultórico.",
                zone: "Escultura" },

            { id: 11, year: 1922, artist: "Francis Picabia", title: "La Máquina Dadaísta", 
            loc: "Sabatini, P2, Sala 207", 
            clue: "Busca un dibujo mecánico que parece un esquema industrial con círculos, cables y cajones.", 
            answer: "Francis Picabia, 'Totalizador'", 
            challenge: "¿De qué color es el círculo más grande de la composición?", 
                requiredValue: "NEGRO", 
                hint: "Es el color dominante en los engranajes.",
            context: "Picabia fue uno de los motores del movimiento Dadá y pasó un tiempo crucial en Barcelona y Madrid, donde editó su revista '391'. En 'Totalizadora', el artista utiliza el lenguaje de los diagramas técnicos para parodiar la fe ciega de la humanidad en el progreso industrial. La obra sugiere que los seres humanos se estaban convirtiendo en engranajes de una maquinaria social absurda y sin propósito. Al despojar al dibujo técnico de su utilidad, Picabia obliga al espectador a cuestionar la lógica y la estética de su tiempo. Es una pieza clave para entender la ruptura total con la belleza académica que propugnaban las vanguardias internacionales.",
                zone: "Dadaísmo" },

            { id: 12, year: 1965, artist: "Antoni Tàpies", title: "La Pared de la Memoria", 
            loc: "Sabatini, P4, Sala 406", 
            clue: "Un lienzo que parece un muro real, con arena.", 
            answer: "Antoni Tàpies, 'Relieve ocre y rosa'", 
            challenge: "¿Qué letra del alfabeto está rayada en la superficie ocre?", 
                requiredValue: "X", 
                hint: "Es el símbolo de la incógnita.",
            context: "Tras la guerra, Antoni Tàpies se convirtió en el máximo exponente del informalismo matérico en España. Para Tàpies, el cuadro no es una ventana al mundo, sino un objeto físico, un muro que acumula el paso del tiempo y las heridas de la historia. El uso de arena, polvo de mármol y pigmentos ocre evoca la tierra de Castilla y la sobriedad del monasterio de El Escorial. La cruz que suele aparecer en sus obras no es solo un símbolo religioso, sino una marca de identidad y una firma del hombre sobre la materia. Esta obra representa el silencio y la resistencia espiritual durante los años más grises de la dictadura española.",
                zone: "Informalismo" },

            { id: 13, year: 1956, artist: "Antonio Saura", title: "El Grito de Lola", 
            loc: "Sabatini, P4, Sala 408", 
            clue: "Retrato femenino distorsionado por brochazos negros.", 
            answer: "Antonio Saura, 'Lola'", 
            challenge: "¿Cuántos ojos (o manchas que simulan ojos) identificas en el rostro?", 
                requiredValue: "2", 
                hint: "Es un retrato humano distorsionado.",
            context: "Antonio Saura, miembro fundador del grupo 'El Paso', utilizó el gesto violento y la ausencia de color para expresar la angustia existencial. Su serie de retratos 'Lola' toma como base la figura femenina para someterla a una destrucción pictórica que busca liberar la energía del artista. Influenciado por las 'Pinturas Negras' de Goya, Saura rechaza la belleza complaciente para mostrar el monstruo que habita en el interior del ser humano. El uso radical del blanco y negro refleja una España aislada y tensa, donde la pintura se convierte en un acto de catarsis política y personal. Es una de las cumbres del expresionismo abstracto europeo.",
                zone: "El Paso" },

            { id: 14, year: 1986, artist: "Richard Serra", title: "Esculpir el Acero", 
            loc: "Edificio Nouvel, Patio", 
            clue: "Dos bloques inmensos de acero que parecen flotar.", 
            answer: "Richard Serra, 'Equal-Parallel: Guernica-Bengasi'",
            challenge: "¿Cuántos bloques de acero componen la instalación en total?", 
                requiredValue: "4", 
                hint: "Recorre todo el espacio del patio.", 
            context: "Esta instalación monumental de Richard Serra es un hito del minimalismo que juega con la percepción del peso y el espacio del espectador. La obra fue encargada específicamente para el museo y establece un diálogo conceptual con el 'Guernica' de Picasso a través de su título. Al caminar entre los bloques de acero macizo, el visitante experimenta una sensación física de opresión y equilibrio que invita a la reflexión sobre el poder y la violencia. Serra utiliza materiales industriales para crear una experiencia sensorial pura, despojada de cualquier adorno decorativo. La obra es famosa también por su historia: la pieza original desapareció de los almacenes y tuvo que ser replicada por el artista años después.",
                zone: "Minimalismo" },

            { id: 15, year: 2005, artist: "Jean Nouvel", title: "La Luz de Nouvel", 
            loc: "Exterior / Terraza Nouvel", 
            clue: "Un techo rojo gigante que vuela sobre los edificios.", 
            answer: "Jean Nouvel, 'Ampliación del Museo'", 
            challenge: "¿De qué color es el techo gigante que cubre la plaza?", 
                requiredValue: "ROJO", 
                hint: "Un color vibrante que contrasta con el cielo.",
            context: "El arquitecto francés Jean Nouvel diseñó esta ampliación para transformar el antiguo hospital en un complejo artístico del siglo XXI. El gran elemento unificador es la techumbre de color rojo brillante realizada en aluminio y fibra de vidrio, que protege el nuevo patio público. Sus superficies reflectantes capturan la luz de Madrid y el movimiento de la ciudad, integrando el museo con el barrio de Lavapiés. Los tres nuevos edificios (biblioteca, auditorio y salas de exposiciones) rodean una plaza central que funciona como un 'salón urbano'. Es la parada final de tu misión: el lugar donde la historia de las salas se encuentra con la vida contemporánea de la calle.",
                zone: "Arquitectura" }
        ];

        let completed = [];
        let completedCount = 0;

        function toggleMission(id) {
            const index = missions.findIndex(m => m.id === id);
            if (completed.includes(id)) {
                completed = completed.filter(cId => {
                    const cIndex = missions.findIndex(m => m.id === cId);
                    return cIndex < index;
                });
            } else {
                completed.push(id);
            }
            renderMissions();
            updateProgress();
            renderTimeline();
        }

        function renderMissions() {
            const container = document.getElementById('mission-container');
            container.innerHTML = '';
            missions.forEach((m, idx) => {
                //const isCompleted = completed.includes(m.id);
                const isCompleted = idx < completedCount;
                const isActive = idx === completedCount;
                const isAvailable = idx === 0 || completed.includes(missions[idx-1].id);
                const card = document.createElement('div');
                card.className = `mission-card p-3 rounded-2xl border ${isAvailable ? (isCompleted ? 'completed' : 'active') : 'locked'}`;
                card.innerHTML = `
                    <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-center border-b border-stone-100 pb-4">
                            <div>
                                <div class="text-[10px] font-black text-stone-400 uppercase tracking-widest">Misión ${idx + 1}</div>
                                <h3 class="text-lg font-black text-stone-800 leading-tight">${m.title}</h3>
                            </div>
                            ${isCompleted ? '<span class="text-green-600 text-2xl">✓</span>' : ''}
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center gap-2">
                                <span class="text-[9px] font-bold bg-red-50 text-red-700 px-2 py-1 rounded-full uppercase">${m.loc}</span>
                            </div>
                            <p class="text-stone-600 italic text-sm leading-snug">"${m.clue}"</p>

                            <div class="${isCompleted ? 'hidden' : 'block'}">
                                <p class="text-stone-700 font-medium mb-4">RETO: ${m.challenge}</p>
                                ${isActive ? `
                                    <div class="flex gap-2">
                                        <input type="text" id="input-${m.id}" placeholder="Introduce tu respuesta..." class="input-code">
                                        <button onclick="checkAnswer(${m.id}, ${idx})" class="bg-stone-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">VERIFICAR</button>
                                    </div>
                                    <p class="text-[10px] text-stone-400 mt-2">Pista: ${m.hint}</p>
                                ` : '<p class="text-stone-400 italic text-sm">Debes completar la misión anterior para desbloquear este reto.</p>'}
                            </div>
                            
                            <div class="${isCompleted ? 'block' : 'hidden'} mt-4 bg-stone-50 p-4 rounded-xl border border-stone-100 animate-fade-in">
                                <h4 class="text-[11px] font-black text-red-700 uppercase mb-2">Hallazgo: ${m.answer}</h4>
                                <p class="serif-text text-stone-700 leading-relaxed text-sm">${m.context}</p>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            updateProgress();
        }

        function checkAnswer(id, index) {
            const input = document.getElementById(`input-${id}`);
            const value = input.value.trim().toUpperCase();
            const mission = missions[index];

            if (value === mission.requiredValue.toUpperCase()) {
                // IMPORTANTE: Sincronizar los dos sistemas
                if (!completed.includes(id)) {
                    completed.push(id); // Añadimos el ID para que renderTimeline lo vea
                }
                completedCount++;
                
                if (completedCount === missions.length) {
                    document.getElementById('final-screen').classList.remove('hidden');
                }
                
                renderMissions(); // Refresca la lista de misiones
                renderTimeline(); // Refresca la línea temporal y la bandeja
            } else {
                input.classList.add('error-shake', 'border-red-500');
                setTimeout(() => input.classList.remove('error-shake'), 400);
            }
        }

        function updateProgress() {
            const percent = (completedCount / missions.length) * 100;
            document.getElementById('counter-display').innerText = `${completedCount} / ${missions.length}`;
            document.getElementById('progress-bar').style.width = `${percent}%`;
        }

        function renderTimeline() {
            const tray = document.getElementById('pending-tray');
            const container = document.getElementById('timeline-container');
            
            if (!tray || !container) return;

            tray.innerHTML = '';
            container.innerHTML = '';

            // Filtramos misiones: IDs que están en 'completed' pero NO en 'placedMissions'
            const pending = missions.filter(m => completed.includes(m.id) && !placedMissions.includes(m.id));
            
            if (pending.length === 0) {
                tray.innerHTML = '<p class="text-stone-400 text-sm self-center">Resuelve misiones para obtener piezas...</p>';
            }

            pending.forEach(m => {
                const item = document.createElement('div');
                item.className = `cursor-pointer p-3 bg-white border-2 ${selectedFromTray === m.id ? 'border-red-600 ring-2 ring-red-100' : 'border-stone-200'} rounded-lg shadow-sm text-center w-44 transition-all hover:scale-105`;
                item.onclick = () => { 
                    selectedFromTray = m.id; 
                    renderTimeline(); 
                };
                item.innerHTML = `
                    <div class="text-[10px] font-bold uppercase text-red-700 leading-tight">${m.artist}</div>
                    <div class="text-xs font-black truncate">${m.title}</div>
                    <div class="text-[9px] text-stone-400 mt-1 uppercase font-bold">Seleccionar</div>
                `;
                tray.appendChild(item);
            });

            const allMissionsSorted = [...missions].sort((a, b) => a.year - b.year);

            allMissionsSorted.forEach((m) => {
                const isFoundInGymkana = completed.includes(m.id);
                const isPlacedInTimeline = placedMissions.includes(m.id);
                const element = document.createElement('div');
                
                if (isPlacedInTimeline) {
                    // ESTADO A: Obra correctamente ubicada
                    element.className = "flex flex-col items-center text-center p-4 min-w-[160px] animate-fade-in";
                    element.innerHTML = `
                        <div class="text-2xl font-black text-red-700 mb-1">${m.year}</div>
                        <div class="w-3 h-3 rounded-full bg-red-700 mb-3 ring-4 ring-red-50"></div>
                        <div class="text-[10px] font-bold uppercase tracking-tighter text-stone-800 leading-tight">${m.title}</div>
                        <div class="text-[9px] text-stone-500 italic">${m.artist}</div>
                    `;
                } else if (isFoundInGymkana) {
                    // ESTADO B: Obra desbloqueada en la lista pero esperando ubicación
                    element.className = "timeline-slot group active-slot border-red-300 bg-red-50/50";
                    element.onclick = () => attemptPlace(m.id);
                    element.innerHTML = `
                        <span class="slot-year text-stone-600 group-hover:text-red-700">${m.year}</span>
                        <span class="text-[8px] font-bold text-red-400 uppercase mt-1">¡Ubícame aquí!</span>
                    `;
                } else {
                    // ESTADO C: Obra bloqueada
                    element.className = "timeline-slot locked bg-stone-100";
                    element.innerHTML = `
                        <span class="slot-year opacity-30">${m.year}</span>
                        <span class="text-[8px] font-bold text-stone-400 uppercase mt-1">Bloqueado</span>
                    `;
                }
                container.appendChild(element);
            });
        }
        /*
        function renderTimeline() {
            const tray = document.getElementById('pending-tray');
            const container = document.getElementById('timeline-container');
            
            tray.innerHTML = '';
            container.innerHTML = '';
            const pending = missions.filter(m => completed.includes(m.id) && !placedMissions.includes(m.id));
            
            pending.forEach(m => {
                const item = document.createElement('div');
                item.className = `cursor-pointer p-3 bg-white border-2 ${selectedFromTray === m.id ? 'border-red-600 ring-2 ring-red-100' : 'border-stone-200'} rounded-lg shadow-sm text-center w-44 transition-all hover:scale-105`;
                item.onclick = () => { selectedFromTray = m.id; renderTimeline(); };
                item.innerHTML = `
                    <div class="text-[10px] font-bold uppercase text-red-700 leading-tight">${m.artist}</div>
                    <div class="text-xs font-black truncate">${m.title}</div>
                    <div class="text-[9px] text-stone-400 mt-1 uppercase font-bold">Seleccionar</div>
                `;
                tray.appendChild(item);
            });

            const allMissionsSorted = [...missions].sort((a, b) => a.year - b.year);

            allMissionsSorted.forEach((m) => {
                const isFoundInGymkana = completed.includes(m.id);
                const isPlacedInTimeline = placedMissions.includes(m.id);
                const element = document.createElement('div');
                
                if (isPlacedInTimeline) {
                    // ESTADO A: Obra encontrada y correctamente ubicada
                    element.className = "flex flex-col items-center text-center p-4 min-w-[160px] animate-fade-in";
                    element.innerHTML = `
                        <div class="text-2xl font-black text-red-700 mb-1">${m.year}</div>
                        <div class="w-3 h-3 rounded-full bg-red-700 mb-3 ring-4 ring-red-50"></div>
                        <div class="text-[10px] font-bold uppercase tracking-tighter text-stone-800 leading-tight">${m.title}</div>
                        <div class="text-[9px] text-stone-500 italic">${m.artist}</div>
                    `;
                } else if (isFoundInGymkana) {
                    // ESTADO B: Obra encontrada en gymkana pero esperando a ser ubicada
                    element.className = "timeline-slot group active-slot border-red-300";
                    element.onclick = () => attemptPlace(m.id);
                    element.innerHTML = `
                        <span class="slot-year text-stone-600 group-hover:text-red-700">${m.year}</span>
                        <span class="text-[8px] font-bold text-red-400 uppercase mt-1">¡Ubícame aquí!</span>
                    `;
                } else {
                    // ESTADO C: Obra no encontrada aún (Bloqueada)
                    element.className = "timeline-slot locked";
                    element.innerHTML = `
                        <span class="slot-year">${m.year}</span>
                        <span class="text-[8px] font-bold text-stone-400 uppercase mt-1">No descubierta</span>
                    `;
                }
                container.appendChild(element);
            });
        }*/

        function attemptPlace(targetId) {
            if (!selectedFromTray) {
                alert("Primero selecciona una de las obras de la bandeja superior.");
                return;
            }

            if (selectedFromTray === targetId) {
                // ÉXITO: La obra seleccionada coincide con el hueco del año
                placedMissions.push(selectedFromTray);
                selectedFromTray = null;
                renderTimeline();
            } else {
                // ERROR: El usuario ha intentado poner la obra en un año que no es el suyo
                const obraEquivocada = missions.find(m => m.id === selectedFromTray);
                alert(`¡No es correcto! "${obraEquivocada.title}" no se creó en ese año.`);
            }
        }

        function animateKPIs() {
            animateValue("total-works-display", 0, museumData.totalWorks, 2000);
            animateValue("total-artists-display", 0, museumData.totalArtists, 2000);
        }

        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('es-ES');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        function calculatePercentage(count) {
            return ((count / museumData.totalWorks) * 100).toFixed(3);
        }

        function renderArtistList() {
            const container = document.getElementById('artist-list-container');
            container.innerHTML = ''; // Clear

            museumData.topArtists.forEach((artist, index) => {
                const item = document.createElement('div');
                item.className = `p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 flex justify-between items-center group`;
                item.id = `artist-item-${index}`;
                item.onclick = () => selectArtist(index);

                item.innerHTML = `
                    <div class="flex items-center">
                        <div class="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold mr-3 group-hover:bg-red-200 group-hover:text-red-900">
                            ${index + 1}
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800">${artist.name}</p>
                            <p class="text-xs text-gray-500">${artist.count} obras</p>
                        </div>
                    </div>
                    <div class="text-gray-300">
                        <span class="text-xl">›</span>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function updateProgress() {
            const current = completed.length;
            const percent = (current / missions.length) * 100;
            document.getElementById('counter-display').innerText = `${current} / ${missions.length}`;
            document.getElementById('progress-bar').style.width = `${percent}%`;
        }

        function selectArtist(index) {
            // Remove active class from all
            for (let i = 0; i < museumData.topArtists.length; i++) {
                const el = document.getElementById(`artist-item-${i}`);
                if (el) el.classList.remove('active-artist');
            }

            // Add active class to selected
            const selectedEl = document.getElementById(`artist-item-${index}`);
            if (selectedEl) selectedEl.classList.add('active-artist');

            selectedArtistIndex = index;
            updateDetailCard(index);
            highlightChartSegment(index);
        }

        function updateDetailCard(index) {
            const artist = museumData.topArtists[index];
            const card = document.getElementById('artist-detail-card');
            
            // Populate data
            document.getElementById('detail-name').innerText = artist.name;
            document.getElementById('detail-count').innerText = artist.count;
            document.getElementById('detail-desc').innerText = artist.desc;
            document.getElementById('detail-percentage').innerText = calculatePercentage(artist.count) + '%';

            // Show card with fade in
            card.classList.remove('hidden');
            card.classList.add('animate-fade-in-up');
        }

        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        function initCharts() {
            // Chart 2: Movement
            const ctxMov = document.getElementById('movementChart').getContext('2d');
            new Chart(ctxMov, {
                type: 'bar',
                data: {
                    labels: ['Sabatini P2', 'Sabatini P4', 'Nouvel'],
                    datasets: [{ label: 'Densidad de Obras Clave', 
                    data: [11, 2, 2], backgroundColor: '#1c1917', borderRadius: 8 }]
                },
                options: { responsive: true, 
                maintainAspectRatio: false, 
                scales: { y: { display: false }, x: { grid: { display: false } } }, 
                plugins: { legend: { display: false } } }
            });

            // Nuevo Chart 3: Distribución por Pintor
            const ctx1 = document.getElementById('topArtistsChart').getContext('2d');
            const chartLabels = museumData.topArtists.map(a => a.name);
            const chartData = museumData.topArtists.map(a => a.count);

            mainChartInstance = new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        data: chartData,
                        backgroundColor: [
                            '#C01111', '#F26969', '#fca5a5', '#fee2e2', 
                            '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb'
                        ],
                        borderWidth: 1,
                        borderColor: '#ffffff',
                        hoverOffset: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '30%',
                    plugins: {
                        legend: {
                            display: false // Hide default legend to use our custom list
                        },
                        tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            titleColor: '#111',
                            bodyColor: '#333',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            padding: 18,
                            callbacks: {
                                label: function(context) {
                                    const val = context.raw;
                                    const total = context.chart._metasets[context.datasetIndex].total;
                                    const percentage = ((val / total) * 100).toFixed(1) + '%';
                                    return ` ${val} Obras (${percentage} del Top 10)`;
                                }
                            }
                        }
                    },
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            selectArtist(elements[0].index);
                        }
                    }
                }
            });
        }

        function highlightChartSegment(index) {
            if (!mainChartInstance) return;
            
            // Chart.js doesn't have a persistent "highlight" state API easily accessible,
            // but we can simulate it by manipulating dataset colors or triggering tooltip.
            // Here we trigger the tooltip programmatically.
            
            const chart = mainChartInstance;
            chart.setActiveElements([
                { datasetIndex: 0, index: index }
            ]);
            chart.tooltip.setActiveElements([
                { datasetIndex: 0, index: index }
            ]);
            chart.update();
        }

        window.onload = () => {
            animateKPIs();
            renderArtistList();
            renderMissions();
            renderTimeline();
            initCharts();
        };