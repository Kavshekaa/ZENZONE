import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  //middle ware handles th epicture and this post handles the creation of the picture
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, // if someone liked it or not
      comments: [],
    });
    await newPost.save(); // to save post into mongo db

    const post = await Post.find(); 
    res.status(201).json(post); 
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  // grab all the post
  try {
    const post = await Post.find();
    res.status(200).json(post);// return the post to front end and feed is updated with the post
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  //grab user posts from his id
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  //add a like on a post
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
// if post already like d by the person
    if (isLiked) {
      post.likes.delete(userId);// deltes alreafy exsits
    } else {
      post.likes.set(userId, true);//sets if not
    }

    const updatedPost = await Post.findByIdAndUpdate( //updating a specific post by passing id and likes
      id,
      { likes: post.likes },//lists of like
      { new: true }
    );

    res.status(200).json(updatedPost);//update the front end
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

