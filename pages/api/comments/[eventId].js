import { MongoClient } from "mongodb";
async function handler(req, res){
    const eventId = req.query.eventId

    const client = await MongoClient.connect('mongodb+srv://max:IloveBloo@cluster0.cffbidw.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0')

    if(req.method === 'POST'){
        const {email, name, text} = req.body

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({message: 'Invalid input'});
        }

        console.log(email, name, text);
        const NewComment = {
            email,
            name,
            text,
            eventId
        }

        const db = client.db();

        const result = await db.collection('comments').insertOne(NewComment)

        console.log(result)

        NewComment.id = result.insertedId;
        res.status(201).json({message: 'Added comment.', comment: NewComment})
        res.status(201).json({message: 'Added comment'})
    }

    if(req.method === 'GET'){
       const db = client.db();

       const documents = await db.collection('comments').find().sort({_id: -1}).toArray();

        res.status(200).json({comments: documents});
    }
    client.close();
}

export default handler;