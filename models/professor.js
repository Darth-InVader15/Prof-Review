var moongoose = require("mongoose");
var mongo = require("mongodb")

var professorSchema = new moongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            maxlength:50,
            trim: true
        },
        institute:
        {
            type: String,
            required: true,
            trim: true
        },
        level: 
        {
            // Proff, Asst, Associate
            type: String,
            required: true
        },
        department:
        {
            type: String,
            trim: true,
            required: true
        },
        rating_one:
        {
            type: Array,
           
            default:[]
        },
        rating_two:
        {
            type: Array,
            default:[]
        },
        rating_three:
        {
            type: Array,
            default:[]
        },
        rating_four:
        {
            type: Array,
            default:[]
        },
        displayRating1:
        {
            type:Number,
            default:-1
        },
        displayRating2:
        {
            type:Number,
            default:-1
        },
        displayRating3:
        {
            type:Number,
            default:-1
        },
        displayRating4:
        {
            type:Number,
            default:-1
        },
        comments:
        {
            type: Array,
            default:[]
        },
        commentAuthors:
        {
            type:Array,
            default:[]
        }
        
    },
    {timestamps: true}
)


module.exports = moongoose.model("Professor", professorSchema);