"use strict"

const Comment = require("../models/comment")

module.exports = {
    list: async(req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */
        const result = await res.getModelList(Comment, {}, ["blogId", "userId"])
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Comment),
            result
        })
    },
    create: async(req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Comment"
                }
            }
        */
        console.log("Useer be canim-->", req.user)
        req.body.userId = req.user._id
        const result = await Comment.create(req.body)
        res.status(201).send({
            error: false,
            result
        })
    },
    read: async(req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Read Comment"
        */
        const result = await Comment.findOne({_id: req.params.id}).populate(["userId", "blogId"])
        res.status(200).send({
            error: false,
            result
        })
    },
    update: async(req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Comment"
                }
            }
        */
        const commentData = await Comment.findOne({_id: req.params.id})
        console.log(commentData);
        // console.log(req.user);
        
        if (commentData.userId.toString() != req.user._id.toString()) {
            res.errorStatusCode = 401;
            throw new Error("You cannot update someone else's comments")
        }
        const result = await Comment.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        // console.log(result);       

        res.status(202).send({
            error: false,
            result,
            new: await Comment.findOne({_id: req.params.id})
        })
    },
    delete: async(req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */
        const commentData = await Comment.findOne({_id: req.params.id}).populate("userId")
        console.log(commentData);
        console.log(req.user);
            
        if (commentData.userId.username != req.user.username) {
            res.errorStatusCode = 401;
            throw new Error("You cannot delete someone else's comments")
        }
        const result = await Comment.deleteOne({_id: req.params.id})
        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            message: "Your comment deleted successfully",
            result
        })
    },
    getLike: async(req, res) => {
        const result = await Comment.findOne({_id: req.params.id})
        console.log(result.likes);
            
        res.status(200).send({
            error: false,
            likes: result.likes
        })
    },
    postLike: async(req, res) => {
        const result = await Comment.findOne({_id: req.params.id})
        console.log(result);
            
        let likes = result?.likes.map((id)=>id.toString()) || []
        const userId = req.user._id.toString()
            
        console.log(likes);
        console.log(userId);
        if (likes.includes(userId)) {
            console.log("hello");
                
            likes = likes.filter((id) => id !== userId)            
            console.log(likes);
        } else {
            likes.push(userId)
        }
            
        result.likes = likes
        await result.save()
        res.status(200).send({
            error: false,
            result,
        })
    },
}
