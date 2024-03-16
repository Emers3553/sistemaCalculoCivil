$(document).ready(function () {
  var funcion;
  var funcion = '';
  var datetime = new Date();
  console.log(datetime);

  //mostrar reporte de usuarios
  reporte_facturas();
  function reporte_facturas(consulta) {
    // Se define la función a ejecutar en el controlador
    funcion = 'reporte_facturas';
    $.post(
      '../controlador/reporteFacturasControlador.php',
      { consulta, funcion },
      (response) => {
        const reportes = JSON.parse(response);
        console.log(reportes);
        let template = '';
        let contador = 0; // Inicializamos el contador
        reportes.forEach((reporte) => {
          // Asignar tipo_cliente en comparación de usuario
          // Usuarios = (cliente online)
          // Usuarios != (cliente presencial), porque el id_usuario
          if (reporte.id_usuario == reporte.id_cliente) {
            tipo_cliente = 'Online';
          } else {
            tipo_cliente = 'Presencial';
          }
          contador++; // Incrementamos el contador en cada iteración
          template += `
          <tr>
          <th scope="row">${contador}</th>
            <th scope="row">${reporte.fecha}</th>          
            <th scope="row">${reporte.nombre_cliente}</th>          
            <th scope="row">${reporte.nombre_tipo_pago}</th>
            <th scope="row">${tipo_cliente}</th>
            <th scope="row">${reporte.total_venta}</th>
          </tr>`;
        });
        $('#reporte_facturas_lista').html(template);

        // Destruir la instancia anterior de DataTables
        $('#reporte_facturas').DataTable().destroy();

        // Inicializar DataTables después de cargar los datos en la tabla
        $('#reporte_facturas').DataTable({
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          language: {
            url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
          },
        });
      }
    );
  }

  $(document).on('click', '#diaFactura', function () {
    //mostrar reporte de usuarios
    dia_facturas();
    function dia_facturas(consulta) {
      // Se define la función a ejecutar en el controlador
      funcion = 'dia_facturas';
      $.post(
        '../controlador/reporteFacturasControlador.php',
        { consulta, funcion },
        (response) => {
          const reportes = JSON.parse(response);
          let template = '';
          let template2 = `
          <tr>
            <th>N°</th>
            <th>FECHA</th>
            <th>CLIENTE</th>
            <th>TIPO DE PAGO</th>
            <th>TIPO DE VENTA</th>
            <th>MONTO TOTAL</th>
          </tr>`;
          let contador = 0; // Inicializamos el contador
          reportes.forEach((reporte) => {
            if (reporte.id_usuario == reporte.id_cliente) {
              tipo_cliente = 'Online';
            } else {
              tipo_cliente = 'Presencial';
            }
            contador++; // Incrementamos el contador en cada iteración
            template += `
          <tr>
          <th scope="row">${contador}</th>
          <th scope="row">${reporte.fecha}</th>          
          <th scope="row">${reporte.nombre_cliente}</th>          
          <th scope="row">${reporte.nombre_tipo_pago}</th>
          <th scope="row">${tipo_cliente}</th>
          <th scope="row">${reporte.total_venta}</th>
          </tr>`;
          });
          // Destruir la instancia anterior de DataTables
          $('#reporte_facturas').DataTable().destroy();

          $('#reporte_facturas_lista').html('');
          $('#facturas_lista_head').html('');

          $('#reporte_facturas_lista').html(template);
          $('#facturas_lista_head').html(template2);

          // Inicializar DataTables después de cargar los datos en la tabla
          $('#reporte_facturas').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            language: {
              url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
            },
          });
        }
      );
    }
  });

  $(document).on('click', '#mesFactura', function () {
    //mostrar reporte de usuarios
    mes_facturas();
    function mes_facturas(consulta) {
      // Se define la función a ejecutar en el controlador
      funcion = 'mes_facturas';
      $.post(
        '../controlador/reporteFacturasControlador.php',
        { consulta, funcion },
        (response) => {
          const reportes = JSON.parse(response);
          let template = '';
          let template2 = `
          <tr>
          <th>N°</th>
          <th>FECHA</th>
          <th>CLIENTE</th>
          <th>TIPO DE PAGO</th>
          <th>TIPO DE VENTA</th>
          <th>MONTO TOTAL</th>
        </tr`;
          let contador = 0; // Inicializamos el contador
          reportes.forEach((reporte) => {
            if (reporte.id_usuario == reporte.id_cliente) {
              tipo_cliente = 'Online';
            } else {
              tipo_cliente = 'Presencial';
            }
            template += `
            <tr>
            <th scope="row">${contador}</th>
            <th scope="row">${reporte.fecha}</th>          
            <th scope="row">${reporte.nombre_cliente}</th>          
            <th scope="row">${reporte.nombre_tipo_pago}</th>
            <th scope="row">${tipo_cliente}</th>
            <th scope="row">${reporte.total_venta}</th>
            </tr>`;
          });
          // Destruir la instancia anterior de DataTables
          $('#reporte_facturas').DataTable().destroy();

          $('#reporte_facturas_lista').html('');
          $('#facturas_lista_head').html('');

          $('#reporte_facturas_lista').html(template);
          $('#facturas_lista_head').html(template2);

          // Verificar si la instancia de DataTables existe
          if ($.fn.DataTable.isDataTable('#reporte_facturas')) {
            // Destruir la instancia anterior de DataTables
            $('#reporte_facturas').DataTable().destroy();
          }
          // Inicializar DataTables después de cargar los datos en la tabla
          $('#reporte_facturas').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            language: {
              url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
            },
          });
        }
      );
    }
  });

  $(document).on('click', '#fechasFactura', function () {
    //mostrar reporte de usuarios
    fechas_facturas();
    function fechas_facturas(consulta) {
      const fechaInicio = $('#fecha_inicio').val();
      const fechaFin = $('#fecha_fin').val();
      console.log(fechaFin, fechaInicio);
      // Se define la función a ejecutar en el controlador
      funcion = 'fechas_facturas';
      $.post(
        '../controlador/reporteFacturasControlador.php',
        { consulta, fechaInicio, fechaFin, funcion },
        (response) => {
          const reportes = JSON.parse(response);
          console.log(reportes);
          let template = '';
          let template2 = `<tr>
          <th>N°</th>
          <th>FECHA</th>
          <th>CLIENTE</th>
          <th>TIPO DE PAGO</th>
          <th>TIPO DE VENTA</th>
          <th>MONTO TOTAL</th>
        </tr`;
          let contador = 0; // Inicializamos el contador
          reportes.forEach((reporte) => {
            if (reporte.id_usuario == reporte.id_cliente) {
              tipo_cliente = 'Online';
            } else {
              tipo_cliente = 'Presencial';
            }
            contador++; // Incrementamos el contador en cada iteración
            template += `
            <tr>
            <th scope="row">${contador}</th>
            <th scope="row">${reporte.fecha}</th>          
            <th scope="row">${reporte.nombre_cliente}</th>          
            <th scope="row">${reporte.nombre_tipo_pago}</th>
            <th scope="row">${tipo_cliente}</th>
            <th scope="row">${reporte.total_venta}</th>
            </tr>`;
          });
          // Destruir la instancia anterior de DataTables
          $('#reporte_facturas').DataTable().destroy();

          $('#reporte_facturas_lista').html('');
          $('#facturas_lista_head').html('');

          $('#reporte_facturas_lista').html(template);
          $('#facturas_lista_head').html(template2);

          // Inicializar DataTables después de cargar los datos en la tabla
          $('#reporte_facturas').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            language: {
              url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
            },
          });
        }
      );
    }
  });

  // Generar PDF 
  $(document).on('click', '#generatePDFF', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const imgWidth = 100; // Ancho de la imagen
    const imgHeight = 50; // Altura de la imagen
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    const xPos = (pdfWidth - imgWidth) / 2; // Centrar horizontalmente
    const yPos = (pdfHeight - imgHeight) / 2; // Centrar verticalmente

    // Variables para el diseño del encabezado y la tabla
    const imgData = 'assets/img/logo_titan.png'; // Ruta de tu logo
    const watermarkImg = 'assets/img/watermark.png';
    const contactNumbers = '943212297 - 932566922';
    const address1 = 'Carretera Central Km 412';
    const address2 = 'CPM Llicua - Amarilis - Huánuco';
    const reportTitle = 'Reporte de Facturas';

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
      doc.text(reportTitle, doc.internal.pageSize.getWidth() - 140, 42);
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

    // Evento para dibujar el encabezado en cada página
    doc.autoTable({
      html: '#reporte_facturas',
      startY: 50,
      theme: 'striped',
      headStyles: {
        fillColor: [228, 85, 18], // Cambiar a color naranja
        textColor: [255, 255, 255], // Cambiar el color del texto del encabezado
      },
      didDrawPage: () => {
        drawHeader();
        drawFooter();
      },
    });

    // Abrir el PDF en una nueva ventana
    var pdfWindow = window.open('', '_blank');
    pdfWindow.document.open();
    pdfWindow.document.write(
      '<html><head><title>PDF Reporte de Ventas</title></head><body>'
    );
    pdfWindow.document.write(
      '<embed width="100%" height="100%" src="' +
        doc.output('datauristring') +
        '" type="application/pdf">'
    );
    pdfWindow.document.write('</body></html>');
    pdfWindow.document.close();
  });
});

$(document).ready(function () {
  // Función para filtrar los resultados de la tabla según el texto de búsqueda
  $('#buscar').on('input', function () {
    var searchText = $(this).val().toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
    $('#venta tr').filter(function () {
      // Filtrar las filas de la tabla
      $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1); // Mostrar u ocultar la fila según si contiene el texto de búsqueda
    });
  });
});
