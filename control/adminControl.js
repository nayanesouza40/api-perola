// Importa conector do banco de dados.
const conn = require('../model/mysql');

const adminControl = {

   // Lista um registro único pelo Id.
   getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await conn.query("SELECT * FROM administrador WHERE status = 'on' AND id = ?", [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Insere um novo registro.
  post: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      const sql = "SELECT * FROM administrador WHERE status = 'on' AND email = ? AND senha = ?";
      const [rows] = await conn.query(sql, [nome, email, senha]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
}
  
    };

// Exporta o módulo.
module.exports = adminControl;