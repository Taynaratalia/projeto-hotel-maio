import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class SessionController{
    async index(req, res) {
        let usuarios = await Usuario.find();
        return res.json(usuarios);
    }

    async store(req, res) {

        const { email, nome } = req.body;
        let usuario = await Usuario.findOne({ email });

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            nome: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                mensagem: "Dados inválidos!"
            })
        }

        if(!usuario) {
            usuario = await Usuario.create({ email, nome });
        }
        
        return res.json(usuario);
    }

    async update(req, res) {

        const { usuario_id } = req.headers;
        const { nome } = req.body;

        Usuario.findById(usuario_id).catch((err) => {
            return res.status(401).json({
                mensagem: "Usuario não autrizado!"
            });
        })

        const usuario = await Usuario.updateOne({
            id: usuario_id,
            nome
        });

        return res.json(usuario);
    }

    async destroy(req, res) {

        const { usuario_id } = req.params;

        await Usuario.findByIdAndRemove( usuario_id ).catch((err) => {
            return res.status(401).json({
                mensagem: "Erro ao remover usuario!"
            });
        });
        
        return res.json({ mensagem: 'Usuario removido com sucesso!' });
        }
    }

export default new SessionController;