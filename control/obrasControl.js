// Importa conector do banco de dados.
const conn = require('../model/mysql');

const obrasControl = {

    // Lista todos os registros válidos.
  getAll: async (req, res) => {
    try {
      const [rows] = await conn.query("SELECT * FROM obras WHERE status = 'on' ORDER BY id DESC");
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

   // Lista um registro único pelo Id.
   getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await conn.query("SELECT * FROM obras WHERE status = 'on' AND id = ?", [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

    // Lista todos os registros filtrando o artistas
  getAllArtist: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await conn.query("SELECT * FROM obras WHERE status = 'on' AND artista_id = ?", [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  getAllMuseum: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await conn.query("SELECT * FROM obras WHERE status = 'on' AND museus_id = ?", [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

   // apaga um registro único pelo Id.
   delete: async (req, res) => {
    try {
      const { id } = req.params
      const sql = "UPDATE obras SET status = 'del' WHERE id = ?"
      const [rows] = await conn.query(sql, [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }

  },

   // Insere um novo registro.
   post: async (req, res) => {
    try {
      const { titulo, descricao, dimensoes, imagem_url, data_criacao, status, movimento_id, tecnica_id, museu_id } = req.body;
      const sql = "INSERT INTO obras (titulo, descricao, dimensoes, imagem_url, data_criacao, status, movimento_id, tecnica_id, museu_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const [rows] = await conn.query(sql, [titulo, descricao, dimensoes, imagem_url, data_criacao, status, movimento_id, tecnica_id, museu_id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

    // Edita o registro pelo Id.
    put: async (req, res) => {
        try {
          const { titulo, descricao, dimensoes, imagem_url, data_criacao, status, movimento_id, tecnica_id, museu_id } = req.body;
          const { id } = req.params;
          const sql = "UPDATE obras SET titulo = ?, descricao = ?, dimensoes = ?, imagem_url = ?, data_criacao = ?, status = ?, movimento_id = ?, tecnica_id = ?, museu_id =?"
          const [rows] = await conn.query(sql, [titulo, descricao, dimensoes, imagem_url, data_criacao, status, movimento_id, tecnica_id, museu_id]);
          res.json({ data: rows });
        } catch (error) {
          res.json({ status: "error", message: error });
        }
      }
    };

// Exporta o módulo.
module.exports = obrasControl;