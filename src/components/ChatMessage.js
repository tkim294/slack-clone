import React from 'react'
import styled from 'styled-components'

const ChatMessage = ({text, name, image, timestamp, userLoggedIn}) => {
    
    return (
        <Container name={name} userLoggedIn={userLoggedIn}>
            <UserAvatar>
                {(userLoggedIn !== name) && <img src={image} />}
            </UserAvatar>
            <MessageContent>
                <Name name={name} userLoggedIn={userLoggedIn}>
                    {(name === userLoggedIn) ? "Me" : name}
                    <span>
                        {new Date(timestamp.toDate()).toUTCString()}
                    </span>
                </Name>
                <Text>
                    {text} 
                </Text>
            </MessageContent>
        </Container>
    )
}

export default ChatMessage

const Container = styled.div `
    padding: 8px 20px;
    display: flex;
    justify-content: ${({ userLoggedIn, name }) => ((userLoggedIn == name) ? 'flex-end' : 'flex-start' )};
    align-items: center;

    :hover {
        background: #d3d3d3;
    }
`

const UserAvatar = styled.div `
    width: 36px;
    height: 36px;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 8px;
    
    img {
        width: 100%;
    }
`

const MessageContent = styled.div `
    display: flex;
    flex-direction: column;
`

const Name = styled.span `
    font-weight: 900;
    font-size: 15px;
    line-height: 1.4;
    color: ${({ userLoggedIn, name }) => ((userLoggedIn === name) ? '#87ceeb' : 'black')};

    span {
        font-weight: 400;
        color: rgba(97, 96, 97);
        margin-left: 8px;
        font-size: 13px;
    }
`

const Text = styled.span `

`