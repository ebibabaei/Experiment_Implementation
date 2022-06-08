const express = require('express');
const router = express.Router();
const ParticipantModel = require('../models/participant')

let mturk_id=""

let repeated=false

router.get('/', async (req, res) => {
    // res.render('baseline_video');
    // mturk_id=req.query.mturkid
    // //console.log("In the baseline router");

    mturk_id = req.query.mturkid;
    let repeated_tmp = req.query.repeated
    console.log("AMAN"+repeated_tmp+ typeof(repeated_tmp))
    //send N (difficulty level) to the client
    if (typeof repeated_tmp === 'undefined') {
        repeated = false
    } else
    repeated = (repeated_tmp === "true");
    console.log(repeated)
    if (!mturk_id) {

        return res.redirect('/welcome');
    }
    else {

        try {
            //     /* Read from the DataBase */
            // let participant = await ParticipantModel.findOne({ mturk_id: mturk_id });
            // await participant
            // if (!participant)
            //     return res.redirect('/welcome');
            // else {
            //     // console.log(participant)
            //     // console.log(typeof (participant))
            //     // sequence_type = participant[0].sequence_type
            //     // progress = participant[0].progress
            //     // console.log(`seq is ${sequence_type} and progress is ${progress}`)
            //     // res.render('nasatlx')
            //     participant.t_video_started= Date.now()
            //     await participant.save();
                res.render('tutorial1');


            
        } catch (error) {
            console.log(error)
        }
    }

})

router.post('/', async (req, res) => {
    console.log(mturk_id)
    // console.log("reached the baseline post page");
    // res.redirect(`/startplay?mturkid=${mturk_id}`)
    //res.send(req.body)
    //res.redirect("https://github.com/pugjs/pug/issues/1355")
    //res.redirect('/welcome');
    if (!mturk_id) {

        return res.redirect('/welcome');
    }
    else {

        try {
            //     /* Read from the DataBase */
            let participant = await ParticipantModel.findOne({ mturk_id: mturk_id });
            await participant
            if (!participant)
                return res.redirect('/welcome');
            else {
                res.redirect(`/startplay/trial?mturkid=${mturk_id}&repeated=${repeated}`)

            }
        } catch (error) {
            console.log(error)
        }
    }


 });

module.exports = router;