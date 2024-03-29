$(document).ready(function () {
    showHideCaidasAgua();
    $('#tipoCalc').change(function () {
        const tipoArea = $(this).val();
        let unidadMedida;
        switch (tipoArea) {
            case 'TECHO':
                unidadMedida = 'm<sup>2</sup>';
                break;
            case 'PARED':
                unidadMedida = 'm<sup>2</sup>';
                break;
            case 'PINTURA':
                unidadMedida = 'm<sup>2</sup>/l';
                break;
            default:
                unidadMedida = '';
                break;
        }
        $('#unidadMedida').html(unidadMedida);
    });

    $('#tipoCalc').change(function () {
        showHideCaidasAgua();
    });

    function showHideCaidasAgua() {
        //techo
        var tipoCalc = document.getElementById("tipoCalc").value;
        var caidasAguaDiv = document.getElementById("caidasAguaDiv");
        if (tipoCalc == "TECHO") {
            caidasAguaDiv.style.display = "block";
        } else {
            caidasAguaDiv.style.display = "none";
        }
        //drywall
        var tipoCalc = document.getElementById("tipoCalc").value;
        var longitudToPiso = document.getElementById("longitudToPiso");
        var alturaPisoTecho = document.getElementById("alturaPisoTecho");
        var SepParantes = document.getElementById("SepParantes");
        var numCaras = document.getElementById("numCaras");
        if (tipoCalc == "PARED") {
            longitudToPiso.style.display = "block";
            alturaPisoTecho.style.display = "block";
            SepParantes.style.display = "block";
            numCaras.style.display = "block";
        } else {
            longitudToPiso.style.display = "none";
            alturaPisoTecho.style.display = "none";
            SepParantes.style.display = "none";
            numCaras.style.display = "none";
        }
        //pintura
        var tipoCalc = document.getElementById("tipoCalc").value;
        var conberturaPint = document.getElementById("coberturaPintura");
        if (tipoCalc == "PINTURA") {
            conberturaPint.style.display = "block";
        } else {
            conberturaPint.style.display = "none";
        }
    }

    $('#CalculoMaterial').submit(e => {
        e.preventDefault();
        const nombrePersona = document.getElementById('nombrePersona').value;
        const telefonoPersona = document.getElementById('telefonoPersona').value;
        const areaTotalTecho = document.getElementById('Areacalc').value;
        const tipoAreaCal = document.getElementById('tipoCalc').value;
        const caidasAgua = document.getElementById('caidasAgua').value;
        // calcularLaminas(areaCalcular, caidasAgua);
        informe_pago_personal(nombrePersona, telefonoPersona, areaTotalTecho, tipoAreaCal, caidasAgua);
    });
    function calcularLaminas(area, caidasAgua) {
        let laminasNecesarias = 0;
        const anchoUtilLamina = 1; // Ancho útil de la lámina en metros
        const longitudComercialPies = 2; // Longitud comercial en pies (aproximadamente 0.6096 metros)

        // Calcular el área total del techo en metros cuadrados
        let areaTotal = 0;

        // Dividir el área total según roofType y añadir 0.80 metros a cada lado
        if (caidasAgua == 1) {
            areaTotal = (area / 4) + 1.60;
            laminasNecesarias = Math.ceil(areaTotal / anchoUtilLamina);
        } else if (caidasAgua == 2) {
            areaTotal = (area / 4) + 1.60;
            laminasNecesarias = Math.ceil(areaTotal / (anchoUtilLamina));
        } else if (caidasAgua == 3) {
            areaTotal = (area / 4) + 1.60;
            laminasNecesarias = Math.ceil(areaTotal / (anchoUtilLamina));
        } else if (caidasAgua == 4) {
            areaTotal = (area / 4) + 1.60;
            laminasNecesarias = Math.ceil(areaTotal / (anchoUtilLamina));
        }
        // Redondear al valor entero más cercano
        laminasNecesarias = Math.round(laminasNecesarias);
        // Multiplicar por el factor roofType
        laminasNecesarias *= caidasAgua;

        return laminasNecesarias;
    }
    function informe_pago_personal(nombrePersona, telefonoPersona, areaTotalTecho, tipoAreaCal, caidasAgua) {
        const doc = new window.jspdf.jsPDF();
        const date = new Date();

        const imgWidth = 100; // Ancho de la imagen
        const imgHeight = 50; // Altura de la imagen
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const xPos = (pdfWidth - imgWidth) / 2; // Centrar horizontalmente
        const yPos = (pdfHeight - imgHeight) / 2; // Centrar verticalmente

        // Variables para el diseño del encabezado y la tabla
        const imgData = 'assets/img/logo-a.png'; // Ruta de tu logo
        const watermarkImg = 'assets/img/logo-b.png';
        const contactNumbers = '943212297 - 932566922';
        const address1 = 'Carretera Central Km 412';
        const address2 = 'CPM Llicua - Amarilis - Huánuco';
        doc.setFont("Arial Narrow", "bold");
        doc.setFontSize(11);
        const reportTitle = 'CALCULO DE VIVIENDA  ' + nombrePersona.toUpperCase() + '';


        /* footer */
        const reportFooter = 'TITAN';
        const currentDate = new Date().toLocaleDateString();

        // Función para dibujar el encabezado en cada página
        const drawHeader = () => {
            doc.addImage(imgData, 'PNG', 10, 10, 30, 15);
            doc.addImage(watermarkImg, 'PNG', xPos, yPos, imgWidth, imgHeight);
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(contactNumbers, doc.internal.pageSize.getWidth() - 60, 15);
            doc.text(address1, doc.internal.pageSize.getWidth() - 60, 25);
            doc.text(address2, doc.internal.pageSize.getWidth() - 60, 30);
            doc.setFontSize(22);
            doc.setTextColor(19, 19, 19);
            doc.text(reportTitle, doc.internal.pageSize.getWidth() - 170, 42);
        };
        const drawBody = () => {
            //resultado del calculo por laminas
            const laminasResultado = calcularLaminas(areaTotalTecho, caidasAgua);
            let tipoMaterial = "";
            if (tipoAreaCal == 'TECHO') {
                tipoMaterial = "láminas de zinc."
            } else if (tipoAreaCal == 'PARED') {
                tipoMaterial = "drywall"
            } else if (tipoAreaCal == 'PINTURA') {
                tipoMaterial = "Bale de Pintura Marca Latex";
            }

            let unidadMedida = "";
            if (tipoAreaCal == 'TECHO') {
                unidadMedida = "(m²) Metros Cuadrado"
            } else if (tipoAreaCal == 'PARED') {
                unidadMedida = "(m²) Metros Cuadrado"
            } else if (tipoAreaCal == 'PINTURA') {
                unidadMedida = "m²/l Metros cuadrados por Litros";
            }
            //console.log(caidasAgua);
            // Establece la posición inicial para el texto del cuerpo
            let yPosition = 60; // Puedes ajustar esta posición según tus necesidades

            // Aquí puedes agregar más llamadas a doc.text() para agregar más texto
            doc.setFont("Arial Narrow", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Establece el color del texto (RGB)
            doc.text('Material:   ' + tipoMaterial + '', 20, yPosition);
            // Incrementa la posición Y para el próximo elemento en el cuerpo
            yPosition += 10; // Puedes ajustar este valor según la altura de tus líneas de texto
            //----------------------------------
            doc.setFont("Arial Narrow", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Establece el color del texto (RGB)
            doc.text('Área:  ' + areaTotalTecho + '   ' + unidadMedida + '', 20, yPosition);
            // Incrementa la posición Y para el próximo elemento en el cuerpo
            yPosition += 10; // Puedes ajustar este valor según la altura de tus líneas de texto
            //----------------------------------
            doc.setFont("Arial Narrow", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Establece el color del texto (RGB)
            doc.text('Tipo Area: ' + tipoAreaCal + '', 20, yPosition);
            // Incrementa la posición Y para el próximo elemento en el cuerpo
            yPosition += 10; // Puedes ajustar este valor según la altura de tus líneas de texto

            //----------------------------------
            doc.setFont("Arial Narrow", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Establece el color del texto (RGB)
            doc.text('Tipo caida de Agua: ' + caidasAgua + ' CAIDA DE AGUA', 20, yPosition);
            // Incrementa la posición Y para el próximo elemento en el cuerpo
            yPosition += 10; // Puedes ajustar este valor según la altura de tus líneas de texto
            //------------------------------------------------------------


            // Define tu texto en párrafos
            doc.setFont("Arial Narrow", "normal");
            doc.setFontSize(9);
            // const paragraphs = [
            //     "Calcularemos el techo para un pequeño cuarto de dimensiones 4×4 metros. Es un techo a dos aguas, cuya",
            //     " inclinación es del 19% en ambos sentidos. .",
            //     "ANCHO LONGITUD DEL TECHO.",
            //     "El ancho de este techo es de 5.60 metros y la longitud medida es de 2.83 metros, con estas dimensiones",
            //     "se garantizan aleros de 0.80 metros mínimo. Los pequeños aleros sirven de protección a la estructura",
            //     "de la casa, en especial en climas lluviosos.",
            //     "Se utilizarán láminas de zinc ondulados, éstas son láminas metálicas muy económicas y de gran calidad",
            //     "para las cubiertas.",
            //     "El ancho útil es de 1 metro y la longitud comercial está disponible cada 2 pies, es decir que el pedido",
            //     "se realizara en múltiplos de 2"
            // ];
            // // Iterar sobre cada párrafo y dibujarlo en el documento
            // paragraphs.forEach(paragraph => {
            //     doc.text(paragraph, 20, yPosition);
            //     // Incrementa la posición en y para el próximo párrafo
            //     yPosition += 10; // Puedes ajustar el valor de incremento según tu preferencia
            // });

            // Agrega más texto o elementos aquí si es necesario
            doc.text('SE NESECITAN APROXIMADAMENTE  ' + laminasResultado + ' LAMINAS DE ALUZINC', 20, yPosition);
            // Incrementa la posición Y para el próximo elemento en el cuerpo
            yPosition += 10; // Puedes ajustar este valor según la altura de tus líneas de texto
        };
        // Función para dibujar el pie de página en cada página
        const drawFooter = () => {
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(12);

                // Fondo verde al pie de página
                doc.setFillColor(228, 85, 18);
                doc.rect(0, pdfHeight - 20, pdfWidth, 20, 'F');

                // Texto centrado
                doc.setTextColor(255, 255, 255);
                doc.text(reportFooter + ' (' + currentDate + ')', 10, pdfHeight - 10, {
                    align: 'left',
                });

                // Fecha y paginación a la derecha
                doc.text(
                    ' Página ' + i + ' de ' + totalPages,
                    pdfWidth - 12,
                    pdfHeight - 10,
                    { align: 'right' }
                );
            }
        };
        drawHeader();
        drawBody();
        drawFooter();
        // Guardar el PDF con el nombre del trabajador
        //const fileName = `IP_${mes_pago}_${selectedNombreP}.pdf`;
        //pdf_IP.save(fileName);
        // Generar el PDF
        const string = doc.output('datauristring');
        // Crear un elemento <embed> para mostrar el PDF
        const embedElement = document.createElement('embed');
        embedElement.setAttribute('width', '100%');
        embedElement.setAttribute('height', '100%');
        embedElement.setAttribute('src', string);
        // Obtener el div donde deseas mostrar el PDF
        const divMostrarInformePago = document.getElementById('mostrarHojaCalc');
        // Limpiar cualquier contenido previo dentro del div
        divMostrarInformePago.innerHTML = '';
        // Agregar el elemento <embed> al div
        divMostrarInformePago.appendChild(embedElement);
    }

});



// Ejemplo de uso:
// const areaTotalTecho = 16; // Área total del techo en metros cuadrados
// const tipoTecho = 3; // Tipo de techo (1, 2, 3 o 4)
// const laminasResultado = calcularLaminas(areaTotalTecho, tipoTecho);
// console.log(`Se necesitan ${laminasResultado} láminas para el techo.`);

