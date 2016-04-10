require( "./secretary.css" );
var utils = require( './utils.js' );
utils.XHR('GET', 'data/cabinetInfirmier.xml').then( function(data) {
  console.log(data);
  var parser = new DOMParser();
  var doc = parser.parseFromString(data.response, "text/xml");

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
      naissance : arrayPatientsXML[i].querySelector("naissance").textContent
    }
    adressePatient(patient, arrayPatientsXML[i]);
    if(arrayPatientsXML[i].querySelector("visite") != null && arrayPatientsXML[i].querySelector("visite").getAttribute("intervenant") != null){
      cabinet.infirmiers[arrayPatientsXML[i].querySelector("visite").getAttribute("intervenant")].patients.push(patient);
    } else {
      cabinet.patientsNonAffectes.push(patient);
    }

  }
  console.log(cabinet.patientsNonAffectes[0].adresse);
} )

function adressePatient(patient, patientXML){
  patient["adresse"] ={};
  ajoutAdresse(patient, patientXML, "etage");
  ajoutAdresse(patient, patientXML, "numero");
  ajoutAdresse(patient, patientXML, "rue");
  ajoutAdresse(patient, patientXML, "ville");
  ajoutAdresse(patient, patientXML, "codePostal");
}

function ajoutAdresse(patient, patientXML, critere){
  if(patientXML.querySelector(critere) != null ){
    patient.adresse[critere] = patientXML.querySelector(critere).textContent;
  }
}

function nouveauPatient(form){
  utils.XHR('POST', 'data/cabinetInfirmier.xml', form).then(function(data){
    console.log(data);

  });
}
