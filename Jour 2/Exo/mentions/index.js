require('dotenv').config();

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
    }else if (note >= 10 && note <=12) {
        student.mention = app_P;
    }else if (note >= 12 && note <= 13) {
        student.mention = app_AB;
    }else if (note >= 14 && note <= 16) {
        student.mention = app_B;
    }else{
        student.mention = app_TB;
    }
  }

  console.log(students);