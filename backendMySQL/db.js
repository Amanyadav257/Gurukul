import mysql from "mysql";
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'gurukul_test'
  });
  
  const connectDB = connection.connect((error) => {
    if(error){
      console.log('Error connecting to the MySQL Database');
      return;
    }
    console.log('Connection established sucessfully');
  });
  connection.end((error) => {
  });

  export default connectDB;