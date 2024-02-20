function init(db) {
    //Creo tabella se non esiste
    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS plants (
        idPianta INTEGER PRIMARY KEY AUTOINCREMENT,
        nomePianta TEXT NOT NULL,
        descrizionePianta TEXT
        )
    `);
    });

    //se la tabella non è vuota riempio con campi di default
    db.get('SELECT COUNT(*) as count FROM plants', (err, row) => {
        if (row.count === 0) {
            //inserisco i dati di esempio
            db.run('INSERT INTO plants (nomePianta, descrizionePianta) VALUES (?, ?)', ['rosa', 'una pianta']);
            db.run('INSERT INTO plants (nomePianta, descrizionePianta) VALUES (?, ?)', ['girasole', 'un altra pianta']);
        }
    });
}

module.exports = {
    init
};