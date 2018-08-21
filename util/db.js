
const mysql = require( 'mysql' ); // manggil package mysql

var connection = mysql.createConnection( {
    host     : 'localhost',
    user     : 'root',
    password : 'mahdipputra',
    database : 'sosmed'
  } );

function query( sql, args ) { // untuk manngil query ke sql
  return new Promise( ( resolve, reject ) => {
      connection.query( sql, args, ( err, rows ) => {
          if ( err )
              return reject( err );
          resolve( rows );
      } );
  } );
}
function close() {
  return new Promise( ( resolve, reject ) => {
      this.connection.end( err => {
          if ( err )
              return reject( err );
          resolve();
      } );
  } );
}

module.exports = {
  query,
  close
}

