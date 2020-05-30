import { Schema, model } from 'mongoose';

const HotelSchema = new Schema({
    imagem: String,
    nome: String,
    uf: String,
    municipio: String,
    endereco: String,
    qtdApts: Number,
    valorDiaria: Number,
}, {
    toJSON: {
        virtuals: true,
    }
});

HotelSchema.virtual('imagem_url').get(function(){
    return `http://localhost:3000/uploads/${this.imagem}`;
});

export default model('Hotel', HotelSchema);