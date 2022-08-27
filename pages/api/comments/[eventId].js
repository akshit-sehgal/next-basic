import { connectDatabase, getAllDocuments, insertDocument } from "../../../helpers/dbUtils";

const resolver = async (req, res) => {
  const { eventId } = req.query;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to DB Failed' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email?.includes('@') || !name?.trim() || !text?.trim()) {
      res.status(422).json({ message: 'Invalid inputs' });
      return;
    }

    const newComment = {
      eventId,
      email,
      text,
      name,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Failed to insert document' });
    }    
  }

  if (req.method === 'GET') {
    try {
      const comments = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json({ message: 'Fetching comments failed' });
    }
  }

  client.close();
};

export default resolver;