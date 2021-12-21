$(document).ready(function () {

    // var jsonTexto = '[{"iIdMarca":19,"sMarca":"ACURA"},{"iIdMarca":23,"sMarca":"ALFA ROMEO"},{"iIdMarca":15,"sMarca":"AUDI"},{"iIdMarca":122,"sMarca":"BAIC"},{"iIdMarca":8,"sMarca":"BMW"},{"iIdMarca":128,"sMarca":"BUICK"},{"iIdMarca":1,"sMarca":"CHEVROLET"},{"iIdMarca":5,"sMarca":"CHRYSLER"},{"iIdMarca":26,"sMarca":"FERRARI"},{"iIdMarca":21,"sMarca":"FIAT"},{"iIdMarca":4,"sMarca":"FORD"},{"iIdMarca":6,"sMarca":"HONDA"},{"iIdMarca":28,"sMarca":"HYUNDAI"},{"iIdMarca":142,"sMarca":"INFINITI"},{"iIdMarca":129,"sMarca":"JAC"},{"iIdMarca":132,"sMarca":"JAGUAR"},{"iIdMarca":43,"sMarca":"KIA"},{"iIdMarca":14,"sMarca":"LAND ROVER"},{"iIdMarca":141,"sMarca":"LINCOLN"},{"iIdMarca":27,"sMarca":"LOTUS"},{"iIdMarca":13,"sMarca":"MAZDA"},{"iIdMarca":11,"sMarca":"MERCEDES BENZ"},{"iIdMarca":1141,"sMarca":"MG"},{"iIdMarca":20,"sMarca":"MITSUBISHI"},{"iIdMarca":2,"sMarca":"NISSAN"},{"iIdMarca":10,"sMarca":"PEUGEOT"},{"iIdMarca":18,"sMarca":"PORSCHE"},{"iIdMarca":9,"sMarca":"RENAULT"},{"iIdMarca":25,"sMarca":"ROVER"},{"iIdMarca":12,"sMarca":"SEAT"},{"iIdMarca":22,"sMarca":"SUBARU"},{"iIdMarca":17,"sMarca":"SUZUKI"},{"iIdMarca":134,"sMarca":"TESLA"},{"iIdMarca":7,"sMarca":"TOYOTA"},{"iIdMarca":3,"sMarca":"VOLKSWAGEN"},{"iIdMarca":16,"sMarca":"VOLVO"}]';
    // var coche = JSON.parse(jsonTexto);

    // var selector = document.getElementById("marca");

    // for(var i=0;i<coche.length;i++){ 
    //     selector.options[i+1] = new Option(coche[i]['sMarca'],coche[i]['iIdMarca']);
    //  }
    $.ajax({
        type: 'POST',
        url: 'consumo.php'
    })
        .done(function (listas_rep) {
            var coche = JSON.parse(listas_rep);
            var selector = document.getElementById("marca");
            for (var i = 0; i < coche.length; i++) {
                selector.options[i + 1] = new Option(coche[i]['sMarca'], coche[i]['iIdMarca']);
            }

        })
        

    $('#marca').on('change', function () {
        $.ajax({
            type: 'POST',
            data: {
                'filtro':$('#marca').val() ,
            },
            url: 'submarca.php'
        })
            .done(function (listas_rep) {
                var coche = JSON.parse(listas_rep);
                var selector = document.getElementById("submarca");
                for (var i = 0; i < coche.length; i++) {
                    selector.options[i + 1] = new Option(coche[i]['sSubMarca'], coche[i]['iIdSubMarca']);
                }
            })
           
    })

    $('#submarca').on('change', function () {
        $.ajax({
            type: 'POST',
            data: {
                'filtro':$('#marca').val() ,
            },
            url: 'modelo.php'
        })
            .done(function (listas_rep) {
                var coche = JSON.parse(listas_rep);
                var selector = document.getElementById("modelo");
                for (var i = 0; i < coche.length; i++) {
                    selector.options[i + 1] = new Option(coche[i]['sModelo'], coche[i]['iIdModelo']);
                }
            })
            
    })


    $('#modelo').on('change', function () {
        $.ajax({
            type: 'POST',
            data: {
                'filtro':$('#modelo').val() ,
            },
            url: 'descripcion.php'
        })
            .done(function (listas_rep) {
                var coche = JSON.parse(listas_rep);
                var selector = document.getElementById("descripcion");
                for (var i = 0; i < coche.length; i++) {
                    selector.options[i + 1] = new Option(coche[i]['sDescripcion'], coche[i]['iIdDescripcionModelo']);
                }
            })
    })

    $('#cp').on('change', function () {
        $('#Municipio').val('');
        $('#estado').val('');
        $('#Colonia').val('');
        $.ajax({
            type: 'POST',
            data: {
                'filtro':$('#cp').val() ,
            },
            url: 'cp.php'
        })
            .done(function (listas_rep) {
                
                
                var coche = JSON.parse(listas_rep); 
                
                $('#Municipio').val(coche[0]['Municipio']['sMunicipio']);
                $('#estado').val(coche[0]['Municipio']['Estado']['sEstado']);
                $('#Colonia').val(coche[0]['Ubicacion'][0]['sUbicacion']);
            })
    })

    $('#formularioRegistro').submit(e => {
        let marca=$('#marca').val();
        let submarca=$('#submarca').val(); 
        let modelo=$('#modelo').val();
        let descripcion=$('#descripcion').val();
        let cp=$('#cp').val();
        let municipio=$('#Municipio').val();
        let estado =$('#estado').val();
        let colonia =$('#Colonia').val();
        let genero= $('#genero').val();
        let fecha=$('fecha').val();

        if (marca === '0') {
            swal('Datos incompletos', 'Seleccione una marca de vehiculo', 'warning');
            $('#marca').focus();
            e.preventDefault();
        }
        else if (submarca === '0') {
            swal('Datos incompletos', 'Seleccione una submarca de vehiculo', 'warning');
            $('#submarca').focus();
            e.preventDefault();
        }
        else if (modelo === '0') {
            swal('Datos incompletos', 'Seleccione un modelo de vehiculo', 'warning');
            $('#modelo').focus();
            e.preventDefault();
        }
        else if (descripcion === '0') {
            swal('Datos incompletos', 'Seleccione una descripcion de vehiculo', 'warning');
            $('#descripcion').focus();
            e.preventDefault();
        }
        else if (genero === '0') {
            swal('Datos incompletos', 'Seleccione su genero', 'warning');
            $('#genero').focus();
            e.preventDefault();
        }
        else{
            swal('Datos Completos', 'Se han registro todos los campos del formulario', 'success');
            e.preventDefault();
        }
    
    })



})