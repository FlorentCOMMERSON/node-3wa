// # 00 Exercice mentions

// Installez un nouveau projet, définissez à l'aide des variables d'environnement les données suivantes :

// - Une mention "assez bien" si sa moyenne est égale ou supérieure à 12/20 et inférieure à 14/20.
// - Une mention "bien" si sa moyenne est au moins égale à 14/20 et inférieure à 16/20.
// - Une mention "très bien" s'il obtient une moyenne égale ou supérieure à 16/20.

// Utilisez les étudiants suivants et définissez les labels "Assez bien", "Bien", "Très bien" et "Passable" des mentions de chaque étudiant

require('dotenv').config();

//récupération des variables d'environnement
const{app_AB, app_B, app_TB, app_P} = process.env;

const students = [
    { name: 'ALAN', note: '11', address: 'Paris', mention : null },
    { name: 'ALICE', note: '17', address: 'Paris', mention : null },
    { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
    { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
    { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
    { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
    { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
    { name: 'SONIA', note: '18', address: 'Paris', mention : null },
    { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
  ];

  for (const student of students) {
    const {note} =student;
    if (note < 10){
    student.mention = "Aucune mention";
    }else if (note <=12) {
        student.mention = app_P;
    }else if (note <= 14) {
        student.mention = app_AB;
    }else if (note <= 16) {
        student.mention = app_B;
    }else{
        student.mention = app_TB;
    }
  }

  console.log(students);