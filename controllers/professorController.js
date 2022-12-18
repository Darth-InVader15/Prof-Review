let Professor = require('../models/professor');

exports.allInstitutes = (req,res) => {
    Professor.find({}, (err, prof)=>
    {
        if(err || !prof)
        {
            return res.status(400).json({
                error:"No institute found"
            })
        }
        else
        {
            let l = prof.length;
            let instituteNames = [];

            for(let i=0;i<l;i++)
            {
                instituteNames.push(prof[i].institute);
            }
            return res.status(200).json(instituteNames);

        }

    }
    )
}


// FUNCTIONAL
// BUG: SAME item added more than once in the database
exports.addProfessor = (req, res) => {

    let newEntry = new Professor(req.body);
    console.log(newEntry);

    if(req.body.comment.length!=0)
    {
        newEntry.comments.push(req.body.comment);
        newEntry.commentAuthors.push(req.body.author);
    }

    newEntry.save((err, prof) => {
        if(err)
        {
            console.log(err);
            return res.status(400).send(err);
        }
        else
        {
            console.log("Written to the database");
            return res.status(200).json(prof);
        }
    })
}


// FUNCTIONAL
exports.expandProfessor = (req,res) => 
{
    Professor.findById(req.params.professorId, (err, prof) => {
        if(err || !prof)
        {
            console.log("NOT FOUND")
            return res.status(500).json({
                error: "No data found"
            })
        }
        else
        {
            console.log("Found", prof);
            return res.status(200).json(prof);
        }
    })
    
}

// FUNCTIONAL
// This function sends all professors from a given institute and a given department
exports.getAllProfessors = (req, res) => 
{
    const instName = req.params.instituteName;
    const deptName = req.params.departmentName;
    console.log("instituteName", instName);
    console.log("departmentName", deptName);
    Professor.find({"institute": instName, "department":deptName}, (err, post) => {
        if(err || !post )
        {
            return res.status(400).json(
                {
                    error: "No post found"
                }
            )
        }
        else
        {
            let l = post.length;
            for(var i=0;i<l;i++)
            {
                console.log(post[i]);
            }
            return res.status(200).json(post);
        
        }
    })
}


// FUNCTIONAL
exports.editRating = (req,res) => {
    let profId = req.params.professorId;
    console.log("Search for ", profId);

    const{givenRating1, givenRating2, givenRating3, givenRating4, comment, author} = req.body;


    Professor.findById(profId, (err, prof) => {
        if(err || !prof)
        {
            console.log("Prof not in database");
            return res.status(404).json({error: "Professor NOT FOUND in the Database"});
        }
        else
        {
            prof.rating_one.push(givenRating1);
            prof.rating_two.push(givenRating2);
            prof.rating_three.push(givenRating3);
            prof.rating_four.push(givenRating4);

            let l = prof.rating_one.length;

            let one=0;
            let two=0;
            let three=0;
            let four=0;

            for(let i=0;i<l;i++)
            {
                one+=prof.rating_one[i];
                console.log('rating one ', prof.rating_one[i]);
            }

            for(let i=0;i<l;i++)
            {
                two+=prof.rating_two[i];
            }

            for(let i=0;i<l;i++)
            {
                three+=prof.rating_three[i];
            }

            for(let i=0;i<l;i++)
            {
                four+=prof.rating_four[i];
            }

            one/=l;
            two/=l;
            three/=l;
            four/=l;
            
            prof.displayRating1=one;
            prof.displayRating2=two;
            prof.displayRating3=three;
            prof.displayRating4=four;

            if(comment.length!=0)
            {
                prof.comments.push(comment);
                prof.commentAuthors.push(author);
            }



            prof.save((err, updated)=>{
                if(err || !updated)
                {
                    return res.status(400).send("Failed to save the updated value to the database");
                }
                else
                {
                    return res.status(200).json(updated);
                }
            })
        }

    })

}