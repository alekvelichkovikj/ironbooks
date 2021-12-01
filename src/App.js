import './App.css'
import allUsers from './users'
import React from 'react'

function App() {
  const [users, setUsers] = React.useState(allUsers)
  const [filter, setFilter] = React.useState('')
  const [checkedStudent, setCheckStudent] = React.useState(false)
  const [checkedTeacher, setCheckTeacher] = React.useState(false)
  const [campus, setCampus] = React.useState('All')

  let filtered = users.filter((user) =>
    user.firstName.toLowerCase().includes(filter.toLowerCase())
  )

  const searchHandler = (e) => {
    setFilter(e.target.value)
  }

  const checkedStudentHandler = (e) => {
    setCheckStudent(e.target.checked)
  }

  const checkedTeacherHandler = (event) => {
    setCheckTeacher(event.target.checked)
  }

  const campusHandler = (event) => {
    setCampus(event.target.value)
  }

  if (checkedStudent) {
    filtered = filtered.filter((user) => {
      return user.role === 'student'
    })
  }

  if (checkedTeacher) {
    filtered = filtered.filter((user) => {
      return user.role === 'teacher'
    })
  }

  if (campus !== 'All') {
    filtered = filtered.filter((user) => {
      return campus === user.campus
    })
  }

  // List
  const list = filtered.map((user) => (
    <tr>
      <td> {user.firstName} </td>
      <td> {user.lastName} </td>
      <td> {user.campus}</td>
      <td> {user.role} </td>
      <td> {user.linkedin && <a href={user.linkedin}>🔗</a>} </td>
    </tr>
  ))

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h1>IronBooks</h1>
        </div>

        <input
          value={filter}
          onChange={searchHandler}
          type='text'
          placeholder='Search by first name'
        />

        <div className='filter-row'>
          <input
            checked={checkedStudent}
            onChange={checkedStudentHandler}
            type='checkbox'
          />
          <span>Student</span>

          <input
            checked={checkedTeacher}
            onChange={checkedTeacherHandler}
            type='checkbox'
          />
          <span>Teacher</span>

          <span>Campus:</span>
          <select onChange={campusHandler}>
            <option value='All'>All</option>
            <option value='Paris'>Paris</option>
            <option value='Lisbon'>Lisbon</option>
          </select>
        </div>

        <div>
          <table>
            <tr style={{ padding: '50px' }}>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
            {list}
          </table>
        </div>
      </header>
    </div>
  )
}

export default App
