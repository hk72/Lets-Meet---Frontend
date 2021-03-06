import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import Events from './events.js'
import Comments from './comments.js'
import history from '../../history.js'

const EventsPages = (props) =>  {
    const [viewingEvents, setviewingEvents] = useState(true)

    useEffect(()=>{
        fetch('http://localhost:3000/postComments', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            props.getPostComments(data)
        })
    }, [])
    return(

        <div>
                {localStorage.getItem('token')
                    ?
        <Container style ={{maxWidth: '100%', paddingTop: '120px'}}>
            <SelectorDiv>
                <EventsDiv onClick={ () => history.push('/notifications')}>
                    {history.location.pathname == '/notifications'
                        ?
                        <div>
                            <h1><strong>View Events</strong></h1>
                            <div style ={{height: '2px', width: '80%', backgroundColor: '#B0B0B0', marginLeft: '10%', marginTop: '1%'}}> </div>
                        </div>
                        :
                            <h1><div>View Events</div></h1>
                    }
                </EventsDiv>
                <div style ={{height: '50px', width: '2px', backgroundColor: '#B0B0B0', paddingTop: '-15px'}}> </div>
                <CommentsDiv onClick={ () => history.push('/postComments')}>
                    {history.location.pathname == '/notifications'
                            ?
                            < h1><div>Post Comments</div></h1>
                            :
                            <div>
                                    <h1><strong>Post Comments</strong></h1>
                                <div style ={{height: '2px', width: '80%', backgroundColor: '#B0B0B0', marginLeft: '10%', marginTop: '1%'}}> </div>
                            </div>
                    }
                </CommentsDiv>
            </SelectorDiv> 
            {history.location.pathname == '/notifications'
                ? 
                <div>
                    {props.posts.length !== 0
                            ?
                            <DisplayDiv>
                                <div>
                                    {props.posts.map((event) => <Events event = {event}/> )}     
                                </div>
                                </DisplayDiv>
                            :   
                            <div style = {{textAlign: 'center', fontSize: '300%', marginTop: '15%'}}>
                                <h1>Currently Not Attending Any Event</h1>
                            </div>             
                    }
                </div>
                    
                :
                
                <div>
                    {props.comments.length !==0
                            ?    
                                <DisplayDiv>    
                                    <div>
                                        {props.comments.map((comment) => <Comments comment = {comment}/>)}
                                    </div>
                                 </DisplayDiv>
                            :
                                <div style = {{textAlign: 'center', fontSize: '300%', marginTop: '15%'}}>
                                    <h1>No Comments</h1>
                                </div>
                    }
                </div>
                
            }
        </Container>
          :
          <div>
              {history.push('/sign-in')}
          </div>
      }
      </div>
    )

    
}

const mapStateToProps = state => ({
    posts: state.postsAttending,
    comments: state.postComments
})




const mapDispatchToProps ={
    getUser: data => {
        return { type: 'GET_USERS', payload: data }
    },
    attendEvent: data => {
        return { type: 'POST_ATTENDING', payload: data}
    }, 
    getPostComments: data => {
        return { type: 'POST_COMMENTS', payload: data}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsPages)

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
const SelectorDiv = styled.div`
    display: flex;
`
const EventsDiv = styled.div`
    flex: 50;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
`

const CommentsDiv = styled.div`
    flex: 50;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
`
const DisplayDiv = styled.div`
    border: 2px solid #ccc;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 7%;
    margin-right: 7%;
`