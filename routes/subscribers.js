const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber")

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

router.post("/", async (req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel,
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber);
    delete res.subscriber;
})

router.patch("/:id", getSubscriber, async (req, res) => {
    if(req.body.name) res.subscriber.name = req.body.name;
    if(req.body.subscriberToChannel) res.subscriber.subscriberToChannel = req.body.subscriberToChannel;

    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch(err) {
        res.status(400).json({message:err.message});
    }

    delete res.subscriber;
})

router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        delete res.subscriber;
        res.json({message: "Subscriber removed"});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getSubscriber(req, res, next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(!subscriber) return res.status(404).json({message: "Cannont find subscriber"});
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;