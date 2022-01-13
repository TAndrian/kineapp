export class Patient {
    constructor (id, prenom, nom, age, information ,pathologie , bilan) {
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.age = age;
        this.information = information;
        this.pathologie = pathologie;
        this.bilan = bilan;
    }
  }
  
  export var PatientConverter = {
      toFirestore: function(patient) {
          return {
                prenom: patient.prenom,
                nom: patient.nom,
                age: patient.age,
                information: patient.information,
                pathologie: patient.pathologie,
                bilan: patient.bilan
              };
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Patient(snapshot.id, data.prenom, data.nom, data.age, data.information, data.pathologie, data.bilan);
      }
  }