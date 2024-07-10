const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const performanceFinanciereSchema = new Schema({
  entrepriseId: { type: Schema.Types.ObjectId, ref: 'Entreprise' },
  margeOp12M: {type : Number},
  chiffreAffaire: {type : Number},
  beneficeNet: {type : Number},
  coutVentes: {type : Number},
  capitalisationBoursiere: {type : Number}
});

module.exports = mongoose.model('PerformanceFinanciere', performanceFinanciereSchema);
