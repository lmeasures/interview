db = db.getSiblingDB("UserData")

db.createUser({
    user: 'admin',
    pwd: 'password',
    roles: [
      {
        role: 'readWrite',
        db: 'mydb',
      },
    ],
  });
  
  db.createCollection('users');
  
  db.users.insertMany([
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      role: 'Engineer',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      role: 'Line Manager',
    },
    {
      name: 'Lee Measures',
      email: 'just@getMeasures.dev',
      phone: '07763504590',
      role: 'Contender',
    },
    {
      name: 'Jean Luc Picard',
      email: 'winefordays@chateaupicard.com',
      phone: '01337859645',
      role: 'Admiral (Retired)',
    }
  ]);
  