import axios from "axios"
import React from "react"
import { TableContainer, TableBody, TableHead, TableRow, Paper, Table, TableCell, Button, TextField, Box } from "@mui/material"
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      name: "",
      id:"",
      email: "",
      errors: { name: "", email: "" }

    }
  }
  createUser = async () => {

    const {  name, email, company_name } = this.state;
    try {
      const { data: user } = await axios.post('https://jsonplaceholder.typicode.com/users', {  name, email, company_name })
      const users = [...this.state.users]
      users.push(user)
      this.setState({ users,  name: "", email: "", company_name })

    }
    catch (err) {
      console.error("error", err)
    }
  }
  UpdateUser = async () => {
    const { id, name, email } = this.state;
    try {
      const { data: post } = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {id,  name, email })
      const users = [...this.state.users]
      const index = users.findIndex(p => p.id === id)
      users[index] = post;
      this.setState({ users, id: "", name: "", email: "" })

    }
    catch (err) {
      console.error("error", err)
    }
  }
  getUser = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
    this.setState({ users: data })
    console.log(this.state.users)
  }
  deletePost = async (user) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${user}`)
      let users = [...this.state.users]
      users = users.filter((post) => post.id !== user)
      this.setState({ users })

    }

    catch (err) {
      console.error("error", err)
    }

  }
  componentDidMount() {
    this.getUser()
  }
 handleChange = ({ target: { name, value } }) => {
   

    this.setState({ [name]: value })
    let errors={}
    if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors["email"] = "email not valid";
    } else errors["email"] = "";

    if (
      this.state.name.length < 5 ||
      this.state.name.length > 25
    ) {
      errors["name"] = "Name should be between 5 to 25 characters";
    } else {
      errors["name"] = "";
    }
    this.setState({ errors: errors });
  }
  handleSubmit = (e) => {

    
    e.preventDefault()
   if( this.state.errors.name==="" &&this.state.errors.email==="")
   {
    if (this.state.id) {
      this.UpdateUser()
    } else {
      this.createUser()
    }
  }
  else{
    alert("please give a valid values")
  }
  }

  selectToUpdatePost(user) {
    this.setState({ ...user })
  }
  render() {
    return (
      <>
        <Box component="form" onSubmit={this.handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }, marginLeft: 10, marginBottom: 3
          }}
          noValidate
          autoComplete="off">
          <h3> Create User:</h3>
         
          
          <TextField id="outlined-password-input" label="Name" type='text' name="name" value={this.state.name} onChange={this.handleChange} /><br />
          <span> {this.state.errors.name} </span><br />
          <TextField id="outlined-password-input" label="E-mail" type='text' name="email" value={this.state.email} onChange={this.handleChange} /><br />
          <span> {this.state.errors.email} </span><br/>

          <button> Submit</button>
        </Box>
        <Paper sx={{ width: '100%' }}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="customized table" >
              <TableHead align="center">
                <TableRow style={{ background: "black" }} >
                  <TableCell align="center">User Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">E-mail</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody stripedrow="true">
                {this.state.users.map((user, row) => {

                  return (


                    <TableRow hover key={user.id} >
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.email} </TableCell>
                      <TableCell><Button size="sm" onClick={() => this.selectToUpdatePost(user)}>Update</Button></TableCell>
                      <TableCell><Button size="sm" onClick={() => this.deletePost(user.id)}>Delete</Button></TableCell>

                    </TableRow>

                  )
                })}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>
      </>


    )
  }
}
export default App;
