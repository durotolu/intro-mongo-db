const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatever')
}

const student = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    faveFoods: [{ type: String }],
    info:{
        school: {
            type: String
        },
        shoeSize: {
            type: Number
        }
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school',
    }
}, {timestamps: true})

const school = new mongoose.Schema({
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'district'
    },
    name: {
        type: String,
        unique: false
    },
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{type: String}]
})

school.index({
    district: 1,
    name: 1
}, { unique: true })

{
    key: 'value'
}

school.post('save', function(doc, next) {
    setTimeout(() => {
        console.log('post save', doc)
        next()
    }, 300)
})

school.virtual('staffCount')
    .get(function() {//must be a regular function using 'this'
        console.log('executed in virtual')
        return this.staff.length
    })

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

connect()
    .then(async connection => {
        const student = await Student.create({firstName: 'Tim'})
        const found = await Student.find({firstName: 'Tom'})
        const foundById = await Student.findById('anyididgaf')
        const updated = await Student.findByIdAndUpdate('anyididgaf', {})
        const myschool = await School.create({
            name: 'my school',
            staff: ['v', 'f', 'fsa']
        })
        console.log(myschool.staffCount)
    })
    .catch(e => console.error(e))

    connect()
        .then(async connection => {
            const schoolConfig = {
                name: 'mlk elemetary',
                openSince: 2009,
                students: 1000,
                isGreat: true,
                staff: ['d', 'b', 'e']
            }

            const school2 = {
                name: 'Larry mid',
                openSince: 1980,
                students: 600,
                isGreat: false,
                staff: ['r', 'b', 'u']
            }

            const schools = await School.create([schoolConfig, school2])

            const match = await School.find({
                // students: {$gt: 600, $lt: 800},
                // isGreat: true,
                //staff: 'b'
                staff: {$in:['v', 'b', 'g']}
            })
            .sort('-openSince')
            .limit(2)
            .exec()
            //console.log(match)

            // const school = await School.findOneAndUpdate(
            //     {name: 'mlk elementary'},
            //     {name: 'mlk elementary'},
            //     {upsert: true, new: true}
            // ).exec()
            // const school = await School.create({name: 'mlk elementry'})
            // const student = await Student.create({ firstName: 'Trisha', school: school._id})

            // const match = await Student.findById(student.id)
            //     .populate('school')
            //     .exec()
            // console.log(match)

            const matchWithName = await Student.findOne({ firstName: 'Trisha'})
                .populate('school')
                .exec()
            //console.log(matchWithName)
        })
        .catch(e => console.error(e))