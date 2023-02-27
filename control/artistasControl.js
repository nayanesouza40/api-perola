// Importa conector do banco de dados.
const conn = require('../model/mysql');

const artistasControl = {

    // Lista todos os registros válidos.
  getAll: async (req, res) => {
    try {
      const [rows] = await conn.query("SELECT * FROM artistas WHERE status = 'on' ORDER BY id DESC");
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

   // Lista um registro único pelo Id.
   getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await conn.query("SELECT * FROM artistas WHERE status = 'on' AND id = ?", [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

   // apaga um registro único pelo Id.
   delete: async (req, res) => {
    try {
      const { id } = req.params
      const sql = "UPDATE artistas SET status = 'del' WHERE id = ?"
      const [rows] = await conn.query(sql, [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }

  },

   // Insere um novo registro.
   post: async (req, res) => {
    try {
      const { nome, nacionalidade, data_nascimento, data_falecimento } = req.body;
      const sql = "INSERT INTO artista (nome, nacionalidade, data_nascimento, data_falecimento) VALUES (?, ?, ?, ?)";
      const [rows] = await conn.query(sql, [nome, nacionalidade, data_nascimento, data_falecimento]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

    // Edita o registro pelo Id.
    put: async (req, res) => {
        try {
          const { nome, nacionalidade, data_nascimento, data_falecimento } = req.body;
          const { id } = req.params;
          const sql = "UPDATE artistas SET nome = ?, nacionalidade = ?, data_nascimento = ?, data_falecimento = ?"
          const [rows] = await conn.query(sql, [nome, nacionalidade, data_nascimento, data_falecimento]);
          res.json({ data: rows });
        } catch (error) {
          res.json({ status: "error", message: error });
        }
      }
    };

// Exporta o módulo.
module.exports = artistasControl;