import { Schema, model } from 'mongoose';

const ReservaSchema = new Schema({
    responsavel: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    dataInicial: String,
    dataFinal: String,
    qtdHospedes: Number,
});

export default model('Reserva', ReservaSchema);