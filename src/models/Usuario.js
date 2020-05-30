import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
    email: String,
    nome: String,
});

export default model('Usuario', UsuarioSchema);