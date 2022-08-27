import { connectDatabase, insertDocument } from "../../helpers/dbUtils";

const resolver = async (req, res) => {
  if (req.method === 'POST') {
    const {
      body: {
        email: userEmail
      }
    } = req;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    }
    catch (err) {
      console.log(err);
      res.status(500).json({message: 'Connecting to DB failed'});
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    }
    catch (err) {
      console.log(err);
      res.status(500).json({message: 'Inserting to DB failed'});
      return;
    }
    

    res.status(201).json({ message: 'Signed up!' })
  }
};

export default resolver;