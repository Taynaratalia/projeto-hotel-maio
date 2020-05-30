import { Router } from 'express';

import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController'
import HotelController from './controllers/HotelController'
import ReservaController from './controllers/ReservaController'

const routes = new Router();
const upload = multer(uploadConfig);

routes.get('/sessao', SessionController.index);
routes.post('/sessao', SessionController.store);
routes.put('/sessao', SessionController.update);
routes.delete('/sessao/:usuario_id', SessionController.destroy);

routes.get('/hoteis', HotelController.index);
routes.post('/hoteis', upload.single('imagem'), HotelController.store);
routes.put('/hoteis/:hotel_id', HotelController.update);
routes.delete('/hoteis/:hotel_id', HotelController.destroy);


routes.get('/hoteis/:usuario_id', ReservaController.index);
routes.post('/hoteis/:hotel_id/reserva', ReservaController.store);

export default routes;
