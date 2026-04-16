const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// dataset
let students = [
    { id: 1, name: "bisaya", yearLevel: 2 },
    { id: 2, name: "butingol", yearLevel: 3 },
    { id: 3, name: "tagalog", yearLevel: 4 },
]

// GET all students
app.get('/api/students', (req, res) => {
    res.json(students)
})

// GET student by ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id)

    if (!student) {
        return res.status(404).json({ message: "Student not found" })
    }

    res.json(student)
})

// POST add student
app.post('/api/students', (req, res) => {
    const { name, yearLevel } = req.body

    if (!name || !yearLevel) {
        return res.status(400).json({ message: "Missing fields" })
    }

    const newStudent = {
        id: students.length + 1,
        name,
        yearLevel
    }

    students.push(newStudent)

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    })
})

// PUT update student
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id)

    if (!student) {
        return res.status(404).json({ message: "Student not found" })
    }

    student.name = req.body.name || student.name
    student.yearLevel = req.body.yearLevel || student.yearLevel

    res.json({ message: "Student updated", student })
})

// DELETE student
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id)

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" })
    }

    const deleted = students.splice(index, 1)

    res.json({ message: "Student deleted", deleted })
})

// SEARCH by name
app.get('/api/search', (req, res) => {
    const { name } = req.query

    const results = students.filter(s =>
        s.name.toLowerCase().includes(name.toLowerCase())
    )

    res.json(results)
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})