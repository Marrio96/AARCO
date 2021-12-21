<?php

function cargainicial(){
    $ch = curl_init();
    $filtro=$_POST['filtro'];
    $array = [
        "idAplication" => "2",
        "NombreCatalogo" => "Submarca",
        "Filtro" => "$filtro"
    ];
    
    $data = http_build_query($array);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_URL, 'https://apitestcotizamatico.azurewebsites.net/api/catalogos');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    if (curl_error($ch)) echo curl_error($ch);
    
    curl_close($ch);
    
    
    $objeto=json_decode($response);
    
    return $objeto->CatalogoJsonString;

}

echo cargainicial();