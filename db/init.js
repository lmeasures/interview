print("######################################################### START #############################################################");

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
      role: 'user',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      role: 'admin',
    },
  ]);
  
print("#########################################################  END  #############################################################");
  