var moongoose = require("mongoose");

var commentsSchema = new moongoose.Schema(
    {
        postId:
        {
            type: String,
            required:true,
            trim: true
        },
        desc:
        {
            type: String,
            required: true,  
            trim: true 
        },
        author:
        {
            type: String,
            required: true,
            trim: true
        }
    },
    {timestamps:true}
)

module.exports = moongoose.model('Comment', commentsSchema)