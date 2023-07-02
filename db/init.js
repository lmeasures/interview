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
      name: 'Fabio Araujo',
      email: 'faraujo@aiimi.com',
      phone: '01234567890',
      role: 'Decider',
    },
    {
      name: 'Paul Maker',
      email: 'pmaker@aiimi.com',
      phone: '0123654789',
      role: 'Decider',
    },
    {
      name: 'Sam Onilado',
      email: 'SamO@montash.de',
      phone: '02546581647',
      role: 'Decider',
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
    },
    {
      name: 'Example Data',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    },
    {
      name: 'Example Data2',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    },
    {
      name: 'Example Data3',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    },
    {
      name: 'Example Data5',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    },
    {
      name: 'Example Data4',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    },
    {
      name: 'Example Data6',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    },
    {
      name: 'Example Data7',
      email: 'ExampleEmail@emails.email',
      phone: '01337859645',
      role: 'Data Point',
    }
  ]);
  