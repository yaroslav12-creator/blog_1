import PostModel from '../models/Post.js';

export const create = async(req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.status(201).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Opps.. some trobles with server'});
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Opps.. some trobles with server'});
    }
};
export const getOne = async (req, res) => {
    try { 
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 },
        }, {            
            returnDocument: 'after',
        }, (err, doc) => {
            if(err) {
                console.log(error);
                return res.status(500).json({ message: 'Opps.. some trobles with server'});
            }
            if(!doc) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(doc)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Opps.. some trobles with server'});
    }
};
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({_id: postId}, (err, doc) => {
            if(err) {
                console.log(error);
                res.status(500).json({ message: 'Opps.. some trobles with server'});
            }
            if(!doc) {
                return res.status(404).json({
                    message: 'Post not found',
                });
            }
            res.json({
                message: 'Post is successfully removed',
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Opps.. some trobles with server'});
    }
};
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        res.json({ message: 'Successfully updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Opps.. some trobles with server'});
    }
};