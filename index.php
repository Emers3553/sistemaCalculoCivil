<!doctype html>
<html lang="en">

<head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Bootstrap CSS v5.2.1 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js" integrity="sha512-OqcrADJLG261FZjar4Z6c4CfLqd861A3yPNMb+vRQ2JwzFT49WT4lozrh3bcKxHxtDTgNiqgYbEUStzvZQRfgQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.14/jspdf.plugin.autotable.min.js"></script>
</head>

<body>
    <header>
        <!-- place navbar here -->
    </header>
    <main>

        <div class="card">
            <div class="card-header">Datas Generales</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-3">
                        <div class="tab-content">
                            <form id="CalculoMaterial" action="" method="post">
                                <div class="col-md-12 mx-auto text-center">
                                    <label for="nombrePersona">NOMBRE</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="text" name="nombrePersona" class="form-control text-center" id="nombrePersona" placeholder="maria">
                                    </div>
                                </div>
                                <br>
                                <div class="col-md-12 mx-auto text-center">
                                    <label for="telefonoPersona">Telefono</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="telefonoPersona" class="form-control text-center" id="telefonoPersona" placeholder="909090909">
                                    </div>
                                </div>
                                <br>
                                <div class="col-md-12 mx-auto text-center">
                                    <label for="tipoCalc">TIPO DE AREA</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <select class="form-control text-center" name="tipoCalc" id="tipoCalc">
                                            <option value="" selected="disabled">Selecciona el tipo</option>
                                            <option value="TECHO">TECHO</option>
                                            <option value="PARED">PARED</option>
                                            <option value="PINTURA">PINTURA</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <div class="col-md-12 mx-auto text-center">
                                    <label for="Areacalc">AREA CALCULAR</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="Areacalc" class="form-control text-center" id="Areacalc" placeholder="100" min="0" step="any" step="0.01" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="unidadMedida">m<sup>2</sup></span>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <!-- div ocultos -->
                                <!-- TECHO -->
                                <div class="col-md-12 mx-auto text-center" id="caidasAguaDiv" style="display: none;">
                                    <label for="caidasAgua">CAIDAS DE AGUA</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <select class="form-control text-center" name="caidasAgua" id="caidasAgua">
                                            <option value="" selected="disabled">Selecciona la caida</option>
                                            <option value="1">1 CAIDA DE AGUA</option>
                                            <option value="2">2 CAIDA DE AGUA</option>
                                            <option value="3">3 CAIDA DE AGUA</option>
                                            <option value="4">4 CAIDA DE AGUA</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <!-- PARED -->
                                <div class="col-md-12 mx-auto text-center" id="longitudToPiso" style="display: none;">
                                    <label for="longtotalPiso">LONGITUD TOTAL EN PISO</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="longtotalPiso" class="form-control text-center" id="longtotalPiso" placeholder="2" min="0" step="any" step="0.01">
                                        <div class="input-group-append">
                                            <span class="input-group-text" >ml</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mx-auto text-center" id="alturaPisoTecho" style="display: none;">
                                    <label for="altpisotech">ALTURA DE PISO A TECHO</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="altpisotech" class="form-control text-center" id="altpisotech" placeholder="2" min="0" step="any" step="0.01">
                                        <div class="input-group-append">
                                            <span class="input-group-text" >ml</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mx-auto text-center" id="SepParantes" style="display: none;">
                                    <label for="separparantes">SEPARACION ENTRE PARANTES(si h3m ingresar 0.40 m)</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="separparantes" class="form-control text-center" id="separparantes" placeholder="2" min="0" step="any" step="0.01">
                                        <div class="input-group-append">
                                            <span class="input-group-text" >m<sup>2</sup>/l</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mx-auto text-center" id="numCaras" style="display: none;">
                                    <label for="numcar">NUMERO DE CARAS</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="numcar" class="form-control text-center" id="numcar" placeholder="2" min="0" step="any" step="0.01">
                                        <div class="input-group-append">
                                            <span class="input-group-text" >m<sup>2</sup>/l</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- PINTURA -->
                                <div class="col-md-12 mx-auto text-center" id="coberturaPintura" style="display: none;">
                                    <label for="cobpintura">COBERTURA DE LA PINTURA</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="input-group mb-2">
                                        <input type="number" name="cobpintura" class="form-control text-center" id="cobpintura" placeholder="2" min="0" step="any" step="0.01">
                                        <div class="input-group-append">
                                            <span class="input-group-text" >m<sup>2</sup>/l</span>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="form-group row">
                                    <div class="offset-sm-2 col-sm-10 float-right">
                                        <button class="btn btn-block btn-outline-success">CALCULAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-9">
                        <div id="resultado"></div>
                        <div class="card-body" id="mostrarHojaCalc" style="width: 1000px; height: 830px;"></div>
                    </div>
                </div>

            </div>
            <div class="card-footer">

            </div>
        </div>
    </main>
    <footer>
        <!-- place footer here -->
    </footer>
    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script src="assets/js/calculo.js"></script>
</body>

</html>