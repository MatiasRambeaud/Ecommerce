import ticketsModel from "../models/ticket.model.js";
export default class TicketsDao {

    create(ticket) {
        return ticketsModel.create(ticket);
    }
    getOne(params) {
        return ticketsModel.findOne(params);
    }
}