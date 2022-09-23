// Métodos: index, show, update, store e destroy

/*
 * index: listagem de seções
 * store: criar uma sessão
 * show: quando queremos listar uma única sessão
 * update: quando queremos alterar alguma sessão
 * destroy: quando queremos deletar uma sessão
 */

import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: "Falha na validação" });

    // Verificando se este usuário já existe
    let user = await User.findOne({ email });

    // Caso não exista, é criado um novo
    if (!user) user = await User.create({ email });

    return res.json(user);
  }
}

export default new SessionController();
