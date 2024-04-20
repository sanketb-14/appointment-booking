const Table = require('../models/tableModel');
const db = require('../util/database');

exports.createTable = async (req, res) => {
    try {
        const { tableName, fields } = req.body;
       ;

        const DynamicModel = db.define(tableName, fields );
        await db.sync();

        res.status(201).json({ message: `Table ${tableName} created successfully`, DynamicModel });
    } catch (err) {
        console.error('Error creating table:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTableNames = async(req, res) => {
    try {
        const [results] = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'Students'
      AND table_type = 'BASE TABLE'
    `)
        const tableNames = results.map((result) => result.TABLE_NAME);
    res.status(201).json({
        status:"success",
        data:{
            tableNames
        }
    })
     
    } catch (error) {
        console.error('Error fetching table names:', error);
        throw error;

        
    }
}
