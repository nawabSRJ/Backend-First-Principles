import postModel from "../models/Post.js";

export const addApost = async (req, res) => {
    try {
        // * NOTE : validation happens internally by mongoose
        const post = await postModel.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (err) {
        console.log('Error in getting all posts : ', err.message);
        res.status(500).json({ error: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const deleted = await postModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).send();  // ? success + nothing to give back, this is for telling the client that the operation is successful and in return nothing actually is returned just a signal (or status)

    } catch (error) {

    }
}
export const updatePost = async (req, res) => {
    try {
        const updated = await postModel.findByIdAndUpdate(
            req.params.id,   // 1. WHICH document to find — the MongoDB _id
            req.body,        // 2. WHAT to update it with — { title, snippet, content }
            { new: true, runValidators: true },
        );

        if (!updated) {
            return res.status(400).json({ error: 'Post Not Found to Update' })
        }

        if (!res.ok) {  // this prevents the UI to broke because of faulty response
            throw new Error('Failed to update post');
        }

        res.status(200).json(updated)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// * Notes
// ? For Update
// new: true — by default Mongoose returns the old document before the update. new: true tells it to return the updated document instead. You need this because you send the updated post back to the frontend to update the UI.

// runValidators: true — by default Mongoose skips schema validation on updates. This option enforces it — so if title is required in your schema, an empty title will still throw a validation error.