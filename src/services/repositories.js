import UsersDao from "../db/dao/UsersDao.js";
import CartsDao from "../db/dao/CartsDao.js";
import ProductsDao from "../db/dao/ProductsDao.js";
import TicketsDao from "../db/dao/TicketsDao.js";

import UsersRepository from "../repositories/UsersRepository.js";
import CartsRepository from "../repositories/CartsRepository.js";
import ProductsRepository from "../repositories/ProductsRepository.js";
import TicketsRepository from "../repositories/TicketsRepository.js";

export const UsersService = new UsersRepository(new UsersDao());
export const CartsService = new CartsRepository(new CartsDao());
export const ProductsService = new ProductsRepository(new ProductsDao());
export const TicketsService = new TicketsRepository(new TicketsDao());