var proxyNF = function($http) {

    this.getData = function(src) {
      return $http.get ( src )
                  .then( processData )
    }


    this.addPatient = function(patient){
      console.log(patient);
      ajoutPatient(patient, $http);
    }

    this.affectation = function(idInf, patientNSS){
      var data = {};
      data.infirmier = idInf;
      data.patient = patientNSS;

      $http({
      method: 'POST',
      url: '/affectation',
      data: data
    }).then(function successCallback(response) {
        console.log("Affecté avec succès");
      }, function errorCallback(response) {
        console.log("Erreur de l'affectation");
      });
    }
}
proxyNF.$inject = [ "$http" ]; // Injection de dépendances

module.exports = function(mod) {
    var id = "proxyNF";
    mod.service(id, proxyNF);
    return id;
};

function processData(response) {

  var parser = new DOMParser();
  var doc = parser.parseFromString(response.data, "text/xml");

  var cabinet = {
    patientsNonAffectes : [],
    infirmiers : {}
  }

  var arrayInfirmiers = {};
  var arrayInfirmiersXML = doc.querySelectorAll("infirmier");

  for(var i = 0; i<arrayInfirmiersXML.length; ++i){
    arrayInfirmiers[arrayInfirmiersXML[i].getAttribute("id")] = {
      nom : arrayInfirmiersXML[i].querySelector("nom").textContent,
      prenom : arrayInfirmiersXML[i].querySelector("prenom").textContent,
      photo : arrayInfirmiersXML[i].querySelector("photo").textContent,
      patients : []
    };
  }
  cabinet.infirmiers = arrayInfirmiers;


  var arrayPatientsXML = doc.querySelectorAll("patient");
  var patient = {};



  for(i = 0; i<arrayPatientsXML.length; ++i){
    patient = {
      nom : arrayPatientsXML[i].querySelector("nom").textContent,
      prenom : arrayPatientsXML[i].querySelector("prenom").textContent,
      sexe : arrayPatientsXML[i].querySelector("sexe").textContent,
      naissance : arrayPatientsXML[i].querySelector("naissance").textContent,
      numero : arrayPatientsXML[i].querySelector("numero").textContent
    }
    adressePatient(patient, arrayPatientsXML[i]);
    if(arrayPatientsXML[i].querySelector("visite") != null && arrayPatientsXML[i].querySelector("visite").getAttribute("intervenant") != null){
      cabinet.infirmiers[arrayPatientsXML[i].querySelector("visite").getAttribute("intervenant")].patients.push(patient);
    } else {
      cabinet.patientsNonAffectes.push(patient);
    }

  }
  return cabinet;
}

function adressePatient(patient, patientXML){
  patient["adresse"] ={};
  ajoutAdresse(patient, patientXML, "etage");
  ajoutAdresse(patient, patientXML, "rue");
  ajoutAdresse(patient, patientXML, "ville");
  ajoutAdresse(patient, patientXML, "codePostal");
}

function ajoutAdresse(patient, patientXML, critere){
  if(patientXML.querySelector(critere) != null ){
    patient.adresse[critere] = patientXML.querySelector(critere).textContent;
  }
}

function ajoutPatient(patient, $http){
  $http({
  method: 'POST',
  url: '/addPatient',
  data: patient
}).then(function successCallback() {
    console.log("Ajout avec succès ");
  }, function errorCallback() {
    console.log("Erreur de l'ajout ");
  });
}
