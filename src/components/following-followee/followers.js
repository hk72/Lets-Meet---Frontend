import React from 'react'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import styled from 'styled-components'
import User from '../search/user.js'
import history from '../../history.js'

class Followers extends React.Component {
    state = {
        search: false
    }
  

    componentDidMount(){
        let id = this.props.match.params.id
        fetch(`http://localhost:3000/followers/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(user => {
                this.props.getFollowers(user)
            })

           
    }

    follow = (user) =>{
        console.log(user)
        fetch(`http://localhost:3000/follow/${user.id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(user)
        })

    }

    unfollow = (user) =>{
        console.log(user)
        fetch(`http://localhost:3000/unfollow/${user.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        this.props.unfollow(user)

    }

    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    render(){
        let users = this.props.followers;
        if(this.state.search){   
          users = this.props.followers.filter( (user)=>{
            return user.username.toLowerCase().includes(this.state.search)
          })
        }
        console.log(users)
        
        return(
            <div>
                {localStorage.getItem('token')
                    ?
                <Container style ={{maxWidth: '100%', paddingTop: '120px'}}>
                    <div>
                        <Search  autocomplete= "off" name = "search" placeholder = "Search" onChange = { (e) => this.setState({search: e.target.value}) }/>
                    </div>
                    <div style ={{paddingBottom: '50px'}}>
                            {users.length>0
                                ?
                                <Div >
                                    <div style = {{ paddingBottom: '3%'}}> 
                                        {users.map((user) => < User follow = {this.follow} unfollow = {this.unfollow} user = {user} />)}
                                    </div> 
                                </Div>  
                                :
                                <div style = {{textAlign: 'center', fontSize: '300%', marginTop: '15%'}}>No Followers</div> 
                            }
                    </div>
                </Container>
                 :
                 <div>
                     {history.push('/sign-in')}
                 </div>
             }
             </div>
        )

    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    followers: state.followers
})


const mapDispatchToProps ={
    getUser: data => {
        return {type: 'GET_USERS', payload: data}
    },
    unfollow: data => {
        return {type: 'UNFOLLOW_USER', payload: data}
    },
    getFollowers: data => {
        return { payload: data, type: 'GET_FOLLOWERS' }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Followers)

const Search = styled.input`
    width: 90%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    margin-bottom: 5px;
    margin-left: 5%;
    margin-right: 5%;
   
`
const Div = styled.div`
    margin-top: 3%;
    box-shadow: 0 0 50px 0 rgba(0,0,0,0.4), 0 0px 20px 0 rgba(0,0,0,0.19);
    width: 86%;
    margin-left: 7%;
    margin-right: 7%;
    height: 100%;
    
`


