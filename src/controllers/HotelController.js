import * as Yup from 'yup';
import Hotel from '../models/Hotel';
import Usuario from '../models/Usuario';

class HotelController {
    async index(req, res) {
        const { municipio } = req.body;

        let hoteis = await Hotel.find({ municipio });
        
        return res.json(hoteis);
    }

    async store(req, res) {

        const imagem = req.file.filename;
        const { usuario_id } = req.headers;
        const { nome, uf, municipio, endereco, qtdApts, valorDiaria } =  req.body;

        const schema = Yup.object().shape({

            nome: Yup.string().required(), 
            uf: Yup.string().required(),
            municipio: Yup.string().required(),
            endereco: Yup.string().required(),
            qtdApts: Yup.number().required().min(0),
            valorDiaria: Yup.number().required().min(1),

        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                mensagem: "Dados inválidos!"
            })
        }

        Hotel.findOne({ nome }).catch((err) => {
            return res.status(409).json({
                mensagem: "Hotel já existe!"
            });
        });


        let hotel = await Hotel.create({
                nome,
                uf,
                municipio,
                endereco,
                qtdApts,
                valorDiaria,
                imagem,
            });

            return res.json(hotel);
    }

    async update(req, res) {

        const { hotel_id } = req.headers;
        const { nome, uf, municipio, endereco, qtdApts, valorDiaria } = req.body;

        Hotel.findById(hotel_id).catch((err) => {
            return res.status(400).json({
                mensagem: "Hotel inválido!"
            });
        })

        const hotel = await Hotel.updateOne({
            id: hotel_id,
            nome,
            uf,
            municipio,
            endereco,
            qtdApts,
            valorDiaria
        });

        return res.json(hotel);
    }

    async destroy(req, res) {

        const { hotel_id } = req.params;

        await Hotel.findByIdAndRemove( hotel_id ).catch((err) => {
            return res.status(401).json({
                mensagem: "Erro ao remover hotel!"
            });
        });
        
        return res.json({ mensagem: 'Hotel removido com sucesso!' });
    }
    
}

export default new HotelController;